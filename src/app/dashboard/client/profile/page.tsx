"use client"
import "@/styles/setting.css";
import NotificationSetting from "@/components/client/settings/NotificationSetting";
import PaymentSchedule from "@/components/client/settings/PaymentSchedule";
import PersonalSettings from "@/components/client/settings/PersonalSettings";
import ResetPassword from "@/components/client/settings/ResetPassword";
import Review from "@/components/client/settings/Review";
import TwoFactor from "@/components/client/settings/TwoFactor";
import VerificationSettings from "@/components/client/settings/VerificationSettings";
import ClientContainer from '@/components/dashboard/ClientContainer'
import { Card, Col, Row, Segmented } from 'antd'
import React, { useState } from 'react'

const Page = () => {
  const [selected, setSelected ] = useState("Payment Methods");
  return (
   <ClientContainer active='Profile'>
    <Card variant="borderless" style={{padding: 0, border: "none", backgroundColor: "#F9FAFB", minHeight: "85vh"}}>
        <Row className='' gutter={[15, 15]}>
          <Col lg={24} sm={24} xs={24} className='mb-6'>
            <Segmented 
              options={["Profile Settings", "Notification Settings", "Password", "Payment Methods", "Verification Settings", "Two Factor Authentication", "Review"]}
              defaultValue={selected}
              onChange={(value) => setSelected(value)}
            />
          </Col>

          {selected === "Profile Settings" && <Col lg={24} sm={24} xs={24} className='mb-6 md:!px-[200px]'>
            <PersonalSettings />
          </Col>}

          {selected === "Notification Settings" && <Col lg={24} sm={24} xs={24} className='mb-6 md:!px-[200px]'>
            <NotificationSetting />
          </Col>}

          {selected === "Password" && <Col lg={24} sm={24} xs={24} className='mb-6 md:!px-[200px]'>
            <ResetPassword />
          </Col>}

          {selected === "Two Factor Authentication" && <Col lg={24} sm={24} xs={24} className='mb-6 md:!px-[200px]'>
            <TwoFactor />
          </Col>}

          {selected === "Payment Methods" && <Col lg={24} sm={24} xs={24} className='mb-6 md:!px-[300px]'>
            <PaymentSchedule />
          </Col>}

          {selected === "Verification Settings" && <Col lg={24} sm={24} xs={24} className='mb-6 md:!px-[200px]'>
            <VerificationSettings />
          </Col>}

          {selected === "Review" && <Col lg={24} sm={24} xs={24} className='mb-6 md:!px-[200px]'>
            <Review />
          </Col>}
          
      </Row>
      </Card>
   </ClientContainer>
  )
}

export default Page