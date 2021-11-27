
export interface GetCurrenciesRequestOptions {
  params: GetCurrenciesRequestParams;
}

export interface GetCurrenciesRequestParams {
}

export interface GetCurrenciesRequest {
}

export interface GetCurrenciesResponse {
  // @todo
}


/**
 * Use this method to supported currencies.
 * Returns array of currencies.
 */
export async function getCurrencies(
  options: GetCurrenciesRequestOptions

): Promise<GetCurrenciesResponse> {

  const { params } = options;

  return {};

}
