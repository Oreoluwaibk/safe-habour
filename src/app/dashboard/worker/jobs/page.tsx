"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import AvailableContainer from '@/components/wallet/AvailableContainer'
import FilterCard from '@/components/wallet/cards/FilterCard'
import JobHistoryCard from '@/components/wallet/cards/JobHistoryCard'
import { Card, Col, Row, Segmented } from 'antd'
import React, { useState } from 'react'

const Page = () => {
  const [ isHistory, setIsHistory ] = useState(false);
  return (
    <WorkerContainer active='Jobs'>
      <div>
        <h1 className='t-pri !font-semibold text-[32px]'>Job Opportunities</h1>
        <p className='t-pri mb-6'>Find and apply to jobs that match your skills</p>
      </div>

      <div  className='mb-6'>
        <Segmented 
          options={["Overview", "Job History"]}
          defaultValue='Overview'
          onChange={(value) => value === "Overview" ? setIsHistory(false) : setIsHistory(true)}
        />
      </div>

      {!isHistory && <Row gutter={[15, 15]} className='pb-6'>
        <Col lg={10} sm={24} xs={24}>
          <FilterCard />
        </Col>

        <Col lg={14} sm={24} xs={24}>
          <AvailableContainer isJobs />
        </Col>
      </Row>}

      {isHistory &&
        <Card
        title={<div className='flex items-center gap-4'>
          <CardTitle title='Job History' />
          <Status title='3 Completed' bg='#f4f4f4' color='#373737' />
        </div>}
        >
        <Row gutter={[15, 15]} className='pb-6'>
          <Col lg={24} sm={24} xs={24}>
            <JobHistoryCard />
          </Col>
        </Row>
        </Card>
      }
    </WorkerContainer>
  )
}

export default Page