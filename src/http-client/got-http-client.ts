
import got from 'got';

import { HttpClient, HttpRequest, HttpResponse } from './http-client';


export interface GotHttpClientOptions {
  got: typeof got;
}


/**
 * An HTTP client implementation adapter
 * using Got HTTP client.
 *
 * The user will need to provide a Got instance,
 * which could be pre-configured with custom options
 * (e.g. timeout, retries, etc).
 */
export class GotHttpClient implements HttpClient {

  constructor(private options: GotHttpClientOptions) {
  }


  public async sendRequest<ResponsePayloadType>(
    options: HttpRequest

  ): Promise<HttpResponse<ResponsePayloadType>> {

    const { got } = this.options;

    const {
      url,
      method,
      query,
      body,
      headers,

    } = options;

    // @todo: handle retries and timeouts
    // @todo: forbid redirects
    // @todo: server authentication

    const response = await got<ResponsePayloadType>(url, {
      method,
      headers,
      searchParams: query,
      json: body,
      responseType: 'json',
      throwHttpErrors: false,
    });

    return {
      status: response.statusCode,
      payload: response.body,
    };

  }

}
