import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn';
import Status from '@/components/general/Status';
import { Icon } from '@iconify/react';
import { Card } from 'antd'
import React, { useState } from 'react'
import EditSchdedule from '../modal/EditSchdedule';
import { GroupedSchedule } from '../../../../utils/converters';

interface props {
    available?: boolean;
    title: string;
    days: GroupedSchedule;
    refresh: () => void;
}
const WeeklyCard = ({ available, title, days, refresh }: props) => {
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
                {days.startTime.map((time: string,i:number) => (
                    <p key={i} className='text-[#1E1E1E]'>{time} - {days.endTime[i]}</p>
                ))}
               <RoundBtn title='Edit' onClick={() => setOpenEdit(true)} width={86} height={40} icon={<Icon icon="flowbite:edit-outline" />} />
            </div>
        }
        classNames={{ body: "!h-[0px] !p-0", header: "!py-4" }}
    />
    {openEdit && <EditSchdedule refresh={refresh} open={openEdit} onCancel={() => setOpenEdit(false)} days={days} />}
    </>
  )
}

export default WeeklyCard