
import Joi from 'joi';


export interface PaginationParams {

  /**
   * Optional. Offset needed to return a specific
   * subset of invoices. Default 0.
   */
  offset?: number;

  /**
   * Optional. Number of invoices to return.
   * Default 100, max 1000.
   */
  count?: number;

}

export const paginationValidators = {
  offset: Joi.number()
    .optional()
    .default(0),

  count: Joi.number()
    .optional()
    .greater(0)
    .max(1000)
    .default(100),
};

export function paginationSerializers(
  params: PaginationParams

): PaginationParams {

  return {
    offset: params.offset,
    count: params.count,
  };

}
