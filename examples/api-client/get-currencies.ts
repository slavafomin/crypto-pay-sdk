
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
    const resultItems = await client.getCurrencies();

    console.log(JSON.stringify(resultItems, null, 4));

  } catch (error) {
    console.error(error);

  }

})();
