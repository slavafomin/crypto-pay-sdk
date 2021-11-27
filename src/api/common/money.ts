
export type Money = number;

export type StringMoney = string;


export function parseMoney(value: StringMoney): Money {

  // @todo: make sure that this is safe
  return parseFloat(value);

}
