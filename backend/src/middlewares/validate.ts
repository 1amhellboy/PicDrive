// import { Request, Response, NextFunction } from 'express';
// import { ZodType } from 'zod';

// export const validate = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
//   try {
//     schema.parse(req.body);
//     next();
//   } catch (error: any) {
//     return res.status(400).json({ error: error.errors });
//   }
// };

import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validate = (schema: ZodType<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({
      error: err.errors?.[0]?.message || 'Validation failed',
    });
  }
};
