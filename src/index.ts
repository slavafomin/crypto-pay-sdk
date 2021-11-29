
//============//
// API CLIENT //
//============//

export {
  ApiClientOptions,
  defaultOptions,
  ApiClient,

} from './api-client';


//=============//
// HTTP CLIENT //
//=============//

/**
 * Generic HTTP client interface.
 */
export {
  HttpClient,
  HttpRequestMethod,
  HttpRequest,
  HttpResponse,

} from './http-client/http-client';


/**
 * Got HTTP client implementation.
 */
export {
  GotHttpClientOptions,
  GotHttpClient,

} from './http-client/got-http-client';

export {
  endpointHostnames,
  endpointUrlTemplate,
  getEndpointUrl,

} from './api/endpoint';


//==============//
// COMMON TYPES //
//==============//

export {
  ApiErrorName,
  ApiErrorCode,

} from './api/common/api-errors';

export {
  FailedApiResponse,
  SuccessApiResponse,
  FailedApiError,
  ApiResponse,

} from './api/common/api-response';

export { supportedAssets } from './api/common/assets';

export {
  FiatCurrency,
  CryptoCurrency,

} from './api/common/currencies';

export {
  InvoiceId,
  InvoiceStatus,
  invoiceStatuses,
  InvoiceResponse,
  Invoice,
  invoiceIdValidator,
  parseInvoiceResponse,

} from './api/common/invoice';

export {
  makeRequest,
  HttpApiResponse,

} from './api/common/make-request';

export {
  Money,
  parseMoney,
  StringMoney,

} from './api/common/money';

export {
  Network,
  defaultNetwork,

} from './api/common/network';

export {
  PaginationParams,
  paginationSerializers,
  paginationValidators,

} from './api/common/pagination';

export {
  Url,
  AppToken,
  BotUsername,
  botUsername,
  DateString,

} from './api/common/types';


//========//
// ERRORS //
//========//

export {
  ApiError,

} from './api/errors/api-error';

export {
  HttpError,

} from './api/errors/http-error';


//=========//
// METHODS //
//=========//

export {
  ConfirmPaymentRequest,
  ConfirmPaymentParams,
  ConfirmPaymentRequestOptions,
  confirmPayment,

} from './api/methods/confirm-payment';

export {
  PaidBtnName,
  CreateInvoiceParams,
  allowedPaidBtnNames,
  CreateInvoiceOptions,
  CreateInvoiceRequest,
  createInvoice,

} from './api/methods/create-invoice';

export {
  GetBalanceRequestOptions,
  GetBalanceResponse,
  GetBalanceResult,
  GetBalanceResponseItem,
  GetBalanceResultItem,
  getBalance,

} from './api/methods/get-balance';

export {
  GetCurrenciesRequestOptions,
  GetCurrenciesResponse,
  GetCurrenciesResult,
  GetCurrenciesResponseItem,
  GetCurrenciesResultItem,
  getCurrencies,

} from './api/methods/get-currencies';

export {
  getExchangeRates,
  GetExchangeRatesResult,
  GetExchangeRatesRequestOptions,
  GetExchangeRatesResponse,
  GetExchangeRatesResponseItem,
  GetExchangeRatesResultItem,

} from './api/methods/get-exchange-rates';

export {
  GetInvoicesResponse,
  GetInvoicesParams,
  GetInvoicesResult,
  GetInvoicesRequest,
  GetInvoicesRequestOptions,
  getInvoices,

} from './api/methods/get-invoices';

export {
  getMe,
  GetMeResult,
  GetMeRequestOptions,
  GetMeResponse,

} from './api/methods/get-me';

export {
  GetPaymentsResponse,
  GetPaymentsParams,
  GetPaymentsResult,
  GetPaymentsRequest,
  GetPaymentsRequestOptions,
  getPayments,

} from './api/methods/get-payments';
