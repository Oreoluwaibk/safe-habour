"use client"
import BookingSystem from '@/components/client/BookingSystem'
import JobApplication from '@/components/client/cards/JobApplication'
// import JobApplicationCard from '@/components/client/cards/JobApplication'
import WorkerComponent from '@/components/client/WorkerComponent'
import ClientContainer from '@/components/dashboard/ClientContainer'
import { Col, Row, Segmented } from 'antd'
import React, { useState } from 'react'

const Page = () => {
  const [ active, setIsActive ] = useState("Workers");
  return (
    <ClientContainer active='Worker'>
      <div className='mb-6'>
        <Segmented 
          options={["Workers", "Booking System", "Job Applications"]}
          defaultValue={active}
          value={active}
          onChange={(value) => setIsActive(value)}
        />
      </div>
      <Row className='min-h-[90vh] mt-4' gutter={[15, 15]}>
        {active === "Workers" && <Col lg={24} sm={24} xs={24}>
          <WorkerComponent />
        </Col>}
        {active === "Booking System" && <Col lg={24} sm={24} xs={24} className='mt-4'>
          <BookingSystem />
        </Col>}

         {active === "Job Applications" && <Col lg={24} sm={24} xs={24} className='mt-0 min-h-[90vh]'>
          <JobApplication />
        </Col>}
      </Row>
    </ClientContainer>
    
  )
}

export default Page