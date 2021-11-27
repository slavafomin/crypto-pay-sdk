
import { Asset, InvoiceId } from '../common';


export interface GetInvoicesRequestOptions {
  params: GetInvoicesParams;
}

export interface GetInvoicesParams {

  /**
   * Optional. Currency code. Default: all assets.
   */
  asset?: Asset;

  /**
   * Optional. Invoice IDs separated by comma.
   */
  invoiceIds?: InvoiceId[];

  /**
   * Optional. Status of invoices. Available statuses:
   * active or paid. Default: all statuses.
   */
  status?: InvoiceStatus;

  /**
   * Optional. Offset needed to return a specific
   * subset of invoices. Default 0.
   */
  offset?: number;

  /**
   * Optional. Number of invoices to return.
   * Default 100, max 1000.
   */
  count?: number;

}

export interface GetInvoicesRequest {

  /**
   * Optional. Currency code. Default: all assets.
   */
  asset?: Asset;

  /**
   * Optional. Invoice IDs separated by comma.
   */
  invoice_ids?: string;

  /**
   * Optional. Status of invoices. Available statuses:
   * active or paid. Default: all statuses.
   */
  status?: InvoiceStatus;

  /**
   * Optional. Offset needed to return a specific
   * subset of invoices. Default 0.
   */
  offset?: number;

  /**
   * Optional. Number of invoices to return.
   * Default 100, max 1000.
   */
  count?: number;

}

export enum InvoiceStatus {
  Active = 'active',
  Paid = 'paid',
}

export interface GetInvoicesResponse {
  // @todo
}


export async function getInvoices(
  options: GetInvoicesRequestOptions

): Promise<GetInvoicesResponse> {

  const { params } = options;

  // @todo: set defaults
  // @todo: validate params

  // Request serialization
  const payload: GetInvoicesRequest = {
    asset: params.asset,
    invoice_ids: params.invoiceIds.join(','),
    status: params.status,
    offset: params.offset,
    count: params.count,
  };

  // @todo: make request

  return {};

}
