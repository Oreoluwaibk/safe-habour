"use client"
import React, { useState } from 'react';
import WorkerContainer from '@/components/dashboard/WorkerContainer';
import { Col, Row } from 'antd';
import InfoWalletCards from '@/components/wallet/cards/InfoWalletCards';
import { Icon } from '@iconify/react';
import "@/styles/workers.css"
import AvailableContainer from '@/components/wallet/AvailableContainer';
import UpcomingContainer from '@/components/wallet/UpcomingContainer';
import CompleteInfo from '@/components/general/CompleteInfo';
import { useAppSelector } from '@/hook';

const Page = () => {
  const [ closeInfo, setCloseInfo ] = useState(true);
  const { user } = useAppSelector(state => state.auth);
  return (
    <WorkerContainer active='Dashboard'>
      <div >
        <h1 className='t-pri !font-semibold text-[32px]'>Welcome Back, {user?.lastName}!</h1>
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
            amount="$1,280.50"
            isWallet
            info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>10%</span>  vs last month</p>}
            icon={<Icon icon="bx:dollar" color='#670316' />}
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoWalletCards 
            title='Pending Earnings'
            amount="14"
            isWallet
            info='In escrow'
            icon={<Icon icon="mingcute:time-line"  color='#670316' />}
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoWalletCards 
            title='Completed Jobs'
            amount="23"
            info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>8%</span>  vs last month</p>}
            icon={<Icon icon="nrk:media-media-complete" color='#670316' />}
            isWallet
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoWalletCards 
            title='Response Rate'
            amount="87%"
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
          <UpcomingContainer />
        </Col>
        
      </Row>
   

    </WorkerContainer>
  )
}

export default Page