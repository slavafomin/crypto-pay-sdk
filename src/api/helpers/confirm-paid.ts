
import pLimit from 'p-limit';

import { HttpClient } from '../../http-client/http-client';
import { Invoice, InvoiceId } from '../common/invoice';
import { Network } from '../common/network';
import { AppToken } from '../common/types';
import { confirmPayment } from '../methods/confirm-payment';
import { getPayments } from '../methods/get-payments';


export interface ConfirmPaidResult {
  confirmedPayments: Invoice[];
}


const defaultLimit = 100;
const defaultConcurrency = 10;

export async function confirmPaid(options: {
  appToken: AppToken;
  httpClient: HttpClient;
  limit?: number;
  concurrency?: number;
  network?: Network;
  handleConfirmation?: (
    (confirmedInvoice: Invoice)
      => (unknown | Promise<unknown>)
  );

}): Promise<ConfirmPaidResult> {

  const {
    appToken,
    httpClient,
    limit = defaultLimit,
    concurrency = defaultConcurrency,
    network,
    handleConfirmation,

  } = options;

  // Initializing the result
  const result: ConfirmPaidResult = {
    confirmedPayments: [],
  };

  const { payload } = await getPayments({
    appToken,
    params: {
      count: limit,
    },
    httpClient,
    network,
  });

  const paidInvoices = payload.result.items;

  // Skipping further processing if no items returned
  if (paidInvoices.length === 0) {
    return result;
  }

  const limiter = pLimit(concurrency);

  const queue = paidInvoices.map(
    invoice => limiter(
      () => doConfirmPayment(invoice.invoiceId)
    )
  );

  await Promise.all(queue);

  return result;


  /**
   * Confirms the payment vy the specified ID and
   * calls user functions on success, or logs an
   * error message in case of failure.
   */
  async function doConfirmPayment(invoiceId: InvoiceId) {
    try {
      const response = await confirmPayment({
        appToken,
        params: { invoiceId },
        httpClient,
        network,
      });

      const confirmedInvoice = response.payload.result;

      await handleConfirmation?.(confirmedInvoice);

      result.confirmedPayments.push(confirmedInvoice);

    } catch (error) {
      console.error(
        `Failed to confirm payment with ID: ${invoiceId}`
      );
      console.error(error);

    }

  }

}
