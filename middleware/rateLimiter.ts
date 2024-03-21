import { RateLimiterMemory } from "rate-limiter-flexible";
import config from "../config/limit";
import { NotFoundError } from "../errors/not-found";
import { RateLimitError } from "../errors/rate-limit";
import { Context } from "../types/types";
import { MiddlewareFn } from "type-graphql";

const limiter = new RateLimiterMemory(config);

const rateLimiter: MiddlewareFn<Context> = async ({ context }, next) => {
  try {
    if (!context.req.ip) throw new NotFoundError("IP not found");

    const rateLimitRes = await limiter.consume(context.req.ip);
    context.res.setHeader("Retry-After", rateLimitRes.msBeforeNext / 1000);
    context.res.setHeader("X-RateLimit-Limit", 6);
    context.res.setHeader(
      "X-RateLimit-Remaining",
      rateLimitRes.remainingPoints
    );
    context.res.setHeader(
      "X-RateLimit-Reset",
      Number(new Date(Date.now() + rateLimitRes.msBeforeNext))
    );
  } catch (error) {
    throw new RateLimitError("Too Many Requests");
  }
  return next();
};

export default rateLimiter;
