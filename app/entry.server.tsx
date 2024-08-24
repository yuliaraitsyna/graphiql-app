import { PassThrough } from "node:stream";
import type { AppLoadContext, EntryContext } from "@vercel/remix";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import ReactDOMServer, { renderToPipeableStream } from "react-dom/server";
import { createInstance, i18n as i18next } from "i18next";
import i18nServer from "./i18n.server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import * as i18n from "./locales/config/i18n";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "./utils/createEmotionCache";

const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  const instance = createInstance();
  const lng = await i18nServer.getLocale(request);
  const ns = i18nServer.getRouteNamespaces(remixContext);

  await instance.use(initReactI18next).init({ ...i18n, lng, ns });

  return isbot(request.headers.get("user-agent") || "")
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
        loadContext,
        instance,
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
        loadContext,
        instance,
      );
}

async function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
  i18next: i18next,
) {
  return new Promise((resolve) => {
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    const MuiRemixServer = () => (
      <I18nextProvider i18n={i18next}>
        <CacheProvider value={cache}>
          <CssBaseline />
          <RemixServer
            context={remixContext}
            url={request.url}
            abortDelay={ABORT_DELAY}
          />
        </CacheProvider>
      </I18nextProvider>
    );

    const html = ReactDOMServer.renderToString(<MuiRemixServer />);
    const { styles } = extractCriticalToChunks(html);
    let stylesHTML = "";

    styles.forEach(({ key, ids, css }) => {
      const emotionKey = `${key} ${ids.join(" ")}`;
      const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
      stylesHTML += newStyleTag;
    });

    const markup = `<!DOCTYPE html>${html.replace(
      /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
      `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`,
    )}`;

    responseHeaders.set("Content-Type", "text/html");

    resolve(
      new Response(markup, {
        headers: responseHeaders,
        status: responseStatusCode,
      }),
    );
  });
}

async function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
  i18next: i18next,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const cache = createEmotionCache();

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18next}>
        <CacheProvider value={cache}>
          <CssBaseline />
          <RemixServer
            context={remixContext}
            url={request.url}
            abortDelay={ABORT_DELAY}
          />
        </CacheProvider>
      </I18nextProvider>,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
