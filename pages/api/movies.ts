import { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "../../util/mongodb";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const movies = await getMovies();
  res.json(movies);
};

export const getMovies = async () => {
  const { db } = await connectToDatabase();
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  return JSON.parse(JSON.stringify(movies));
};
