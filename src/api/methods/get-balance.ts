
export interface GetBalanceRequestOptions {
  params: GetBalanceRequestParams;
}

export interface GetBalanceRequestParams {
}

export interface GetBalanceRequest {
}

export interface GetBalanceResponse {
  // @todo
}


/**
 * Use this method to get balance of your app.
 * Returns array of assets.
 */
export async function getBalance(
  options: GetBalanceRequestOptions

): Promise<GetBalanceResponse> {

  const { params } = options;

  return {};

}
