"use client"
import React, { useEffect, useState } from 'react'
import ColoredText from '../general/ColoredText'
import useWindowWidth from '@/hooks/useWindowResize';
import Image from 'next/image';
import { Pline2 } from '../../../assets/image';
import { Radio } from 'antd';
import SafetyCheck from '../general/SafetyCheck';
import "@/app/styles/profcare.css";

const SafetyPriority = () => {
    const [fontSize, setFontSize] = useState<number>(72);
    const width = useWindowWidth();
    const [ checkedValue, setCheckedValue ] = useState(1)

    useEffect(() => {
        const size = width <= 1042 ? 24 : 32;
        setFontSize(size);
    }, [width]);

  return (
    <div className='container2 !md:px-[100px]'>
      <Image src={Pline2} alt='P line' className='absolute top-0 left-[20%] hidden md:block !overflow-hidden' />
      <Radio.Group className='!hidden md:!flex !flex-col gap-10' onChange={(e) => setCheckedValue(e.target.value)} defaultValue={checkedValue}>
        <Radio value={1} className='absolute top-[33%] left-[45.8%] z-1'/>
        <Radio value={2}  className='absolute top-[42%] left-[46%] z-1'/>
        <Radio value={3} className='absolute top-[51%] left-[45.8%] z-1'/>
        <Radio value={4} className='absolute top-[60%] left-[45.7%] z-1'/>
        <Radio value={5}  className='absolute top-[69%] left-[45.4%] z-1'/>
      </Radio.Group>

      <p className='header'>Your <ColoredText title='Safety' size={fontSize} /> is Our Priority</p>
      <div className='flex items-center justify-center mt-2'>
        <p className='p2 !text-center w-full md:!w-1/2'>We take trust seriously. Every worker is thoroughly vetted, insured, and monitored to ensure the highest standards of safety and reliability.</p>
      </div>
      

      <div className='!mt-6 md:!mt-16'>
       <SafetyCheck checkedValue={checkedValue} />
      </div>
      <Radio.Group className='md:!hidden !flex !justify-center !gap-4 !mt-4' onChange={(e) => setCheckedValue(e.target.value)} defaultValue={checkedValue}>
        <Radio value={1} />
        <Radio value={2} />
        <Radio value={3} />
        <Radio value={4} />
        <Radio value={5}  />
      </Radio.Group>
    </div>
  )
}

export default SafetyPriority