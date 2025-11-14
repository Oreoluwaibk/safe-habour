"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import AvailableContainer from '@/components/wallet/AvailableContainer'
import { Col, Row, Segmented } from 'antd'
import React, { useState } from 'react'
import WorkerJobHistory from '@/components/wallet/jobs/WorkerJobHistory'
import WorkerJobApplication from '@/components/wallet/jobs/WorkerJobApplication'

const Page = () => {
  const [ active, setActive ] = useState("Browse Jobs");
  
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

      <Row gutter={[15, 15]} className='pb-6'>
        {active === "Browse Jobs" &&  <Col lg={24} sm={24} xs={24} className=' h-[58vh] overflow-y-auto'>
          <AvailableContainer isJobs />
        </Col>}

        {active === "Job History" && <Col lg={24} sm={24} xs={24} className=' h-[58vh] overflow-y-auto'>
           <WorkerJobHistory />
        </Col>}

         {active === "My Applications" && <Col lg={24} sm={24} xs={24} className='h-[60vh] overflow-y-auto scrollbar-hide'>
           <WorkerJobApplication />
        </Col>}
      </Row>

    </WorkerContainer>
  )
}

export default Page