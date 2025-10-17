"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import ProfileInfo from '@/components/wallet/profile/ProfileInfo'
import { Col, Row, Segmented } from 'antd'
import React, { useState } from 'react'
import "@/styles/setting.css";

const Page = () => {
    const [ active, setActive ] = useState("Profile Info");
  return (
    <WorkerContainer active='Profile'>
      <div >
        <h1 className='t-pri !font-semibold text-[32px]'>Profile</h1>
        <p className='t-pri mb-6'>Manage your professional profile and settings</p>

      </div>

      <div  className='mb-6'>
        <Segmented 
          options={["Profile Info", "Services & Rate", "Verification", "Review"]}
          defaultValue='Profile Info'
          value={active}
          onChange={(value) => setActive(value)}
        />
      </div>

      <Row>
        <Col lg={24} sm={24} xs={24}>
          <ProfileInfo />
        </Col>
      </Row>
    </WorkerContainer>
  )
}

export default Page