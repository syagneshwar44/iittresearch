"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from 'lucide-react';

const sponsorImages = [
  { path: '/assets/sponsors/MicrosoftResearch.png', size: 'large' },
  { path: '/assets/sponsors/bosch.png', size: 'medium' },
  { path: '/assets/sponsors/accenturelabs.png', size: 'small' },
  { path: '/assets/sponsors/codechef.png', size: 'medium' },
  { path: '/assets/sponsors/COL.jpg', size: 'large' },
  { path: '/assets/sponsors/waterloo.jpg', size: 'medium' },
  { path: '/assets/sponsors/dst.png', size: 'small' },
  { path: '/assets/sponsors/earthwatch.png', size: 'medium' },
  { path: '/assets/sponsors/exafluence.png', size: 'small' },
  { path: '/assets/sponsors/GoogleResearch.png', size: 'medium' },
  { path: '/assets/sponsors/IBMIRL.jpg', size: 'small' },
  { path: '/assets/sponsors/ISRO.png', size: 'medium' },
  { path: '/assets/sponsors/rlf.jpg', size: 'small' },
  
  
];

export default function Sponsors() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {sponsorImages.map((sponsor, index) => (
               <a href="/collaborations">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`
                relative group bg-white rounded-xl shadow-lg p-6
                ${sponsor.size === 'large' ? 'col-span-2 h-48' : ''}
                ${sponsor.size === 'medium' ? 'h-40' : ''}
                ${sponsor.size === 'small' ? 'h-32' : ''}
              `}
            >
              <div className="w-full h-full relative flex items-center justify-center">
             
                <img
                  src={sponsor.path}
                  alt={sponsor.path.split('/').pop()?.split('.')[0] || 'Sponsor'}
                  className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:brightness-110"
                  // style={{
                  //   filter: 'grayscale(100%)',
                  // }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl" />
            </motion.div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
