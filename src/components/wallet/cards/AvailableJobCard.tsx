"use client"
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import { ClockCircleOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { jobs } from '../../../../utils/interface'
import { savedPreferredTime } from '../../../../utils/savedInfo'
import ApplyJob from '../modal/ApplyJob'
import moment from 'moment'
import { timeAgo } from '../../../../utils/converters'

interface props {
  job: jobs
}
const AvailableJobCard = ({ job }: props) => {
    const router = useRouter();
    const [ openModal, setOpenModal ] = useState(false);
  return (
     <Card
        title={<CardTitle title={job.jobTitle} description={`Client: ${job?.client?.name || ""}`} />}
        extra={<Rating />}
        actions={[
          <div className='flex items-center justify-between px-4' key={1}>
            <span className='text-[#3E3E3E] text-sm bg-[#fafafa] px-2 py-1 rounded-full'>Posted: {job.createdAt && timeAgo(job.createdAt)}</span>

            <div className='flex items-center gap-4 px-6 py-4'>
            <Button icon={<EyeOutlined />} type="default" className='md:!w-[129px] !h-[48px] !text-[#670316]' style={{borderRadius: 50}} onClick={() => router.push(`/dashboard/worker/jobs/${job.id}`)}>View Details</Button>
            <Button  type="primary" onClick={() => setOpenModal(true)} className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Apply Now</Button>
          </div>
          </div>
        ]}
        classNames={{ body: "flex flex-col gap-2 !py-1" }}
    >
       <p className='text-[#343434]'>{job.jobDescription}</p>

       <div className='flex items-center justify-between'>
        <span className='text-[#646464]'><EnvironmentOutlined className='!text-[#670316] mr-1' /> {job.location}</span>
        <span className='text-[#646464]'><ClockCircleOutlined className='!text-[#670316] mr-2' /> {moment(job.dateNeeded).format("DD/MM/YYYY")} {job && savedPreferredTime.find(time => time.id === job?.timePreference)?.title}</span>
       </div>


       {openModal && <ApplyJob open={openModal} onCancel={() => setOpenModal(false)} job={job} />}
    </Card>
  )
}

export default AvailableJobCard