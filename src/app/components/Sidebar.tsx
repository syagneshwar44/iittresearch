'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';
import { FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';
import Ticker from './Ticker';

export default function Sidebar() {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 space-y-6">
      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Dr. Sridhar Chimalakonda
        </h4>
        <div className="flex flex-col items-center text-center">
          <div className="relative w-48 h-48 mb-4">
            <Image
              src="https://2020.msrconf.org/getProfileImage/sridharchimalakonda/76c8c23f-1094-41a3-ac57-9d38bf899419/small.jpg?1596264188000"
              alt="Dr. Sridhar Chimalakonda"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p className="font-medium">
              Associate Professor and Head,<br />
              Department of Computer Science & Engineering<br />
              <a 
                href="https://www.iittp.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                IIT Tirupati, India
              </a>
            </p>
            <p className="font-medium mt-4">
              Adjunct Associate Professor<br />
              David R. Cheriton School of Computer Science<br />
              <a 
                href="https://uwaterloo.ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                University of Waterloo, Canada
              </a>
            </p>
            <p className="mt-4">
              Email:{' '}
              <a 
                href="mailto:ch@iittp.ac.in"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                ch@iittp.ac.in
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Link 
              href="https://researchweb.iiit.ac.in/~sridhar_ch/home.html"
              target="_blank"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              About Me
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href="/talks"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Talks
            </Link>
          </div>
        </div>
      </div>

      {/* Conference Deadlines */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <Link 
          href="/calendar"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Upcoming Conference Deadlines
        </Link>
      </div>

      {/* News Section */}
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 cursor-pointer"
        onClick={() => window.location.href = '/news'}
      >
        <div className="flex items-center gap-2 mb-4">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">News</h4>
          <BiLinkExternal className="text-gray-500" />
        </div>
        <Ticker />
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Find us on
        </h4>
        <div className="space-y-3">
          <a 
            href="https://twitter.com/rishalab" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaTwitter className="text-xl" />
            <span>Twitter</span>
          </a>
          <a 
            href="https://www.youtube.com/channel/UCcetB0OV3W1iUK69JRHHLTw" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
          >
            <FaYoutube className="text-xl" />
            <span>Youtube</span>
          </a>
          <a 
            href="https://github.com/rishalab" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <FaGithub className="text-xl" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </aside>
  );
} 