import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { Icon } from '@iconify/react'
import { Card } from 'antd'
import React from 'react'
import { IAdminWorkerActivity } from '../../../../utils/interface'

interface ICalenderViewProps {
  availability: IAdminWorkerActivity;
}
const CalenderView: React.FC<ICalenderViewProps> = ({ availability }) => {
  return (
    <Card
      title={<CardTitle 
        title={availability.fullName}
        description={availability.serviceCategory}
      />}
      extra={<Status title={availability.isAvailable ? 'Available' : "Not Available"} bg={availability.isAvailable ? '#F4FFFA': "#FFF6F7"} color={availability.isAvailable ? '#039855' : "#ff0004"} />}
      classNames={{ body: "pt-1! pb-3! px-3!", header: "py-1! px-6!"}}
    >
      {availability.slots.map((slot, i:number) => (
        <div key={i} className='bg-[#F6F6F6] rounded-xl px-3 py-2 border border-[#EEEEEE] flex items-center gap-3 mb-2'>
          <Icon icon="mingcute:time-line" fontSize={18} />  
          <span className='text-[#5d5d5d]'>{slot.startTime} To {slot.endTime}</span>
        </div>
      ))}
    </Card>
  )
}

export default CalenderView