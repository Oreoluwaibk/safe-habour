"use client"
import React, { useState } from 'react';
import "@/styles/client.css";
import { C1 } from '../../../../assets/image';
import Image from 'next/image';
import { ClockCircleOutlined, EnvironmentFilled, StarFilled } from '@ant-design/icons';
import { Button } from 'antd';
import BookRequest from '../modal/BookRequest';
import { useRouter } from 'next/navigation';

const WorkersCard = () => {
    const [ openHireModal, setOpenHireModal ] = useState(false);
    const router = useRouter();
  return (
    <div className='workers-card'>
        <div className='absolute top-8 right-8 text-[#6c4500] bg-[#ffeac0] rounded-[12px] px-2 py-3 flex items-center text-[8px] gap-1 !h-[10px] !w-fit'>
            <ClockCircleOutlined />
            <p className=''>Aug 28, 6:00 PM</p>
        </div>
        <Image src={C1} alt='image' className='md:!h-[169px] object-cover w-full' />
        <div className='flex items-center justify-between'>
            <p className="t-pri text-[20px] font-semibold">Chloe Adams</p>
            <div className='text-[#018a06] bg-[#f2fff2] rounded-[12px] p-4 flex items-center text-[8px] gap-1 !h-[15px] !w-fit'>
                <ClockCircleOutlined />
                <p className=''>Verified</p>
            </div>
        </div>

        <div className='flex items-center gap-1'>
            <StarFilled className='!text-[#ffdd33]' />
            <span className='t-pri font-medium'>4.7</span>
            <span>(3 Reviews)</span>
        </div>

        <p>I’m delighted to offer my services as a childcare provider to families looking for reliable support. My enthusiasm for nurturing children ensures a safe and engaging space for your little ones.</p>

        <div className='flex items-center justify-between'>
            <div className='text-[#670316] bg-[#fff9fa] rounded-[12px] p-4 flex items-center text-[8px] gap-1 !h-[15px] !w-fit'>
                <EnvironmentFilled />
                <p className=''>Toronto</p>
            </div>

            <p className='text-[#670316] font-medium text-lg'>$19.00/hr</p>
        </div>

        <div className='flex items-center gap-4 justify-between'>
            <Button onClick={() => router.push("/dashboard/client/hire/1")} type="default" className='!h-[50px] w-[180px] !rounded-[50px] !font-medium !text-[#670316]'>View More</Button>
            <Button onClick={() => setOpenHireModal(true)} type='primary' className='!h-[50px] w-[180px] !rounded-[50px] primary-bg text-white !font-medium'>Hire Me</Button>
        </div>

        {openHireModal && <BookRequest open={openHireModal} onCancel={() => setOpenHireModal(false)} />}
    </div>
  )
}

export default WorkersCard