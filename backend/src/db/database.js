import mongo from "mongoose";
import { URL_DB } from "../config/config.js";
import color from "chalk";
const database = async () => {
  try {
    await mongo.connect(URL_DB);
    console.log(color.magenta("database connected successfully"));
    return mongo.connection;
  } catch (error) {
    console.log("--------------------------------------");
    console.log(color.red("Error in database connection"));
    console.log("--------------------------------------");
    console.log(color.yellow(error));
  }
};

export default database;
