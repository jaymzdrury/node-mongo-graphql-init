import { DataModel } from "../models/data.model";
import { DataID, DataInput } from "../schema/data.schema";
import { QueryOptions } from "mongoose";
import timer from "../utils/timer";
import logger from "../utils/logger";
import errMsg from "../utils/errMsg";
const { start, end, responseTime } = timer;

class DataService {
  async post(input: DataInput) {
    start;
    try {
      const data = DataModel.create(input);
      end;
      logger.info(`POST ${responseTime}`);
      return data;
    } catch (e) {
      errMsg("POST", e);
    }
  }

  async get() {
    start;
    try {
      const data = DataModel.find().lean().setOptions({ sanitizeFilter: true });
      end;
      logger.info(`GET ${responseTime}`);
      return data;
    } catch (e) {
      errMsg("GET", e);
    }
  }

  async getOne(id: DataID) {
    start;
    try {
      const data = DataModel.findOne({ _id: id });
      end;
      logger.info(`GET ${responseTime}`);
      return data;
    } catch (e) {
      errMsg("GET", e);
    }
  }

  async remove(id: DataID) {
    start;
    try {
      const data = DataModel.deleteOne({ _id: id })
        .lean()
        .setOptions({ sanitizeFilter: true });
      end;
      logger.info(`DELETE ${responseTime}`);
      return `Deleted: ${data}`;
    } catch (e) {
      errMsg("DELETE", e);
    }
  }

  async put(id: DataID, update: DataInput, options: QueryOptions) {
    start;
    try {
      const data = await DataModel.findOneAndUpdate(
        { _id: id },
        update,
        options
      )
        .lean()
        .setOptions({ sanitizeFilter: true });
      end;
      logger.info(`PUT ${responseTime}`);
      return data;
    } catch (e) {
      errMsg("PUT", e);
    }
  }
}

export default DataService;
