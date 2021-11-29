
import Joi from 'joi';

import { omitEmptyProps } from '../../common/utils';
import { HttpClient, HttpRequestMethod } from '../../http-client/http-client';
import { Invoice, InvoiceResponse, parseInvoiceResponse } from '../common/invoice';
import { HttpApiResponse, makeRequest } from '../common/make-request';
import { Network } from '../common/network';
import { PaginationParams, paginationSerializers, paginationValidators } from '../common/pagination';
import { transformResponse } from '../common/transform-response';
import { AppToken } from '../common/types';


export interface GetPaymentsRequestOptions {
  appToken: AppToken;
  params?: GetPaymentsParams;
  httpClient: HttpClient;
  network?: Network;
}

export interface GetPaymentsParams extends PaginationParams {
}

export interface GetPaymentsRequest extends PaginationParams {
}

export interface GetPaymentsResponse {
  count: number;
  items: InvoiceResponse[];
}

export interface GetPaymentsResult {
  count: number;
  items: Invoice[];
}


export async function getPayments(
  options: GetPaymentsRequestOptions

): Promise<HttpApiResponse<GetPaymentsResult>> {

  const {
    appToken,
    httpClient,
    network,

  } = options;

  const paramsSchema = Joi.object({
    ...paginationValidators,
  });

  const validationResult = await paramsSchema
    .validateAsync(options.params || {}, {
      warnings: true,
    })
  ;

  const params: GetPaymentsParams = (
    validationResult.value
  );

  // Request serialization
  const query = omitEmptyProps<GetPaymentsRequest>({
    ...paginationSerializers(params),
  });

  const response = await makeRequest<
    GetPaymentsRequest,
    GetPaymentsResponse
  >({
    appToken,
    httpClient,
    methodName: 'getPayments',
    query,
    httpMethod: HttpRequestMethod.Get,
    network,
  });

  return transformResponse(response, result => ({
    count: result.count,
    items: result.items.map(
      item => parseInvoiceResponse(item)
    )
  }));

}
