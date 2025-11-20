import { Card } from 'antd'
import Image from 'next/image'
import React from 'react'
import { Lightening } from '../../../assets/icons'
import { C1 } from '../../../assets/image'
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { INotification } from '../../../utils/interface'
import { timeAgo } from '../../../utils/converters'
import { markNotificationOneAsRead } from '@/redux/action/extra'

interface props {
  isFixed?: boolean;
  onCancel?: () => void;
  notification: INotification;
  loading?: boolean;
  onClick?: () => void;
}
const NotificationCard = ({ isFixed, onCancel, notification, loading, onClick }: props) => {
  return (
  <Card onClick={onClick} styles={{
    body: {
      display: "flex", 
      gap: isFixed ? 10 : 4, 
      position: "relative",
      backgroundColor: "#fff", 
      padding: isFixed ? "10px 2px 5px" : "20px"
    }
  }}>
  <div className='bg-[#FFF9FA] flex items-center justify-center !h-6 !w-6'>'
    <Image src={Lightening} alt={""} /> 
  </div>

  <div>
    <p className='text-[#101828] text-sm'>{notification.title}</p>
    <p className={`${isFixed ? "text-xs" : "text-sm"} text-[#667085]`}>{notification.message}</p>
    {!isFixed && <div className='flex items-center gap-3 mt-3'>
      <Image src={C1} alt='image' className='h-[32px] w-[32px] rounded-[100px] object-cover' />
      <p  className='text-sm text-[#434242]'>{notification.priorityName}</p>
    </div>}
    {isFixed && <p className='text-right mt-2 text-[#434242] text-xs'>{notification.timestamp && timeAgo(notification?.timestamp)}</p>}
  </div>

  {!isFixed && <p className='absolute z-[1] right-4 top-5 md:bottom-5 md:top-[unset] text-[#434242] text-xs'>{notification.createdAt && timeAgo(notification.createdAt)}</p>}
  
  {isFixed && 
    (loading ? 
      <LoadingOutlined 
        spin 
        className='absolute z-[1] right-4 top-5 text-[#434242] text-xs'
      />
    : <CloseOutlined 
      onClick={(e) => {
        e.stopPropagation();
        if (onCancel) onCancel()
      }} 
      className='absolute z-[1] right-4 top-2 text-[#434242] text-xs' />)
    }
  </Card>
  )
}

export default NotificationCard