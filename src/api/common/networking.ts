
import { defaultNetwork, Network } from './network';


export const endpointUrlTemplate = (
  'https://{hostname}/api/{method}'
);

export const appTokenHeaderName = 'Crypto-Pay-API-Token';

export const endpointHostnames: Record<Network, string> = {
  [Network.Mainnet]: 'pay.crypt.bot',
  [Network.Testnet]: 'testnet-pay.crypt.bot',
};

export function getEndpointUrl(options: {
  method: string;
  network?: Network;

}) {

  const {
    method,
    network = defaultNetwork,

  } = options;

  return endpointUrlTemplate
    .replace('{hostname}', endpointHostnames[network])
    .replace('{method}', method)
  ;

}
