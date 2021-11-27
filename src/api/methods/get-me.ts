
export interface GetMeRequestOptions {
  params: GetMeRequestParams;
}

export interface GetMeRequestParams {
}

export interface GetMeRequest {
}

export interface GetMeResponse {
  // @todo
}


/**
 * A simple method for testing your app's authentication
 * token. Requires no parameters. Returns basic information
 * about the app.
 */
export async function getMe(
  options: GetMeRequestOptions

): Promise<GetMeResponse> {

  const { params } = options;

  return {};

}
