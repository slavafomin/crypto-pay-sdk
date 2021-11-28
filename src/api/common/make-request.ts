
import { HttpClient, HttpRequestMethod, HttpResponse } from '../../http-client/http-client';
import { getEndpointUrl } from '../endpoint';
import { ApiError } from '../errors/api-error';
import { ApiResponse, FailedApiResponse, SuccessApiResponse } from './api-response';
import { AppToken, Network } from './types';


export type HttpApiResponse<Type> = HttpResponse<
  SuccessApiResponse<Type>
>;

// @todo: make sure `makeRequest` is used everywhere

export async function makeRequest<RequestType, ResponseType>(options: {
  appToken: AppToken;
  httpClient: HttpClient;
  methodName: string;
  requestData?: RequestType;
  httpMethod?: HttpRequestMethod;
  network?: Network;

}): Promise<HttpApiResponse<ResponseType>> {

  const {
    appToken,
    httpClient,
    methodName,
    requestData,
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
      payload: requestData,
    })
  ;

  const { status, payload } = response;

  if (isSuccessResponse(response)) {
    return response;

  } else {
    throw new ApiError(
      (payload as FailedApiResponse).error
    );

  }

}


function isSuccessResponse<ResponseType>(
  response: HttpResponse<ApiResponse<ResponseType>>

): response is HttpResponse<SuccessApiResponse<ResponseType>> {

  return (
    response.status < 400 &&
    Boolean(response.payload.ok)
  );

}
