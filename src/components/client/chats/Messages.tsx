import { Col, Row } from 'antd';
import React from 'react'
import SingleMessage from './SingleMessage';
import { IMessage } from '../../../../utils/interface';

interface props {
    messages: IMessage[];
}
const Messages = ({ messages }: props) => {
  return (
  <Row gutter={[20,25]}>
  {messages.map((message: IMessage, i: number) => (
    <Col key={i} lg={24} sm={24} xs={24}>
      <SingleMessage message={message} />
    </Col>
  ))}
  </Row>
  )
}

export default Messages