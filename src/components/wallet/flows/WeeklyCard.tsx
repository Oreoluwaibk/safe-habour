import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn';
import Status from '@/components/general/Status';
import { Icon } from '@iconify/react';
import { Card } from 'antd'
import moment from 'moment'
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


const WeeklyCard = ({ title, refresh, allSchedule }: props) => {
    const [ openEdit, setOpenEdit ] = useState(false);
    const [ current, setCurrent ] = useState<Schedule[]>([])

    useEffect(() => {
        if(allSchedule) getSchedulesByDay(allSchedule, title)
    }, [allSchedule, title])

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
            <div className='flex flex-wrap gap-3 items-center justify-end'>
                {current.map((slot, i) => (
                    <p key={slot.id || i} className='text-[#1E1E1E] text-sm whitespace-nowrap'>
                        {moment(slot.startTime, ["HH:mm:ss", "HH:mm"]).isValid()
                            ? moment(slot.startTime, ["HH:mm:ss", "HH:mm"]).format("h:mm A")
                            : slot.startTime}
                        {" - "}
                        {moment(slot.endTime, ["HH:mm:ss", "HH:mm"]).isValid()
                            ? moment(slot.endTime, ["HH:mm:ss", "HH:mm"]).format("h:mm A")
                            : slot.endTime}
                    </p>
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