import { ApolloError } from "apollo-server-express";

const errMsg = (method: string, error: unknown) => {
  if (error instanceof Error) {
    throw new ApolloError(`${method}: ${error.message}`);
  } else {
    throw new ApolloError(method);
  }
};

export default errMsg;
