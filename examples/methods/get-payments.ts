
import got from 'got';

import {
  getPayments,
  GotHttpClient,
  Network

} from '@crypto-pay/sdk';

import { appToken } from '../app-token';


(async () => {

  const httpClient = new GotHttpClient({ got });

  try {
    const response = await getPayments({
      appToken,
      params: {
        // offset: 100,
        // count: 1000,
      },
      httpClient,
      network: Network.Testnet,
    });

    console.log(JSON.stringify(response.payload, null, 4));

  } catch (error) {
    console.error(error);

  }

})();
