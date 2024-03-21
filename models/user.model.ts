import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../schema/user.schema";

export const UserModel = getModelForClass<typeof User>(User);
