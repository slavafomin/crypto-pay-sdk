
import { CryptoCurrency } from './currencies';
import { Network } from './network';


export const supportedAssets: Record<Network, CryptoCurrency[]> = {
  [Network.Mainnet]: [
    CryptoCurrency.BTC,
    CryptoCurrency.TON,
    CryptoCurrency.USDT,
    CryptoCurrency.USDC,
    CryptoCurrency.BUSD,
  ],
  [Network.Testnet]: [
    CryptoCurrency.BTC,
    CryptoCurrency.TON,
    CryptoCurrency.ETH,
    CryptoCurrency.USDT,
    CryptoCurrency.USDC,
    CryptoCurrency.BUSD,
  ],
};
