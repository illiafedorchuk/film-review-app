// PhotoModal.tsx
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface PhotoModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  photoUrl: string;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onRequestClose,
  photoUrl,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Photo Modal"
      className="photo-modal"
      overlayClassName="photo-modal-overlay"
    >
      <div className="flex justify-center items-center h-full">
        <img
          src={photoUrl}
          alt="Movie Image"
          className="max-w-full max-h-full rounded-lg object-cover"
        />
      </div>
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 bg-gray-800 text-white rounded-full p-2"
      >
        Close
      </button>
    </Modal>
  );
};

export default PhotoModal;
