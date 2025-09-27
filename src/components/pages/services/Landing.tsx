"use client"
import { Button, Col, Row } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BgChecked, Family, R1, R3, R4, R5, Rec1, Rec2, Rec3, Rec4, Service1, Service2, Service3, Service4, SideVec, Star1, Star2 } from '../../../../assets/image'
import ColoredText from '@/components/general/ColoredText'
import Search from '@/components/general/Search';
import useWindowWidth from '@/hooks/useWindowResize'


const Landing = () => {
    const [fontSize, setFontSize] = useState<number>(72);
    const width = useWindowWidth();

    useEffect(() => {
        const size = width <= 1042 ? 40 : 72;
        setFontSize(size);
    }, []);
    
  return (
    <div style={{position: "relative", backgroundColor: "#FFF8F9"}} className='min-h-[675px] '>
        <Image src={SideVec} alt='side vec' style={{position: "absolute", top: 0}} />
        <Row gutter={[0,5]} className='h-full !px-6 md:!px-25 !items-center !justify-center !pt-16'>
            <Col lg={14} sm={24} xs={24} className='!font-opensans h-full !flex !flex-col !justify-center gap-2 md:!px-10 md:!pr-20'>
                <p className='!flex !items-center !text-[40px] md:!text-[72px] !flex-wrap font-semibold md:!mb-6'>
                    SafeHarbour 
                    <ColoredText title='Services' size={fontSize} />
                </p>

                <p className='!text-lg md!text-2xl w-full'>From personal care to household support, our vetted professionals provide the services Canadian families need most.</p>

                <div className='flex items-center gap-8 mt-6'>
                    <Button type="primary" className='md:min-w-[220px]'>Get Started Today</Button>
                </div>
            </Col>

            <Col lg={10} sm={24} xs={24} className='mt-8 md:mt-0'>
                <Row gutter={[0,15]} className='md:!pr-9 !relative'>
                   <Col lg={10} sm={10} xs={10}>
                    <Image src={Service1} alt='service 1' className='!rounded-[12px] object-cover !h-[121px] md:!h-full' />
                   </Col>

                   <Col lg={14} sm={14} xs={14} className='md:!pr-5 !pl-2 md:!pl-0'>
                    <Image src={Service2} alt='service 1' className='!rounded-[12px] object-cover !h-[166px] md:!h-full' />
                   </Col>
                   <Col lg={14} sm={14} xs={14} className='!flex !justify-end !pr-5'>
                    <Image src={Service4} alt='service 1' className='!rounded-[12px] object-cover !h-[186px] md:!h-full' />
                   </Col>
                   <Col lg={10} sm={10} xs={10}>
                    <Image src={Service3} alt='service 1' className='!rounded-[12px] object-cover !h-[136px] md:!h-full' />
                   </Col>
                </Row>
            </Col>
        </Row>
    </div>
  )
}

export default Landing