import { useRouter } from "next/dist/client/router";
import { getMovies } from "../api/movies";
import { getMovie } from "../api/movies/[pid]";

const Movie = ({ movie }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1> <p>{movie.fullplot}</p>
    </div>
  );
};

export async function getStaticPaths() {
  const movies = await getMovies();

  const paths = movies.map((movie) => ({
    params: { id: movie._id },
  }));

  return {
    paths,
    fallback: true, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const movie = await getMovie(params.id);

  return { props: { movie }, revalidate: 1 };
}

export default Movie;
