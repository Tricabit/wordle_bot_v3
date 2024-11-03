import * as mongoDB from "mongodb";

const mongoConnect = async (dbName: string) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URI
  );
  await client.connect();
  const db: mongoDB.Db = client.db(dbName);

  return { client, db };
};

export default mongoConnect;
