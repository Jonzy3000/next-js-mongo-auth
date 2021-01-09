import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export const getMovie = async (id) => {
  const { db } = await connectToDatabase();
  const movie = await db
    .collection("movies")
    .findOne({ _id: new ObjectId(id) });

  return JSON.parse(JSON.stringify(movie));
};
