// "use client";

// import { useEffect, useState } from "react";
// import Marquee from "react-fast-marquee";

// const news = [
//   "RISHA Lab awarded Best Research Group 2024 🎉",
//   "New paper on AI in Software Engineering accepted!",
//   "Upcoming Webinar: AI & Cybersecurity - Register Now!",
//   "RISHA Lab secures funding for HCI research 🔥"
// ];

// const Ticker = () => {
//   const [items, setItems] = useState(news);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setItems((prev) => [...prev.slice(1), prev[0]]);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gray-800 text-white py-2">
//       <Marquee gradient={false} speed={60}>
//         {items.map((item, index) => (
//           <span key={index} className="mx-4">{item}</span>
//         ))}
//       </Marquee>
//     </div>
//   );
// };

// export default Ticker;


  "use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import parse from 'html-react-parser';
import {BiLinkExternal} from 'react-icons/bi';


export default function Ticker() {
  const [news, setNews] = useState<{ id: string; date: string; desc: string }[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "news"));
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as { id: string; date: string; desc: string }[];

        documents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setNews(documents);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2500,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    autoplay: true,
  };

  return (
   
      <div key={news.length}>
        {/* News Header */}
        <a href="/news" style={{ textDecoration: "none", color: "red" }}>
        <h2 className="text-xl font-semibold text-center inline-flex items-center">
          News - <BiLinkExternal/>
        </h2>
        </a>
        {/* News Slider */}
        <Slider className="rishaFeed" {...settings}>
          {news.map((newsItem) => (
            <div className="content" key={newsItem.id} style={{ textAlign: "left" }}>
              <b>{newsItem.date}</b>: {parse(newsItem.desc)}
            </div>
          ))}
        </Slider>
      </div>
    
  );
}
