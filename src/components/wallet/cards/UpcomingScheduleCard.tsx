"use client"
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn'
import Status from '@/components/general/Status'
import { ClockCircleOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons'
import { App, Card } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { completeJob, IJobApplication } from '../../../../utils/interface'
import moment from 'moment'
import { savedPreferredTime } from '../../../../utils/savedInfo'
import { completeJobAsWorker } from '@/redux/action/jobs'
import { createErrorMessage } from '../../../../utils/errorInstance'
import AcceptDecline from '../modal/AcceptDecline'
import { useAppSelector } from '@/hook'
import useApplicationStatus from '@/hooks/useApplicationStatus'

interface props {
    confirmed?: boolean;
    application: IJobApplication;
    onRefresh: () => void;
}
const UpcomingScheduleCard = ({ application, onRefresh }: props) => {
    const router = useRouter();
    const { modal } = App.useApp();
    const { user } = useAppSelector(state => state.auth);
    const [ loading, setLoading ] = useState(false);
    const { statusTitle, colors } = useApplicationStatus(application.status, 'application'); 
    const [ openModal, setOpenModal ] = useState(false);

    const handleMarkAsComplete = () => {
        const payload: completeJob = {
           jobId: application.jobDetails.id,
           completionNotes: ""
        }
        setLoading(true);
        completeJobAsWorker(payload)
        .then(res => {
            if(res.status === 200 || res.status === 201) {
                 modal.success({
                    title: res.data.message || "Job is marked as completed",
                    onOk: () => {
                        setLoading(false);
                        onRefresh();
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
        <div className='flex flex-col gap-1 pb-5'>
            <CardTitle 
                title={application.jobDetails.jobTitle || "Hire Service"} 
                description={`Client: ${application.jobDetails.jobDescription}`}
                status={ <Status title={statusTitle} bg={colors.bg} color={colors.color} />} 
            />
            <div className='flex items-center gap-2 mt-[-20px]'>
                <EnvironmentOutlined color='#670316' className='!text-[#670316]'/>
                <p className='text-[#343434] font-normal'>{application.jobDetails.location}</p>
            </div>
            <div className='flex items-center gap-2'>
                <ClockCircleOutlined color='#670316' className='!text-[#670316]' />
                <p className='text-[#343434] font-normal'>{moment(application.acceptedAt || application.createdAt).format("(ddd) MMMM DD")}, {application && savedPreferredTime.find(time => time.id === application.jobDetails?.timePreference)?.title}</p>
            </div>

        </div>}
        extra={
            <div className='flex flex-col justify-center gap-2 items-end'>
                <p className='text-[#039855] font-semibold text-xl'>CAD {application.jobDetails.budget}</p>
                {application.status === 2 && <div className='flex items-center gap-2'>
                    {application.jobDetails.status ===2 && 
                        <RoundBtn 
                            onClick={handleMarkAsComplete} 
                            loading={loading} 
                            width={187} 
                            title='Mark as Complete' 
                            icon={<ClockCircleOutlined 
                            className='text-[#670316]' />} 
                        />}

                    <RoundBtn 
                        primary 
                        onClick={() => router.push(`/dashboard/worker/application/${application.id}`)} 
                        title='View Details' 
                        icon={<EyeOutlined className='text-[#670316]' />} 
                    />
                </div>}
                {!application.jobDetails.isHireDirectly && application.status !== 2 && <div className='flex items-center gap-2'>
                    <RoundBtn   
                        onClick={() => router.push(`/dashboard/worker/application/${application.id}`)} 
                        title='View Details' 
                        icon={<EyeOutlined className='text-[#670316]' />}
                    />
                    {/* <RoundBtn primary onClick={handleAccept} loading={loading} title='Accept' /> */}
                </div>}
                {application.jobDetails.isHireDirectly && application.status === 1 && <div className='flex items-center gap-2'>
                    <RoundBtn 
                        onClick={() => router.push(`/dashboard/worker/application/${application.id}`)} 
                        title='View Details' 
                        icon={<EyeOutlined className='text-[#670316]' />}
                    />
                    <RoundBtn 
                        primary 
                        onClick={() => setOpenModal(true)} 
                        title='Accept'
                        width={89}
                    />
                </div>}
            </div>
        }
        classNames={{ body: "!h-[0px] !p-0" }}
    />

    {openModal && 
        <AcceptDecline 
            open={openModal} 
            onCancel={() => setOpenModal(false)} 
            isAccept 
            application={application} 
            user={user}
            refresh={onRefresh}
        />}
    </>
  )
}

export default UpcomingScheduleCard