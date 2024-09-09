export function isValidURL(urlString: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return regex.test(urlString);
}
