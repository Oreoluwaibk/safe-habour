"use client"
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn'
import Status from '@/components/general/Status'
import { ClockCircleOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

interface props {
    confirmed?: boolean;
}
const UpcomingScheduleCard = ({ confirmed }: props) => {
    const router = useRouter();
  return (
    <Card
        title={
        <div className='flex flex-col gap-1 pb-5'>
            <CardTitle 
                title='Senior Care Assistant' 
                description='Client: Margaret Thompson'
                status={ <Status title={confirmed ? 'Confirmed' : "Pending"} bg={confirmed ? "#F4FFFA" : "#FFF5F5"} color={confirmed ? "#039855" : "#FF0004"} />} 
            />
            <div className='flex items-center gap-2 mt-[-20px]'>
                <EnvironmentOutlined color='#670316' className='!text-[#670316]'/>
                <p className='text-[#343434] font-normal'>Toronto</p>
            </div>
            <div className='flex items-center gap-2'>
                <ClockCircleOutlined color='#670316' className='!text-[#670316]' />
                <p className='text-[#343434] font-normal'>(Fri) September 19 . 8 am - 12 pm</p>
            </div>

        </div>}
        extra={
            <div className='flex flex-col justify-center gap-2 items-end'>
                <p className='text-[#039855] font-semibold text-xl'>$23/hour</p>
                {confirmed && <div className='flex items-center gap-2'>
                    <RoundBtn onClick={() => {}} width={187} title='Mark as Complete' icon={<ClockCircleOutlined className='text-[#670316]' />} />
                    <RoundBtn primary onClick={() => router.push("/dashboard/worker/info")} title='View Details' icon={<EyeOutlined className='text-[#670316]' />} />
                </div>}
                {!confirmed && <div className='flex items-center gap-2'>
                    <RoundBtn onClick={() => router.push("/dashboard/worker/info")} title='View Details' />
                    <RoundBtn primary onClick={() => {}} title='Accept' />
                </div>}
            </div>
        }
        classNames={{ body: "!h-[0px] !p-0" }}
    />
  )
}

export default UpcomingScheduleCard