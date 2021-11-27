
import { AppToken, Network } from './common/types';


export const endpointUrlTemplate = (
  'https://{hostname}/app{appToken}/{method}'
);

export const endpointHostnames: Record<Network, string> = {
  [Network.Mainnet]: 'pay.crypt.bot',
  [Network.Testnet]: 'testnet-pay.crypt.bot',
};

export function getEndpointUrl(options: {
  appToken: AppToken;
  method: string;
  network?: Network;

}) {

  const {
    appToken,
    method,
    network = Network.Mainnet,

  } = options;

  return endpointUrlTemplate
    .replace('{hostname}', endpointHostnames[network])
    .replace('{appToken}', appToken)
    .replace('{method}', method)
  ;

}
