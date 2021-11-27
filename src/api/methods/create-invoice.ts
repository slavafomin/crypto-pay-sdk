
import Joi from 'joi';

import { omitEmptyProps } from '../../common/utils';
import { HttpClient, HttpRequestMethod } from '../../http-client/http-client';
import { allowedAssets, Amount, AppToken, Asset, Network, Url } from '../common';
import { getEndpointUrl } from '../endpoint';


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
  asset: Asset;

  /**
   * Amount of the invoice.
   */
  amount: Amount;

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
   */
  payload?: string;

}

export interface CreateInvoiceRequest {

  /**
   * Currency code.
   */
  asset: Asset;

  /**
   * Amount of the invoice in float. For example: 125.50
   */
  amount: string;

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

export interface CreateInvoiceResponse {
  // @todo
}

export interface CreateInvoiceResult {
  // @todo
}


export const allowedPaidBtnNames: PaidBtnName[] = [
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

): Promise<CreateInvoiceResult> {

  const {
    appToken,
    httpClient,
    network = Network.Mainnet,

  } = options;

  const paramsSchema = Joi.object({
    asset: Joi.string()
      .required()
      .valid(...allowedAssets[network]),

    amount: Joi.number()
      .required()
      .greater(0),

    description: Joi.string()
      .optional()
      .max(1024),

    paidBtnName: Joi.string()
      .optional()
      .default(PaidBtnName.Callback)
      .valid(
        ...allowedPaidBtnNames
      ),

    paidBtnUrl: Joi
      .when('paidBtnName', {
        is: Joi.required().valid(
          // @todo
          PaidBtnName.ViewItem,
          PaidBtnName.OpenChannel,
          PaidBtnName.OpenBot,
        ),
        then: Joi.string()
          .required()
          .uri({
            scheme: ['http', 'https'],
          }),
        otherwise: Joi.forbidden(),
      }),

    payload: Joi.string()
      .optional()
      .max(maxPayloadByteSize, 'utf8')
  });

  let validationResult;

  // This can throw validation errors
  try {
    validationResult = await paramsSchema
      .validateAsync(options.params, {
        warnings: true,
      })
    ;

  } catch (error) {

    if (
      error.details[0].path.join('.') === 'payload' &&
      error.details[0].type === 'string.max'
    ) {
      throw new Error(
        `"payload" byte size exceeds the limit of ${maxPayloadByteSize} Bytes`
      );

    } else {
      throw error;

    }

  }

  const { value: params, warning, debug } = validationResult;

  console.log({ params, warning, debug });

  // Request serialization
  const request = omitEmptyProps<CreateInvoiceRequest>({
    asset: params.asset,
    amount: params.amount.toString(),
    description: params.description,
    paid_btn_name: params.paidBtnName,
    paid_btn_url: params.paidBtnUrl,
    payload: params.payload,
  });

  // @todo: remove empty properties

  const response = await httpClient
    .sendRequest<CreateInvoiceResponse>({
      url: getEndpointUrl({
        appToken: appToken,
        method: 'createInvoice',
      }),
      payload: request,
      method: HttpRequestMethod.Post,
    })
  ;

  // @todo: parse and process the response
  // @todo: handle errors

  return <CreateInvoiceResult> {};

}
