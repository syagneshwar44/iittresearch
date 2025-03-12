"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { collection, getDocs, query, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Author {
  key: string;
  title: string;
}

interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  url: string;
  direct: string;
  links?: string;
  date?: Timestamp;
  createdAt?: Timestamp;
}

const authors: Author[] = [
  { key: "sc", title: "Dr. Sridhar Chimalakonda" },
  { key: "sy", title: "Shrabani Yangeshwar" },
  { key: "av", title: "Akhila Sri Manasa Venigalla" },
  { key: "sr", title: "Sriram" },
  { key: "er", title: "Eshaan Rao" },
  { key: "jk", title: "Jhanvi K" },
  { key: "ms", title: "M V Sonith" },
  { key: "hl", title: "Hemasri Sai Lella" },
  { key: "as", title: "Ajinkya sawarkar" },
];

export default function FeatPub() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        console.log('Fetching publications...');
        const pubsRef = collection(db, 'publications');
        
        // Try both date and createdAt fields for ordering
        let q = query(pubsRef, orderBy('createdAt', 'desc'), limit(3));
        let querySnapshot = await getDocs(q);

        // If no results with createdAt, try with date field
        if (querySnapshot.empty) {
          console.log('No results with createdAt, trying date field...');
          q = query(pubsRef, orderBy('date', 'desc'), limit(3));
          querySnapshot = await getDocs(q);
        }
        
        if (querySnapshot.empty) {
          console.log('No publications found in either query');
          setPublications([]);
          return;
        }

        console.log('Processing results...');
        const pubsList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Raw publication data:', data);
          
          return {
            id: doc.id,
            title: data.title || 'Untitled',
            authors: data.authors || '',
            venue: data.venue || '',
            url: data.url || '/placeholder-image.jpg',
            direct: data.direct || '#',
            links: data.links,
            date: data.date,
            createdAt: data.createdAt,
          } as Publication;
        });

        console.log('Publications processed:', pubsList);
        setPublications(pubsList);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching publications:', error);
        setError(error.message || 'Failed to load publications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-6 animate-pulse">
            <div className="w-1/4">
              <div className="h-[150px] bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
            <div className="w-3/4 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (publications.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
        <p className="text-yellow-600 dark:text-yellow-400">No publications found.</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="space-y-8">
        <motion.h2 
          className="text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Recent Publications
        </motion.h2>
        
        {publications.map((pub, index) => (
          <motion.div
            key={pub.id}
            className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-full md:w-1/4">
              {pub.url ? (
                <motion.div
                  className="relative h-[150px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Image
                    src={pub.url}
                    alt={pub.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </motion.div>
              ) : (
                <div className="h-[150px] rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>

            <div className="w-full md:w-3/4 space-y-3">
              <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
                {pub.authors?.split(",").map((key, i, arr) => {
                  const author = authors.find(a => a.key === key.trim());
                  return author ? (
                    <span key={i}>
                      <Link 
                        href={`/info/${key.trim()}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {author.title}
                      </Link>
                      {i < arr.length - 1 ? ',' : ''}
                    </span>
                  ) : (
                    <span key={i} className="text-gray-500">{key.trim()}{i < arr.length - 1 ? ',' : ''}</span>
                  );
                })}
              </div>

              <a 
                href={pub.direct}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              >
                {pub.title}
              </a>

              <p className="text-gray-600 dark:text-gray-300">{pub.venue}</p>

              {pub.links && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {pub.links.split(']')
                    .filter(str => /\S/.test(str))
                    .map((link, i) => {
                      const [label, url] = link.split('[');
                      return url && (
                        <a
                          key={i}
                          href={url.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {label.trim()}
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15 3h6v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 14L21 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      );
                    })}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
