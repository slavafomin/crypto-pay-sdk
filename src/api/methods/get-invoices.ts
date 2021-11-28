
import Joi from 'joi';

import { omitEmptyProps } from '../../common/utils';
import { HttpClient, HttpRequestMethod } from '../../http-client/http-client';
import { supportedAssets } from '../common/assets';
import { CryptoCurrency } from '../common/currencies';
import { Invoice, InvoiceResponse, InvoiceStatus, invoiceStatuses, parseInvoiceResponse } from '../common/invoice';
import { HttpApiResponse, makeRequest } from '../common/make-request';
import { defaultNetwork, Network } from '../common/network';
import { PaginationParams, paginationSerializers, paginationValidators } from '../common/pagination';
import { transformResponse } from '../common/transform-response';
import { AppToken, InvoiceId} from '../common/types';


export interface GetInvoicesRequestOptions {
  appToken: AppToken;
  params?: GetInvoicesParams;
  httpClient: HttpClient;
  network?: Network;
}

export interface GetInvoicesParams extends PaginationParams {

  /**
   * Optional. Currency code. Default: all assets.
   */
  asset?: CryptoCurrency;

  /**
   * Optional. Invoice IDs separated by comma.
   */
  invoiceIds?: InvoiceId[];

  /**
   * Optional. Status of invoices. Available statuses:
   * active or paid. Default: all statuses.
   */
  status?: InvoiceStatus;

}

export interface GetInvoicesRequest extends PaginationParams {

  /**
   * Optional. Currency code. Default: all assets.
   */
  asset?: CryptoCurrency;

  /**
   * Optional. Invoice IDs separated by comma.
   */
  invoice_ids?: string;

  /**
   * Optional. Status of invoices. Available statuses:
   * active or paid. Default: all statuses.
   */
  status?: InvoiceStatus;

}

export interface GetInvoicesResponse {
  count: number;
  items: InvoiceResponse[];
}

export interface GetInvoicesResult {
  count: number;
  items: Invoice[];
}


export async function getInvoices(
  options: GetInvoicesRequestOptions

): Promise<HttpApiResponse<GetInvoicesResult>> {

  const {
    appToken,
    httpClient,
    network = defaultNetwork,

  } = options;

  const paramsSchema = Joi.object({
    asset: Joi.string()
      .optional()
      .valid(...supportedAssets[network]),

    invoiceIds: Joi.array()
      .optional()
      .items(
        Joi.number()
          .required()
          .greater(0)
      ),

    status: Joi.string()
      .optional()
      .valid(...invoiceStatuses),

    ...paginationValidators,

  });

  const validationResult = await paramsSchema
    .validateAsync(options.params || {}, {
      warnings: true,
    })
  ;

  const params: GetInvoicesParams = (
    validationResult.value
  );

  // Request serialization
  const query = omitEmptyProps<GetInvoicesRequest>({
    asset: params.asset,
    invoice_ids: (params.invoiceIds
      ? params.invoiceIds.join(',')
      : undefined
    ),
    status: params.status,
    ...paginationSerializers(params),
  });

  const response = await makeRequest<
    GetInvoicesRequest,
    GetInvoicesResponse
  >({
    appToken,
    httpClient,
    methodName: 'getInvoices',
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
