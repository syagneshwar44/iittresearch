"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white"
    >
      {/* Shared Layout */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-shrink-0"
        >
          <img src="/assets/logo_min.png" alt="Risha Lab Logo" width="800" height="200" className="md:w-180 md:h-auto" />
          <figcaption className="text-sm mt-2 text-center md:text-left">
            Website and Logo designed by <Link href="/info/noble" className="text-blue-500 dark:text-blue-400">Noble</Link>
          </figcaption>
        </motion.div>

        <div className="flex-1">
          <h5 className="text-2xl font-semibold">About the Logo</h5>
          <ul className="list-disc pl-5 space-y-2">
            <li><b>Binary code:</b> Binary code positioned around the logo represents the beautiful language of the computers on which we work. The binary code used in the logo “01010010 01001001 01010011 01001000 01000001 ...” can be converted to get RISHA Lab IIT Tirupati.</li>
            <li><b>Black pedestal for the pen nib:</b> The black box represents a system with an input and an output, but its inner workings are unknown. The incomplete circle on top is modeled after the zen symbol known as the “open ensō,” which sees beauty in imperfection, allowing for growth toward a complete state.</li>
            <li><b>The box with the enclosed graph</b> symbolizes our focus on analytics. The bow shape in the curve calls out to the historic teacher Dronacharya from Hindu mythology. The black pedestal represents our lab’s efforts to achieve perfect knowledge and share it globally through research.</li>
            <li><b>Red nib:</b> Red signifies passion and energy. The fountain pen nib symbolizes writing, while the glowing bulb represents new ideas, collectively depicting our enthusiasm for spreading knowledge.</li>
            <li><b>The black maze:</b> The maze symbolizes confusion with no entry or exit. The red arrows pierce through the trap in all directions, creating a way out by expanding boundaries.</li>
            <li><b>The double-headed arrow</b> signifies helping others by opening new areas of knowledge. One arrow focuses on short-term impact, while the other focuses on long-term contributions.</li>
            <li>At the core is a <b>glowing crystal</b> with colors inspired by a peacock palette, representing diverse ideas. Rotating networking rings surround the crystal.</li>
            <li><b>Mandalam:</b> The glowing core is surrounded by a mandalam, a symbol from Hindu mysticism representing the universe and interconnectedness. RISHA Lab welcomes individuals from all disciplines who share a passion for enriching the field of computing.</li>
          </ul>
          <hr className="my-4 border-gray-300 dark:border-gray-600" />
        </div>
      </div>
    </motion.div>
  );
}
