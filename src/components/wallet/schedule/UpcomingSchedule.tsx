import CardTitle from '@/components/general/CardTitle'
import { Card, Col, Row } from 'antd'
import React from 'react'
import UpcomingScheduleCard from '../cards/UpcomingScheduleCard'

const UpcomingSchedule = () => {
  return (
    <Card
      title={<CardTitle title='Upcoming Jobs' />}
      classNames={{
        header: "",
      }}
    >
      <Row gutter={[15, 15]}>
        <Col lg={24} sm={24} xs={24}>
          <UpcomingScheduleCard confirmed />
        </Col>

        <Col lg={24} sm={24} xs={24}>
          <UpcomingScheduleCard />
        </Col>
      </Row>
    </Card>
  )
}

export default UpcomingSchedule