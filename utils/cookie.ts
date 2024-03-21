import config from "../config/salt";
import { verifyJwt } from "./jwt";
import { User } from "../schema/user.schema";
import { Context } from "../types/types";

export function cookieSet(ctx: Context) {
  const context = ctx;
  if (ctx.req.cookies.accessToken) {
    const user = verifyJwt<User>(ctx.req.cookies.accessToken);
    context.user = user;
  }
  return context;
}

export function cookieGet(ctx: Context, token: string) {
  ctx.res.cookie("accessToken", token, {
    maxAge: config.accessTokenExpires,
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}
