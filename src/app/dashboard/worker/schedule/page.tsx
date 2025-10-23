"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer';
import Availabliltity from '@/components/wallet/schedule/Availabliltity';
import UpcomingSchedule from '@/components/wallet/schedule/UpcomingSchedule';
import WeeklyTemplate from '@/components/wallet/schedule/WeeklyTemplate';
import { Col, Row, Segmented } from 'antd';
import React, { useState } from 'react'

const Page = () => {
    const [ active, setActive ] = useState("Weekly Template");
  return (
    <WorkerContainer active='Schedule'>
      <div >
        <h1 className='t-pri !font-semibold text-[32px]'>Schedule Management</h1>
        <p className='t-pri mb-6'>Manage your availability and view upcoming jobs</p>

      </div>

      <div  className='mb-6'>
        <Segmented 
          options={["Calendar", "Upcoming Jobs", "Weekly Template"]}
          defaultValue='Calendar'
          value={active}
          onChange={(value) => setActive(value)}
        />
      </div>

      <Row className='min-h-[90vh] mt-4'>
       {active === "Calendar" && <Col lg={24} sm={24} xs={24}>
          <Availabliltity />
        </Col>}
        {active === "Upcoming Jobs" && <Col lg={24} sm={24} xs={24}>
          <UpcomingSchedule />
        </Col>}
        {active === "Weekly Template" && <Col lg={24} sm={24} xs={24} >
          <WeeklyTemplate />
        </Col>}
        
      </Row>
    </WorkerContainer>
  )
}

export default Page