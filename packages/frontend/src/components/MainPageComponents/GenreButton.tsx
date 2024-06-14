const GenreButton = ({
  genre,
  onClick,
  selected,
}: {
  genre: string;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <div
      className={`rounded-lg py-3 text-center font-semibold cursor-pointer duration-300 whitespace-nowrap ${
        selected
          ? "bg-violet-200 text-violet-600"
          : "bg-white hover:bg-violet-200 hover:text-violet-600"
      }`}
      onClick={onClick}
    >
      {genre}
    </div>
  );
};

export default GenreButton;
