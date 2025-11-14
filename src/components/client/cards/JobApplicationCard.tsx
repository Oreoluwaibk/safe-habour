"use client"
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn'
import Status from '@/components/general/Status'
import { ClockCircleOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons'
import { App, Card } from 'antd'
import React, { useState } from 'react'
import { JobDetails } from '../../../../utils/interface'
import moment from 'moment'
import { savedPreferredTime } from '../../../../utils/savedInfo'
import ApplicationModal from '../modal/ApplicationModal'
import useApplicationStatus from '@/hooks/useApplicationStatus'

interface props {
  jobDetails: JobDetails; 
}
const JobApplicationCard = ({ jobDetails }: props) => {
    const [ openModal, setOpenModal ] = useState(false);
    const { statusTitle, colors } = useApplicationStatus(jobDetails.status, 'job');

  return (
    <>
     <Card
        title={
            <div>
                <CardTitle 
                    title={jobDetails.jobTitle || "Hire Service"} 
                    description={`Recurring: ${jobDetails.isReocurringJob ? "Yes" : "No"}`} 
                    status={ <Status title={statusTitle} bg={colors.bg} color={colors.color} />} 
                /> 

                <p className=' mt-[-10px] text-[#343434] text-lg'>{jobDetails.jobDescription.substring(0,100)}...</p>

                <div className='flex items-center gap-12 mt-4'>
                     <div className='flex items-center gap-2 '>
                        <EnvironmentOutlined color='#670316' className='!text-[#670316]'/>
                        <p className='text-[#646464] font-normal'>{jobDetails.location}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <ClockCircleOutlined color='#646464' className='!text-[#646464]' />
                        <p className='text-[#646464] font-normal'>{jobDetails && savedPreferredTime.find(time => time.id === jobDetails.timePreference)?.title} - {moment(jobDetails.dateNeeded).format("DD/MM/YYYY")} </p>
                    </div>
                </div>

            </div>
        }
        extra={<div className='flex flex-col items-end justify-between w-full'>
            <Status title={jobDetails.applicantCount === 0 ? 'No Application Yet'  : jobDetails.applicantCount === 1 ? `${jobDetails.applicantCount} Application` : `${jobDetails.applicantCount} Applications`} bg='#f5f5f5' color='#1E1E1E' />
            <div style={{height: 30}}></div>
            <RoundBtn icon={<EyeOutlined className='!text-[#670316]' />} title='View Details' onClick={()=> setOpenModal(true)} />
        </div>}
        classNames={{ header: "!pb-4", body: "flex flex-col gap-2"}}
       
    />
    {openModal && <ApplicationModal 
        open={openModal} 
        onCancel={() => setOpenModal(false)} 
        jobDetails={jobDetails} />}
    </> 
    
  )
}

export default JobApplicationCard