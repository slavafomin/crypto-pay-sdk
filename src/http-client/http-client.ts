
export interface HttpRequest<BodyType = any> {
  url: string;
  method?: HttpRequestMethod;
  query?: Record<string, any>;
  body?: BodyType;
  headers?: Record<string, string | string[]>;
}

export interface HttpResponse<PayloadType = any> {
  status: number;
  payload: PayloadType;
}

export enum HttpRequestMethod {
  Get = 'GET',
  Post = 'POST',
}

export interface HttpClient {

  sendRequest<ResponsePayloadType>(request: HttpRequest): (
    Promise<HttpResponse<ResponsePayloadType>>
  );

}
