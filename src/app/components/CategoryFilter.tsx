"use client";

import { useState, useRef, useEffect } from "react";

interface CategoryFilterProps {
  categoryList: string[];
  onRequestSearch: (category: string) => void;
  resetTags: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categoryList,
  onRequestSearch,
  resetTags,
}) => {
  const categoryRef = useRef<HTMLUListElement>(null);
  const ALL_CATEGORY_NAME = "All";
  const [selectedOption, setSelectedOption] = useState<string>(ALL_CATEGORY_NAME);

  // Reset category selection when resetTags is true
  useEffect(() => {
    if (resetTags) {
      setSelectedOption(ALL_CATEGORY_NAME);
    }
  }, [resetTags]);

  const handleOptionSelected = (category: string) => {
    setSelectedOption(category);
    onRequestSearch(category);
  };

  return (
    <nav
      aria-label="Category Filter"
      className="flex items-center mb-4 bg-transparent space-x-2 overflow-x-auto scrollbar-hide"
    >
      {/* "All" Category Button */}
      <button
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          selectedOption === ALL_CATEGORY_NAME
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        onClick={() => handleOptionSelected(ALL_CATEGORY_NAME)}
        aria-label="Show all categories"
      >
        {ALL_CATEGORY_NAME}
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-gray-400"></div>

      {/* Category List */}
      <ul ref={categoryRef} className="flex space-x-2 overflow-x-auto">
        {categoryList
          .sort((a, b) => a.localeCompare(b)) // Sort alphabetically (ascending order)
          .map((category) => (
            <li key={category}>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedOption === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleOptionSelected(category)}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default CategoryFilter;
