import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import Status from '@/components/general/Status';
import { ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { App, Card } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { completeJob, IJobApplication } from '../../../../utils/interface';
import moment from 'moment';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { completeJobAsWorker } from '@/redux/action/jobs';
import AcceptDecline from '../modal/AcceptDecline';
import { useAppSelector } from '@/hook';

interface props {
    accepted?: boolean;
    application: IJobApplication;
    isApplication?: boolean;
    onRefresh: () => void;
}
const JobApplication = ({ accepted, application, isApplication, onRefresh }: props) => {
    const router = useRouter();
    const { modal } = App.useApp();
    const { user } = useAppSelector(state => state.auth);
    const [ loading, setLoading ] = useState(false);
    const [ isAccepted, setIsAccepted ] = React.useState(accepted || false);
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
    <Card
        title={
            <div>
                <CardTitle 
                    title={application.jobDetails.jobTitle} 
                    description={application.jobDetails.client?.name || ""} 
                    // status={<Status title='Completed' />} 
                    status={ <Status title={accepted ? 'Accepted' : "Pending"} bg={accepted ? "#F4FFFA" : "#FFF5F5"} color={accepted ? "#039855" : "#FF0004"} />} 
                /> 

                <Status title={`Applied:${moment(application.createdAt).format("DD/MM/YYYY")}`} size={12} bg='#F4F4F4' color='#343434'  />

            </div>
        }
        extra={
            <>
                {application.status === 2 && <div className='flex items-center gap-2'>
                    <RoundBtn onClick={handleMarkAsComplete} loading={loading} width={187} title='Mark as Complete' icon={<ClockCircleOutlined className='text-[#670316]' />} />

                    <RoundBtn primary onClick={() => router.push(`/dashboard/worker/info/${application.id}`)} title='View Details' icon={<EyeOutlined className='text-[#670316]' />} />
                </div>}
                {!application.jobDetails.isHireDirectly && application.status !== 2 && <div className='flex items-center gap-2'>
                    <RoundBtn onClick={() => router.push(`/dashboard/worker/info/${application.id}`)} title='View Details' />
                    {/* <RoundBtn primary onClick={handleAccept} loading={loading} title='Accept' /> */}
                </div>}
                {application.jobDetails.isHireDirectly && application.status === 1 && <div className='flex items-center gap-2'>
                    <RoundBtn onClick={() => router.push(`/dashboard/worker/info/${application.id}`)} title='View Details' />
                    <RoundBtn primary onClick={() => setOpenModal(true)} loading={loading} title='Accept' />
                </div>}
            </>
        // <RoundBtn icon={<EyeOutlined className='!text-[#670316]' />} title='View Details' onClick={() => router.push(`/dashboard/worker/application/${application.id}`)} />
        }

        classNames={{ header: "!py-4", body: "flex flex-col gap-2"}}
    >
         <div className='flex flex-col gap-4'>
            <p className='text-[#343434] text-base font-semibold'>Your Message:</p>

            <span className='border-[#C5C5C5] text-[#1e1e1e] text-sm px-2 py-3 rounded-xl bg-[#FBFBFB]'>
            {application.message}
            </span>
        </div>

        {accepted && <div className='flex flex-col gap-4'>
            <p className='text-[#343434] text-base font-semibold'>Client Review:</p>

            <span className='border-[#B1FFDC] text-[#1e1e1e] text-sm px-2 py-3 rounded-xl bg-[#F3FFF9]'>
            Exceptional care and attention. Sarah was punctual, professional, and genuinely caring with my mother. Highly recommend!
            </span>
        </div>}

        {openModal && 
        <AcceptDecline 
            open={openModal} 
            onCancel={() => setOpenModal(false)} 
            isAccept 
            application={application} 
            user={user}
            refresh={onRefresh}
        />}
    </Card>
  )
}

export default JobApplication