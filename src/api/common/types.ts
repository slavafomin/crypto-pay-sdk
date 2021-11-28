

export type Url = string;

export type AppToken = string;

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export type InvoiceId = number;

export enum BotUsername {
  CryptoTestnetBot = 'CryptoTestnetBot',
  CryptoBot = 'CryptoBot',
}

export const botUsername: Record<Network, BotUsername> = {
  [Network.Mainnet]: BotUsername.CryptoBot,
  [Network.Testnet]: BotUsername.CryptoTestnetBot,
};

/**
 * Represents date in ISO:8601 format.
 */
export type DateString = string;
