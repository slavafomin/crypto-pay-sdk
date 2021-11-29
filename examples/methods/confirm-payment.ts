
import got from 'got';

import {
  confirmPayment,
  GotHttpClient,
  Network,

} from '@crypto-pay/sdk';

import { appToken } from '../app-token';


(async () => {

  const httpClient = new GotHttpClient({ got });

  try {
    const response = await confirmPayment({
      appToken,
      params: {
        invoiceId: 1047,
      },
      httpClient,
      network: Network.Testnet,
    });

    console.log(JSON.stringify(response.payload, null, 4));

  } catch (error) {
    console.error(error);

  }

})();
