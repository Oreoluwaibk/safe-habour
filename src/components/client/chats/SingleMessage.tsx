import { Card } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { C1 } from '../../../../assets/image';
import { BsRecordFill } from 'react-icons/bs';
import { IMessage } from '../../../../utils/interface';
import { useAppSelector } from '@/hook';
import moment from 'moment';

interface props {
    message: IMessage;
}
const SingleMessage = ({ message }: props) => {
    const [ isUser, setIsUser ] = useState(false);
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        if(message.senderId === user.id) setIsUser(true);
    }, [message, user.id])
  return (
    <div style={{display: "flex", justifyContent: isUser ? "right" :"left", gap: 10}}>
    {!isUser && <div className='relative'>
        <Image className='h-[40px] w-[40px] rounded-[100px] object-cover' src={C1} alt="" />
        <BsRecordFill color='#12B76A' size={20} className='absolute bottom-[30px] right-[-4px]' />
    </div>}
    <Card
        title={<p className='text-[#344054] text-xs font-medium'>{isUser ? "You" : message.receiver.fullName}</p>}
        extra={<p className='text-[#667085] text-xs font-light'>{moment(message.sentAt).format("dddd h:mm a")}</p>}
        styles={{header: {padding: 0, border: "none", boxShadow: "none", minHeight: "fit-content", paddingBottom: 5}, body: {padding: "15px", borderRadius: 15, backgroundColor: isUser ? "#670316" : "#F2F4F7"}}}
        style={{border: "none", boxShadow: "none", padding: 0, backgroundColor: "#F9FAFB",  width: isUser ? 428 : 520}}
    >
        <p style={{color: isUser ? "#fff" : "#373737", fontWeight: 300}}>{message.content}</p>
    </Card>  
    </div>
  )
}

export default SingleMessage