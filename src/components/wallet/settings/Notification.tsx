import CheckCard from '@/components/client/cards/CheckCard'
import CardTitle from '@/components/general/CardTitle'
import { Icon } from '@iconify/react'
import { Card, Col, Row } from 'antd'
import React from 'react'

const Notification = () => {
  return (
    <Card 
        title={<CardTitle title='Notification Settings' icon={<Icon icon="line-md:security" fontSize={14} className='mr-1' />}  />}
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        classNames={{ header: "linear" }}
    >
        <Row gutter={[5, 5]} className='py-6'>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Job Matches' description='New jobs matching your skills' />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Booking Updates' description='Changes to your bookings' />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Messages' description='Receive emails when you get new messages from workers' />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Payment Alerts' description='Earnings and payout notifications' />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Marketing Email' description='Tips, updates, and promotions' />
            </Col>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Email Notifications' description='Receive notifications via email' />
            </Col>
        </Row>
    </Card>
  )
}

export default Notification