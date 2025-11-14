"use client"
import { Avatar, Button, Card, Col, Row, Image as AntdImage, App } from 'antd';
import React, { useState } from 'react'
import { ClockCircleOutlined, EnvironmentFilled, StarFilled, UserOutlined } from '@ant-design/icons'
import { IUser, UserWorkerProfile } from '../../../../utils/interface'
import { pictureUrl } from '../../../../utils/axiosConfig'
import { getMessageHistory, sendMessage } from '@/redux/action/messages'
import { useRouter } from 'next/navigation'
import { createErrorMessage } from '../../../../utils/errorInstance'
import Status from '@/components/general/Status'
import useApplicationStatus from '@/hooks/useApplicationStatus';
import RejectCancel from '../modal/RejectCancel';

interface props {
    onClick: () => void;
    worker: UserWorkerProfile;
    loading: boolean;
    status: string | null;
    applicationId?: string | null;
    user: IUser;
    onRefresh: () => void
}
const ProfileCard = ({ onClick, worker, loading, status, applicationId, user, onRefresh }: props) => {
    const [ checkLoading, setLoading ] = useState(false);
    const router = useRouter();
    const { modal } = App.useApp();
    const { colors, statusTitle } = useApplicationStatus(Number(status), "application");
    const [ openModal, setOpenModal ] = useState(false);

    const handleCheckHistory = () => {
        setLoading(true);
        getMessageHistory(applicationId || "")
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                const messages = res.data.data.messages;
                if(messages.length > 0) router.push(`/dashboard/client/message?application=${applicationId}`);
                else handleSendMessage();
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to get chat history",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false),
            });
        })
    }
    
    const handleSendMessage = () => {
        const payload = {
            message: "Hello! I would like to discuss about our booking.",
            applicationId: applicationId || ""
        }
        setLoading(true);
        sendMessage(payload)
        .then(res => {
            if(res.status === 200 || res.status ===201) {
                setLoading(false);
                router.push(`/dashboard/client/message?application=${applicationId}`);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to send message",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false),
            });
        })
    }
  return (
    <Card loading={loading} variant="borderless" styles={{ body: {padding: 0}}}>
        <Row className='booking-card' gutter={[15, 15]}>
            <Col lg={6} sm={6} xs={6} className='flex items-center justify-center'>
                {worker.profilePicturePath && <AntdImage src={`${pictureUrl}${worker.profilePicturePath}`} alt={worker.firstName} className='object-cover !w-[100px] !h-[100px] rounded-[100px]' />}

                {!worker.profilePicturePath && <Avatar icon={<UserOutlined className='text-4xl' />} alt={worker.firstName} className='object-cover !w-[100px] !h-[100px] rounded-[100px]' />}
            </Col>
            

            <Col lg={18} sm={18} xs={18} className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <p className="t-pri text-[20px] font-semibold">{worker.firstName} {worker.lastName}</p>
                    <div className='text-[#018a06] bg-[#f4fff5] rounded-[12px] p-4 flex items-center text-[12px] gap-1 !h-[15px] !w-fit'>
                        <ClockCircleOutlined />
                        <p className=''>{worker.isVerified ? "Verified Professional": "Awaiting Verification"}</p>
                    </div>
                </div>

                <div className='flex items-center gap-1 mb-2'>
                    <StarFilled className='!text-[#ffdd33]' />
                    <span className='t-[#323232] font-medium'>{worker.averageRating}</span>
                    <span className='text-[#585858]'>({worker.reviewCount} Reviews)</span>
                </div>

                <div className='flex items-center justify-between mb-2'>
                    <div className='text-[#670316] bg-[#fff9fa] rounded-[12px] p-4 flex items-center text-[12px] gap-1 !h-[15px] !w-fit'>
                        <EnvironmentFilled />
                        <p className=''>{worker.streetAddress} {worker.city} {worker.country}</p>
                    </div>
                    {status && <Status title={statusTitle} bg={colors.bg} color={colors.color} />} 
                    {!status && <p className='text-[#670316] font-medium text-lg mr-4'>${worker.hourlyRate?.toFixed(2)}/hr</p>}
                </div>

                <div className='flex items-center justify-end mt-6'>
                    {status && <p className='text-[#670316] font-medium text-lg mr-4'>${worker.hourlyRate?.toFixed(2)}/hr</p>}
                    {status === "1" && applicationId && <Button type='default' className='!h-[40px] w-[128px] !rounded-[50px] !font-medium' onClick={() => setOpenModal(true)}>Cancel</Button>}
                    {status === "2" && applicationId && <Button type='default' className='!h-[40px] w-[128px] !rounded-[50px] !font-medium' onClick={handleCheckHistory} loading={checkLoading}>Message</Button>}
                    {status !== "1" && status !== "2" && <Button type='primary' className='!h-[40px] w-[128px] !rounded-[50px] primary-bg text-white !font-medium' onClick={onClick}>Hire Me</Button>}

                </div>

            
            </Col>
        </Row>
         {openModal && (
            <RejectCancel 
                onCancel={() => setOpenModal(false)} 
                open={openModal} 
                applicationId={applicationId || ""} 
                refresh={onRefresh}
                user={user}
                isReject
            />
        )}
    </Card>
  )
}

export default ProfileCard