import {Variable} from '~/components/models/variable';

export default function getVariablesFromUri(uri: string): Variable[] {
  let params = new URLSearchParams();
  try {
    params = new URL(uri).searchParams;
  } catch (error) {
    if (error instanceof TypeError) {
      if (uri.includes('?')) {
        const validUrl = 'http://1';
        const paramsStr = uri.split('?').pop();
        params = new URLSearchParams(validUrl + paramsStr);
      }
    }
  }
  return params.size ? Array.from(params.entries()).map(p => ({name: p[0], value: p[1], checked: true})) : [];
}
