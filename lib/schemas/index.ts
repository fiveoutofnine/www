import { z } from 'zod';

/**
 * [**Zod**](https://zod.dev/) schema for validating `{ id: number }` objects.
 */
export const idSchema = z.object({
  id: z.string().transform((x) => parseInt(x)),
});
