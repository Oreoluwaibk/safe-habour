"use client"
import { Avatar, Button, Card, Col, Row } from 'antd'
import Image from 'next/image'
import React from 'react'
import { C1 } from '../../../../assets/image'
import { ClockCircleOutlined, EnvironmentFilled, StarFilled, UserOutlined } from '@ant-design/icons'
import { UserWorkerProfile } from '../../../../utils/interface'

interface props {
    onClick: () => void;
    worker: UserWorkerProfile;
    loading: boolean;
}
const ProfileCard = ({ onClick, worker, loading }: props) => {
  return (
    <Card loading={loading} variant="borderless" styles={{ body: {padding: 0}}}>
        <Row className='booking-card' gutter={[15, 15]}>
            <Col lg={6} sm={6} xs={6} className='flex items-center justify-center'>
                {worker.profilePicturePath && <Image src={worker.profilePicturePath} alt={worker.firstName} className='object-cover !w-[100px] !h-[100px] rounded-[100px]' />}

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
                    <p className='text-[#670316] font-medium text-lg'>${worker.hourlyRate?.toFixed(2)}/hr</p> 
                </div>

                <div className='flex items-center justify-end mt-6'>
                    <Button type='primary' className='!h-[40px] w-[128px] !rounded-[50px] primary-bg text-white !font-medium' onClick={onClick}>Hire Me</Button>
                </div>

            
            </Col>
        </Row>
    </Card>
  )
}

export default ProfileCard