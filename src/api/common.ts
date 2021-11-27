
export type Amount = number;

export type Url = string;

export type AppToken = string;

export enum Asset {
  BTC = 'BTC',
  TON = 'TON',
  ETH = 'ETH',
  USDT = 'USDT',
  USDC = 'USDC',
  BUSD = 'BUSD',
}

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export const allowedAssets: Record<Network, Asset[]> = {
  [Network.Mainnet]: [
    Asset.BTC,
    Asset.TON,
    Asset.USDT,
    Asset.USDC,
    Asset.BUSD,
  ],
  [Network.Testnet]: [
    Asset.BTC,
    Asset.TON,
    Asset.ETH,
    Asset.USDT,
    Asset.USDC,
    Asset.BUSD,
  ],
};

export type InvoiceId = number;
