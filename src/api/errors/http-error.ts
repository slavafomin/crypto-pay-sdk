
export class HttpError<PayloadType> extends Error {

  constructor(
    message: string,
    public readonly payload: any
  ) {
    super(message);
  }

}
