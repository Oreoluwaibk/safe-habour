import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import React from 'react'
import { IAdminWorkerActivity } from '../../../../utils/interface'

interface IListViewProps {
  availability: IAdminWorkerActivity;
}
const ListView: React.FC<IListViewProps> = ({ availability }) => {
  return (
    <Card
        title={
        <div className='flex items-center gap-3'>
            <Avatar size={40} icon={<UserOutlined />} />
            <CardTitle 
               title={availability.fullName}
                description={availability.serviceCategory}
            />
        </div>
        }
        classNames={{ body: "pt-0! pb-3! px-3!", header: "py-0! px-6!"}}
    >
        {availability.slots.map((slot, i:number) => (
            <div key={i} className='bg-[#F6F6F6] rounded-xl px-3 py-2 border border-[#EEEEEE] flex items-center justify-between'>
                <span className='text-[#5d5d5d]'>Tue, Oct 18</span>
                <div className='flex items-center gap-2'>
                    <Status title={`${slot.startTime} To ${slot.endTime}`} bg='#fff' color='#5d5d5d' />
                </div>
            </div>
        ))}
        
    </Card>
  )
}

export default ListView