
import { HttpClient, HttpRequestMethod } from '../../http-client/http-client';
import { CryptoCurrency, FiatCurrency } from '../common/currencies';
import { HttpApiResponse, makeRequest } from '../common/make-request';
import { Money, parseMoneyString, StringMoney } from '../common/money';
import { Network } from '../common/network';
import { transformResponse } from '../common/transform-response';
import { AppToken} from '../common/types';


export interface GetExchangeRatesRequestOptions {
  appToken: AppToken;
  httpClient: HttpClient;
  network?: Network;
}

export type GetExchangeRatesResponse = (
  GetExchangeRatesResponseItem[]
);

export interface GetExchangeRatesResponseItem {
  is_valid: boolean;
  source: CryptoCurrency;
  target: FiatCurrency;
  rate: StringMoney;
}

export type GetExchangeRatesResult = (
  GetExchangeRatesResultItem[]
);

export interface GetExchangeRatesResultItem {
  isValid: boolean;
  source: CryptoCurrency;
  target: FiatCurrency;
  rate: Money;
}


/**
 * Use this method to get exchange rates of supported
 * currencies. Returns array of currencies.
 */
export async function getExchangeRates(
  options: GetExchangeRatesRequestOptions

): Promise<HttpApiResponse<GetExchangeRatesResult>> {

  const {
    appToken,
    httpClient,
    network,

  } = options;

  const response = (
    await makeRequest<void, GetExchangeRatesResponse>({
      appToken,
      httpClient,
      methodName: 'getExchangeRates',
      httpMethod: HttpRequestMethod.Get,
      network,
    })
  );

  return transformResponse(response, result =>
    result.map(item => ({
      isValid: item.is_valid,
      source: item.source,
      target: item.target,
      rate: parseMoneyString(item.rate),
    }))
  );

}
