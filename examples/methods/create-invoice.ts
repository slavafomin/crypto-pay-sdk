
import got from 'got';

import {
  createInvoice,
  CryptoCurrency,
  GotHttpClient,
  Network,
  PaidBtnName,

} from '@crypto-pay/sdk';

import { appToken } from '../app-token';


(async () => {

  const httpClient = new GotHttpClient({ got });

  try {
    const response = await createInvoice({
      appToken,
      params: {
        asset: CryptoCurrency.ETH,
        amount: 5.33,
        description: `A test invoice for my cool application`,
        paidBtnUrl: `https://example.com`,
        payload: { an: { example: { payload: ["object"] } } },
        paidBtnName: PaidBtnName.ViewItem,
        allowAnonymous: true,
        allowComments: false,
      },
      httpClient,
      network: Network.Testnet,
    });

    console.log(JSON.stringify(response.payload, null, 4));

  } catch (error) {
    console.error(error);

  }

})();
