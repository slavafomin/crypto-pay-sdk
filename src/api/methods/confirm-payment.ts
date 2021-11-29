
import Joi from 'joi';

import { omitEmptyProps } from '../common/utils';
import { HttpClient, HttpRequestMethod } from '../../http-client/http-client';
import { Invoice, InvoiceId, invoiceIdValidator, InvoiceResponse, parseInvoiceResponse } from '../common/invoice';
import { HttpApiResponse, makeRequest } from '../common/make-request';
import { defaultNetwork, Network } from '../common/network';
import { transformResponse } from '../common/transform-response';
import { AppToken } from '../common/types';


export interface ConfirmPaymentRequestOptions {
  appToken: AppToken;
  params: ConfirmPaymentParams;
  httpClient: HttpClient;
  network?: Network;
}

export interface ConfirmPaymentParams {

  /**
   * Invoice ID you want to confirm.
   */
  invoiceId: InvoiceId;

}

export interface ConfirmPaymentRequest {

  /**
   * Invoice ID you want to confirm.
   */
  invoice_id: InvoiceId;

}


/**
 * Use this method to confirm paid invoice of your app.
 * On success, the return confirmed invoice.
 */
export async function confirmPayment(
  options: ConfirmPaymentRequestOptions

): Promise<HttpApiResponse<Invoice>> {
  const {
    appToken,
    httpClient,
    network = defaultNetwork,

  } = options;

  const paramsSchema = Joi.object({
    invoiceId: invoiceIdValidator
      .required(),
  });

  const validationResult = await paramsSchema
    .validateAsync(options.params, {
      warnings: true,
    })
  ;

  const params: ConfirmPaymentParams = (
    validationResult.value
  );

  // Request serialization
  const body = omitEmptyProps<ConfirmPaymentRequest>({
    invoice_id: params.invoiceId,
  });

  const response = await makeRequest<
    ConfirmPaymentRequest,
    InvoiceResponse
  >({
    appToken,
    httpClient,
    methodName: 'confirmPayment',
    body,
    httpMethod: HttpRequestMethod.Post,
    network,
  });

  // Deserializing server response
  return transformResponse(response, (
    result => parseInvoiceResponse(result)
  ));

}
