import type { ValidationTargets } from 'hono';

import { zValidator as zv } from '@hono/zod-validator';
import { prettifyError, ZodType } from 'zod';

export const zValidator = <
  T extends ZodType,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      return c.json({ error: prettifyError(result.error) }, 400);
    }
  });
