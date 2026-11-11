"use client"
import { Button, Col, Row } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {Service1, Service2, Service3, Service4, SideVec } from '../../../../assets/image'
import ColoredText from '@/components/general/ColoredText'
import useWindowWidth from '@/hooks/useWindowResize'
import { motion } from 'framer-motion'


const Landing = () => {
    const [fontSize, setFontSize] = useState<number>(72);
    const width = useWindowWidth();

    useEffect(() => {
        const size = width <= 1042 ? 40 : 72;
        setFontSize(size);
    }, [width]);
    
  return (
    <div className="relative overflow-hidden bg-[#FFF8F9]">
        <Image src={SideVec} alt="" className="pointer-events-none absolute top-0 left-0 hidden h-auto w-auto md:block" />
        <Row gutter={[32, 24]} className="relative !mx-0 !items-start !px-6 !py-10 md:!px-20 md:!py-12 lg:!px-28">
            <Col lg={12} sm={24} xs={24} className="!font-opensans !flex !flex-col !justify-center">
                <motion.div
                    className="flex w-full flex-col gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                <p className="!flex !flex-wrap !items-center !text-[40px] font-semibold md:!text-[64px]">
                    SafeHarbour
                    <ColoredText title="Services" size={fontSize} />
                </p>

                <p className="w-full !text-lg md:!text-2xl">From personal care to household support, our vetted professionals provide the services Canadian families need most.</p>

                <div className="mt-6 flex items-center gap-8">
                    <Button type="primary" className="md:min-w-[220px]">Get Started Today</Button>
                </div>
                </motion.div>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <div className="grid grid-cols-2 items-start gap-3 md:gap-4">
                    <div className="flex flex-col gap-3 md:gap-4">
                        <Image src={Service1} alt="Care worker" className="w-full rounded-xl object-cover" style={{ width: "100%", height: width <= 768 ? 180 : 280 }} />
                        <Image src={Service3} alt="Home support" className="w-full rounded-xl object-cover" style={{ width: "100%", height: width <= 768 ? 150 : 220 }} />
                    </div>
                    <div className="flex flex-col gap-3 pt-6 md:gap-4 md:pt-10">
                        <Image src={Service2} alt="Household service" className="w-full rounded-xl object-cover" style={{ width: "100%", height: width <= 768 ? 160 : 230 }} />
                        <Image src={Service4} alt="Family care" className="w-full rounded-xl object-cover" style={{ width: "100%", height: width <= 768 ? 190 : 290 }} />
                    </div>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Landing