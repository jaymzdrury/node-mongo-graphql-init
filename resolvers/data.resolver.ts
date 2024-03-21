import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { DataInput, Data, DataID } from "../schema/data.schema";
import DataService from "../services/data.service";
import { Context } from "../types/types";
import timeoutHandler from "../utils/timeout";
import rateLimiter from "../middleware/rateLimiter";

@Resolver()
export default class DataResolver {
  constructor(private dataService: DataService) {
    this.dataService = new DataService();
  }

  @Authorized()
  @UseMiddleware(rateLimiter)
  @Query(() => [Data])
  get(@Ctx() ctx: Context) {
    timeoutHandler(ctx.req, ctx.res);
    return this.dataService.get();
  }

  @Authorized()
  @UseMiddleware(rateLimiter)
  @Query(() => Data)
  getOne(@Arg("id") id: DataID, @Ctx() ctx: Context) {
    timeoutHandler(ctx.req, ctx.res);
    return this.dataService.getOne(id);
  }

  @Authorized()
  @UseMiddleware(rateLimiter)
  @Mutation(() => Data)
  post(@Arg("input") input: DataInput, @Ctx() ctx: Context) {
    timeoutHandler(ctx.req, ctx.res);
    return this.dataService.post(input);
  }

  @Authorized()
  @UseMiddleware(rateLimiter)
  @Mutation(() => String)
  remove(@Arg("id") id: DataID, @Ctx() ctx: Context) {
    timeoutHandler(ctx.req, ctx.res);
    return this.dataService.remove(id);
  }

  @Authorized()
  @UseMiddleware(rateLimiter)
  @Mutation(() => Data)
  put(
    @Arg("id") id: DataID,
    @Arg("update") update: DataInput,
    @Ctx() ctx: Context
  ) {
    timeoutHandler(ctx.req, ctx.res);
    return this.dataService.put(id, update, { new: true });
  }
}
