const GenreButton = ({
  genre,
  onClick,
}: {
  genre: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="rounded-lg bg-white py-3 text-center hover:bg-violet-200 hover:text-violet-600 font-semibold hover:cursor-pointer hover:duration-300 whitespace-nowrap"
      onClick={onClick}
    >
      {genre}
    </div>
  );
};

export default GenreButton;
