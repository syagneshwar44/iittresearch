'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // State for menu toggle

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);  // Toggle mobile menu
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="logo">
        <Link href="/aboutlogo">
          <Image
            src={darkMode ? '/assets/logo_dark.png' : '/assets/logo_light.png'}
            alt="Logo"
            width={200}
            height={40}
          />
        </Link>
      </div>
      <div style={{
      display: "flex",
      justifyContent: "flex-start", // Aligns contents to the left
      alignItems: "center",
      paddingTop:"22px",
      width: "80%", // Adjust width as needed
      maxWidth: "1200px", // Prevents excessive width on large screens
    }}>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}> 
        <li><Link href="/">Home</Link></li>
        <li><Link href="/publication">Publication</Link></li>
        <li><Link href="/people">People</Link></li>
        <li><Link href="/collaborations">Collaborations</Link></li>
        <li><Link href="/slambook">SlamBook</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/join">Join Us</Link></li>
        {/* <li><Link href="/calendar">Calendar</Link></li>
        <li><Link href="/gallery">Gallery</Link></li>
        <li><Link href="/news">News</Link></li>
        <li><Link href="/talks">Talks</Link></li> */}
      </ul>
      </div>
      <div className="toggle-container">
        <button 
          onClick={toggleDarkMode} 
          className={`toggle-btn ${darkMode ? 'active' : ''}`}
        >
          <span className="toggle-circle"></span>
        </button>
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>  {/* Hamburger Menu */}
        <div className={`line ${isMenuOpen ? 'line1' : ''}`}></div>
        <div className={`line ${isMenuOpen ? 'line2' : ''}`}></div>
        <div className={`line ${isMenuOpen ? 'line3' : ''}`}></div>
      </div>
    </nav>
  );
}

