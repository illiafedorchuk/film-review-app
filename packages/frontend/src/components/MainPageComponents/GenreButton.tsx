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
      className={`rounded-lg py-3 text-center font-semibold cursor-pointer duration-300 whitespace-nowrap text-black  ${
        selected
          ? "bg-[var(--button-bg-color)] text-white "
          : "bg-[var(--input-bg-color)]  hover:bg-[var(--button-bg-color)] dark:text-white "
      }`}
      onClick={onClick}
    >
      {genre}
    </div>
  );
};

export default GenreButton;
