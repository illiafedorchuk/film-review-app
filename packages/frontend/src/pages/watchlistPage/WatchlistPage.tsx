import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import AppLayout from "../../components/layouts/AppLayout";
import FilmPreviewCard from "../../components/MainPageComponents/FilmPreviewCard";
import { GENRE_MAP } from "../../lib/constants";

interface Movie {
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

const watchlist: Movie[] = [
  {
    id: 4,
    title: "Avatar",
    poster_path: "/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
    release_date: "2009",
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    id: 6,
    title: "The Matrix",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: 7,
    title: "Inception",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 8,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 9,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
];

const genreMap: { [key: number]: string } = GENRE_MAP;

function WatchlistPage() {
  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[10%] lg:pr-[10%] lg:pl-[15%] md:pr-[10%] md:pl-[15%] sm:pl-[15%] py-10">
          <h1 className="text-4xl font-bold mb-4 pb-10 text-center">
            My Watchlist
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchlist.map((movie) => (
              <FilmPreviewCard
                key={movie.id}
                movie={movie}
                genreMap={genreMap}
              />
            ))}
          </div>
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
}

export default WatchlistPage;
