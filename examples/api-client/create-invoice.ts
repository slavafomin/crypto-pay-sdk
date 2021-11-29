
import got from 'got';

import {
  ApiClient,
  CryptoCurrency,
  GotHttpClient,
  Network,
  PaidBtnName,

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
    const response = await client.createInvoice({
      asset: CryptoCurrency.ETH,
      amount: 5.33,
      description: `A test invoice for my cool application`,
      paidBtnUrl: `https://example.com`,
      payload: { an: { example: { payload: ["object"] } } },
      paidBtnName: PaidBtnName.ViewItem,
      allowAnonymous: true,
      allowComments: false,
    });

    console.log(JSON.stringify(response, null, 4));

  } catch (error) {
    console.error(error);

  }

})();