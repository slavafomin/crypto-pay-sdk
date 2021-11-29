
import got from 'got';
import { RequiredRetryOptions } from 'got/dist/source/core';

import { HttpClient, HttpRequest, HttpResponse } from './http-client';

export type RetryConfig = (
  Partial<RequiredRetryOptions> | number
);

export interface GotHttpClientOptions {

  got: typeof got;

  /**
   * Number of milliseconds after which HTTP request
   * will be considered timed out.
   *
   * Default is: 10 seconds
   */
  timeout?: number;

  /**
   * Got client retry configuration.
   *
   * See the following page for more details:
   * https://github.com/sindresorhus/got/blob/main/documentation/7-retry.md
   */
  retry?: RetryConfig;

}

const defaultTimeout = 10 * 1000; // 10 secs


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

    const {
      got,
      timeout = defaultTimeout,
      retry,

    } = this.options;

    const {
      url,
      method,
      query,
      body,
      headers,

    } = options;

    const response = await got<ResponsePayloadType>(url, {
      method,
      headers,
      searchParams: query,
      json: body,
      responseType: 'json',
      throwHttpErrors: false,
      timeout: {
        request: timeout,
      },
      retry: retry || {
        limit: 3,
      },
      followRedirect: false,
    });

    return {
      status: response.statusCode,
      payload: response.body,
    };

  }

}
