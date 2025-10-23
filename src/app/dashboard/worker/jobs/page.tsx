"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import AvailableContainer from '@/components/wallet/AvailableContainer'
import FilterCard from '@/components/wallet/cards/FilterCard'
import JobApplication from '@/components/wallet/cards/JobApplication'
import JobHistoryCard from '@/components/wallet/cards/JobHistoryCard'
import { Card, Col, Row, Segmented } from 'antd'
import React, { useState } from 'react'

const Page = () => {
  const [ active, setActive ] = useState("My Applications");
  return (
    <WorkerContainer active='Jobs'>
      <div>
        <h1 className='t-pri !font-semibold text-[32px]'>Job Opportunities</h1>
        <p className='t-pri mb-6'>Find and apply to jobs that match your skills</p>
      </div>

      <div  className='mb-6'>
        <Segmented 
          options={["Browse Jobs", "Job History", "My Applications"]}
          defaultValue={active}
          onChange={(value) => setActive(value)}
          value={active}
        />
      </div>

      {active === "Browse Jobs" && <Row gutter={[15, 15]} className='pb-6'>
        <Col lg={10} sm={24} xs={24}>
          <FilterCard />
        </Col>

        <Col lg={14} sm={24} xs={24}>
          <AvailableContainer isJobs />
        </Col>
      </Row>}

      {active === "Job History" &&
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

      {active === "My Applications" && (
        <Card
          title={<CardTitle title='My Job Applications' status={<Status title='3 Opportunities' size={12} bg='#F4F4F4' color='#343434' />} />}
          classNames={{
            header: "",
          }}
        >
          <Row gutter={[15, 15]}>
            <Col lg={24} sm={24} xs={24}>
              <JobApplication accepted />
            </Col>

            <Col lg={24} sm={24} xs={24}>
              <JobApplication />
            </Col>
          </Row>
        </Card>
      )}
    </WorkerContainer>
  )
}

export default Page