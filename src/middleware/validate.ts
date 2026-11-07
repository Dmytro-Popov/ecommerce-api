import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';

type Schemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export function validate(schemas: Schemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: { in: string; path: string; message: string }[] = [];

    for (const key of ['params', 'query', 'body'] as const) {
      const schema = schemas[key];
      if (!schema) continue;

      const result = schema.safeParse(req[key]);
      if (!result.success) {
        for (const issue of result.error.issues) {
          errors.push({
            in: key,
            path: issue.path.map(String).join('.'),
            message: issue.message,
          });
        }
      } else if (key === 'body') {
        req.body = result.data;
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation error', errors });
    }
    next();
  };
}