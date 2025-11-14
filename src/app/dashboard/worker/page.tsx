"use client"
import React, { useCallback, useEffect, useState } from 'react';
import WorkerContainer from '@/components/dashboard/WorkerContainer';
import { App, Col, Row } from 'antd';
import InfoWalletCards from '@/components/wallet/cards/InfoWalletCards';
import { Icon } from '@iconify/react';
import "@/styles/workers.css"
import AvailableContainer from '@/components/wallet/AvailableContainer';
import UpcomingContainer from '@/components/wallet/UpcomingContainer';
import CompleteInfo from '@/components/general/CompleteInfo';
import { useAppSelector } from '@/hook';
import { useAuthentication } from '@/hooks/useAuthentication';
import { useRouter } from 'next/navigation';
import { getServiceWorkerMetrics } from '@/redux/action/serviceWorker';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { EarningsSummary } from '../../../../utils/interface';
import { LoadingOutlined } from '@ant-design/icons';

const Page = () => {
  const router = useRouter();
  const [ closeInfo, setCloseInfo ] = useState(true);
  const { message, modal } = App.useApp();
  const { user } = useAppSelector(state => state.auth);
  const { authentication } = useAuthentication();
  const [ metrics, setMetric ] = useState<EarningsSummary>({
    totalGrossEarnings: 0,
    totalPlatformFees: 0,
    totalEarnings: 0,
    clearedBalance: 0,
    pendingInEscrow: 0,
    thisMonthEarnings: 0,
    lastMonthEarnings: 0,
    percentageChangeFromLastMonth: 0,
    changeDescription: "No earnings yet",
    totalCompletedJobs: 0,
    responseRate: 0,
    responseRateDescription: "",
    totalFeesPaid: 0,
    currentMonth: {
      jobsCompleted: 0,
      grossEarnings: 0,
      platformFees: 0,
      netEarnings: 0,
      totalEarnings: 0,
      feesPaid: 0,
      year: 2025,
      month: 11,
      monthName: "November 2025",
    },
    previousMonth: {
      jobsCompleted: 0,
      grossEarnings: 0,
      platformFees: 0,
      netEarnings: 0,
      totalEarnings: 0,
      feesPaid: 0,
      year: 2025,
      month: 10,
      monthName: "October 2025",
    },
  });
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if(authentication) setCloseInfo(!authentication.hasIdentificationDocument);
    if(authentication && !authentication?.isServiceWorkerOnboarded) {
      message.info("Please complete your profile to access all features.")
      setTimeout(() => {
        router.push("/dashboard/worker/intro");
      }, 2000);
    }
  }, [authentication, message, router]);

  const handleGetMetrics = useCallback(() => {
    setLoading(true);
    getServiceWorkerMetrics()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setMetric(res.data);
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


  return (
    <WorkerContainer active='Dashboard'>
      <div >
        <h1 className='t-pri !font-semibold text-[32px]'>Welcome Back, {user?.lastName}! {loading && <LoadingOutlined spin/>}</h1>
        <p className='t-pri mb-6'>Manage your services and connect with trusted workers in your area.</p>

        {closeInfo && <CompleteInfo 
          title='Your Documents are under review'
          description='Profile will be completed and verified after the documents are reviewed by our team.'
          nav=""
          onCancel={() => setCloseInfo(false)}
        />}
      </div>

      <Row className='mt-6' gutter={[15, 15]}>
        <Col lg={6} sm={12} xs={24}>
          <InfoWalletCards 
            title='Total Earnings'
            amount={`$${metrics.totalEarnings.toFixed(2)}`}
            isWallet
            info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>{metrics.percentageChangeFromLastMonth}%</span>  vs last month</p>}
            icon={<Icon icon="bx:dollar" color='#670316' />}
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoWalletCards 
            title='Pending Earnings'
            amount={metrics.pendingInEscrow}
            isWallet
            info='In escrow'
            icon={<Icon icon="mingcute:time-line"  color='#670316' />}
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoWalletCards 
            title='Completed Jobs'
            amount={metrics.totalCompletedJobs}
            info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>8%</span>  vs last month</p>}
            icon={<Icon icon="nrk:media-media-complete" color='#670316' />}
            isWallet
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoWalletCards 
            title='Response Rate'
            amount={metrics.responseRate}
            isWallet
            info="Keep it high"
            icon={<Icon icon="carbon:analytics" color='#670316' />}
          />
        </Col>
      </Row>

      <Row className='mt-6 pb-6' gutter={[15, 15]}>
        <Col lg={14} sm={12} xs={24}>
         <AvailableContainer />
        </Col>

        <Col lg={10} sm={12} xs={24}>
          <UpcomingContainer metrics={metrics} />
        </Col>
        
      </Row>
   

    </WorkerContainer>
  )
}

export default Page