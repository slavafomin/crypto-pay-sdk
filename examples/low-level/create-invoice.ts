
import got from 'got';

import {
  ApiResponse,
  appTokenHeaderName,
  CreateInvoiceRequest,
  CryptoCurrency,
  FailedApiResponse,
  getEndpointUrl,
  InvoiceResponse,
  Network,
  PaidBtnName,

} from '@crypto-pay/sdk';

import { appToken } from '../app-token';


(async () => {

  const apiRequest: CreateInvoiceRequest = {
    asset: CryptoCurrency.ETH,
    amount: '5.33',
    description: `A test invoice for my cool application`,
    paid_btn_url: `https://example.com`,
    payload: JSON.stringify({ an: { example: { payload: ["object"] } } }),
    paid_btn_name: PaidBtnName.ViewItem,
    allow_anonymous: true,
    allow_comments: false,
  };

  const endpointUrl = getEndpointUrl({
    method: 'createInvoice',
    network: Network.Testnet,
  });

  type ResponseType = ApiResponse<InvoiceResponse>;

  try {
    const { statusCode, body } = await got<ResponseType>(endpointUrl, {
      method: 'POST',
      json: apiRequest,
      responseType: 'json',
      throwHttpErrors: false,
      headers: {
        [appTokenHeaderName]: appToken,
      },
    });

    if (!body.ok) {
      const { error } = (body as FailedApiResponse);
      throw new Error(
        `Request failed: ${error.name} (status = ${error.code})`
      );
    }

    const payload = JSON.parse(body.result.payload);

    console.log(JSON.stringify({
      statusCode,
      body,
      payload,

    }, null, 4));

  } catch (error) {
    console.error(error);

  }

})();
