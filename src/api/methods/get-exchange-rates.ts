
export interface GetExchangeRatesRequestOptions {
  params: GetExchangeRatesRequestParams;
}

export interface GetExchangeRatesRequestParams {
}

export interface GetExchangeRatesRequest {
}

export interface GetExchangeRatesResponse {
  // @todo
}


/**
 * Use this method to get exchange rates of supported
 * currencies. Returns array of currencies.
 */
export async function getExchangeRates(
  options: GetExchangeRatesRequestOptions

): Promise<GetExchangeRatesResponse> {

  const { params } = options;

  return {};

}
