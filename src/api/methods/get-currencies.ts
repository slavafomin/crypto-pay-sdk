
import { HttpClient, HttpRequestMethod } from '../../http-client/http-client';
import { CryptoCurrency, FiatCurrency } from '../common/currencies';
import { HttpApiResponse, makeRequest } from '../common/make-request';
import { Network } from '../common/network';
import { transformResponse } from '../common/transform-response';
import { AppToken, Url } from '../common/types';


export interface GetCurrenciesRequestOptions {
  appToken: AppToken;
  httpClient: HttpClient;
  network?: Network;
}

export type GetCurrenciesResponse = (
  GetCurrenciesResponseItem[]
);

export interface GetCurrenciesResponseItem {
  is_blockchain: boolean;
  is_stablecoin: boolean;
  is_fiat: boolean;
  name: string;
  code: (CryptoCurrency | FiatCurrency);
  url: Url;
  decimals: number;
}

export type GetCurrenciesResult = (
  GetCurrenciesResultItem[]
);

export interface GetCurrenciesResultItem {
  isBlockchain: boolean;
  isStablecoin: boolean;
  isFiat: boolean;
  name: string;
  code: (CryptoCurrency | FiatCurrency);
  url: Url;
  decimals: number;
}


/**
 * Use this method to get supported currencies.
 * Returns array of currencies.
 */
export async function getCurrencies(
  options: GetCurrenciesRequestOptions

): Promise<HttpApiResponse<GetCurrenciesResult>> {

  const {
    appToken,
    httpClient,
    network,

  } = options;

  const response = (
    await makeRequest<void, GetCurrenciesResponse>({
      appToken,
      httpClient,
      methodName: 'getCurrencies',
      httpMethod: HttpRequestMethod.Get,
      network,
    })
  );

  return transformResponse(response, result =>
    result.map<GetCurrenciesResultItem>(item => ({
      isBlockchain: item.is_blockchain,
      isStablecoin: item.is_stablecoin,
      isFiat: item.is_fiat,
      name: item.name,
      code: item.code,
      url: item.url,
      decimals: item.decimals,
    }))
  );

}
