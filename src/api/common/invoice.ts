
import { PaidBtnName } from '../methods/create-invoice';
import { CryptoCurrency } from './currencies';
import { Money, parseMoney, StringMoney } from './money';
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
  allow_comments: boolean;
  allow_anonymous: boolean;
  payload: string;
  paid_btn_name: PaidBtnName;
  paid_btn_url: Url;
  is_confirmed: boolean;
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
  allowComments: boolean;
  allowAnonymous: boolean;
  payload: any;
  paidBtnName: PaidBtnName;
  paidBtnUrl: Url;
  isConfirmed: boolean;
}


export function parseInvoiceResponse(
  response: InvoiceResponse

): Invoice {

  return {
    invoiceId: response.invoice_id,
    status: response.status,
    hash: response.hash,
    asset: response.asset,
    amount: parseMoney(response.amount),
    payUrl: response.pay_url,
    description: response.description,
    createdAt: (response.created_at
      ? new Date(response.created_at)
      : undefined
    ),
    allowComments: response.allow_comments,
    allowAnonymous: response.allow_anonymous,
    payload: (response.payload
      ? JSON.parse(response.payload)
      : undefined
    ),
    paidBtnName: response.paid_btn_name,
    paidBtnUrl: response.paid_btn_url,
    isConfirmed: response.is_confirmed,
  };

}