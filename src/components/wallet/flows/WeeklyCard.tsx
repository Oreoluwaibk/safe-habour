import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn';
import Status from '@/components/general/Status';
import { Icon } from '@iconify/react';
import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import EditSchdedule from '../modal/EditSchdedule';
import { GroupedSchedule } from '../../../../utils/converters';
import { DaySchedule, Schedule } from '../../../../utils/interface';

interface props {
    available?: boolean;
    title: string;
    days?: GroupedSchedule;
    refresh: () => void;
    allSchedule: DaySchedule[]
}


const WeeklyCard = ({ available, title, days, refresh, allSchedule }: props) => {
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ current, setCurrent ] = useState<Schedule[]>([])

    useEffect(() => {
        if(allSchedule) getSchedulesByDay(allSchedule, title)
    }, [allSchedule])

    const getSchedulesByDay = (
        data: DaySchedule[],
        day: string
    ): void => {
        const foundDay = data.find(
            d => d.dayOfWeek.toLowerCase() === day.toLowerCase()
        );

        setCurrent(foundDay ? foundDay.schedules : []);
    };

    const isAvailable = current.length > 0 ? current[0].isAvailable : false
  return (
    <>
    <Card
        title={<CardTitle 
            title={title}
            status={ <Status size={12} title={isAvailable ? 'Available' : "Unavailable"} bg={isAvailable ? "#F4FFFA" : "#FFF5F5"} color={isAvailable ? "#039855" : "#FF0004"} />} 
        />}
        extra={
            <div className='flex gap-4 items-center'>
                {days &&days.startTime.map((time: string,i:number) => (
                    <p key={i} className='text-[#1E1E1E]'>{time} - {days.endTime[i]}</p>
                ))}
               <RoundBtn title='Edit' onClick={() => setOpenEdit(true)} width={86} height={40} icon={<Icon icon="flowbite:edit-outline" />} />
            </div>
        }
        classNames={{ body: "!h-[0px] !p-0", header: "!py-4" }}
    />
    {openEdit && <EditSchdedule refresh={refresh} isAvailable={isAvailable} schedule={current} open={openEdit} onCancel={() => setOpenEdit(false)} day={title} />}
    </>
  )
}

export default WeeklyCard