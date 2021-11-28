
import { ApiErrorCode, ApiErrorName } from './api-errors';


export type ApiResponse<ResultType> = (
  | SuccessApiResponse<ResultType>
  | FailedApiResponse
);

export interface SuccessApiResponse<ResultType> {

  ok: true;

  result: ResultType;

}

export interface FailedApiResponse {

  ok: false;

  error: FailedApiError;

}

export interface FailedApiError {
  code: (ApiErrorCode | number);
  name: (ApiErrorName | string);
}
