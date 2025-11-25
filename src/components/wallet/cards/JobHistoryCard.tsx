"use client"
import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { ClockCircleOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Card, Rate } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import RateModal from '../modal/RateModal'
import { ICompletedJob, IUser } from '../../../../utils/interface'
import useApplicationStatus from '@/hooks/useApplicationStatus'
import moment from 'moment'

interface props {
    job: ICompletedJob;
    user: IUser;
    refresh: () => void;
}
const JobHistoryCard = ({ job, user, refresh }: props) => {
    const router = useRouter();
    const [ openModal, setOpenModal ] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { statusTitle, colors } = useApplicationStatus(job.jobStatus, "job");
    const { statusTitle: appTitle, colors: appColor } = useApplicationStatus(job.applicationStatus, "application");

    const handleRedirect = () => {
        startTransition(() => {
            router.push(`/dashboard/worker/info/${job.jobId}`);
        });
    }
  return (
    <Card
        title={
            <div>
                <CardTitle 
                    title={job?.jobName || "Hire Service"} 
                    description={`Client: ${job?.clientName}`} 
                    status={<Status title={statusTitle} color={colors.color} bg={colors.bg} />} 
                /> 

                <div className='flex items-center gap-5 text-sm'>
                    <div className='flex items-center gap-2'>
                        <ClockCircleOutlined className='#343434' />
                        <span>Completed at: {moment(job?.completedAt).format("DD/MM/YYYY")}</span>
                    </div>
                    <Status 
                        title={appTitle}
                        bg={appColor.bg}
                        color={appColor.color} 
                    />
                </div>
            </div>
        }
        extra={<div className='flex flex-col gap-2'>
            <span className='text-[#039855] text-lg'>${job?.proposedRate}</span>
            {job.clientRating && <div>
                <Rate className='text-[#FFDD33] text-xs' value={job.clientRating} count={5}   /><span className="text-sm">{job.clientRating.toFixed(1)}</span>
            </div>}
            
        </div>}
        classNames={{ header: "!pb-4", body:` ${job.clientReviewComment ? "flex flex-col gap-6 py-0! my-0!" :"h-0! p-0!"}`}}
        actions={[
            <div className='flex items-center justify-end px-4' key={1}>
                <div className='flex items-center gap-4 px-6 py-4'>

                {!job.serviceWorkerReviewComment && <Button icon={<StarOutlined />} type="default" className='md:!min-w-[129px] !h-[48px] !text-[#670316]' style={{borderRadius: 50}} onClick={() => setOpenModal(true)}>Rate Experience</Button>}

                <Button onClick={handleRedirect} loading={isPending} icon={<EyeOutlined />} type="primary" className='md:!min-w-[129px] !h-[48px]' style={{borderRadius: 50}}>View Details</Button>
            </div>
            </div>
        ]}
    >
        {job.clientReviewComment && <div>
            <p className='text-[#343434] text-base font-semibold'>Client Review:</p>

            <span className='border-[#B1FFDC] text-[#1e1e1e] text-sm mt-2 rounded-xl bg-[#F3FFF9]'>{job.clientReviewComment}</span>
        </div>}
       

        {openModal && <RateModal 
            open={openModal} 
            onCancel={() => setOpenModal(false)} 
            job={job}
            user={user}
            refresh={refresh}
            isWorker
        />}
    </Card>
  )
}

export default JobHistoryCard