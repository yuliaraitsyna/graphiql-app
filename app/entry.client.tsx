import {i18nHydrate} from './utils/';
import originalI18next from 'i18next';
export const i18next = originalI18next;
export default originalI18next;

i18nHydrate().catch(error => console.error(error));
