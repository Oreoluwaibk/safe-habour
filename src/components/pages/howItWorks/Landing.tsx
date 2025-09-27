"use client"
import { Col, Row } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { SideVec,Works1, Works2, Works3, Works4 } from '../../../../assets/image'
import ColoredText from '@/components/general/ColoredText'
import useWindowWidth from '@/hooks/useWindowResize'


const Landing = () => {
    const [fontSize, setFontSize] = useState<number>(72);
    const width = useWindowWidth();

    useEffect(() => {
        const size = width <= 1042 ? 40 : 72;
        setFontSize(size);
    }, [width]);
    
  return (
    <div style={{position: "relative", backgroundColor: "#FFF8F9"}} className='min-h-[675px] dashbottom'>
        <Image src={SideVec} alt='side vec' style={{position: "absolute", top: 0}} />
        <Row gutter={[0,5]} className='h-full !px-6 md:!px-25 !items-center !justify-center !pt-16'>
            <Col lg={14} sm={24} xs={24} className='!font-opensans h-full !flex !flex-col !justify-center gap-2 md:!px-10 md:!pr-20'>
                <p className='!flex !items-center !text-[40px] md:!text-[72px] !flex-wrap font-semibold md:!mb-6'>
                    How SafeHarbour 
                    <ColoredText title='Works' size={fontSize} />
                </p>

                <p className='!text-lg md!text-2xl w-full'>Our simple process connects families with trusted care professionals. Whether you need care or provide care, we make it easy and secure.</p>

                
            </Col>

            <Col lg={10} sm={24} xs={24} className='mt-8 md:mt-0'>
                <Row gutter={[5,15]} className='!pr-9 !relative'>
                   <Col lg={12} sm={12} xs={12} className='!flex !flex-col !gap-4'>
                    <Image src={Works1} alt='service 1' className='!rounded-[12px] object-cover  md:object-contain' />
                    <Image src={Works2} alt='service 1' className='!rounded-[12px] object-cover  md:object-contain ' />
                   </Col>

                   <Col lg={12} sm={12} xs={12} className='!flex !flex-col !gap-4'>
                    <Image src={Works3} alt='service 1' className='!rounded-[12px] object-cover md:object-contain ' />
                    <Image src={Works4} alt='service 1' className='!rounded-[12px] object-cover  md:object-contain ' />

                   </Col>
                  
                </Row>
            </Col>
        </Row>
    </div>
  )
}

export default Landing