
export type Money = number;

export type StringMoney = string;


export function parseMoney(value: StringMoney): (Money | undefined) {

  if (value === undefined || value.trim() === '') {
    return undefined;
  }

  // @todo: make sure that this is safe
  return parseFloat(value);

}
