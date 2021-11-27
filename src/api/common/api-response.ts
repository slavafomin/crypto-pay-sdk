
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

  // @todo

}
