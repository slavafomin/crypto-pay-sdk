
import { HttpRequest, HttpRequestMethod, HttpResponse } from '../../http-client/http-client';
import { MockHttpClient } from '../../http-client/mock-http-client';
import { HttpApiResponse } from '../common/make-request';
import { Network } from '../common/network';
import { getPayments, GetPaymentsResponse } from './get-payments';


// noinspection SpellCheckingInspection
const testToken = '1234:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';


describe('getPayments()', () => {

  it(`should use GET HTTP method`, async () => {

    const { request } = await makeCall();

    expect(request.method).toEqual(HttpRequestMethod.Get);

  });

  describe(`should use correct URL`, () => {

    const networks: [Network, string][] = [
      [Network.Mainnet, `https://pay.crypt.bot/app${testToken}/getPayments`],
      [Network.Testnet, `https://testnet-pay.crypt.bot/app${testToken}/getPayments`],
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
    response?: HttpResponse,

  }): Promise<{
    request: HttpRequest;

  }> {

    const {
      response = <HttpApiResponse<GetPaymentsResponse>> {
        status: 200,
        payload: {
          ok: true,
          result: {
            count: 0,
            items: [],
          },
        },
      },
      network,

    } = (options || {});

    const httpClient = new MockHttpClient(response);

    await getPayments({
      appToken: testToken,
      httpClient: httpClient,
      network,
    });

    const request = httpClient.getLastRequest();

    return { request };

  }

});
