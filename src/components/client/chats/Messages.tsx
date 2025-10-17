import { Col, Row } from 'antd';
import React from 'react'
import SingleMessage from './SingleMessage';

interface props {
    messages: {id: number, content: string; time: string, user: number | string}[];
}
const Messages = ({ messages }: props) => {
  return (
    <Row gutter={[20,25]}>
        {messages.map((message:{id: number, content: string; time: string, user: number|string}, i: number) => <Col key={i} lg={24} sm={24} xs={24}><SingleMessage message={message} /></Col>)}
    </Row>
  )
}

export default Messages