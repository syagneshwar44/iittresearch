'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const names = [
  "Dr. Sridhar Chimalakonda",


  "Dr. Sridhar Chimalakonda", "Sharbani Yagneshwar", "Kesav V. Nori", "Suresh Jain", "Akhila Sri Manasa Venigalla", "A Eashaan Rao", "Shriram Shridhar Shanbhag", "Chaitanya S. Lakkundi", "Noble Saji Mathews", "Debeshee Das", "Rajrupa Chattaraj", "Jahnavi K", "Madasu Aashirth Sai", "Anuraag Reddy", "Sedamaki Kranthi", "Viramgama Jaimin", "Shivadharshan S", "KOWSHIK REDDY CHALLA", "Aarya Chepuri", "K Sanjay Varshith", "Tanguturi Mokshith Reddy", "Sasaank Janapati", "Akilesh P", "M V Sonith", "Hemasri Sai Lella", "Preethi Varsha Marivina", "Kurra Manasa", "Rahul Krishna Gaddam", "Ajinkya Sawarkar", "Akash Dhasade", "Saket Dattatreya Joshi", "Dheeraj Vagavolu", "Kowndinya Boyalakuntla", "Karthik Chandra", "K Rishitha", "Aparna Vadlamani", "Ashutosh Rajput", "Nakshatra Gupta", "Deep Ghadiyali", "Abhishek Kumar", "Tejasva Motsara", "Vartika Agrahari", "Vaishali Kamal Khanve", "Nikhil Sharma", "Vishal Mishra", "Sangle Shubham Rajendra", "K Saran Teja Reddy", "Jakku Sai Krupa Reddy", "Sandeep Muvva", "Mahendran N", "Mir Sameed Ali", "Nikhil Manjunath", "Prantik Parashar Sarmah", "Shruti Priya", "Shubhankar Bhadra", "Shriram Shridhar Shanbhag", "Madasu Aashirth Sai", "Anuraag Reddy", "Sedamaki Kranthi", "Noble Saji Mathews"
  // please Add more names if someone joins rishalab
];

export default function YoyoPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let isMouseDown = false;

    class Particle {
      constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.mass = Math.random() * 2 + 1;
      }

      update() {
        if (isMouseDown) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = Math.min(500 / (distance * distance), 10);
          
          this.vx += (dx / distance) * force;
          this.vy += (dy / distance) * force;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Boundary collision
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -0.8;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -0.8;

        // Friction
        this.vx *= 0.99;
        this.vy *= 0.99;
      }
    }

    function init() {
      particles = names.map((name) => new Particle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        name
      ));
    }

    function animate() {
      if (!containerRef.current) return;
      const ctx = containerRef.current.getContext('2d');
      
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      ctx.fillStyle = 'rgba(3, 3, 3, 0.88)';
      ctx.font = '26px Inter';
      
      particles.forEach((particle) => {
        particle.update();
        ctx.fillText(particle.name, particle.x, particle.y);
      });
      
      requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handleMouseDown() {
      isMouseDown = true;
    }

    function handleMouseUp() {
      isMouseDown = false;
    }

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mousedown', handleMouseDown);
      containerRef.current.addEventListener('mouseup', handleMouseUp);
      
      init();
      animate();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mousedown', handleMouseDown);
        containerRef.current.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-white text-white overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
          Our Amazing Team Members
        </h1>
        <p className="text-center text-blue-400 mb-12">
          Click and drag to interact with the names
        </p>
      </div>
      <canvas
        ref={containerRef}
        className="fixed inset-0 w-full h-full"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
} 