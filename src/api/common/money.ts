
import { Decimal, Numeric } from 'decimal.js-light';
import { CustomValidator } from 'joi';


export type Money = Decimal;

export type MoneyFromUser = Numeric;

export type StringMoney = string;


/**
 * A helper function to handle monetary values.
 */
export function money(value: Numeric): Money {
  return new Decimal(value);
}

export function parseMoneyString(value: StringMoney): (Money | undefined) {

  if (value === undefined || value.trim() === '') {
    return undefined;
  }

  return new Decimal(value);

}

export function serializeMoney(value: Money): string {

  return value.toFixed();

}

export function validateMoney(options?: {
  greater?: Numeric;

}): CustomValidator {

  const greater = (
    (options.greater !== undefined)
      ? new Decimal(options.greater)
      : undefined
  );

  return (value, helpers) => {

    let amount;

    try {
      amount = money(value);

    } catch (error) {
      throw new Error(`numeric value must be specified`);

    }

    if (
      greater !== undefined &&
      amount.lessThanOrEqualTo(greater)
    ) {
      throw new Error(
        `value must be greater than ${greater.toFixed()}`
      );
    }

    return helpers.original;

  };

}
