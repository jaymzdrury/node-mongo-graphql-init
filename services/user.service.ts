import { omit } from "lodash";
import { UserModel } from "../models/user.model";
import { LoginInput, SignUpInput } from "../schema/user.schema";
import { Context } from "../types/types";
import { signJwt } from "../utils/jwt";
import { cookieGet } from "../utils/cookie";
import comparePassword from "../utils/comparePassword";
import errMsg from "../utils/errMsg";
import logger from "../utils/logger";
import timer from "../utils/timer";
import { ApolloError } from "apollo-server-express";
const { start, end, responseTime } = timer;

class UserService {
  async signUp(input: SignUpInput) {
    start;
    try {
      const user = await UserModel.create(input);
      end;
      logger.info(`SIGNUP ${responseTime}`);
      return omit(user.toJSON(), "password");
    } catch (e) {
      errMsg("SIGN UP", e);
    }
  }

  async login(input: LoginInput, ctx: Context) {
    start;
    try {
      const user = await UserModel.find().findByEmail(input.email).lean();

      if (!user) throw new ApolloError("Login Error");
      const isValid = await comparePassword(user, input.password);
      if (!isValid) throw new ApolloError("Password Error");

      const token = signJwt(user);
      cookieGet(ctx, token);
      end;
      logger.info(`LOGIN ${responseTime}`);

      return token;
    } catch (e) {
      errMsg("LOGIN", e);
    }
  }

  async logout(ctx: Context) {
    start;
    try {
      ctx.res.clearCookie("accessToken");
      end;
      logger.info(`LOGOUT ${responseTime}`);
      return "Logged Out";
    } catch (e) {
      errMsg("LOGOUT", e);
    }
  }
}

export default UserService;
