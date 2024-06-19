import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Modal } from "@mui/material";

interface ReviewModalProps {
  title: string;
  backdropUrl: string;
  posterUrl: string;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  title,
  backdropUrl,
  posterUrl,
  onClose,
}) => {
  const ratings = [
    { value: 7.5, label: "Plot" },
    { value: 8.5, label: "Acting" },
    { value: 6.5, label: "Cinematography" },
    { value: 9.5, label: "Directing" },
    { value: 5.5, label: "Editing" },
    { value: 4.5, label: "Sound" },
  ];

  return (
    <Modal open={true} onClose={onClose}>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div
          className="fixed inset-0 bg-black bg-opacity-70"
          onClick={onClose}
        ></div>
        <Card className="relative w-[40%] h-[95%] rounded-2xl overflow-hidden shadow-lg z-20">
          <div
            className="relative w-full h-72 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#f0f0f0] via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 flex items-end">
              <img
                src={posterUrl}
                alt="Movie Poster"
                className="w-36 h-52 rounded-md shadow-lg"
              />
              <div className="ml-6 text-white">
                <h5 className="font-bold">{title}</h5>
                <h2 className="font-semibold">This is part 2</h2>
              </div>
            </div>
          </div>
          <CardContent className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-3 gap-6 mb-6">
              {ratings.map((rating, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative">
                    <CircularProgress
                      variant="determinate"
                      value={(rating.value / 10) * 100}
                      size={70}
                      thickness={4}
                      style={{ color: "#7C3AED" }}
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <p className="font-bold">{rating.value}/10</p>
                    </div>
                  </div>
                  <p className="mt-2">{rating.label}</p>
                </div>
              ))}
            </div>
            <p className="text-black">
              Additional information about the review goes here. This section
              can include more details and explanations about the ratings
              provided above. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Duis vehicula ex non ante euismod, et ultrices urna
              fermentum. Integer volutpat augue eget nisl vulputate, non pretium
              risus efficitur. Additional information about the review goes
              here. This section can include more details and explanations about
              the ratings provided above. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Duis vehicula ex non ante euismod, et
              ultrices urna fermentum. Integer volutpat augue eget nisl
              vulputate, non pretium risus efficitur.
            </p>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
};

export default ReviewModal;
