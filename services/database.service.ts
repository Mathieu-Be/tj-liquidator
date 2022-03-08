import * as mongoDB from "mongodb";

export const collections: { bots?: mongoDB.Collection; contracts?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URI);

  await client.connect();

  const db: mongoDB.Db = client.db("bots");
  const botsCollection: mongoDB.Collection = db.collection("config");

  const db1: mongoDB.Db = client.db("avalanche");
  const dbcontractsCollection: mongoDB.Collection = db1.collection("contracts");

  collections.bots = botsCollection;
  collections.contracts = dbcontractsCollection;
}
