"use client"
import { Col, Row } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Ts1, Ts2, Ts3, Ts4 } from '../../../../assets/image'
import ColoredText from '@/components/general/ColoredText'
import useWindowWidth from '@/hooks/useWindowResize'


const Landing = () => {
    const [fontSize, setFontSize] = useState<number>(72);
    const width = useWindowWidth();

    useEffect(() => {
        const size = width <= 1042 ? 40 : 72;
        setFontSize(size);
    }, []);
    
  return (
    <div style={{position: "relative", backgroundColor: "#FFF8F9", marginBottom: 50}} className='min-h-[675px] '>
        <Row gutter={[0,5]} className='h-full !px-6 md:!px-25 !items-center !justify-center !pt-16'>
            <Col lg={14} sm={24} xs={24} className='!font-opensans h-full !flex !flex-col !justify-center gap-2 md:!px-10 md:!pr-20'>
                <p className='!flex !items-center !text-[40px] md:!text-[72px] !flex-wrap font-semibold md:!mb-6'>
                    Your Safety is our  
                    <ColoredText title='Priority' size={fontSize} />
                </p>

                <p className='!text-lg md!text-2xl w-full'>We take trust seriously. Every worker is thoroughly vetted, insured, and monitored to ensure the highest standards of safety and reliability.</p>

            </Col>

            <Col lg={10} sm={24} xs={24} className='mt-8 md:mt-0'>
                <Row gutter={[15,15]} className='md:!pr-9 !relative'>
                    <Col lg={14} sm={12} xs={12}className='col_image'>
                        <Image src={Ts1} alt='c 1' className='object-cover col_image' />
                    </Col>
                    <Col lg={10} sm={12} xs={12}className='md:!h-[186px]'>
                        <Image src={Ts2} alt='c 1' className='!h-[186px] object-cover rounded-[12px]' />
                    </Col>

                    <Col lg={12} sm={12} xs={12}>
                        <Image src={Ts3} alt='c 1'className='col_image2 object-cover' />
                    </Col>
                    <Col lg={12} sm={12} xs={12}>
                        <Image src={Ts4} alt='c 1'className='col_image2 object-cover' />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
  )
}

export default Landing