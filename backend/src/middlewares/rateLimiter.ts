// import rateLimit from 'express-rate-limit';

// export const rateLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: 'Too many requests, please try again later.',
// });


// export const rateLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 200, // allow 200 requests per window
//   keyGenerator: (req, res) => {
//     return req.user?.id || req.ip; // ✅ per-user if logged in, else fallback to IP
//   },
//   message: 'Too many requests, please try again later.',
// });


import rateLimit from "express-rate-limit";

export const rateLimiter =
  process.env.NODE_ENV === "production"
    ? rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 200, // allow 200 requests per window per user
        keyGenerator: (req: any) => {
          // ✅ If authenticated, use userId; else fallback to IP
          return req.user?.id || req.ip;
        },
        message: "Too many requests, please try again later.",
        standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
        legacyHeaders: false,  // Disable `X-RateLimit-*` headers
      })
    : (req: any, res: any, next: any) => {
        // 🚫 Skip rate limiting in development
        next();
      };
