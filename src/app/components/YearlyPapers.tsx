"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { authors } from "../../data/data";
import { motion, Variants } from "framer-motion";

// Dynamic import for better performance
const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false });

interface Document {
  id: string;
  url: string;
  authors: string;
  direct: string;
  title: string;
  venue: string;
  createdAt: { toDate: () => Date };
  links: string;
}

interface Props {
  year: number;
  docs: Document[];
  style?: string;
}

const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5 } },
};

const YearlyPapers: React.FC<Props> = ({ year, docs, style }) => {
  const filteredDocs = useMemo(
    () => docs?.filter((doc) => doc?.createdAt?.toDate()?.getFullYear() === year),
    [docs, year]
  );

  return (
    <>
      {filteredDocs?.map((doc) => (
        <MotionDiv
          key={doc.id}
          className="flex flex-col md:flex-row p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 bg-white"
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
        >
          {/* Image Section */}
          <div className="w-full md:w-1/4 flex justify-center items-center">
            <Image
              src={doc.url}
              alt={doc.title || "Publication Image"}
              width={200}
              height={style === "talks" ? 250 : 150}
              className="rounded-lg object-cover"
              priority
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-3/4 flex flex-col justify-center ml-4">
            <div className="text-gray-500 text-sm">
              {doc.authors
                .split(",")
                .map((key, i, arr) => {
                  const author = authors.find((a) => a.key === key);
                  return author ? (
                    <Link key={i} href={`/info/${key}`} className="text-blue-500 hover:underline">
                      {author.title}
                      {i + 1 !== arr.length && ", "}
                    </Link>
                  ) : null;
                })}
            </div>

            <p className="font-bold text-lg my-1">
              <a href={doc.direct} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {doc.title}
              </a>
            </p>

            <p className="text-gray-600 text-sm">{doc.venue}</p>
            <p className="text-gray-500 text-xs">{doc.createdAt.toDate().toDateString().slice(4)}</p>

            {/* Links Section */}
            <div className="text-blue-500 text-sm mt-2">
              {doc.links
                .split("]")
                .filter((str) => /\S/.test(str))
                .map((link, i) => (
                  <a
                    key={i}
                    href={link.split("[")[1]?.split("]")[0] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-2 hover:underline"
                  >
                    {link.split("[")[0]}
                  </a>
                ))}
            </div>
          </div>
        </MotionDiv>
      ))}
    </>
  );
};

export default YearlyPapers;
