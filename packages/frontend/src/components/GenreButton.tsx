const GenreButton = ({
  genre,
  onClick,
}: {
  genre: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`rounded-lg bg-white w-16 py-3 text-center hover:bg-violet-200 hover:text-violet-600 font-semibold hover:cursor-pointer hover:duration-300 ${
        genre.includes("All") ? "flex-none" : "grow"
      } whitespace-nowrap`}
      onClick={onClick}
    >
      {genre}
    </div>
  );
};

export default GenreButton;
