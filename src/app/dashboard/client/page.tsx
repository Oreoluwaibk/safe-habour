"use client"
import ClientContainer from '@/components/dashboard/ClientContainer'
import CompleteInfo from '@/components/general/CompleteInfo'
import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons'
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
import { createErrorMessage } from '../../../../utils/errorInstance';
import { getClientMetrics } from '@/redux/action/client';
import { IClientDashboardMetrics } from '../../../../utils/interface';

const Page = () => {
  const router = useRouter();
  const { modal } = App.useApp();
  const [ closeInfo, setCloseInfo ] = useState(false);
  const { user } = useAppSelector(state => state.auth);
  const { message } = App.useApp();
  const { authentication } = useAuthentication();
  const [ metrics, setMetrics ] = useState<IClientDashboardMetrics>({ 
    "activeJobs": 0, 
    "totalSpent": 0, 
    "refundsIssued": 0, 
    "pendingTransactions": 0, 
    "totalTransactions": 0, 
    "totalTransactionAmount": 0, 
    "thisMonthTransactions": 0, 
    "thisMonthAmount": 0, 
    "lastMonthTransactions": 0, 
    "lastMonthAmount": 0, 
    "percentageChangeFromLastMonth": 0, 
    "changeDescription": "No transactions yet", 
    "totalCompletedJobs": 0, 
    "averageJobCost": 0, 
    "currentMonth": { 
      "jobsCompleted": 0, 
      "jobsPosted": 0, 
      "transactionCount": 0, 
      "totalSpent": 0, 
      "averageJobCost": 0, 
      "year": 2025, "month": 11, 
      "monthName": "November 2025"
     }, 
     "previousMonth": { 
      "jobsCompleted": 0, 
      "jobsPosted": 11, 
      "transactionCount": 0, 
      "totalSpent": 0, 
      "averageJobCost": 0,
       "year": 2025, 
       "month": 10, 
       "monthName": 
       "October 2025" 
      }, 
      "activeJobsList": [] 
    });
  const [ loading, setLoading ] = useState(false);

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
  }, [router, user?.lastName, message]);

  const handleGetMetrics = useCallback(() => {
    setLoading(true);
    getClientMetrics()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setMetrics(res.data);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get metrics",
        content: err?.response
          ? createErrorMessage(err.response.data)
          : err.message,
      });
    })
  }, [modal]);

  useEffect(() => {
    handleGetMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetClientJobs();
  }, [handleGetClientJobs]);

  return (
    <ClientContainer active='Dashboard'>
      <div >
        <h1 className='t-pri !font-semibold text-[32px]'>Welcome Back, {user?.lastName}! {loading && <LoadingOutlined spin/>}</h1>
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
            amount={metrics.activeJobs}
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoCards 
            title='Total Spent'
            amount={`$${metrics.totalSpent.toFixed(2)} CAD`}
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoCards 
            title='Refund Issued'
            amount={`$${metrics.refundsIssued.toFixed(2)} CAD`}
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoCards 
            title='Pending Transactions'
            amount={metrics.pendingTransactions}
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