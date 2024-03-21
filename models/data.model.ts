import { getModelForClass } from "@typegoose/typegoose";
import { Data } from "../schema/data.schema";

export const DataModel = getModelForClass<typeof Data>(Data);
