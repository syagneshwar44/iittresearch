// src/components/Modal.tsx

import React from "react";

type ModalProps = {
  selectedCaption: string;
  selectedImg: string;
  selectedKey: string;
  setSelectedKey: (key: string) => void;
  setSelectedImg: (img: string) => void;
  setSelectedCaption: (caption: string) => void;
  isEdit: boolean;
};

const Modal: React.FC<ModalProps> = ({ selectedCaption, selectedImg, selectedKey, setSelectedKey, setSelectedImg, setSelectedCaption, isEdit }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img src={selectedImg} alt="Selected" />
        <h2>{selectedCaption}</h2>
        {/* Add any edit form here */}
        <button onClick={() => { setSelectedKey(""); setSelectedImg(""); setSelectedCaption(""); }}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
