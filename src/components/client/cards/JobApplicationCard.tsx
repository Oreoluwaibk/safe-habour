"use client"
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn'
import Status from '@/components/general/Status'
import { ClockCircleOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons'
import { App, Card } from 'antd'
import React, { useState } from 'react'
import { completeJob, JobDetails } from '../../../../utils/interface'
import moment from 'moment'
import { savedPreferredTime } from '../../../../utils/savedInfo'
import ApplicationModal from '../modal/ApplicationModal'
import useApplicationStatus from '@/hooks/useApplicationStatus'
import { completeJobAsClient } from '@/redux/action/jobs'
import { createErrorMessage } from '../../../../utils/errorInstance'

interface props {
  jobDetails: JobDetails; 
  refresh: () => void;
}
const JobApplicationCard = ({ jobDetails, refresh }: props) => {
    const [ openModal, setOpenModal ] = useState(false);
    const { statusTitle, colors } = useApplicationStatus(jobDetails.status, 'job');
    const [ loading, setLoading ] = useState(false);
    const { modal } = App.useApp();

    const handleMarkAsComplete = () => {
    const payload: completeJob = {
        jobId: jobDetails.id,
        completionNotes: ""
    }
    setLoading(true);
    completeJobAsClient(payload)
    .then(res => {
        if(res.status === 200 || res.status === 201) {
            modal.success({
                title: res.data.message || "Job is marked as completed",
                onOk: () => {
                    setLoading(false);
                    refresh()
                }
            })
        }
    })
    .catch(err => {
        modal.error({
        title: "Unable to mark this application as completed",
        content: err?.response
            ? createErrorMessage(err.response.data)
            : err.message,
        onOk: () => setLoading(false)
        });
    })
    }

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
            <Status 
                title={jobDetails.applicantCount === 0 ? 'No Application Yet'  : jobDetails.applicantCount === 1 ? `${jobDetails.applicantCount} Application` : `${jobDetails.applicantCount} Applications`} 
                bg='#f5f5f5' 
                color='#1E1E1E' 
            />
            <div style={{height: 30}}></div>
            <div className='flex items-center gap-4'>
                <RoundBtn icon={<EyeOutlined className='!text-[#670316]' />} title='View Details' onClick={()=> setOpenModal(true)} />
                {jobDetails.status === 6 && (
                    <RoundBtn  
                        title="Confirm"
                        onClick={handleMarkAsComplete}
                        loading={loading}
                        primary
                        width={89}
                    />
                )}
            </div>
            
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