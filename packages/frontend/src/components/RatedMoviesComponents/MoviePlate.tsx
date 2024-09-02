import ReviewChart from "../FilmPageComponents/ReviewModal/ReviewChart";

interface MoviePlateProps {
  movie_title: string;
  movierating: number;
  movie_poster_path: string;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function MoviePlate({
  movie_title,
  movierating,
  movie_poster_path,
  onClick,
}: MoviePlateProps) {
  const displayTitle =
    movie_title && movie_title.length > 30
      ? `${movie_title.slice(0, 30)}...`
      : movie_title;

  return (
    <div
      className="w-full md:w-[100%] md:h-56 bg-[var(--input-bg-color)] rounded-xl p-2 shadow-lg overflow-hidden cursor-pointer relative hover:scale-105 duration-500"
      onClick={onClick}
    >
      <div className="flex flex-wrap h-full">
        <div className="w-32 h-full rounded-xl bg-black">
          {movie_poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${movie_poster_path}`}
              alt={movie_title}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div>No image available</div>
          )}
        </div>
        <div className="mx-auto text-xl font-bold flex-1">
          <h1 className="text-center break-words">{displayTitle}</h1>
          <ReviewChart score={+movierating} label={""} />
        </div>
      </div>
    </div>
  );
}

export default MoviePlate;
