import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import { getMovies } from "./api/movies";

const Movies = ({ movies }) => {
  const router = useRouter();
  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li
            key={movie._id}
            onClick={() => router.push(`movies/${movie._id}`)}
          >
            <h2>{movie.title}</h2>
            <p>{movie.fullplot}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const movies = await getMovies();

  return { props: { movies } };
};

export default Movies;
