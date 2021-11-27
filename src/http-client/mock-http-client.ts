
import { HttpClient, HttpRequest, HttpResponse } from './http-client';


export class MockHttpClient implements HttpClient {

  private request: HttpRequest;

  constructor(
    private readonly response: HttpResponse
  ) {
  }


  public async sendRequest(
    request: HttpRequest

  ): Promise<HttpResponse> {

    this.request = request;

    return this.response;

  }

  public getLastRequest(): HttpRequest {
    return this.request;
  }

}
