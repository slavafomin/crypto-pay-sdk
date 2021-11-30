
import got from 'got';

import {
  confirmPaid,
  GotHttpClient,
  Network,

} from '@crypto-pay/sdk';

import { appToken } from '../app-token';


(async () => {

  const httpClient = new GotHttpClient({ got });

  try {
    const { confirmedPayments } = await confirmPaid({
      appToken,
      httpClient,
      limit: 100,
      concurrency: 10,
      network: Network.Testnet,
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
