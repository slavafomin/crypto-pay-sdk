
import { HttpRequest, HttpRequestMethod, HttpResponse } from '../../http-client/http-client';
import { MockHttpClient } from '../../http-client/mock-http-client';
import { CryptoCurrency } from '../common/currencies';
import { Network } from '../common/types';
import { createInvoice, CreateInvoiceParams, PaidBtnName } from './create-invoice';


// noinspection SpellCheckingInspection
const testToken = '1234:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';


describe('createInvoice()', () => {

  it(`should use POST HTTP method`, async () => {

    const { request } = await makeCall();

    expect(request.method).toEqual(HttpRequestMethod.Post);

  });

  describe(`should use correct URL`, () => {

    const networks: [Network, string][] = [
      [Network.Mainnet, `https://pay.crypt.bot/app${testToken}/createInvoice`],
      [Network.Testnet, `https://testnet-pay.crypt.bot/app${testToken}/createInvoice`],
    ];

    for (const [network, expectedUrl] of networks) {

      it(`for ${network} network`, async () => {
        const { request } = await makeCall({ network });
        expect(request.url).toEqual(expectedUrl);
      });

    }

  });

  it(`should only allow to use supported assets`, async () => {

    await expect(makeCall({
      params: {
        asset: 'FOOBAR' as CryptoCurrency,
        amount: 100,
      }

    })).rejects.toThrow(/"asset" must be one of/);

  });

  it(`should not allow to use ETH asset in mainnet`, async () => {

    await expect(makeCall({
      network: Network.Mainnet,
      params: {
        asset: CryptoCurrency.ETH,
        amount: 100,
      }

    })).rejects.toThrow(/"asset" must be one of/);

  });

  it(`should allow to use ETH asset in testnet`, async () => {

    await makeCall({
      network: Network.Testnet,
      params: {
        asset: CryptoCurrency.ETH,
        amount: 100,
      }
    });

  });

  it(`should not allow zero amount`, async () => {

    await expect(makeCall({
      params: {
        asset: CryptoCurrency.TON,
        amount: 0,
      }

    })).rejects.toThrow(/"amount" must be greater than 0/);

  });

  it(`should not allow negative amount`, async () => {

    await expect(makeCall({
      params: {
        asset: CryptoCurrency.TON,
        amount: -100,
      }

    })).rejects.toThrow(/"amount" must be greater than 0/);

  });

  it(`should not allow description longer than 1024 chars`, async () => {

    await expect(makeCall({
      params: {
        asset: CryptoCurrency.TON,
        amount: 100,
        description: 'A'.repeat(1025),
      }

    })).rejects.toThrow(
      /"description" length must be less than.*?1024 characters/
    );

  });

  it(`paidBtnName should only allow supported values`, async () => {

    await expect(makeCall({
      params: {
        asset: CryptoCurrency.TON,
        amount: 100,
        paidBtnName: 'FOOBAR' as PaidBtnName,
      }

    })).rejects.toThrow(
      /"paidBtnName" must be one of/
    );

  });

  describe('paidBtnUrl should be set', () => {

    const cases: PaidBtnName[] = [
      PaidBtnName.ViewItem,
      PaidBtnName.OpenChannel,
      PaidBtnName.OpenBot,
    ];

    for (const paidBtnName of cases) {
      it(`when paidBtnName is equal to "${paidBtnName}"`, async () => {
        await expect(makeCall({
          params: {
            asset: CryptoCurrency.TON,
            amount: 100,
            paidBtnName,
          }
        })).rejects.toThrow(/"paidBtnUrl" is required/);
      });
    }

  });

  it(
    `paidBtnUrl must not be set when paidBtnName ` +
    `is equal to "${PaidBtnName.Callback}"`,
    async () => {
      await expect(makeCall({
        params: {
          asset: CryptoCurrency.TON,
          amount: 100,
          paidBtnName: PaidBtnName.Callback,
          paidBtnUrl: 'https://example.com',
        }
      })).rejects.toThrow(/"paidBtnUrl" is not allowed/);
    })
  ;

  it(`paidBtnUrl must start with http or https`, async () => {
    await expect(makeCall({
      params: {
        asset: CryptoCurrency.TON,
        amount: 100,
        paidBtnName: PaidBtnName.OpenBot,
        paidBtnUrl: 'tg://foobar',
      }
    })).rejects.toThrow(
      /"paidBtnUrl".*?scheme matching the http|https pattern/
    );
  });

  it(`payload byte size must not exceed 1 KB`, async () => {
    await expect(makeCall({
      params: {
        asset: CryptoCurrency.TON,
        amount: 100,
        payload: 'Ы'.repeat(512) + 'A',
      }
    })).rejects.toThrow(
      /"payload" byte size exceeds the limit of 1024 Bytes/
    );
  });


  async function makeCall(options?: {
    network?: Network;
    params?: CreateInvoiceParams;
    response?: HttpResponse,

  }): Promise<{
    request: HttpRequest;

  }> {

    const {
      response = {
        status: 200,
        payload: {},
      },
      network,
      params = {
        asset: CryptoCurrency.TON,
        amount: 100.25,
      },

    } = (options || {});

    const httpClient = new MockHttpClient(response);

    await createInvoice({
      appToken: testToken,
      params,
      httpClient: httpClient,
      network,
    });

    const request = httpClient.getLastRequest();

    return { request };

  }

});
