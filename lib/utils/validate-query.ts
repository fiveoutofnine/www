import type { ParsedUrlQuery } from 'querystring';
import type { z as Z, ZodRawShape } from 'zod';

const validateQuery = <T extends ZodRawShape, Q extends ParsedUrlQuery | undefined>(
  querySchema: Z.ZodObject<T>,
  query: Q,
) => {
  const result = querySchema.safeParse(query);

  if (!result.success) {
    console.error(result.error);
    throw Error('Invalid schema');
  }

  return result.data;
};

export default validateQuery;
