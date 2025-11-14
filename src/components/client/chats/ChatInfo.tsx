import { Avatar, Card, Image } from 'antd';
import React from 'react'
import { BsRecordFill } from 'react-icons/bs';
import { IConversation } from '../../../../utils/interface';
import { timeAgo } from '../../../../utils/converters';
import { pictureUrl } from '../../../../utils/axiosConfig';
import { UserOutlined } from '@ant-design/icons';

interface props {
    isActive?: boolean;
    chat: IConversation
}
const ChatInfo = ({ isActive, chat }: props) => {
  return (
    <Card variant='borderless' style={{borderRadius: 0, backgroundColor: isActive ? "#FFF7F9" : ""}} styles={{body: { display: "flex", flexDirection: "column", gap: 10, padding: "10px 20px", cursor: "pointer"}}}>
        <div className='flex items-start justify-between'>
            <div className='flex items-center gap-4'>
                <div className='relative'>
                    {!chat.otherUserProfilePicture && <Avatar 
                        icon={<UserOutlined className='text-2xl' />} 
                        alt=''
                        size={40} 
                        className='h-[40px] w-[40px] rounded-full object-cover' 
                    />}
                    {chat.otherUserProfilePicture && 
                        <Image 
                            className='h-[40px]! w-[40px]! rounded-[100px] object-cover' 
                            src={`${pictureUrl}${chat?.otherUserProfilePicture}`} 
                            alt={chat.otherUserName} 
                        />}
                    <BsRecordFill color='#12B76A' size={20} className='absolute bottom-[5px] right-[1px]' />
                </div>
                
                <div className='flex flex-col text-sm'>
                    <p className='font-medium' style={{ color: isActive ? "#820116" : "#344054"}}>{chat.otherUserName}</p>
                    <p style={{ color: isActive ? "#820116" : "#667085"}}>{chat.otherUserName}</p>
                </div>
            </div>

            <div className='flex items-center flex-col'>
            {chat.lastMessageAt && <span className='text-xs' style={{ color: isActive ? "#820116" : "#667085"}}>{timeAgo(chat.lastMessageAt)}</span>}
            {chat.unreadCount !== 0 && <span className='text-[10px] rounded-full p-1 bg-[#FFF8F9]' style={{ color: "#820116" }}>{chat.unreadCount}</span>}
            </div>
        </div>
        <p className='text-sm' style={{ color: isActive ? "#820116" : "#797A7A"}}>{chat?.lastMessage}</p>
    </Card>
  )
}

export default ChatInfo