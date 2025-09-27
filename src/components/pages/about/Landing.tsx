"use client"
import { Button, Col, Row } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BgChecked, Family, R1, R3, R4, R5, Rec1, Rec2, Rec3, Rec4, SideVec, Star1, Star2 } from '../../../../assets/image'
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
    <div style={{position: "relative", backgroundColor: "#FFF8F9"}} className='min-h-[919px] '>
        <Image src={SideVec} alt='side vec' style={{position: "absolute", top: 0}} />
        <Row gutter={[0,5]} className='h-full !px-6 md:!px-25 !items-center !justify-center !pt-16'>
            <Col lg={14} sm={24} xs={24} className='!font-opensans h-full !flex !flex-col !justify-center gap-2 md:!px-10 md:!pr-20'>
                <p className='!flex !items-center !text-[40px] md:!text-[72px] !flex-wrap font-semibold'>
                    SafeHarbour 
                    <ColoredText title='Services' size={fontSize} />
                </p>

                <p className='!text-lg md!text-2xl w-full'>From personal care to household support, our vetted professionals provide the services Canadian families need most.</p>

                <div className='flex items-center gap-8 mt-6'>
                    <Button type="primary" className='md:min-w-[220px]'>Get Started Today</Button>
                </div>
            </Col>

            <Col lg={10} sm={24} xs={24} className='mt-8 md:mt-0'>
                <Row gutter={[0,15]} className='!pr-9 !relative'>
                    <Image src={BgChecked} alt='bg checked' className='absolute top-6 md:top-0 left-[15%] z-[2]' />
                    <Col lg={12} sm={12} xs={12} className='!p-0 !flex !items-center !justify-center !relative !px-2 md:!px-0'>
                        <Image src={R1} alt='r1'className='!h-[432px] z-1' />
                        <Image src={Rec1} alt='bg checked' className='absolute bottom-0' />
                    </Col>
                    <Col lg={12} sm={12} xs={12} className='!flex !items-center !p-0 !relative !px-2 md:!px-0'>
                        <Image src={Star1} alt='bg checked' className='absolute top-[24%] md:top-[18%] right-3 md:right-20 z-[2]' />
                        <Image src={R4} alt='r1' className='!h-[283px] z-1'/>
                        <Image src={Rec2} alt='bg checked' className='absolute bottom-15' />
                    </Col>
                    <Col lg={12} sm={12} xs={12} className='!flex !items-center !p-0 !justify-center !relative !px-2 md:!px-0'>
                        <Image src={R3} alt='r1' className='!h-[323px] z-1'/>
                        <Image src={Rec3} alt='bg checked' className='absolute top-0' />
                    </Col>
                    
                    <Col lg={12} sm={12} xs={12} className='!flex !items-start !p-0 !mt-[-80px] !relative !px-2 md:!px-0'>
                        <Image src={Star2} alt='bg checked' className='absolute top-[12%] md:top-[5%] left-0 z-[2]' />
                        <Image src={Family} alt='bg checked' className='absolute bottom-[27px] md:bottom-[-15px] z-[2]' />
                        <Image src={R5} alt='r1'className='!h-[405px] z-1' />
                        <Image src={Rec4} alt='bg checked' className='absolute top-[5%]' />
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
  )
}

export default Landing