"use client"
import React from 'react'
import { ClockCircleOutlined, EnvironmentFilled, StarFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row, Image } from 'antd'
import { useRouter } from 'next/navigation'
import { UserWorkerProfile } from '../../../../utils/interface'
import moment from 'moment'
import { pictureUrl } from '../../../../utils/axiosConfig'

interface props {
  worker?: UserWorkerProfile;
}
const BookingCard = ({ worker }: props) => {
    const router = useRouter();
  return (
    <Row className='booking-card' gutter={[15, 15]}>
        <Col lg={8} sm={8} xs={12} className='flex items-center justify-center md:!w-[209px] h-[200px]'>
            {/* <Image src={C1} alt='image' className='md:!h-full object-cover !w-[500px] rounded-[24px]' /> */}
            {worker?.profilePicturePath && <Image preview={false} src={`${pictureUrl}${worker.profilePicturePath}`} alt='image' className='md:!h-full object-cover !w-[500px] rounded-[24px]' />}
            {!worker?.profilePicturePath && (
                <Avatar icon={<UserOutlined size={80} className='text-4xl' />} alt='Worker image' shape="square" className='md:!h-full object-cover !w-[500px] rounded-[24px]' />
            )}
        </Col>
        

        <Col lg={16} sm={16} xs={12} className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <p className="t-pri text-[20px] font-semibold">{worker?.firstName} {worker?.lastName}</p>
                <div className='text-[#ff0004] bg-[#fff6f7] rounded-[12px] p-4 flex items-center text-[12px] gap-1 !h-[15px] !w-fit'>
                    <p className=''>Pending</p>
                </div>
            </div>

            <div className='flex items-center gap-1 mb-2'>
                <StarFilled className='!text-[#ffdd33]' />
                <span className='t-pri font-medium'>{worker?.averageRating}</span>
                <span>({worker?.reviewCount} Reviews)</span>
            </div>

            <p>{worker?.bio.slice(0,70)}...</p>

            <div className='flex items-center justify-between mb-2'>
                 <div className='text-[#646464] rounded-[12px]  py-3 flex items-center text-[12px] gap-1 !h-[10px] !w-fit'>
                    <ClockCircleOutlined />
                    {worker?.joinedDate && <p className=''>{moment(worker?.joinedDate).format("MMM DD, h:mm A")}</p>}
                </div>
                <div className='text-[#646464] rounded-[12px] p-4 flex items-center text-[12px] gap-1 !h-[15px] !w-fit'>
                    <EnvironmentFilled />
                    <p className=''>{worker?.streetAddress} {worker?.city} {worker?.country}</p>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-[#670316] font-medium text-lg'>${worker?.hourlyRate?.toFixed(2)}/hr</p> 

                <div className='flex items-center gap-4 justify-between'>
                    <Button type="default" className='!h-[40px] w-[90px] !rounded-[50px] !font-medium !text-[#670316]'>Cancel</Button>
                    <Button type='primary' className='!h-[40px] w-[128px] !rounded-[50px] primary-bg text-white !font-medium' onClick={() => router.push(`/dashboard/client/hire/${worker?.id}`)}>View More</Button>
                </div>
            </div>

           
        </Col>
    </Row>
  )
}

export default BookingCard