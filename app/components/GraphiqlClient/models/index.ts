import {Header} from '~/components/HeadersEditor/models/header';
import {Variable} from '~/components/models/variable';

export type RequestStatus = 'idle' | 'pending' | 'fullfilled' | 'rejected';

export interface GraphqlRequestState {
  endpointValue: string;
  sdlValue: string;
  queryValue: string;
  headers: Header | Header[] | null;
  variablesValue: Variable | Variable[] | null;
}

export const initialStateGraphqlRequest: GraphqlRequestState = {
  endpointValue: '',
  sdlValue: '',
  queryValue: '',
  headers: null,
  variablesValue: null,
};
