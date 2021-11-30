
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
    const { items: invoices, count } = await client.getInvoices({
      // asset: CryptoCurrency.TON,
      // invoiceIds: [1, 2, 3, 4],
      // status: InvoiceStatus.Paid,
      // offset: 100,
      // count: 1000,
    });

    console.log(JSON.stringify({ invoices, count }, null, 4));

  } catch (error) {
    console.error(error);

  }

})();
