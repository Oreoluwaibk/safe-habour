import ClientContainer from '@/components/dashboard/ClientContainer'
import NotificationCard from '@/components/general/NotificationCard'
import { Card, Col, Row } from 'antd'
import React from 'react'

const Page = () => {
  return (
    <ClientContainer active='Notification'>
      <Card variant="borderless" styles={{body: {border: "none", padding: 0}}} style={{ minHeight: "90vh", border: "none", boxShadow: "none", padding: 0}}>
        <Row gutter={[15,15]}>
          <Col lg={24} sm={24} xs={24}>
            <NotificationCard />
          </Col>

          <Col lg={24} sm={24} xs={24}>
            <NotificationCard />
          </Col>
        </Row>
      </Card>
    </ClientContainer>
  )
}

export default Page