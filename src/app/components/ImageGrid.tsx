// src/app/gallery/ImageGrid.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useFirestore } from "../../hooks/useFirestore"; // Custom hook for fetching data

type ImageGridProps = {
  setSelectedImg: (img: string) => void;
  setSelectedKey: (key: string) => void;
  setSelectedCaption: (caption: string) => void;
};

const ImageGrid: React.FC<ImageGridProps> = ({ setSelectedImg, setSelectedKey, setSelectedCaption }) => {
  const { docs } = useFirestore("gallery");

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => {
              setSelectedImg(doc.url);
              setSelectedKey(doc.id);
              setSelectedCaption(doc.caption);
            }}
          >
            <motion.img
              src={doc.url}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid; // Default export
