
import { HttpClient, HttpRequestMethod, HttpResponse } from '../../http-client/http-client';
import { getEndpointUrl } from '../endpoint';
import { ApiResponse, SuccessApiResponse } from './api-response';
import { HttpError } from './http-error';
import { AppToken, Network } from './types';


export type HttpApiResponse<Type> = HttpResponse<
  SuccessApiResponse<Type>
>;


export async function makeRequest<ResponseType>(options: {
  appToken: AppToken;
  httpClient: HttpClient;
  methodName: string;
  httpMethod?: HttpRequestMethod;
  network?: Network;

}): Promise<HttpApiResponse<ResponseType>> {

  const {
    appToken,
    httpClient,
    methodName,
    httpMethod = HttpRequestMethod.Get,
    network = Network.Mainnet,

  } = options;

  const response = await httpClient
    .sendRequest<
      ApiResponse<ResponseType>
    >({
      url: getEndpointUrl({
        appToken: appToken,
        method: methodName,
        network,
      }),
      method: httpMethod,
    })
  ;

  const { status, payload } = response;

  if (status >= 400) {
    throw new HttpError(
      `HTTP request failed with status: ${status}`,
      payload
    );
  }

  if (isSuccessResponse(response)) {
    return response;

  } else {
    throw new HttpError(
      `API request failed (not OK)`,
      payload
    );

  }

}


function isSuccessResponse<ResponseType>(
  response: HttpResponse<ApiResponse<ResponseType>>

): response is HttpResponse<SuccessApiResponse<ResponseType>> {

  return Boolean(response.payload.ok);

}
