import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import Status from '@/components/general/Status';
import { EyeOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react'

interface props {
    accepted?: boolean;
}
const JobApplication = ({ accepted }: props) => {
    const router = useRouter();
  return (
    <Card
        title={
            <div>
                <CardTitle 
                    title='Senior Care Assistant' 
                    description="Client: Margaret Thompson" 
                    // status={<Status title='Completed' />} 
                    status={ <Status title={accepted ? 'Accepted' : "Pending"} bg={accepted ? "#F4FFFA" : "#FFF5F5"} color={accepted ? "#039855" : "#FF0004"} />} 
                /> 

                <Status title='Applied: 16/09/2025' size={12} bg='#F4F4F4' color='#343434'  />

            </div>
        }
        extra={<RoundBtn icon={<EyeOutlined className='!text-[#670316]' />} title='View Details' onClick={() => router.push("/dashboard/worker/info")} />}
        classNames={{ header: "!pb-4", body: "flex flex-col gap-2"}}
       
    >
         <div className='flex flex-col gap-4'>
            <p className='text-[#343434] text-base font-semibold'>Your Message:</p>

            <span className='border-[#C5C5C5] text-[#1e1e1e] text-sm px-2 py-3 rounded-xl bg-[#FBFBFB]'>
            I have 8+ years of experience in elder care and am available for the requested hours. I specialize in medication management...
            </span>
        </div>

        {accepted && <div className='flex flex-col gap-4'>
            <p className='text-[#343434] text-base font-semibold'>Client Review:</p>

            <span className='border-[#B1FFDC] text-[#1e1e1e] text-sm px-2 py-3 rounded-xl bg-[#F3FFF9]'>
            Exceptional care and attention. Sarah was punctual, professional, and genuinely caring with my mother. Highly recommend!
            </span>
        </div>}
    </Card>
  )
}

export default JobApplication