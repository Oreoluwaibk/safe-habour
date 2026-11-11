"use client"
import { useState, useEffect } from 'react';

const useWindowWidth = (): number => {
  const [width, setWidth] = useState<number>(1024);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export default useWindowWidth;
