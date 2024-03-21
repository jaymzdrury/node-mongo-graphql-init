import mongoose, { Error as MongoError } from "mongoose";
import { BadRequestError, ServerError } from "../errors";
import logger from "../utils/logger";

const db = process.env.URI;

function connectDB() {
  if (!db) throw new Error();
  try {
    mongoose.connect(db);
    const connection = mongoose.connection;
    connection.once("connected", () => logger.info("MongoDB Connected"));
    connection.on("error", (err: MongoError) => {
      throw new ServerError(`DB Error: ${err.message}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new BadRequestError(`MongoDB Failed: ${error.message}`);
    } else {
      throw new BadRequestError("MongoDB Failed");
    }
  }
}

export default connectDB;
