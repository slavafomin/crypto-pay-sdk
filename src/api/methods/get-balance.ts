
import { HttpClient } from '../../http-client/http-client';
import { AppToken } from '../common';


export interface GetBalanceRequestOptions {
  appToken: AppToken;
  params: GetBalanceParams;
  httpClient: HttpClient;
}

export interface GetBalanceParams {
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
