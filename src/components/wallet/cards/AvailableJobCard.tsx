"use client"
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import { ClockCircleOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

const AvailableJobCard = () => {
    const router = useRouter();
  return (
     <Card
        title={<CardTitle title='Senior Care Assistant' description='Client: Margaret Thompson' />}
        extra={<Rating />}
        actions={[
            <div className='flex items-center justify-between px-4' key={1}>
                <span className='text-[#3E3E3E] text-sm bg-[#fafafa] px-2 py-1 rounded-full'>Posted: 2 hours ago</span>

                <div className='flex items-center gap-4 px-6 py-4'>
                <Button icon={<EyeOutlined />} type="default" className='md:!w-[129px] !h-[48px] !text-[#670316]' style={{borderRadius: 50}} onClick={() => router.push("/dashboard/worker/info")}>View Details</Button>
                <Button  type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Apply Now</Button>
            </div>
            </div>
        ]}
        classNames={{ body: "flex flex-col gap-2 !py-1" }}
    >
       <p className='text-[#343434]'>Weekly deep cleaning service needed for 3-bedroom house. Must have own supplies and transportation.</p>

       <div className='flex items-center justify-between'>
        <span className='text-[#646464]'><EnvironmentOutlined className='!text-[#670316] mr-1' /> Manitoba</span>
        <span className='text-[#646464]'><ClockCircleOutlined className='!text-[#670316] mr-2' /> Aug 28(Wed) - Aug 30 (Fri), 4hrs (7:00 AM)</span>
       </div>
    </Card>
  )
}

export default AvailableJobCard