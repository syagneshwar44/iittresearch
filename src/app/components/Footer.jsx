
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Risha Lab
            <a
              className="text-blue-600 dark:text-blue-400 hover:underline mx-1"
              href={"https://iittp.ac.in/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              IIT Tirupati
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Risha Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
