
import { Invoice } from './api/common/invoice';
import { defaultNetwork, Network } from './api/common/network';
import { AppToken } from './api/common/types';
import { confirmPayment, ConfirmPaymentParams } from './api/methods/confirm-payment';
import { createInvoice, CreateInvoiceParams } from './api/methods/create-invoice';
import { getBalance, GetBalanceResult } from './api/methods/get-balance';
import { getCurrencies, GetCurrenciesResult } from './api/methods/get-currencies';
import { getExchangeRates, GetExchangeRatesResult } from './api/methods/get-exchange-rates';
import { getInvoices, GetInvoicesParams, GetInvoicesResult } from './api/methods/get-invoices';
import { getMe, GetMeResult } from './api/methods/get-me';
import { getPayments, GetPaymentsParams, GetPaymentsResult } from './api/methods/get-payments';
import { HttpClient } from './http-client/http-client';


export interface ApiClientOptions {
  httpClient: HttpClient;
  appToken?: AppToken;
  network?: Network;
}

export const defaultOptions: Partial<ApiClientOptions> = {
  appToken: process.env.CRYPTO_BOT_TOKEN,
  network: defaultNetwork,
};


/**
 * This is a convenient wrapper class that integrates all
 * the API methods and provides central configuration.
 *
 * The usage of this class is recommended for the most users.
 */
export class ApiClient {

  private readonly options: ApiClientOptions;


  constructor(options: ApiClientOptions) {

    this.options = {
      ...defaultOptions,
      ...options,
    };

    if (!this.options.appToken) {
      throw new Error(
        `Missing CryptoBot API Token. You must specify it ` +
        `via options.appToken config property or using the ` +
        `CRYPTO_BOT_TOKEN environment variable`
      );
    }

  }


  public async getMe(): Promise<GetMeResult> {

    const {
      appToken,
      httpClient,
      network,

    } = this.options;

    const response = await getMe({
      appToken,
      httpClient,
      network,
    });

    return response.payload.result;

  }

  public async createInvoice(
    params: CreateInvoiceParams

  ): Promise<Invoice> {

    const {
      appToken,
      httpClient,
      network,

    } = this.options;

    const response = await createInvoice({
      appToken,
      params,
      httpClient,
      network,
    });

    return response.payload.result;

  }

  public async getInvoices(
    params: GetInvoicesParams

  ): Promise<GetInvoicesResult> {

    const {
      appToken,
      httpClient,
      network,

    } = this.options;

    const response = await getInvoices({
      appToken,
      params,
      httpClient,
      network,
    });

    return response.payload.result;

  }

  public async getPayments(
    params: GetPaymentsParams

  ): Promise<GetPaymentsResult> {

    const {
      appToken,
      httpClient,
      network,

    } = this.options;

    const response = await getPayments({
      appToken,
      params,
      httpClient,
      network,
    });

    return response.payload.result;

  }

  public async confirmPayment(
    params: ConfirmPaymentParams

  ): Promise<Invoice> {

    const {
      appToken,
      httpClient,
      network,

    } = this.options;

    const response = await confirmPayment({
      appToken,
      params,
      httpClient,
      network,
    });

    return response.payload.result;

  }

  public async getBalance(): Promise<GetBalanceResult> {

    const {
      appToken,
      httpClient,
      network,

    } = this.options;

    const response = await getBalance({
      appToken,
      httpClient,
      network,
    });

    return response.payload.result;

  }

  public async getExchangeRates(): Promise<GetExchangeRatesResult> {

    const {
      appToken,
      httpClient,
      network,

    } = this.options;

    const response = await getExchangeRates({
      appToken,
      httpClient,
      network,
    });

    return response.payload.result;

  }

  public async getCurrencies(): Promise<GetCurrenciesResult> {

    const {
      appToken,
      httpClient,
      network,

    } = this.options;

    const response = await getCurrencies({
      appToken,
      httpClient,
      network,
    });

    return response.payload.result;

  }

}
