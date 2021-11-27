
import { HttpResponse } from '../../http-client/http-client';
import { SuccessApiResponse } from './api-response';


/**
 * Transforms the result part of the API response using
 * the provided transformer function, but keeps the wrapping.
 */
export function transformResponse<ResponseType, ResultType>(
  response: HttpResponse<SuccessApiResponse<ResponseType>>,
  transformer: (response: ResponseType) => ResultType

): HttpResponse<SuccessApiResponse<ResultType>> {

  return {
    ...response,
    payload: {
      ...response.payload,
      result: transformer(response.payload.result),
    },
  };

}
