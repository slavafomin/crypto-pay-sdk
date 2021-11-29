
import got from 'got';

import {
  ApiClient,
  GotHttpClient,
  Network,

} from '@crypto-pay/sdk';

import { appToken } from '../app-token';


(async () => {

  const httpClient = new GotHttpClient({ got });

  const client = new ApiClient({
    appToken,
    httpClient,
    network: Network.Testnet,
  });

  try {
    const response = await client.getCurrencies();

    console.log(JSON.stringify(response, null, 4));

  } catch (error) {
    console.error(error);

  }

})();
