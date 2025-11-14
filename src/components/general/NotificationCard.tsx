import { Card } from 'antd'
import Image from 'next/image'
import React from 'react'
import { Lightening } from '../../../assets/icons'
import { C1 } from '../../../assets/image'
import { CloseOutlined } from '@ant-design/icons'
import { INotification } from '../../../utils/interface'
import { timeAgo } from '../../../utils/converters'

interface props {
    isFixed?: boolean;
    onCancel?: () => void;
    notification: INotification;
}
const NotificationCard = ({ isFixed, onCancel, notification }: props) => {
  return (
    <Card styles={{body: {display: "flex", gap:4, position: "relative",backgroundColor: "#fff"}}}>
        <div className='bg-[#FFF9FA] flex items-center justify-center !h-6 !w-6'><Image src={Lightening} alt={""} /> </div>

        <div>
            <p className='text-[#101828] text-sm'>{notification.title}</p>
            <p className='text-sm text-[#667085]'>{notification.message}</p>
            <div className='flex items-center gap-3 mt-3'>
                <Image src={C1} alt='image' className='h-[32px] w-[32px] rounded-[100px] object-cover' />
                <p  className='text-sm text-[#434242]'>{notification.priorityName}</p>
            </div>
        </div>

        {!isFixed && <p className='absolute z-[1] right-4 top-5 md:bottom-5 md:top-[unset] text-[#434242] text-xs'>1 hour ago</p>}
        {isFixed && <p className='absolute z-[1] right-4 bottom-5 text-[#434242] text-xs'>{timeAgo(notification.createdAt)}</p>}
        {isFixed && <CloseOutlined onClick={(e) => {
            e.stopPropagation();
            if (onCancel) onCancel()}} className='absolute z-[1] right-4 top-5 text-[#434242] text-xs' />}
    </Card>
  )
}

export default NotificationCard