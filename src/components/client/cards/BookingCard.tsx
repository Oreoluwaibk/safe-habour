"use client"
import React, { useEffect, useState } from 'react'
import { ClockCircleOutlined, EnvironmentFilled, StarFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row, App } from 'antd'
import { useRouter } from 'next/navigation'
import { IBooking } from '../../../../utils/interface'
import moment from 'moment'
import { pictureUrl } from '../../../../utils/axiosConfig'
import { getMessageHistory, sendMessage } from '@/redux/action/messages'
import { createErrorMessage } from '../../../../utils/errorInstance'
import RejectCancel from '../modal/RejectCancel'
import { useAppSelector } from '@/hook'

interface props {
  worker?: IBooking;
  onRefresh: () => void;
}
const BookingCard = ({ worker, onRefresh }: props) => {
    const router = useRouter();
    const { modal } = App.useApp();
    const [ statusTitle, setStatusTitle ] = React.useState<string>("");
    const [ colors, setColors ] = useState({
        bg: "#fff6f7",
        color: "#ff0004"
    });
    const [ loading, setLoading ] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    const { user } = useAppSelector(state => state.auth);


    useEffect(() => {
        if (worker?.status !== undefined) {
            switch (worker.status) {
                case 1: {
                    setStatusTitle("Pending");
                    setColors({bg: "#FFF6F7", color: "#FF0004"});
                } break;
                case 2: {
                    setStatusTitle("Accepted");
                    setColors({bg: "#F3FFF4", color: "#018A06"});
                } break;
                case 3: {
                    setStatusTitle("Declined");
                    setColors({bg: "#FFF6F7", color: "#FF0004"});
                } break;
                case 4: {
                    setStatusTitle("Completed");
                    setColors({bg: "#FFF8F9", color: "#670316"});
                } break;
                case 5: {
                    setStatusTitle("Cancelled");
                    setColors({bg: "#FFF6F7", color: "#FF0004"});
                } break;
                default: setStatusTitle("Unknown"); break;
            }
        }
    }, [worker?.status]);

    const handleCheckHistory = () => {
        setLoading(true);
        getMessageHistory(worker?.applicationId || "")
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                const messages = res.data.data.messages;
                if(messages.length > 0) router.push(`/dashboard/client/message?application=${worker?.applicationId}`);
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
            applicationId: worker?.applicationId || ""
        }
        setLoading(true);
        sendMessage(payload)
        .then(res => {
            if(res.status === 200 || res.status ===201) {
                setLoading(false);
                router.push(`/dashboard/client/message?application=${worker?.applicationId}`);
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
    <Row className='booking-card' gutter={[15, 15]}>
        <Col lg={8} sm={8} xs={12} className='flex items-center justify-center md:!w-[209px]'>
            {/* <Image src={C1} alt='image' className='md:!h-full object-cover !w-[500px] rounded-[24px]' /> */}
            {worker?.photoUrl && <img  src={`${pictureUrl}${worker.photoUrl}`} alt='image' className='object-cover rounded-[8px] w-full! h-full!' />}
            {!worker?.photoUrl && (
                <Avatar icon={<UserOutlined size={80} className='text-4xl' />} alt='Worker image' shape="square" className='md:!h-full object-cover w-full!  rounded-[24px]' />
            )}
        </Col>
        

        <Col lg={16} sm={16} xs={12} className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <p className="t-pri text-[20px] font-semibold">{worker?.serviceWorkerFullName}</p>
                <div style={{backgroundColor: colors.bg, color: colors.color}} className='rounded-[12px] p-4 flex items-center text-[12px] gap-1 !h-[15px] !w-fit'>
                    <p className=''>{statusTitle}</p>
                </div>
            </div>

            <div className='flex items-center gap-1 mb-2'>
                <StarFilled className='!text-[#ffdd33]' />
                <span className='t-pri font-medium'>{worker?.totalRating}</span>
                <span>({worker?.numberOfReviews} Reviews)</span>
            </div>

            <p>{worker?.bio.slice(0,70)}...</p>

            <div className='flex items-center justify-between mb-2'>
                 <div className='text-[#646464] rounded-[12px]  py-3 flex items-center text-[12px] gap-1 !h-[10px] !w-fit'>
                    <ClockCircleOutlined />
                    {worker?.dateCreated && <p className=''>{moment(worker?.dateCreated).format("MMM DD, h:mm A")}</p>}
                </div>
                <div className='text-[#646464] rounded-[12px] p-4 flex items-center text-[12px] gap-1 !h-[15px] !w-fit'>
                    <EnvironmentFilled />
                    <p className=''>{worker?.location}</p>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-[#670316] font-medium text-lg'>${worker?.hourlyRate?.toFixed(2)}/hr</p> 

                <div className='flex items-center gap-4 justify-between'>
                    {worker?.status === 1 && <Button type="default" className='!h-[40px] w-[90px] !rounded-[50px] !font-medium !text-[#670316]' onClick={() => setOpenModal(true)}>Cancel</Button>}
                    {worker?.status === 2 && <Button loading={loading} type="default" className='!h-[40px] w-[120px] !rounded-[50px] !font-medium !text-[#670316]' onClick={handleCheckHistory}>Message</Button>}
                    <Button type='primary' className='!h-[40px] w-[128px] !rounded-[50px] primary-bg text-white !font-medium' onClick={() => router.push(`/dashboard/client/hire/${worker?.serviceWorkerId}?status=${worker?.status}&application=${worker?.applicationId}`)}>View More</Button>
                </div>
            </div>

           
        </Col>

        {openModal && (
            <RejectCancel 
                onCancel={() => setOpenModal(false)} 
                open={openModal} 
                applicationId={worker?.applicationId || ""} 
                refresh={onRefresh}
                user={user}
                isReject
            />
        )}
    </Row>
  )
}

export default BookingCard