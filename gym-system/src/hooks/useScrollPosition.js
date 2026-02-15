// src/hooks/useScrollPosition.js
import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    // Add event listener
    window.addEventListener('scroll', updatePosition);

    // Update once on mount to get initial position
    updatePosition();

    // Cleanup (Crucial for preventing memory leaks)
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};

export default useScrollPosition;