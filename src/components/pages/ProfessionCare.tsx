"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { PLine } from '../../../assets/icons';
import ColoredText from '../general/ColoredText';
import useWindowWidth from '@/hooks/useWindowResize';
import ServicesTabs from '../general/ServicesTabs';
import "@/app/styles/profcare.css";

const ProfessionCare = () => {
  const [fontSize, setFontSize] = useState<number>(72);
  const width = useWindowWidth();

  useEffect(() => {
    const size = width <= 1042 ? 24 : 32;
    setFontSize(size);
  }, []);

  return (
    <div className='container1 '>
      <Image src={PLine} alt='P line' className='absolute top-0 left-[20%] hidden md:block !overflow-hidden' />

      <p className='header'>Professional Care <ColoredText title='Services' size={fontSize} /></p>
      <div className='flex items-center justify-center mt-2'>
        <p className='p2 !text-center'>From personal care to household support, our vetted professionals provide the services Canadian families need most.</p>
      </div>
      

      <div className='!mt-6 md:!mt-16'>
        <ServicesTabs />
      </div>
    </div>
  )
}

export default ProfessionCare;