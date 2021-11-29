
import Joi from 'joi';
import { TextEncoder } from 'util';

import { omitEmptyProps } from '../common/utils';
import { HttpClient, HttpRequestMethod } from '../../http-client/http-client';
import { supportedAssets } from '../common/assets';
import { CryptoCurrency } from '../common/currencies';
import { Invoice, InvoiceResponse, parseInvoiceResponse } from '../common/invoice';
import { HttpApiResponse, makeRequest } from '../common/make-request';
import { Money, serializeMoney, StringMoney } from '../common/money';
import { defaultNetwork, Network } from '../common/network';
import { transformResponse } from '../common/transform-response';
import { AppToken, Url } from '../common/types';


export interface CreateInvoiceOptions {
  appToken: AppToken;
  params: CreateInvoiceParams;
  httpClient: HttpClient;
  network?: Network;
}

export interface CreateInvoiceParams {

  /**
   * Currency code.
   */
  asset: CryptoCurrency;

  /**
   * Amount of the invoice.
   */
  amount: Money;

  /**
   * Description of the invoice. Up to 1024 symbols.
   */
  description?: string;

  /**
   * Paid button name. This button will be shown when
   * your invoice was paid.
   */
  paidBtnName?: PaidBtnName;

  /**
   * Optional but required when you use `paidBtnName`.
   * Paid button URL. You can set any payment success
   * link (for example link to your bot).
   * Start with https or http.
   */
  paidBtnUrl?: Url;

  /**
   * Optional. Some data. User ID, payment id, or any data
   * you want to attach to the invoice (up to 1 KB).
   *
   * You can specify any value here, it will be
   * automatically serialized to/from JSON string.
   */
  payload?: any;

  /**
   * Optional. Allow adding comments when paying an invoice.
   * Default is true.
   */
  allowComments?: boolean;

  /**
   * Optional. Allow pay invoice as anonymous.
   * Default is true.
   */
  allowAnonymous?: boolean;

}

export interface CreateInvoiceRequest {

  /**
   * Currency code.
   */
  asset: CryptoCurrency;

  /**
   * Amount of the invoice in float. For example: 125.50
   */
  amount: StringMoney;

  /**
   * Optional. Description of the invoice. Up to 1024 symbols.
   */
  description?: string;

  /**
   * Optional. Paid button name.
   * This button will be shown when your invoice was paid.
   * Default - "callback"
   */
  paid_btn_name?: PaidBtnName;

  /**
   * Optional but required when you use paid_btn_name.
   * Paid button URL. You can set any payment success
   * link (for example link on your bot). Start with https
   * or http.
   */
  paid_btn_url?: Url;

  /**
   * Optional. Some data. User ID, payment id, or any data
   * you want to attach to the invoice (up to 1 KB).
   */
  payload?: string;

  /**
   * Optional. Allow adding comments when paying an invoice.
   * Default is true.
   */
  allow_comments?: boolean;

  /**
   * Optional. Allow pay invoice as anonymous.
   * Default is true.
   */
  allow_anonymous?: boolean;

}

export enum PaidBtnName {

  /**
   * View item.
   */
  ViewItem = 'viewItem',

  /**
   * Open channel.
   */
  OpenChannel = 'openChannel',

  /**
   * Open bot.
   */
  OpenBot = 'openBot',

  /**
   * Return.
   */
  Callback = 'callback',

}

export const paidBtnNames: PaidBtnName[] = [
  PaidBtnName.ViewItem,
  PaidBtnName.OpenChannel,
  PaidBtnName.OpenBot,
  PaidBtnName.Callback,
];

const maxPayloadByteSize = 1024;


/**
 * Use this method to create a new invoice.
 * Returns object of created invoice.
 */
export async function createInvoice(
  options: CreateInvoiceOptions

): Promise<HttpApiResponse<Invoice>> {

  const {
    appToken,
    httpClient,
    network = defaultNetwork,

  } = options;

  const paramsSchema = Joi.object({
    asset: Joi.string()
      .required()
      .valid(...supportedAssets[network]),

    amount: Joi.number()
      .required()
      .greater(0),

    description: Joi.string()
      .optional()
      .max(1024),

    paidBtnName: Joi.string()
      .optional()
      .valid(
        ...paidBtnNames
      ),

    paidBtnUrl: Joi
      .when('paidBtnName', {
        is: Joi.string()
          .required(),
        then: Joi.string()
          .required()
          .uri({
            scheme: ['http', 'https'],
          }),
        otherwise: Joi.forbidden(),
      }),

    payload: Joi.any(),

    allowComments: Joi.boolean()
      .optional()
      .default(true),

    allowAnonymous: Joi.boolean()
      .optional()
      .default(true),

  });

  const validationResult = await paramsSchema
    .validateAsync(options.params, {
      warnings: true,
    })
  ;

  const params: CreateInvoiceParams = (
    validationResult.value
  );

  // Request serialization
  const body = omitEmptyProps<CreateInvoiceRequest>({
    asset: params.asset,
    amount: serializeMoney(params.amount),
    description: params.description,
    paid_btn_name: params.paidBtnName,
    paid_btn_url: params.paidBtnUrl,
    payload: handlePayload(options.params.payload),
    allow_comments: params.allowComments,
    allow_anonymous: params.allowAnonymous,
  });

  const response = await makeRequest<
    CreateInvoiceRequest,
    InvoiceResponse
  >({
    appToken,
    httpClient,
    methodName: 'createInvoice',
    body,
    httpMethod: HttpRequestMethod.Post,
    network,
  });

  // Deserializing server response
  return transformResponse(response, (
    result => parseInvoiceResponse(result)
  ));

}


/**
 * Serializes specified payload as a JSON string
 * and makes sure that it's size doesn't exceed
 * the limits enforced by the API.
 */
function handlePayload(payload: any): (string | undefined) {

  if (!payload) {
    return undefined;
  }

  const serializedPayload = JSON.stringify(payload);

  const payloadByteSize = (
    new TextEncoder().encode(serializedPayload)
  ).length;

  if (payloadByteSize > maxPayloadByteSize) {
    throw new Error(
      `"payload" byte size (${payloadByteSize} Bytes) ` +
      `exceeds the limit of ${maxPayloadByteSize} Bytes`
    );
  }

  return serializedPayload;

}
