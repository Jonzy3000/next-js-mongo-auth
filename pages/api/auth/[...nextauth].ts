import { MongoClient } from "mongodb";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../util/mongodb";

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  events: {
    signIn: async ({ user }: any) => {
      const { db } = await connectToDatabase();
      await db
        .collection("users")
        .updateOne(
          { email: user.email },
          { $set: { name: user.name, email: user.email } },
          { upsert: true }
        );
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
