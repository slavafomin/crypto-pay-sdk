
import { HttpClient, HttpRequestMethod } from '../../http-client/http-client';
import { CryptoCurrency } from '../common/currencies';
import { HttpApiResponse, makeRequest } from '../common/make-request';
import { Money, StringMoney } from '../common/money';
import { transformResponse } from '../common/transform-response';
import { AppToken, Network } from '../common/types';


export interface GetBalanceRequestOptions {
  appToken: AppToken;
  httpClient: HttpClient;
  network?: Network;
}

export type GetBalanceResponse = GetBalanceResponseItem[];

export interface GetBalanceResponseItem {
  currency_code: CryptoCurrency;
  available: StringMoney;
}

export type GetBalanceResult = GetBalanceResultItem[];

export interface GetBalanceResultItem {
  currencyCode: CryptoCurrency;
  available: Money;
}


/**
 * Use this method to get balance of your app.
 * Returns array of assets.
 */
export async function getBalance(
  options: GetBalanceRequestOptions

): Promise<HttpApiResponse<GetBalanceResult>> {

  const {
    appToken,
    httpClient,
    network,

  } = options;

  const response = (
    await makeRequest<GetBalanceResponse>({
      appToken,
      httpClient,
      methodName: 'getBalance',
      httpMethod: HttpRequestMethod.Get,
      network,
    })
  );

  return transformResponse(response, result => (
    result.map(item => ({
      currencyCode: item.currency_code,
      available: parseFloat(item.available),
    }))
  ));

}
