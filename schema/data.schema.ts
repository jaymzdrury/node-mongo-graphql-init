import { prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { MinLength } from "class-validator";

@ObjectType()
export class Data {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;
}

@InputType()
export class DataInput {
  @Field(() => String)
  @MinLength(1)
  name: string;
}

@InputType()
export class DataID {
  @Field(() => String)
  @MinLength(24)
  _id: string;
}
