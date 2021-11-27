
export interface GetPaymentsRequestOptions {
  params: GetPaymentsParams;
}

export interface GetPaymentsParams {

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

export interface GetPaymentsRequest {

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

export interface GetPaymentsResponse {
  // @todo
}


export async function getPayments(
  options: GetPaymentsRequestOptions

): Promise<GetPaymentsResponse> {

  const { params } = options;

  // @todo: set defaults
  // @todo: validate params

  // Request serialization
  const payload: GetPaymentsRequest = {
    offset: params.offset,
    count: params.count,
  };

  // @todo: make request

  return {};

}
