
export type Money = number;

export type StringMoney = string;


// @todo: implement a better [de]serialization


export function parseMoney(value: StringMoney): (Money | undefined) {

  if (value === undefined || value.trim() === '') {
    return undefined;
  }

  return parseFloat(value);

}

export function serializeMoney(value: number): string {

  // 20 decimal points should be enough
  // for all supported cryptocurrencies
  return value.toFixed(20);

}
