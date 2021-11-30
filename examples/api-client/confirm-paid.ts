
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
    const { confirmedPayments } = await client.confirmPaid({
      limit: 100,
      concurrency: 10,
      handleConfirmation: async invoice => {
        console.log(
          `Invoice #${invoice.invoiceId} is confirmed!`
        );
        // Emulating some work, this will hold the queue
        // based on the provided concurrency
        await sleep(2000);
      },
    });

    console.log(
      `The following invoices were confirmed: ` +
      confirmedPayments
        .map(invoice => invoice.invoiceId)
        .join(', ')
    );

  } catch (error) {
    console.error(error);

  }

})();


function sleep(timeout: number) {
  return new Promise(
    resolve => setTimeout(resolve, timeout)
  );
}
