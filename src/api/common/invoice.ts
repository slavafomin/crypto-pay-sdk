
import Joi from 'joi';

import { PaidBtnName } from '../methods/create-invoice';
import { CryptoCurrency } from './currencies';
import { Money, parseMoneyString, StringMoney } from './money';
import { DateString, Url } from './types';


export type InvoiceId = number;

export enum InvoiceStatus {
  Active = 'active',
  Paid = 'paid',
}

export const invoiceStatuses: InvoiceStatus[] = [
  InvoiceStatus.Active,
  InvoiceStatus.Paid,
];

export interface InvoiceResponse {
  invoice_id: InvoiceId;
  status: InvoiceStatus;
  hash: string;
  asset: CryptoCurrency;
  amount: StringMoney;
  pay_url: Url,
  description: string;
  created_at: DateString;
  paid_at?: DateString;
  allow_comments: boolean;
  allow_anonymous: boolean;
  paid_anonymously?: boolean;
  comment?: string;
  payload?: string;
  paid_btn_name: PaidBtnName;
  paid_btn_url: Url;
  is_confirmed: boolean;
  confirmed_at?: DateString;
}

export interface Invoice {
  invoiceId: number;
  status: InvoiceStatus;
  hash: string;
  asset: CryptoCurrency;
  amount: Money;
  payUrl: Url,
  description: string;
  createdAt: Date;
  paidAt: Date;
  allowComments: boolean;
  allowAnonymous: boolean;
  paidAnonymously: boolean;
  comment: string;
  payload: any;
  paidBtnName: PaidBtnName;
  paidBtnUrl: Url;
  isConfirmed: boolean;
  confirmedAt?: Date;
}

export const invoiceIdValidator = (
  Joi.number()
    .greater(0)
);

export function parseInvoiceResponse(
  response: InvoiceResponse

): Invoice {

  return {
    invoiceId: response.invoice_id,
    status: response.status,
    hash: response.hash,
    asset: response.asset,
    amount: parseMoneyString(response.amount),
    payUrl: response.pay_url,
    description: response.description,
    createdAt: (response.created_at
      ? new Date(response.created_at)
      : undefined
    ),
    paidAt: (response.paid_at
      ? new Date(response.paid_at)
      : undefined
    ),
    allowComments: response.allow_comments,
    allowAnonymous: response.allow_anonymous,
    paidAnonymously: response.paid_anonymously,
    comment: response.comment,
    payload: (response.payload
      ? JSON.parse(response.payload)
      : undefined
    ),
    paidBtnName: response.paid_btn_name,
    paidBtnUrl: response.paid_btn_url,
    isConfirmed: response.is_confirmed,
    confirmedAt: (response.confirmed_at
      ? new Date(response.confirmed_at)
      : undefined
    ),
  };

}
