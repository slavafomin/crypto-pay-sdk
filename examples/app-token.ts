
export const appToken = process.env.CRYPTO_BOT_TOKEN;

if (!appToken) {
  throw new Error(
    `Please define "CRYPTO_BOT_TOKEN" environment variable ` +
    `to run examples`
  );
}
