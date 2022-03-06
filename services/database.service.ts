import * as mongoDB from "mongodb";

export const collections: { bots?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URI);

  await client.connect();

  const db: mongoDB.Db = client.db("bots");
  const botsCollection: mongoDB.Collection = db.collection("config");

  collections.bots = botsCollection;
}
