import UserService from "../services/user.service";
import rateLimiter from "../middleware/rateLimiter";
import timeoutHandler from "../utils/timeout";
import { LoginInput, SignUpInput, User } from "../schema/user.schema";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../types/types";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @UseMiddleware(rateLimiter)
  @Mutation(() => User)
  signUp(@Arg("input") input: SignUpInput, @Ctx() ctx: Context) {
    timeoutHandler(ctx.req, ctx.res);
    return this.userService.signUp(input);
  }

  @UseMiddleware(rateLimiter)
  @Mutation(() => String)
  login(@Arg("input") input: LoginInput, @Ctx() ctx: Context) {
    timeoutHandler(ctx.req, ctx.res);
    return this.userService.login(input, ctx);
  }

  @Mutation(() => String)
  logout(@Ctx() ctx: Context) {
    return this.userService.logout(ctx);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() ctx: Context) {
    timeoutHandler(ctx.req, ctx.res);
    return ctx.user;
  }
}
