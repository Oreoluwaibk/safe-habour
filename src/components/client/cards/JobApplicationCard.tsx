"use client"
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn'
import Status from '@/components/general/Status'
import { ClockCircleOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const JobApplicationCard = () => {
    const router = useRouter();
    const [open] = useState(true)
  return (
     <Card
        title={
            <div>
                <CardTitle 
                    title='House Cleaning Service' 
                    description="Client: The Johnson Family" 
                    status={ <Status title={open ? 'Open' : "Accepted"} bg={open ? "#FFF5F7" : "#FFF5F5"} color={open ? "#670316" : "#FF0004"} />} 
                /> 

                <p className=' mt-[-10px] text-[#343434] text-lg'>Weekly deep cleaning service needed for 3-bedroom house. Must have own supplies and transportation.</p>

                <div className='flex items-center gap-12 mt-4'>
                     <div className='flex items-center gap-2 '>
                        <EnvironmentOutlined color='#670316' className='!text-[#670316]'/>
                        <p className='text-[#646464] font-normal'>Toronto</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <ClockCircleOutlined color='#646464' className='!text-[#646464]' />
                        <p className='text-[#646464] font-normal'>Aug 28(Wed) - Aug 30 (Fri), 4hrs (7:00 AM)</p>
                    </div>
                </div>

            </div>
        }
        extra={<div className='flex flex-col items-end justify-between w-full'>
            <Status title='No Application Yet' bg='#f5f5f5' color='#1E1E1E' />
            <div style={{height: 30}}></div>
            <RoundBtn icon={<EyeOutlined className='!text-[#670316]' />} title='View Details' onClick={() => router.push("/dashboard/worker/info")} />
        </div>}
        classNames={{ header: "!pb-4", body: "flex flex-col gap-2"}}
       
    />
        
    
  )
}

export default JobApplicationCard