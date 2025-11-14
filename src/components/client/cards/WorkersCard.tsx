"use client"
import React, { useState } from 'react';
import "@/styles/client.css";
import { ClockCircleOutlined, EnvironmentFilled, StarFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Image } from 'antd';
import { useRouter } from 'next/navigation';
import { UserWorkerProfile } from '../../../../utils/interface';
import moment from 'moment';
import HireType from '../modal/HireType';
import { pictureUrl } from '../../../../utils/axiosConfig';

interface props {
    worker: UserWorkerProfile
}
const WorkersCard = ({ worker }: props) => {
    const [ openHireModal, setOpenHireModal ] = useState(false);
    const router = useRouter();
  return (
    <div className='workers-card'>
        <div className='absolute top-8 right-8 text-[#6c4500] bg-[#ffeac0] rounded-[12px] px-2 py-3 flex items-center text-[8px] gap-1 !h-[10px] !w-fit'>
            <ClockCircleOutlined />
            <p className=''>{moment(worker.joinedDate).format("MMM DD, h:mm A")}</p>
        </div>
        {worker?.profilePicturePath && <Image preview={false} src={`${worker.profilePicturePath}`} alt='image' className='md:!h-[169px] object-cover w-full' />}
        {!worker.profilePicturePath && (
            <Avatar icon={<UserOutlined size={80} className='text-4xl' />} alt='Worker image' shape="square" className='md:!h-[169px] object-cover w-full!' />
        )}
        <div className='flex items-center justify-between'>
            <p className="t-pri text-[20px] font-semibold">{worker.firstName} {worker.lastName}</p>
            <div className='text-[#018a06] bg-[#f2fff2] rounded-[12px] p-4 flex items-center text-[8px] gap-1 !h-[15px] !w-fit'>
                <ClockCircleOutlined />
                <p className=''>{worker.isVerified ? "Verified" : "UnVerified"}</p>
            </div>
        </div>

        <div className='flex items-center gap-1'>
            <StarFilled className='!text-[#ffdd33]' />
            <span className='t-pri font-medium'>{worker.averageRating}</span>
            <span>({worker.reviewCount} Reviews)</span>
        </div>

        <p className=''>{worker.bio.slice(0, 70)}...</p>

        <div className='flex items-center justify-between'>
            <div className='text-[#670316] bg-[#fff9fa] rounded-[12px] p-4 flex items-center text-[8px] gap-1 !h-[15px] !w-fit'>
                <EnvironmentFilled />
                <p className=''>{worker.streetAddress} {worker.city} {worker.country}</p>
            </div>

            <p className='text-[#670316] font-medium text-lg'>${worker.hourlyRate}/hr</p>
        </div>

        <div className='flex items-center gap-4 justify-between'>
            <Button onClick={() => router.push(`/dashboard/client/hire/${worker.userId}`)} type="default" className='!h-[50px] w-[180px] !rounded-[50px] !font-medium !text-[#670316]'>View More</Button>
            <Button onClick={() => setOpenHireModal(true)} type='primary' className='!h-[50px] w-[180px] !rounded-[50px] primary-bg text-white !font-medium'>Hire Me</Button>
        </div>

        {openHireModal && 
        <HireType 
            open={openHireModal} 
            onCancel={() => setOpenHireModal(false)} 
            worker={worker}
        />}
    </div>
  )
}

export default WorkersCard