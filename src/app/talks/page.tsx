'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import YearlyPapers from '../components/YearlyPapers';

interface Document {
  id: string;
  url: string;
  authors: string;
  direct: string;
  title: string;
  venue: string;
  createdAt: any;
  links: string;
}

export default function TalksPage() {
  const [talks, setTalks] = useState<Document[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalks = async () => {
      try {
        const talksRef = collection(db, 'talks');
        const q = query(talksRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const talksList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          url: doc.data().url || '/placeholder-image.jpg',
          authors: doc.data().authors || '',
          direct: doc.data().direct || '#',
          title: doc.data().title || '',
          venue: doc.data().venue || '',
          createdAt: doc.data().createdAt,
          links: doc.data().links || ''
        }));

        setTalks(talksList);

        // Extract unique years
        const uniqueYears = [...new Set(talksList.map(talk => 
          talk.createdAt.toDate().getFullYear()
        ))].sort((a, b) => b - a); // Sort years in descending order

        setYears(uniqueYears);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching talks:', error);
        setError(error.message || 'Failed to load talks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTalks();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div className="space-y-3">
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <hr />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Latest Talks
        </h1>
        <hr />
        <div className="prose dark:prose-invert max-w-none mb-8">
          <p>
            I have always enjoyed delivering talks and interacting with faculty, students and industry professionals 
            in the area of Software Engineering, Educational Technologies and Computing for Society. 
            I also deliver some talks as an ACM Eminent Speaker 
            (<a href="https://india.acm.org/education/learning/esp/sridhar-chimalakonda" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              https://india.acm.org/education/learning/esp/sridhar-chimalakonda
            </a>). 
            If you want me to deliver a talk, please reach out to me!
          </p>
          
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Disclaimer - My talks are inclined to be a bit provocative in an attempt to raise 
            curiosity in the audience (especially students) :)
          </p>
        </div>

        <div className="space-y-12">
          {years.map((year) => (
            <div key={year} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {year}
              </h2>
              <YearlyPapers 
                year={year} 
                docs={talks}
                style="talks"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 