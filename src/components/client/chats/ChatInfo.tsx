import { Card } from 'antd'
import Image from 'next/image'
import React from 'react'
import { C1 } from '../../../../assets/image'
import { BsRecordFill } from 'react-icons/bs';
import { MessageUserDto } from '../../../../utils/interface';
import { timeAgo } from '../../../../utils/converters';

interface props {
    isActive?: boolean;
    chat?: MessageUserDto
}
const ChatInfo = ({ isActive, chat }: props) => {
  return (
    <Card variant='borderless' style={{borderRadius: 0, backgroundColor: isActive ? "#FFF7F9" : ""}} styles={{body: { display: "flex", flexDirection: "column", gap: 10, padding: "10px 20px", cursor: "pointer"}}}>
        <div className='flex items-start justify-between'>
            <div className='flex items-center gap-4'>
                <div className='relative'>
                    <Image className='h-[40px] w-[40px] rounded-[100px] object-cover' src={chat?.profilePicturePath || C1} alt="" />
                    <BsRecordFill color='#12B76A' size={20} className='absolute bottom-[-4px] right-[-4px]' />
                </div>
                
                <div className='flex flex-col text-sm'>
                    <p className='font-medium' style={{ color: isActive ? "#820116" : "#344054"}}>{chat?.firstName} {chat?.lastName}</p>
                    <p style={{ color: isActive ? "#820116" : "#667085"}}>{chat?.fullName}</p>
                </div>
            </div>
            {chat?.sentAt && <span className='text-xs' style={{ color: isActive ? "#820116" : "#667085"}}>{timeAgo(chat?.sentAt)}5min ago</span>}
        </div>
        <p className='text-sm' style={{ color: isActive ? "#820116" : "#797A7A"}}>{chat?.lastMessage}</p>
    </Card>
  )
}

export default ChatInfo