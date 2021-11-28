
import { FailedApiError } from '../common/api-response';


export class ApiError extends Error {

  public readonly apiError: FailedApiError;


  constructor(apiError?: FailedApiError) {

    const { code, name } = (apiError || {});

    const messageParts = [
      `API request failed`,
      (name ? `: ${name}` : ''),
      (code ? ` (${code})` : ''),
    ];

    super(messageParts.join(''));

    this.apiError = apiError;

  }

}
