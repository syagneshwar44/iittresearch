"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; 
import { motion } from "framer-motion";

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(""); // Filter by category
  const [sortOrder, setSortOrder] = useState("desc"); // Sort by date

  // Fetch data from Firestore
  useEffect(() => {
    const fetchNewsData = async () => {
      const newsCollection = collection(db, "news");
      const snapshot = await getDocs(newsCollection);
      const fetchedItems = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("Fetched News Item:", data);  // Log the fetched data

        return {
          id: doc.id,
          title: data.title,
          content: data.desc,
          category: data.category,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(), // Ensure valid date
        };
      });
      setNewsItems(fetchedItems);
    };

    fetchNewsData();
  }, []);

  // Filtered and sorted news items
  const filteredNews = newsItems
    .filter((item) => categoryFilter === "" || item.category === categoryFilter)
    .sort((a, b) => (sortOrder === "desc" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt));

  // Handle News Modal (open/close)
  const openModal = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-black-400 via-black-500 to-red-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Latest News
      </motion.h1>
<br/>
      {/* Sort by Date */}
      <div className="text-center mb-8">
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          Sort by Date ({sortOrder === "desc" ? "Newest" : "Oldest"})
        </button>
      </div>

      {/* News List */}
      <motion.div
        className="space-y-8"
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
        {filteredNews.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => openModal(item)} // Click event handler to open modal
          >
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.category}</p>

            {/* Render description with HTML content */}
            <p
              className="text-gray-700 mt-4"
              dangerouslySetInnerHTML={{ __html: item.content }} // Render HTML content from Firestore
            ></p>

            <p className="text-sm text-gray-500 mt-4">
              Posted on {item.createdAt.toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* News Modal */}
      {isModalOpen && selectedNews && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-lg"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div
            className="relative bg-white p-8 rounded-lg max-w-3xl max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
          >
            {/* News Content */}
            <motion.div
              className="mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {selectedNews.title}
              </h3>
              <div
                className="text-gray-700 mt-4"
                dangerouslySetInnerHTML={{ __html: selectedNews.content }}
              ></div>
              <p className="text-sm text-gray-500 mt-4">
                Posted on {selectedNews.createdAt.toLocaleDateString()}
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
