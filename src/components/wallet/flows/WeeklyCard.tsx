import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn';
import Status from '@/components/general/Status';
import { Icon } from '@iconify/react';
import { Card } from 'antd'
import React, { useState } from 'react'
import EditSchdedule from '../modal/EditSchdedule';

interface props {
    available?: boolean;
    title: string;
}
const WeeklyCard = ({ available, title }: props) => {
    const [ openEdit, setOpenEdit ] = useState(false);
  return (
    <>
    <Card
        title={<CardTitle 
            title={title}
            status={ <Status size={12} title={available ? 'Available' : "Unavailable"} bg={available ? "#F4FFFA" : "#FFF5F5"} color={available ? "#039855" : "#FF0004"} />} 
        />}
        extra={
            <div className='flex gap-4 items-center'>
               <p className='text-[#1E1E1E]'>8 AM - 12 PM</p>
               <RoundBtn title='Edit' onClick={() => setOpenEdit(true)} width={86} height={40} icon={<Icon icon="flowbite:edit-outline" />} />
            </div>
        }
        classNames={{ body: "!h-[0px] !p-0", header: "!py-4" }}
    />
    {openEdit && <EditSchdedule open={openEdit} onCancel={() => setOpenEdit(false)} />}
    </>
  )
}

export default WeeklyCard