"use client"
import ClientContainer from '@/components/dashboard/ClientContainer'
import CompleteInfo from '@/components/general/CompleteInfo'
import { ArrowRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import "@/styles/client.css"
import Link from 'next/link';
import { Col, Row } from 'antd';
import InfoCards from '@/components/client/cards/InfoCards';
import WorkerComponent from '@/components/client/WorkerComponent';
import { useAppSelector } from '@/hook';

const Page = () => {
  const [ closeInfo, setCloseInfo ] = useState(true);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if(user) setCloseInfo(!user.isProfileComplete)
  }, [user])
  return (
    <ClientContainer active='Dashboard'>
      <div >
        <h1 className='t-pri !font-semibold text-[32px]'>Welcome Back, {user?.lastName}!</h1>
        <p className='t-pri mb-6'>Manage your services and connect with trusted workers in your area.</p>

        {closeInfo && <CompleteInfo 
          title='Complete your profile settings'
          description='Ensure that all required details are filled out to complete your profile.'
          nav={<Link href="/dashboard/client/profile"><p className='color-bg font-medium cursor-pointer'>Get Started <ArrowRightOutlined className='color-bg ml-2' /></p></Link>}
          onCancel={() => setCloseInfo(false)}
        />}
      </div>

      <Row className='mt-6' gutter={[15, 15]}>
        <Col lg={6} sm={12} xs={24}>
          <InfoCards 
            title='Active Bookings'
            amount={4}
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoCards 
            title='Total Spent'
            amount="$1200 CAD"
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoCards 
            title='Refund Issued'
            amount="$300 CAD"
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoCards 
            title='Pending Transactions'
            amount={2}
          />
        </Col>
      </Row>

      <Row className='mt-6' gutter={[15, 15]}>
        <WorkerComponent 
          isDashboard
        />
      </Row>

    </ClientContainer>
  )
}

export default Page