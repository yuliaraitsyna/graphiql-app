import {Header} from '~/components/HeadersEditor/models/header';
import {HTTPMethods} from '../RestRequest/models/HTTPMethods';
import {Variable} from '~/components/models/variable';

// export interface RequestParams {
//   endpointUrl: string;
//   method: HTTPMethods;
//   headers?: Header[];
//   variables?: Variable[];
//   body?: string;
// }

export interface RequestData {
  uri: string;
  method: HTTPMethods;
  headers: Header[];
  variables: Variable[];
  body: string;
  type: string;
}
