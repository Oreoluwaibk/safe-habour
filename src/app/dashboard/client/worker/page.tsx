"use client"
import BookingSystem from '@/components/client/BookingSystem'
import WorkerComponent from '@/components/client/WorkerComponent'
import ClientContainer from '@/components/dashboard/ClientContainer'
import { Col, Row, Segmented } from 'antd'
import React, { useState } from 'react'

const Page = () => {
  const [ isBooking, setIsBooking ] = useState(false);
  return (
    <ClientContainer active='Worker'>
      <Row className='mt-0' gutter={[15, 15]}>
        <Col lg={24} sm={24} xs={24}>
          <Segmented 
            options={["Workers", "Booking System"]}
            defaultValue='Workers'
            onChange={(value) => value === "Workers" ? setIsBooking(false) : setIsBooking(true)}
          />
        </Col>
        {!isBooking && <Col lg={24} sm={24} xs={24}>
          <WorkerComponent />
        </Col>}
        {isBooking && <Col lg={24} sm={24} xs={24} className='mt-4'>
          <BookingSystem />
        </Col>}
      </Row>
    </ClientContainer>
    
  )
}

export default Page