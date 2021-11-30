
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
    const invoice = await client.confirmPayment({
      invoiceId: 1065,
    });

    console.log(JSON.stringify(invoice, null, 4));

  } catch (error) {
    console.error(error);

  }

})();
