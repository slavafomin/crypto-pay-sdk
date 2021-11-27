
export interface ConfirmPaymentRequestOptions {
  params: ConfirmPaymentParams;
}

export interface ConfirmPaymentParams {

  /**
   * Invoice ID you want to confirm.
   */
  invoiceId: number;

}

export interface ConfirmPaymentRequest {

  /**
   * Invoice ID you want to confirm.
   */
  invoice_id: number;

}

export interface ConfirmPaymentResponse {
  // @todo
}


/**
 * Use this method to confirm paid invoice of your app.
 * On success, the return confirmed invoice.
 */
export async function confirmPayment(
  options: ConfirmPaymentRequestOptions

): Promise<ConfirmPaymentResponse> {

  const { params } = options;

  // @todo: set defaults
  // @todo: validate params

  // Request serialization
  const payload: ConfirmPaymentRequest = {
    invoice_id: params.invoiceId,
  };

  // @todo: make request

  return {};

}
