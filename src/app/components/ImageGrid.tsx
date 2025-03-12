// src/app/gallery/ImageGrid.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';

interface ImageGridProps {
  images: Array<{
    url: string;
    caption?: string;
  }>;
}

const ImageGrid = ({ images }: ImageGridProps) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedCaption, setSelectedCaption] = useState<string | undefined>(undefined);

  const handleImageClick = (image: { url: string; caption?: string }) => {
    setSelectedImg(image.url);
    setSelectedCaption(image.caption);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md bg-white/5 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            layoutId={`image-${index}`}
            onClick={() => handleImageClick(image)}
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={image.url}
                alt={image.caption || 'Gallery image'}
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium text-center">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <Modal 
        selectedImg={selectedImg!} 
        setSelectedImg={setSelectedImg} 
        caption={selectedCaption}
      />
    </>
  );
};

export default ImageGrid;
