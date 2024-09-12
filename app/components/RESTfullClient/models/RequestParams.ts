import {Header} from '~/components/HeadersEditor/models/header';
import {HTTPMethods} from '../RestClient/models/HTTPMethods';
import {QueryParam} from '~/components/models/queryParams';

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
  params: QueryParam[];
  body: string;
  type: string;
}
