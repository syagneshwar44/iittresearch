"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import MainModal from "./components/MainModal";
import CarouselX from "./components/CarouselX";
import Ticker from "./components/Ticker";
import FeatPub from "./components/FeatPub";
import Sponsors from "./components/Sponsors";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaTwitter, FaYoutube, FaGithub } from "react-icons/fa";
import ProfileCardSridharsir from "./components/ProfileCardSridharsir";

const HomePage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState(["", ""]);

  function trigger(check: string) {
    const contentMap: Record<string, [string, string]> = {
      Bio: ["Bio", "I am a **passionate researcher** and **teacher** in software engineering."],
      Teaching: ["Teaching", "Detailed teaching philosophy and courses taught."],
      CV: ["CV", "Download CV here."],
      Blog: ["Blog", "Read my latest blog posts."],
      Reads: ["Cool Reads", "Check out these recommended articles."],
    };
    setModalContent(contentMap[check] || ["", ""]);
    setModalShow(true);
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-4 gap-4">
      {/* Left Section - Existing Code */}
      <div className="border-r pr-4 col-span-3">
        <MainModal heading={modalContent[0]} body={modalContent[1]} show={modalShow} onHide={() => setModalShow(false)} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="text-center">
            <h2 className="text-4xl font-bold">Welcome to RISHA Lab</h2>
            <p className="text-sm text-gray-600">Research in Intelligent Software & Human Analytics Lab</p>
            <hr className="my-4" />
            <Link href="/gallery">
              <CarouselX />
            </Link>
          </div>
          <br />
          <p className="text-lg text-center text-red-500">#WeAreRisha</p>
          <hr className="my-4" />
          <p className="text-left">
          We are here to aspire high, set benchmarks and give our best towards creating a remarkable impact in research, development and society! Our primary research goal is to expand the boundaries of <b>Software Engineering</b>, with a focus on cutting edge research, and building tools, and to leverage the power of computing to help society (<b>Educational Technologies</b> and <b>Human-Computer Interaction</b>).

          </p>
          <hr className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="border p-4">
              <h3 className="font-bold">Software Engineering</h3>
              <hr />
              <p>We research effective and scalable ways to help developers improve quality of software by qualitatively and quantitatively analyzing a diversified range of software artifacts [such as code, commits, bugs, logs, patterns, designs and so on] in millions of software repositories</p>
              <hr />
           <b>Current Research Areas :</b> Empirical Software Engineering, Modernizing legacy code, Novel Source Code Representations, Semantic Code Search, Code Smells, Summarization, Software Documentation, Architecture, Quality, APIs, Cross-Project Learning, Bug Localization, Knowledge Graphs, AI for SE, SE for AI, Energy-Aware Software Engineering and Tools
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="border p-4">
              <h3 className="font-bold">Computing for Society</h3>
              <hr />
              <p>We leverage advances in computing (such as Software Engineering, Artificial Intelligence, Augmented Reality, Visualization, Social Media Analytics, User Interfaces) to address societal challenges currently in the domains of (i) education (ii) environment (iii) healthcare and (iv) cultural heritage. </p>
              <hr />
            <b>Current Research Areas :</b> Educational Technologies, Learning Analytics, Personalized Learning, Gamification, Ontologies, Virtual & Augmented Reality, Virtual Labs, User Interfaces, Human Computer Interaction, Usability 
            </motion.div>
          </div>
          <div className="my-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="https://drive.google.com/file/d/1owGFJEfal-J9wRkIIi1N4Ybkp7WSbGAM/view" className="text-blue-500">
                Read more: Research Agenda
              </Link>
            </motion.div>
          </div>
          <div className="my-6">
            <hr />
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-lg cursor-pointer">Lab Core Philosophy</h3>
                <div className="mt-2 text-gray-700 dark:text-gray-300">
                  <hr className="my-2" />
                  <p>↠ To us, impactful research stems from great problems that push our limits to go beyond state-of-the-art and state-of-the-practice! We focus on long-term problems with realistic short-term goals.</p>
                  <p className="mt-2">↠ The question we ask is: <strong>"Is this the best I(we) can do?"</strong> - We recursively ask this question in our journey until we reach our boundary and make a significant impact through research (Software Engineering), development, and eventually to society!</p>
                </div>
              </AccordionItem>
            </Accordion>
            <hr />
          </div>
          <div className="container mx-auto px-4 py-8">
            <FeatPub />
          </div>
          
          <div>
            <hr />
            <h5>Collaborators / Sponsors</h5>
            <hr />
            <Sponsors />
          </div>
        </motion.div>
      </div>
      {/* Right Section - Blank */}
      <div className="border-l pl-4 col-span-1"> 
<ProfileCardSridharsir />

      <br />
      <div className="mb-3">
      <div className="p-2 preserveb">
        <Link href="/calendar" className="p-2 preserveb">
          Upcoming Conference Deadlines
        </Link>
      </div>
    </div>

        <Ticker />
        <br />
        <br />
        <div>
      <h4 className="font-italic text-center">Find us on</h4>
      <ol className="list-unstyled text-center">
        <li>
          <a href="https://twitter.com/rishalab" target="_blank">
            <FaTwitter className="inline-block mr-2" /> Twitter
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCcetB0OV3W1iUK69JRHHLTw" target="_blank">
            <FaYoutube className="inline-block mr-2 text-red-500" /> YouTube
          </a>
        </li>
        <li>
          <a href="https://github.com/rishalab" target="_blank">
            <FaGithub className="inline-block mr-2" /> GitHub
          </a>
        </li>
      </ol>
    </div>
      </div>
    </div>
  );
};

export default HomePage;
