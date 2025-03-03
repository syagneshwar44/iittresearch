"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import Firebase configuration
import { motion } from "framer-motion";

const GalleryPage = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image
  const [isZoomed, setIsZoomed] = useState(false); // State to handle zoom toggle

  // Fetch data from Firestore
  useEffect(() => {
    const fetchGalleryData = async () => {
      const galleryCollection = collection(db, "gallery");
      const snapshot = await getDocs(galleryCollection);
      const fetchedItems = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          caption: data.caption,
          createdAt: data.createdAt,
          url: data.url,
        };
      });
      setMediaItems(fetchedItems);
    };

    fetchGalleryData();
  }, []);

  // Handle image click to zoom in/out
  const handleImageClick = (imageUrl) => {
    if (selectedImage === imageUrl) {
      setIsZoomed(!isZoomed); // Toggle zoom
    } else {
      setSelectedImage(imageUrl);
      setIsZoomed(true); // Zoom in on new image
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-black-400 via-black-500 to-red-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Gallery
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-center text-black-600 dark:text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
       #WeAreRisha
      </motion.p>

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {mediaItems.map((item) => (
          <motion.div
            key={item.id}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => handleImageClick(item.url)} // Click event handler
          >
            <img
              src={item.url}
              alt={item.caption}
              className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4">
              <h3 className="text-white text-xl font-semibold">{item.caption}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Popup Modal for zoomed-in image */}
      {selectedImage && isZoomed && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-lg"
          onClick={() => setIsZoomed(false)} // Close the zoomed-in view on click
        >
          <div
            className="relative bg-transparent"
            onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
          >
            {/* Zoomed-in Image */}
            <motion.img
              src={selectedImage}
              alt="Zoomed Image"
              className="max-w-3xl max-h-3xl object-contain rounded-lg transition-all duration-500 ease-in-out"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.01, ease: "easeOut" }}
            />
            
            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold">
              {mediaItems.find((item) => item.url === selectedImage)?.caption}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)} // Close zoom on button click
              className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;





// "use client";

// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { LayoutGrid } from "@/components/ui/layout-grid";

// const GalleryPage = () => {
//   const [mediaItems, setMediaItems] = useState([]);

//   useEffect(() => {
//     const fetchGalleryData = async () => {
//       const galleryCollection = collection(db, "gallery");
//       const snapshot = await getDocs(galleryCollection);
//       const fetchedItems = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           caption: data.caption,
//           createdAt: data.createdAt,
//           url: data.url,
//         };
//       });
//       setMediaItems(fetchedItems);
//     };
//     fetchGalleryData();
//   }, []);

//   const generateCardContent = (caption) => (
//     <div>
//       <p className="font-bold md:text-4xl text-xl text-white">{caption}</p>
//       <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//         #WeAreRisha
//       </p>
//     </div>
//   );

//   const cards = mediaItems.map((item, index) => ({
//     id: item.id,
//     content: generateCardContent(item.caption),
//     thumbnail: item.url,
//   }));

//   return (
//     <div className="h-screen py-20 w-full gallery-item">
//       <LayoutGrid cards={cards} />
//     </div>
//   );
// };

// export default GalleryPage;
