"use client"
import { StarFilled } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { Button, Card, Col, Row } from 'antd'
import React from 'react'
import CardTitle from '../general/CardTitle'
import UpcomingJobCard from './cards/UpcomingJobCard'
import { useRouter } from 'next/navigation'

const UpcomingContainer = () => {
    const router = useRouter();
  return (
<>
<Card
    title={<CardTitle 
        title='Upcoming Jobs' 
        icon={<span className='bg-[#FFEAEE] flex items-center justify-center !h-6 !w-6 rounded-[100px]'>
            <Icon icon="stash:data-date-light" fontSize={16} />
            </span>}
        />}
    classNames={{
        header: "linear"
    }}
    actions={[<div key={1} className='md:px-6'><Button onClick={() => router.push("/dashboard/worker/schedule")} type="default" className='md:!w-full !h-[48px] !border-[#A9A9A9]' style=     {{borderRadius: 50}} icon={<Icon icon="stash:data-date-light" fontSize={16} />}>View Full Schedule</Button></div>]}
>
    <Row gutter={[15, 15]}>
        <Col lg={24} sm={24} xs={24}>
            <UpcomingJobCard />
        </Col>
    </Row>
</Card>

<Card
    title={<CardTitle 
        title='Performance Summary' 
        icon={<span className='bg-[#FFEAEE] flex items-center justify-center !h-6 !w-6 rounded-[100px]'>
            <Icon icon="carbon:analytics" fontSize={16} />
            </span>}
        />}
    classNames={{
        header: "linear",
        body: "flex flex-col gap-6"
    }}
    className='!mt-6'

    >
        <div className='flex items-center justify-between'>
            <p className='text-lg text-[#1e1e1e]'>Rating</p>
            <div className='flex items-center gap-1'>
                <StarFilled className='!text-[#ffdd33]' />
                <span className='t-pri font-medium'>4.7</span>
                <span className='text-[#585858]'>(3 Reviews)</span>
            </div>
        </div>

        <div className='flex items-center justify-between'>
            <p className='text-lg text-[#1e1e1e]'>Job Completed</p>
             <p className='text-lg text-[#1e1e1e] font-medium'>23</p>
        </div>

        <div className='flex items-center justify-between'>
            <p className='text-lg text-[#1e1e1e]'>Response Rate</p>
             <p className='text-lg text-[#1e1e1e] font-medium'>87%</p>
        </div>
</Card>
</>
  )
}

export default UpcomingContainer