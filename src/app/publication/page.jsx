"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFirestore } from "../../hooks/useFirestore";
import YearlyPapers from "../components/YearlyPapers";
import CategoryFilter from "../components/CategoryFilter";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { authors, categories } from "../../data/data";

const Publication = () => {
  const { docs } = useFirestore("publications");
  const elRefs = useRef([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [years, setYears] = useState([]);
  const [resetTags, setResetTags] = useState(false);

  const toDateTime = (secs) => new Date(secs * 1000).getFullYear();

  useEffect(() => {
    setFilteredData(docs);

    // Extract and sort years in descending order
    const sortedYears = [...new Set(docs.map((e) => toDateTime(e.createdAt.seconds)))].sort(
      (a, b) => b - a
    );

    setYears(sortedYears);

    // Ensure refs array matches years count
    if (elRefs.current.length !== sortedYears.length) {
      elRefs.current = Array(sortedYears.length).map(() => null);
    }
  }, [docs]);

  const executeScroll = (index) => {
    elRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const filterByCategory = (category) => {
    setResetTags(false);
    const filteredDocs =
      category === "All"
        ? docs
        : docs.filter((doc) => doc.selectedTags.includes(category));

    setFilteredData(filteredDocs);
    setYears([...new Set(filteredDocs.map((e) => toDateTime(e.createdAt.seconds)))].sort((a, b) => b - a));
  };

  const handleSearch = (query) => {
    const searchWords = query.trim().split(" ");
    const filteredDocs = docs.filter((doc) => {
      const docText =
        Object.values(doc).join(" ") +
        (doc.authors
          ?.split(",")
          .map((key) => authors.find((author) => author.key === key)?.title || "")
          .join(" ") || "");

      return new RegExp(searchWords.join("|"), "i").test(docText);
    });

    setFilteredData(filteredDocs);
    setYears([...new Set(filteredDocs.map((e) => toDateTime(e.createdAt.seconds)))].sort((a, b) => b - a));
    setResetTags(true);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="container mx-auto p-4">
          <hr />
          <div>
            <h2 className="text-5xl kotha">All Publications & Tools</h2>
            <p className="text-sm my-2">
              {years.map((year, i) => (
                <button
                  key={i}
                  className="text-blue-500 hover:underline mx-1"
                  onClick={() => executeScroll(i)}
                >
                  [{year}]
                </button>
              ))}
            </p>
            <hr />
          </div>
          <CategoryFilter
            categoryList={categories}
            onRequestSearch={filterByCategory}
            resetTags={resetTags}
          />
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search publications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(search)} // Search on Enter key
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => handleSearch(search)}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{ backgroundColor: "var(--color-card)", marginBottom: "30px" }}
          />

          <div>
            {years.map((year, i) => (
              <div key={i}>
                <h2 ref={(el) => (elRefs.current[i] = el)} className="text-xl font-semibold">
                  {year}
                </h2>
                <YearlyPapers year={year} docs={filteredData} />
                <hr />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Publication;
