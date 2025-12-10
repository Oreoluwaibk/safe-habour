import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn'
import Status from '@/components/general/Status'
import { Icon } from '@iconify/react'
import { Card } from 'antd'
import React, { useState } from 'react'
import ApproveReject from '../modals/ApproveReject'
import { IAdminVerificationList, IUser } from '../../../../utils/interface'
import KYCReview from '../modals/KYCReview'
import moment from 'moment'

interface props {
    verification: IAdminVerificationList;
    refresh: () => void;
}
const KycCard = ({ verification, refresh }: props) => {
    const [ openAcceptReject, setOpenAcceptReject ] = useState(false);
    const [ isReject, setIsReject ] = useState(false);
    const [ openDetails, setOpenDetails ] = useState(false);
  return (
    <Card
        title={<CardTitle 
            title={verification.fullName}
            description={`Snow Plowing . Submitted on ${moment(verification.submittedAt).format("YYYY-MM-DD")}`}
            status={<Status title='Pending Review' color='#670316' bg='#FFE4E9' />}
        />}
        actions={[
            <div key={"1"} className='flex items-center justify-between px-4'>
                <div className='flex items-center gap-4'>
                    <RoundBtn title='Approve' width={93} onClick={() => {
                        setIsReject(false);
                        setOpenAcceptReject(true);
                    }} primary />
                    <RoundBtn title='Reject' width={79} onClick={() => {
                        setIsReject(true);
                        setOpenAcceptReject(true);
                    }} bg='#FF0000' color="#fff" />
                </div>
                <RoundBtn title='View Details' width={118} onClick={() => setOpenDetails(true)} />
            </div>
        ]}
        classNames={{ body: "py-1!"}}
    >
        <Card classNames={{ body: "flex flex-col gap-2 py-1! px-2!"}}>
            <div className='flex items-center gap-2'>
                <span className='bg-[#f7f7f7] p-1 rounded-full'>
                    <Icon icon="proicons:document" />
                </span>
                <p className='text-[#1e1e1e] text-xl font-medium'>Submitted Document</p>
            </div>

            <div className='flex items-center gap-4'>
                {verification.hasIdentificationDocument && <span className='rounded-[5px] bg-[#f7f7f7] text-[#343434] px-3 py-2'>
                    Canadian ID
                </span>}
                {verification.hasLocationDocument &&<span className='rounded-[5px] bg-[#f7f7f7] text-[#343434] px-3 py-2'>
                   Proof of Address
                </span>}
            </div>
        </Card>

        {openAcceptReject && <ApproveReject refresh={refresh} onCancel={() => setOpenAcceptReject(false)} open={openAcceptReject} verification={verification} isReject={isReject} />}
        {openDetails && <KYCReview refresh={refresh} verification={verification} onCancel={() => setOpenDetails(false)} open={openDetails} />}

    </Card>
  )
}

export default KycCard