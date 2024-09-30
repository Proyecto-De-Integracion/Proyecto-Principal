//export default database
import { MongoClient } from "mongodb";

const client = new MongoClient(uri);

export async function run() {
  try {
    await client.connect();

    console.log(deleteResult);
  } catch (error) {
    console.log("Error with", error);
  }
}
