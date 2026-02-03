import { Col, Row } from 'antd';
import React, { useEffect, useRef } from 'react'
import SingleMessage from './SingleMessage';
import { IMessage } from '../../../../utils/interface';

interface props {
    messages: IMessage[];
}
const Messages = ({ messages }: props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);


  return (
  <Row 
    gutter={[20,5]} 
    className='h-full overflow-y-scroll pb-4'
    ref={scrollRef}
  >
  {messages.map((message: IMessage, i: number) => (
    <Col key={i} lg={24} sm={24} xs={24}>
      <SingleMessage message={message} />
    </Col>
  ))}
  </Row>
  )
}

export default Messages