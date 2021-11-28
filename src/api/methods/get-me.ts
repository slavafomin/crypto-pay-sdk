
import { HttpClient, HttpRequestMethod } from '../../http-client/http-client';
import { HttpApiResponse, makeRequest } from '../common/make-request';
import { Network } from '../common/network';
import { transformResponse } from '../common/transform-response';
import { AppToken, BotUsername} from '../common/types';


export interface GetMeRequestOptions {
  appToken: AppToken;
  httpClient: HttpClient;
  network?: Network;
}

export interface GetMeResponse {
  app_id: number;
  name: string;
  payment_processing_bot_username: BotUsername;
}

export interface GetMeResult {
  appId: number;
  name: string;
  paymentProcessingBotUsername: BotUsername;
}


/**
 * A simple method for testing your app's authentication
 * token. Requires no parameters. Returns basic information
 * about the app.
 */
export async function getMe(
  options: GetMeRequestOptions

): Promise<HttpApiResponse<GetMeResult>> {

  const {
    appToken,
    httpClient,
    network,

  } = options;

  const response = (
    await makeRequest<void, GetMeResponse>({
      appToken,
      httpClient,
      methodName: 'getMe',
      httpMethod: HttpRequestMethod.Get,
      network,
    })
  );

  return transformResponse(response, result => ({
    appId: result.app_id,
    name: result.name,
    paymentProcessingBotUsername: (
      result.payment_processing_bot_username
    ),
  }));

}
