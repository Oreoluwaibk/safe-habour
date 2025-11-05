"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import ProfileInfo from '@/components/wallet/profile/ProfileInfo'
import { Col, Row, Segmented } from 'antd'
import React, { useState } from 'react'
import "@/styles/setting.css";
import ServicesInfo from '@/components/wallet/profile/Services'
import Verification from '@/components/wallet/profile/Verification'
import { useAuthentication } from '@/hooks/useAuthentication'
import { useServiceCategory } from '@/hooks/useServiceCategory'
import WorkerReview from '@/components/wallet/profile/WorkerReview'

const Page = () => {
  const [ active, setActive ] = useState("Profile Info");
  const { authentication, handleGetAuthentication, loading: authLoading } = useAuthentication();
  const { categories, loading: serviceLoading } = useServiceCategory();
  return (
    <WorkerContainer active='Profile'>
      <div >
        <h1 className='t-pri !font-semibold text-[32px]'>Profile</h1>
        <p className='t-pri mb-6'>Manage your professional profile and settings</p>

      </div>

      <div  className='mb-6'>
        <Segmented 
          options={["Profile Info", "Services & Rate", "Verification", "Review"]}
          defaultValue={active}
          value={active}
          onChange={(value) => setActive(value)}
        />
      </div>

      <Row className='min-h-[90vh]'>
        {active === "Profile Info" && <Col lg={24} sm={24} xs={24} className='md:!px-[100px]'>
          <ProfileInfo  
            authentication={authentication!} 
            handleGetAuthentication={handleGetAuthentication} 
            categories={categories}
            authLoading={authLoading}
          />
        </Col>}
        {active === "Services & Rate" && <Col lg={24} sm={24} xs={24}>
          <ServicesInfo 
            authentication={authentication!} 
            handleGetAuthentication={handleGetAuthentication}
            categories={categories}
            serviceLoading={serviceLoading}
            authLoading={authLoading}
          />
        </Col>}
        {active === "Verification" && <Col lg={24} sm={24} xs={24}  className='md:!px-[200px]'>
          <Verification 
            authentication={authentication!} 
            handleGetAuthentication={handleGetAuthentication}
            authLoading={authLoading}
          />
        </Col>}
        {active === "Review" && <Col lg={24} sm={24} xs={24} className='md:!px-[100px]'>
          <WorkerReview userId={authentication?.id || ""}  />
        </Col>}
      </Row>
    </WorkerContainer>
  )
}

export default Page