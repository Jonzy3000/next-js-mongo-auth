import { Db, MongoClient } from "mongodb";

const { MONGO_DB_URI, MONGODB_DB } = process.env;

if (!MONGO_DB_URI) {
  throw new Error(
    "Please define the MONGO_DB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global["mongo"];

if (!cached) {
  cached = global["mongo"] = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<{
  db: Db;
  client: MongoClient;
}> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGO_DB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
