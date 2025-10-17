import { Card, Col, Row } from 'antd'
import React from 'react'
import CheckCard from '../cards/CheckCard'

const NotificationSetting = () => {
  return (
    <Card 
        title="Push Notifications" 
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
    >
        <Row gutter={[5, 5]} className='py-6'>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Booking Updates' description='Get notified about booking confirmations, cancellations, and changes' />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Messages' description='Receive emails when you get new messages from workers' />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Payment Updates' description='Get notified about payment processing and receipts' />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Promotions & Marketing' description='Receive promotional offers and service updates' />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Platform Updates' description='Get notified when there is updates on the platform' />
            </Col>
        </Row>
    </Card>
  )
}

export default NotificationSetting