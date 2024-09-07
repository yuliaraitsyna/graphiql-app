import {HTTPMethods} from '~/components/RESTfullClient/RestRequest/models/HTTPMethods';
import RestRequest from '~/components/RESTfullClient/RestRequest/RestRequest';

export default function RESTRoute() {
  const initialMethod = HTTPMethods.GET;
  return <RestRequest initialMethod={initialMethod} />;
}
