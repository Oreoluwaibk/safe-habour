"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import ProfileInfo from '@/components/wallet/profile/ProfileInfo'
import { Col, Row, Segmented } from 'antd'
import React, { useState } from 'react'
import "@/styles/setting.css";
import ServicesInfo from '@/components/wallet/profile/Services'
import Verification from '@/components/wallet/profile/Verification'
import Review from '@/components/client/settings/Review'

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

      <Row className='min-h-[90vh]'>
        {active === "Profile Info" && <Col lg={24} sm={24} xs={24} className='md:!px-[100px]'>
          <ProfileInfo />
        </Col>}
        {active === "Services & Rate" && <Col lg={24} sm={24} xs={24}>
          <ServicesInfo />
        </Col>}
        {active === "Verification" && <Col lg={24} sm={24} xs={24}  className='md:!px-[200px]'>
          <Verification />
        </Col>}
        {active === "Review" && <Col lg={24} sm={24} xs={24} className='md:!px-[100px]'>
          <Review worker />
        </Col>}
      </Row>
    </WorkerContainer>
  )
}

export default Page