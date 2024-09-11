import {Header} from '~/components/HeadersEditor/models/header';
import {Variable} from '~/components/models/variable';

export function getStringFromVariablesParams(vars: Variable[]) {
  const checked = vars.filter(v => v.checked);
  return checked.length ? checked.reduce((a, v, i) => a + (i > 0 ? '&' : '') + v.name + '=' + v.value, '?') : '';
}

export function getStringFromHeadersParams(vars: Header[]) {
  const checked = vars.filter(v => v.checked);
  return checked.length
    ? checked.reduce(
        (a, v, i) => a + (i > 0 ? '&' : '') + encodeURIComponent(v.key) + '=' + encodeURIComponent(v.value),
        '?',
      )
    : '';
}
