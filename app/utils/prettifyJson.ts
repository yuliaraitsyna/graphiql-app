export default function prettifyJson(json: string) {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch (e) {
    console.error('Invalid JSON param', e);
    return '{}';
  }
}
