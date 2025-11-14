"use client"
import ResetPassword from '@/components/client/settings/ResetPassword';
import TwoFactor from '@/components/client/settings/TwoFactor';
import WorkerContainer from '@/components/dashboard/WorkerContainer';
import Account from '@/components/wallet/settings/Account';
import Notification from '@/components/wallet/settings/Notification';
import Payout from '@/components/wallet/settings/Payout';
import { Col, Row, Segmented } from 'antd';
import React, { useState } from 'react'

const Page = () => {
    const [ active, setActive ] = useState("Notification Settings");
  return (
    <WorkerContainer active='Settings'>
      <div >
        <h1 className='t-pri !font-semibold text-[32px]'>Settings</h1>
        <p className='t-pri mb-6'>Manage your account preferences and security</p>

      </div>

      <div  className='mb-6'>
        <Segmented 
          options={["Notification Settings", "Security & Privacy", "Payout Settings", "Account"]}
          defaultValue={active}
          value={active}
          onChange={(value) => setActive(value)}
        />
      </div>

      <Row className='min-h-[90vh] mt-4'>
       {active === "Notification Settings" && <Col lg={24} sm={24} xs={24} className='md:!px-[100px]'>
          <Notification />
        </Col>}
          {active === "Security & Privacy" && <Col lg={24} sm={24} xs={24}>
          <ResetPassword />
          {/* <TwoFactor /> */}
        </Col>}
       {active === "Payout Settings" && <Col lg={24} sm={24} xs={24}  className='md:!px-[200px]'>
          <Payout />
        </Col>}
        {active === "Account" && <Col lg={24} sm={24} xs={24} className='md:!px-[100px]'>
          <Account />
        </Col>} 
      </Row>
    </WorkerContainer>
  )
}

export default Page