import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn'
import Status from '@/components/general/Status'
import { EnvironmentOutlined, StarFilled } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { App, Card } from 'antd'
import React, { useState } from 'react'
import { IClientApplicationDetails } from '../../../../utils/interface'
import moment from 'moment'
import { acceptJobApplication } from '@/redux/action/jobs'
import { createErrorMessage } from '../../../../utils/errorInstance'
import { useAppSelector } from '@/hook'
import RejectCancel from '../modal/RejectCancel'
import useApplicationStatus from '@/hooks/useApplicationStatus'

interface props {
    application: IClientApplicationDetails;
    onRefresh: () => void;
}
const JobModalCard = ({ application, onRefresh }: props) => {
    const { statusTitle, colors } = useApplicationStatus(application.status, "application")
    const { modal } = App.useApp();
    const [ acceptLoading, setAcceptLoading ] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    const { user } = useAppSelector(state => state.auth);

    const handleAccept = () => {
        setAcceptLoading(true);
        acceptJobApplication(application.id)
        .then(res => {
            if(res.status === 200 || res.status === 201) {
                modal.success({
                    title: res.data.message || "Job accepted successfully",
                    onOk: () => {
                        setAcceptLoading(false);
                        onRefresh();
                    }
                })
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to accept application",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setAcceptLoading(false)
            });
        })
    }

  return (
    <Card
        title={
            <div className='w-full'>
                <CardTitle 
                    title={application.serviceWorker.fullName} 
                    description={application.serviceWorker.email} 
                    status={ <Status title={statusTitle} bg={colors.bg} color={colors.color} />} 
                /> 
                <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-1 text-[10px]'>
                        <StarFilled className='!text-[#ffdd33]' />
                        <span className='t-[#323232] font-medium'>{application.serviceWorker.totalRating}</span>
                        <span className='text-[#585858]'>({application.serviceWorker.numberOfReviews} Reviews)</span>
                    </div>

                    <div className='flex items-center gap-1'>
                        <Icon icon="material-symbols-light:date-range" />
                        <p className='text-[#646464] text-[10px]'>{moment(application.acceptedAt || application.rejectedAt || application.createdAt).format("MMM YY")}</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <EnvironmentOutlined />
                        <p className='text-[#646464] text-[10px]'>{application.serviceWorker.location}</p>
                    </div>
                </div>
            </div>
        }
        extra={<p className="font-semibold text-base text-[#670316]">${application.serviceWorker.hourlyRate.toFixed(2)}/hr</p>}
        classNames={{ header: "!pb-4", body: "flex flex-col gap-2"}}
        actions={[
            application.status === 1 && <div key={1} className='flex items-center gap-2 justify-end pr-6'>
                <RoundBtn title='Reject' width={74} onClick={() => setOpenModal(true)} />
                <RoundBtn title='Accept' width={94} primary onClick={handleAccept} loading={acceptLoading} />
            </div>
        ]}
       
    >
        <div className='flex flex-col gap-2 mt-4'>
            <p className='text-[#505050] font-base'>Message:</p>
            <p className='text-[#808080] text-xs'>{application.message || "No message"}</p>
        </div>
    {openModal && (
        <RejectCancel 
            onCancel={() => setOpenModal(false)} 
            open={openModal} 
            applicationId={application.id || ""} 
            refresh={onRefresh}
            user={user}
            isReject
        />
    )}
    </Card>
  )
}

export default JobModalCard