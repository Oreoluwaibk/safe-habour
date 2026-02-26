"use client"
import React, { useState, useTransition } from 'react';
import "@/styles/client.css";
import { ClockCircleOutlined, EnvironmentFilled, StarFilled, UserOutlined } from '@ant-design/icons';
import { App, Avatar, Button, Image, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { IUser, UserWorkerProfile } from '../../../../utils/interface';
import moment from 'moment';
import HireType from '../modal/HireType';

interface props {
    worker: UserWorkerProfile;
    authentication: IUser;
}
const WorkersCard = ({ worker, authentication }: props) => {
    const { message } = App.useApp()
    const [ openHireModal, setOpenHireModal ] = useState(false);
    const router = useRouter();
    const [ isPending, startTransition ] = useTransition();

    const handleNavigate = () => {
        startTransition(() => {
            router.push(`/dashboard/client/hire/${worker.userId}`)
        })
    }

    const isConfirmed = !authentication?.isVerified || !authentication?.isProfileComplete;
  return (
    <div className='workers-card'>
        <div className='absolute top-8 right-8 text-[#6c4500] bg-[#ffeac0] rounded-xl px-2 py-3 flex items-center text-[8px] gap-1 h-2.5 w-fit'>
            <ClockCircleOutlined />
            <p className=''>{moment(worker.joinedDate).format("MMM DD, h:mm A")}</p>
        </div>
        {worker?.profilePicturePath && <Image preview={false} src={`${worker.profilePicturePath}`} alt='image' className='md:h-42.25! object-cover w-full' />}
        {!worker.profilePicturePath && (
            <Avatar icon={<UserOutlined size={80} className='text-4xl' />} alt='Worker image' shape="square" className='md:h-42.25! object-cover w-full!' />
        )}
        <div className='flex items-center justify-between'>
            <p className="t-pri text-[20px] font-semibold">{worker.firstName}</p>
            <div className='text-[#018a06] bg-[#f2fff2] rounded-xl p-4 flex items-center text-[8px] gap-1 h-3.75! w-fit!'>
                <ClockCircleOutlined />
                <p className=''>{worker.isVerified ? "Verified" : "UnVerified"}</p>
            </div>
        </div>

        <div className='flex items-center gap-1'>
            <StarFilled className='text-[#ffdd33]!' />
            <span className='t-pri font-medium'>{worker.averageRating}</span>
            <span>({worker.reviewCount} Reviews)</span>
        </div>

        <p className=''>{worker.bio.slice(0, 70)}...</p>

        <div className='flex items-center justify-between'>
            <div className='text-[#670316] bg-[#fff9fa] rounded-xl p-4 flex items-center text-[8px] gap-1 h-3.75! w-fit!'>
                <EnvironmentFilled />
                <p className=''>{worker.streetAddress} {worker.city} {worker.country}</p>
            </div>

            <p className='text-[#670316] font-medium text-lg'>${worker.hourlyRate}/hr</p>
        </div>

        <div className='flex items-center gap-4 justify-between'>
            <Button onClick={handleNavigate} loading={isPending} type="default" className='h-12.5! w-45 rounded-[50px]! font-medium! text-[#670316]!'>View More</Button>
            <Tooltip title={isConfirmed ? "You have not completed your profile, complete your profile to perform this function" : ""}>
                <Button 
                    disabled={isConfirmed} 
                    onClick={() => {
                        if(authentication?.dateOfBirth && moment().diff(moment(authentication.dateOfBirth), 'years') < 18) 
                            return message.info("You must be at least 18 years old to apply for jobs");
                        setOpenHireModal(true);
                    }} 
                    type='primary' 
                    className='h-12.5! w-45 rounded-[50px]! primary-bg text-white font-medium!'
                >
                    Hire Me
                </Button>
            </Tooltip>
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