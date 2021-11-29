
import got from 'got';

import {
  getInvoices,
  GotHttpClient,
  Network

} from '@crypto-pay/sdk';

import { appToken } from '../app-token';


(async () => {

  const httpClient = new GotHttpClient({ got });

  try {
    const response = await getInvoices({
      appToken,
      params: {
        // asset: CryptoCurrency.TON,
        // invoiceIds: [1, 2, 3, 4],
        // status: InvoiceStatus.Paid,
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
