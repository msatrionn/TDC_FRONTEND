import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "2rem",
    maxWidth: "400px",
    width: "100%",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const DeleteModal = ({ isOpen, onRequestClose, onDelete }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Delete User Modal"
    >
      <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this user?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Delete
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
