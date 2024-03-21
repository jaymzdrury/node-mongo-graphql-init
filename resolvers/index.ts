import DataResolver from "./data.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [DataResolver, UserResolver] as const;
