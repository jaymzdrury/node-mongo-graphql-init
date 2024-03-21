import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { Request, Response } from "express";
import { User, findByEmail } from "../schema/user.schema";

export type QueryHelpers = {
  findByEmail: AsQueryMethod<typeof findByEmail>;
};

export type Context = {
  req: Request;
  res: Response;
  user: User | null;
};
