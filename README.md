
# @crypto-pay/sdk

Node.js SDK for Telegram [CryptoBot][crypto-bot]
([CryptoPay API][crypto-pay-api]).

---

## Contest-related information

_(this section will be deleted after the contest)_

See the [Crypto Pay API Review](https://telegra.ph/Crypto-Pay-API-Review-11-28)
for notices regarding the API implementation.

---

## Features

- @todo: timeouts, redirects, retries
- @todo: tests, coverage
- typescript
- JOI
- three API levels
- camel case
- serialization (e.g. payload, dates, money)

…


## Install

…


## Usage

### Three API levels

### Top level API

### Middle level API

### Low level API

- @todo: token via env variable

…


## Examples

You can find a whole set of various usage examples in the
[examples](./examples) directory of the library. There are
three categories of examples:

- [api-client](./examples/api-client)<br>
  Top-level API layer that is the most user-friendly
  and easy to use. Only domain data is returned
  from the server.


- [methods](./examples/methods)<br>
  Middle-level API layer, all the API methods could be
  executed directly, whole HTTP responses are returned.


- [low-level](./examples/low-level)<br>
  The most advanced and low-level API possible, you could
  build entire requests manually with the help of the
  building blocks provided by the library
  (i.e. types, helper functions, etc).


### Running examples

In order to run any example on your machine, do the following:

1. Clone the repository:
   ```shell
   git clone https://github.com/slavafomin/crypto-bot-sdk.git
   cd ./crypto-bot-sdk
   ```

2. Install all the dependencies:
   ```shell
   npm install
   ```

3. Run the following command:
   ```shell
   CRYPTO_BOT_TOKEN={TOKEN} \
   npx ts-node \
     -P ./tsconfig.examples.json \
     -r tsconfig-paths/register \
     {PATH TO EXAMPLE}
   ```

   **Example:**

   ```shell
   CRYPTO_BOT_TOKEN=1234:AAAaaaAAAAAAaaaAAAAAAaaaAAAAAAaaaAA \
   npx ts-node \
     -P ./tsconfig.examples.json \
     -r tsconfig-paths/register \
     ./examples/api-client/create-invoice.ts
   ```

   Output of the executed requests will be logged
   to the terminal.


## Security Considerations

@todo: describe token in URL issue


## API

…


## Contributing

…


## License (MIT)

Copyright © 2021 Slava Fomin II

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


  [crypto-bot]: https://t.me/CryptoBot
  [crypto-pay-api]:https://telegra.ph/Crypto-Pay-API-11-25
