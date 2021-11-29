
import got from 'got';

import {
  ApiResponse,
  FailedApiResponse,
  getEndpointUrl,
  GetInvoicesResponse,
  GetPaymentsRequest,
  Network,

} from '@crypto-pay/sdk';

import { appToken } from '../app-token';


(async () => {

  const apiRequest: GetPaymentsRequest = {
    offset: 0,
    count: 10,
  };

  const endpointUrl = getEndpointUrl({
    appToken,
    method: 'getInvoices',
    network: Network.Testnet,
  });

  type ResponseType = ApiResponse<GetInvoicesResponse>;

  try {
    const { statusCode, body } = await got<ResponseType>(endpointUrl, {
      method: 'POST',
      json: apiRequest,
      responseType: 'json',
      throwHttpErrors: false,
    });

    if (!body.ok) {
      const { error } = (body as FailedApiResponse);
      throw new Error(
        `Request failed: ${error.name} (status = ${error.code})`
      );
    }

    console.log(JSON.stringify({
      statusCode,
      count: body.result.count,

    }, null, 4));

    // Iterating invoices
    for (const invoice of body.result.items) {
      const payload = (invoice.payload
        ? JSON.parse(invoice.payload)
        : undefined
      );
      console.log(
        `> ${invoice.invoice_id}`,
        JSON.stringify({ invoice, payload, }, null, 4)
      );
    }

  } catch (error) {
    console.error(error);

  }

})();
