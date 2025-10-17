"use client"
import AvailabilityCard from '@/components/client/cards/AvailabilityCard';
import ProfileCard from '@/components/client/cards/ProfileCard';
import RateCard from '@/components/client/cards/RateCard';
import ClientContainer from '@/components/dashboard/ClientContainer';
import { Card, Col, Row } from 'antd';
import React, { use, useState } from 'react'

const Page = ({ params }: {params: Promise<{ worker: string }> }) => {
    const { worker } = use(params);
    const [ showHireModal, setShowHireModal ] = useState(false);

    console.log("sghe", showHireModal, worker);
    
  return (
    <ClientContainer active='Worker'>
        <Row className='min-h-[90vh] pb-6' gutter={[15,15]}>
            <Col lg={10} sm={12} xs={24} className='!flex flex-col gap-6 h-full'>
                <ProfileCard onClick={() => setShowHireModal(true)} />

                <AvailabilityCard />
            </Col>

            <Col lg={14} sm={12} xs={24} className='!flex flex-col gap-6 h-full'>
                <Card variant="borderless" styles={{body: {display: "flex", flexDirection: "column", gap:16, padding: "0 20px"}}}>
                    <div className='flex flex-col gap-3'>
                        <p className='t-pri text-2xl font-semibold'>Bio</p>
                        <p className='text-[#373737]'>Professional house cleaner with 5+ years of experience. I specialize in deep cleaning and regular maintenance. I take pride in leaving every home spotless and organized.</p>
                   </div>

                   <div className='flex flex-col gap-3'>
                        <p className='t-pri text-2xl font-semibold'>Services Offered</p>
                        <div className='flex items-center gap-4 flex-wrap font-semibold'>
                            <div className='bg-[#fff8f9] rounded-[68px] px-4 py-1'><p className='text-[#670316] text-sm'>House Cleaning</p></div>
                            <div className='bg-[#fff8f9] rounded-[68px] px-4 py-1'><p className='text-[#670316] text-sm'>Deep Cleaning</p></div>
                            <div className='bg-[#fff8f9] rounded-[68px] px-4 py-1'><p className='text-[#670316] text-sm'>Move-in/Move-out Cleaning</p></div> 
                        </div>
                   </div>
                    <div className='flex flex-col gap-3'>
                        <p className='t-pri text-2xl font-semibold'>Language</p>
                        <div className='flex items-center gap-4 flex-wrap text-[#1e1e11]'>
                            <div className='bg-[#f5f5f5] rounded-[68px] px-4 py-1'><p className='text-sm'>French</p></div>
                            <div className='bg-[#f5f5f5] rounded-[68px] px-4 py-1'><p className='text-sm'>Spanish</p></div>
                        </div>
                   </div>
                </Card>

                <Card variant="borderless" styles={{body: {display: "flex", flexDirection: "column", gap:16, padding: "0 20px"}}}>
                    <p className='t-pri text-2xl font-semibold'>Client Reviews</p>

                    <Row gutter={[15,15]}>
                        <Col lg={24} sm={24} xs={24}>
                            <RateCard />
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </ClientContainer>
  )
}

export default Page