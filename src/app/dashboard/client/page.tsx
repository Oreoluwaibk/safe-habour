"use client"
import ClientContainer from '@/components/dashboard/ClientContainer'
import CompleteInfo from '@/components/general/CompleteInfo'
import { ArrowRightOutlined } from '@ant-design/icons'
import React, { useCallback, useEffect, useState } from 'react';
import "@/styles/client.css"
import Link from 'next/link';
import { Col, Row, App } from 'antd';
import InfoCards from '@/components/client/cards/InfoCards';
import WorkerComponent from '@/components/client/WorkerComponent';
import { useAppSelector } from '@/hook';
import { getClientJobs } from '@/redux/action/jobs';
import { useRouter } from 'next/navigation';
import { useAuthentication } from '@/hooks/useAuthentication';

const Page = () => {
  const router = useRouter();
  const [ closeInfo, setCloseInfo ] = useState(false);
  const { user } = useAppSelector(state => state.auth);
  const { message } = App.useApp();
  const { authentication } = useAuthentication()

  useEffect(() => {
    if(user) setCloseInfo(!user.isProfileComplete)
  }, [user]);

  useEffect(() => {
    if(authentication) setCloseInfo(!authentication.isProfileComplete)
  }, [authentication])

  const handleGetClientJobs = useCallback(() => {
    getClientJobs()
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data && res.data.data?.totalItems === 0) {
            message.info(`Welcome ${user?.lastName}, kindly create a job to continue!`);
            setTimeout(() => {
              router.push("/dashboard/client/intro");
            }, 2000);
          }
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [router, user?.lastName]);

  useEffect(() => {
    handleGetClientJobs();
  }, [handleGetClientJobs]);

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