import { Db, MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DB_URI || "";

// Initialize mongodb client.
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db | undefined;

// Connect to the mongodb client, and if successful, the database.
try {
  console.log("Connecting to MongoDB Atlas cluster...");
  await mongoClient.connect();
  console.log("Successfully connected to MongoDB Atlas!");
  db = mongoClient.db(process.env.DB_NAME);
} catch (error) {
  console.log("Connection to MongoDB Atlas failed!", error);
}

export default db;
