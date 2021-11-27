
import { AppToken } from './common';


export const endpointUrlTemplate = (
  'https://pay.crypt.bot/{appToken}/{method}'
);

export function getEndpointUrl(options: {
  appToken: AppToken;
  method: string;

}) {

  const { appToken, method } = options;

  return endpointUrlTemplate
    .replace('{appToken}', appToken)
    .replace('{method}', method)
  ;

}
