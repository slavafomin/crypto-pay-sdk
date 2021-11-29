
import { HttpRequest, HttpRequestMethod } from '../../http-client/http-client';
import { MockHttpClient } from '../../http-client/mock-http-client';
import { Invoice, InvoiceResponse } from '../common/invoice';
import { HttpApiResponse } from '../common/make-request';
import { Network } from '../common/network';
import { confirmPayment, ConfirmPaymentParams } from './confirm-payment';


// noinspection SpellCheckingInspection
const testToken = '1234:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';


describe('confirmPayment()', () => {

  it(`should use POST HTTP method`, async () => {

    const { request } = await makeCall();

    expect(request.method).toEqual(HttpRequestMethod.Post);

  });

  describe(`should use correct URL`, () => {

    const networks: [Network, string][] = [
      [Network.Mainnet, `https://pay.crypt.bot/app${testToken}/confirmPayment`],
      [Network.Testnet, `https://testnet-pay.crypt.bot/app${testToken}/confirmPayment`],
    ];

    for (const [network, expectedUrl] of networks) {

      it(`for ${network} network`, async () => {
        const { request } = await makeCall({ network });
        expect(request.url).toEqual(expectedUrl);
      });

    }

  });


  async function makeCall(options?: {
    network?: Network;
    params?: ConfirmPaymentParams;
    response?: HttpApiResponse<InvoiceResponse>,

  }): Promise<{
    request: HttpRequest;
    result: HttpApiResponse<Invoice>;

  }> {

    const {
      response = <HttpApiResponse<InvoiceResponse>> {
        status: 200,
        payload: {
          ok: true,
          result: {
          },
        },
      },
      network,
      params = {
        invoiceId: 1050,
      },

    } = (options || {});

    const httpClient = new MockHttpClient(response);

    const result = await confirmPayment({
      appToken: testToken,
      params,
      httpClient: httpClient,
      network,
    });

    const request = httpClient.getLastRequest();

    return { request, result };

  }

});
