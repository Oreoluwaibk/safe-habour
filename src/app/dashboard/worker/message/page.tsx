"use client"
import ChatInfo from '@/components/client/chats/ChatInfo'
// import ClientContainer from '@/components/dashboard/ClientContainer'
import { LoadingOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
// import { Icon } from '@iconify/react'
import { Row, Col, Card, Input, Button, App, CardProps, Avatar, Image as AntdesingImg } from 'antd'
import Image from 'next/image'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { BsRecordFill } from 'react-icons/bs'
import Messages from '@/components/client/chats/Messages'
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import { createErrorMessage } from '../../../../../utils/errorInstance'
import { getAllMessages, getMessageHistory, sendMessage } from '@/redux/action/messages'
import { IConversation, IMessage } from '../../../../../utils/interface'
import { EditSVG } from '../../../../../assets/icons'
import { pictureUrl } from '../../../../../utils/axiosConfig'

const Message = () => {
  const { modal, message: AntDesignMsg } = App.useApp()
  const [ loading, setLoading ] = useState(false);
  const [ messages, setMessages ] = useState<IMessage[]>([]);
  const [ sendLoading, setSendLoading ] = useState(false);
  const [ fetchLoading, setFetchLoading ] = useState(false);
  const [ message, setMessage ] = useState<string>("");
  const [ chatList, setChatList ] = useState<IConversation[]>([]);
  const [ activeChat, setActiveChat ] = useState<IConversation | null>(null)

  const handleGetMessages = useCallback(() => {
    setLoading(true);
    getAllMessages()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setChatList(res.data.data);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get chats",
        content: err?.response
          ? createErrorMessage(err.response.data)
          : err.message,
      });
    })
  }, [modal]);

  const handleGetMessageHistory = useCallback((id: string) => {
    setFetchLoading(true);
    getMessageHistory(id)
    .then(res => {
      if(res.status === 200) {
        setFetchLoading(false);
        setMessages(res.data.data.messages);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get chat history",
        content: err?.response
          ? createErrorMessage(err.response.data)
          : err.message,
        onOk: () => setFetchLoading(false),
      });
    })
  }, [modal]);

  const handleGetSilent = (id: string) => {
    getMessageHistory(id)
    .then(res => {
      if(res.status === 200) {
        setMessages(res.data.data.messages);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get chat history",
        content: err?.response
          ? createErrorMessage(err.response.data)
          : err.message,
        onOk: () => setFetchLoading(false),
      });
    })
  }

  const handleSendMessage = () => {
    if(!message) return AntDesignMsg.error("Please enter a message to send");
    const payload = {
      message,
      applicationId: activeChat?.applicationId || ""
    }
    setSendLoading(true);
    sendMessage(payload)
    .then(res => {
      if(res.status === 200 || res.status ===201) {
        setSendLoading(false);
        handleGetSilent(activeChat?.applicationId || "");
        setMessage("");
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to send message",
        content: err?.response
          ? createErrorMessage(err.response.data)
          : err.message,
        onOk: () => setSendLoading(false),
      });
    })
  }

  useEffect(() => {
    handleGetMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(activeChat) handleGetMessageHistory(activeChat.applicationId); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChat]);

  const title: CardProps["title"] = (
    <> 
      {!activeChat && <p className='font-medium' style={{ color: "#344054", display: "flex", gap:10}}>
        No Current chat  
      </p>}
      {activeChat && <div className='flex items-center gap-3 w-fit'>
        <div className='relative'>
        {!activeChat.otherUserProfilePicture && <Avatar 
          icon={<UserOutlined className='text-2xl' />} 
          alt={activeChat.otherUserName} 
          size={40} 
          className='h-[40px] w-[40px] rounded-full object-cover' 
        />}
        {activeChat.otherUserProfilePicture && 
        <AntdesingImg 
          className='h-[40px]! w-[40px]! rounded-[100px] object-cover' 
          src={`${pictureUrl}${activeChat?.otherUserProfilePicture}`} 
          alt={activeChat.otherUserName} 
        />}
        </div>
      
        <div className='flex flex-col text-sm'>
          <p className='font-medium' style={{ color: "#344054", display: "flex", gap:10}}>{activeChat.otherUserName} <span className='text-[#12B76A] bg-[#ECFDF3] text-xs px-2 py-0 rounded-[16px] flex items-center gap-2'> <BsRecordFill color='#12B76A' size={8} className='' /> online</span></p>              <p style={{ color: "#667085", fontWeight: 300}}>@{activeChat.otherUserName}</p>
        </div>
    </div>}
    </>
  );
  return (
    <WorkerContainer active='Message'>
      <Row gutter={[15,15]}>
        <Col lg={8} sm={12} xs={24}>
          <Card 
            variant="borderless" 
            style={{boxShadow: "none"}}
            styles={{header: {border: "none", boxShadow: "none"}}}
            title={<div className='px-2'>
              <p className='text-[#1e1e1e] text-lg font-semibold'>Messages <span className='bg-[#FFF7F8] h-[32px] w-[32px] rounded-[100px] text-[#670316] text-xs ml-2'>{chatList.length}</span></p>
              
              </div>}
            extra={<div className='px-2 border p-2 h-[40px] w-[40px] rounded-[8px] border-[#D0D5DD] flex items-center justify-center'><Image src={EditSVG} alt='edit svg' /> </div>}
            loading={loading}
          >
            <div className='md:px-2 pb-4 border-b border-b-[#EAECF0]'>
              <Input style={{width: "100%"}} className='input-h' prefix={<SearchOutlined className='text-[#667085]' />} placeholder='Search' />
            </div>

            <Row>
              {chatList.map((chat:IConversation, i: number) => (
                <Col lg={24} sm={24} xs={24} key={i} onClick={() => setActiveChat(chat)}>
                  <ChatInfo chat={chat} isActive={activeChat?.applicationId === chat.applicationId} />
                </Col>
              ))}

              {chatList.length === 0 && (
                <Col lg={24} sm={24} xs={24}>
                  <p className='text-[#121212] text-center mt-6'>You have no pending or active chat</p>
                </Col>
              )}
            </Row>
          </Card>
        </Col>

        <Col lg={16} sm={12} xs={24}>
          <Card
            variant="borderless" 
            style={{boxShadow: "none", backgroundColor:"#F9FAFB"}}
            styles={{header: { backgroundColor: "#fff", padding: "20px 10px"}, body: {height: "80vh", display: "flex", flexDirection: "column", position: "relative"}}}
            title={title}
          >
            <div className={`h-[80%] ${!activeChat && "flex flex-col items-center justify-center"}`}>
              {activeChat && (
                fetchLoading ? <p className='text-center text-lg'>Loading chat history...<LoadingOutlined spin /></p> :
                <Messages messages={messages} />
              )}
              {!activeChat && <p className='text-center text-lg'>No current chat, select a chat to send messages!</p>}
            </div>
            
            {activeChat && <div className='min-h-[104px] border border-[#D0D5DD] rounded-[8px] p-2 justify-end'>
              <Input.TextArea 
                placeholder='Send a message' 
                className='!border-none !bg-[#F9FAFB]' 
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></Input.TextArea>
              <div className='flex items-center justify-end'>
                <Button onClick={handleSendMessage} loading={sendLoading} type="primary" className='!w-[81px] !h-[40px] !rounded-[100px]'>Send</Button>
              </div>
              
            </div>}
          </Card>
        </Col>
      </Row>
    </WorkerContainer>
  )
}

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Message />
    </Suspense>
  );
};

export default Page