// "use client";

// import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
// import dynamic from "next/dynamic";
// import { animateScroll as scroll } from "react-scroll";
// import useFirestore from "../hooks/useFirestore";
// import YearlyPapers from "../Components/YearlyPapers";

// // Dynamically import FadeIn for better performance
// const FadeIn = dynamic(() => import("react-fade-in"), { ssr: false });

// const Talks: React.FC = () => {
//   const { docs } = useFirestore("talks");
//   const elRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const [fdata, setFdata] = useState<typeof docs>([]);
  
//   // Function to convert Firestore timestamp to Year
//   const toDateTime = useCallback((secs: number) => {
//     const t = new Date(1970, 0, 1); // Epoch start
//     t.setSeconds(secs);
//     return t.getFullYear();
//   }, []);

//   // Extract unique years from documents
//   const years = useMemo(() => [...new Set(docs.map((e) => toDateTime(e.createdAt?.seconds || 0)))], [docs, toDateTime]);

//   useEffect(() => {
//     setFdata(docs);
//   }, [docs]);

//   // Manage Refs dynamically
//   useEffect(() => {
//     elRefs.current = years.map((_, i) => elRefs.current[i] || null);
//   }, [years]);

//   // Scroll to specific ref
//   const scrollToRef = (index: number) => {
//     if (elRefs.current[index]) {
//       window.scrollTo({ top: elRefs.current[index]!.offsetTop - 80, behavior: "smooth" });
//     }
//   };

//   return (
//     <FadeIn>
//       <div className="container mx-auto py-8">
//         <hr />
//         <div className="text-center">
//           <h2 className="text-3xl font-bold mb-4">Latest Talks</h2>
//           <p className="text-gray-700 max-w-3xl mx-auto">
//             I have always enjoyed delivering talks and interacting with faculty, students, and industry professionals in
//             the areas of Software Engineering, Educational Technologies, and Computing for Society. I also deliver talks
//             as an ACM Eminent Speaker.{" "}
//             <a
//               href="https://india.acm.org/education/learning/esp/sridhar-chimalakonda"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               Learn more
//             </a>
//             .
//           </p>
//           <p className="mt-4 text-gray-500">
//             Disclaimer: My talks are intended to be thought-provoking and raise curiosity in the audience (especially students) 😊.
//           </p>
//         </div>

//         {/* Yearly Navigation */}
//         <div className="text-center my-6">
//           {years.map((year, i) => (
//             <button
//               key={i}
//               onClick={() => scrollToRef(i)}
//               className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-3 py-1 mx-2 rounded transition"
//             >
//               {year}
//             </button>
//           ))}
//         </div>

//         {/* Talks by Year */}
//         {years.map((year, i) => (
//           <div key={i} ref={(el) => (elRefs.current[i] = el)}>
//             <YearlyPapers year={year} docs={fdata} style="talks" />
//           </div>
//         ))}
//       </div>
//     </FadeIn>
//   );
// };

// export default Talks;


import React from 'react'

const talkpage = () => {
  return (
    <div>talkpage</div>
  )
}

export default talkpage