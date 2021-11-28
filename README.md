
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

…


## Install

…


## Usage

…


## API

…


## Contributing

…


## Notices

- `payload` is less than `description` (in byte terms)

- it is said that `paid_btn_name` has a `callback`
  value by default, when in real life it has no value.
  The result is different when `paid_btn_name` is omitted
  from the request or when it explicitly set to `callback`.
  In latter case the `PAID_BTN_URL_REQUIRED` error is raised
  because it expects the `paid_btn_url` value.

…


## License (MIT)

Copyright (c) 2021 Slava Fomin II

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
