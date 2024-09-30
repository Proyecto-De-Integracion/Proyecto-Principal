//export default database
import { MongoClient } from "mongodb";

const username = encodeURIComponent("LusCard");

const password = encodeURIComponent("Prophet536");

const cluster = "cluster2024.2uuh9.mongodb.net";

let uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=Cluster2024`;

const client = new MongoClient(uri);

export async function run() {
  try {
    await client.connect();

    console.log(deleteResult);
  } catch (error) {
    console.log("Error with", error);
  }
}
