import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Futuristic page transition component
const PageTransition = ({ children }) => {
  // State to track if component is ready to animate
  const [isReady, setIsReady] = useState(false);

  // Add a small delay before starting the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 700); // Increased delay to ensure DOM is fully ready
    
    return () => clearTimeout(timer);
  }, []);

  // Variants for the page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(8px)',
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    in: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    out: {
      opacity: 0,
      scale: 1.02,
      filter: 'blur(8px)',
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
  };

  // Transition settings for smooth, futuristic feel
  const pageTransition = {
    type: 'tween',
    ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for a smooth, futuristic curve
    duration: 0.5,
  };

  // If not ready, render children without animation
  if (!isReady) {
    return (
      <div className="w-full h-full relative overflow-hidden">
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full h-full"
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Blue glow effect overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.1, 0],
          boxShadow: [
            'inset 0 0 50px rgba(59, 130, 246, 0)',
            'inset 0 0 100px rgba(59, 130, 246, 0.3)',
            'inset 0 0 50px rgba(59, 130, 246, 0)'
          ]
        }}
        transition={{ 
          duration: 1.5, 
          ease: 'easeInOut',
          times: [0, 0.5, 1]
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default PageTransition;
