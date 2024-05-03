const GenreButton = ({
  genre,
  onClick,
}: {
  genre: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="rounded-lg bg-white min-w-40 px-4 py-3 text-center hover:bg-violet-400 hover:text-white hover:cursor-pointer hover:duration-300"
      onClick={onClick}
    >
      {genre}
    </div>
  );
};

export default GenreButton;
