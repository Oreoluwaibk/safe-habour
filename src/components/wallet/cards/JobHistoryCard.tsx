"use client"
import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { ClockCircleOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Card, Rate } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import RateModal from '../modal/RateModal'
import { IJobApplication, IUser } from '../../../../utils/interface'

interface props {
    job: IJobApplication;
    user: IUser;
    refresh: () => void;
}
const JobHistoryCard = ({ job, user, refresh }: props) => {
    const router = useRouter();
    const [ openModal, setOpenModal ] = useState(false);
  return (
    <Card
        title={
            <div>
                <CardTitle title={job.jobDetails.jobTitle} description={`Client: ${job.client?.name}`} status={<Status title='Completed' />} /> 

                <div className='flex items-center gap-5 text-sm'>
                    <div className='flex items-center gap-2'>
                        <ClockCircleOutlined className='#343434' />
                        <span>{job.jobDetails.timePreference} Hours</span>
                    </div>
                    <Status title='Completed' bg='#f4f4f4' color='#343434' />
                </div>
            </div>
        }
        extra={<div className='flex flex-col gap-2'>
            <span className='text-[#039855] text-lg'>${job.jobDetails.budget}</span>
            <div>
                <Rate className='text-[#FFDD33] text-xs' value={5} count={5}   /><span className="text-sm">5</span>
            </div>
            
        </div>}
        classNames={{ header: "!pb-4", body: "flex flex-col gap-2"}}
        actions={[
            <div className='flex items-center justify-end px-4' key={1}>
                <div className='flex items-center gap-4 px-6 py-4'>
                <Button icon={<StarOutlined />} type="default" className='md:!min-w-[129px] !h-[48px] !text-[#670316]' style={{borderRadius: 50}} onClick={() => setOpenModal(true)}>Rate Experience</Button>
                <Button onClick={() => router.push(`/dashboard/worker/info/${job.id}`)} icon={<EyeOutlined />} type="primary" className='md:!min-w-[129px] !h-[48px]' style={{borderRadius: 50}}>View Details</Button>
            </div>
            </div>
        ]}
    >
        {<div>
            <p className='text-[#343434] text-base font-semibold'>Client Review:</p>

            <span className='border-[#B1FFDC] text-[#1e1e1e] text-sm px-2 py-3 rounded-xl bg-[#F3FFF9]'>
            Exceptional care and attention. Sarah was punctual, professional, and genuinely caring with my mother. Highly recommend!
            </span>
        </div>}
       

        {openModal && <RateModal 
            open={openModal} 
            onCancel={() => setOpenModal(false)} 
            job={job.jobDetails}
            user={user}
            refresh={refresh}
        />}
    </Card>
  )
}

export default JobHistoryCard