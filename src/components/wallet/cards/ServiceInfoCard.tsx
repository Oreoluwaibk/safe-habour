"use client"
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn';
import { Icon } from '@iconify/react';
import { Card } from 'antd'
import React, { useState } from 'react'
import ServiceModal from '../modal/ServiceModal';

interface props {
    title: string;
    description: string;
    rate: string;
}
const ServiceInfoCard = ({
    title,
    description, 
    rate
}: props) => {
    const [ openAddModal, setOpenAddModal ] = useState(false);
  return (
    <>
    <Card 
        title={<CardTitle title={title} description={description} />}
        extra={<div className='flex items-center gap-2'>
            <div className='flex flex-col items-center'>
                <p className='text-lg text-[#1e1e1e] font-semibold'>{rate}</p>
                <p className='text-[#646464] text-sm'>Current rate</p>
            </div>
            <RoundBtn width={86} onClick={() => setOpenAddModal(true)} title='Edit' icon={<Icon icon="flowbite:edit-outline" fontSize={20} />} />
        </div>}
        className='p-0'
        classNames={{ body: "!h-0 !p-0"}}
    />
     {openAddModal && <ServiceModal isEdit open={openAddModal} onCancel={() => setOpenAddModal(false)} />}
    </>
  )
}

export default ServiceInfoCard