"use client"
import InfoDet from '@/components/admin/cards/InfoDet'
import PopularServiceCard from '@/components/admin/cards/PopularServiceCard'
import AdminContainer from '@/components/dashboard/AdminContainer'
import InfoWalletCards from '@/components/wallet/cards/InfoWalletCards'
import { ArrowUpOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { App, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../../utils/errorInstance'
import { getAdminPopularServiceAndSatisfaction, getAdminReports } from '@/redux/action/admin'
import { IAdminReports } from '../../../../../utils/interface'

const Page = () => {
  const [ loading, setLoading ] = useState(false);
  const { modal } = App.useApp();
  const [ reports, setReports ] = useState<IAdminReports>({
    growthRate: 0,
    newUsers: 7,
    newUsersPercentageChange: 0,
    bookingFrequency: null,
    averageRating: 0,
    popularServices: [],
    userSatisfaction: null
  });
  const [ userSatisfaction, setUserSatifaction ] = useState({
    netPromoterScore: 0,
    promoters: 0,
    passives: 0,
    detractors: 0
  })

  const handleGetAnalytics = useCallback(() => {
    setLoading(true);
    getAdminReports()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setReports(res.data.data);
      }
    })
    .catch(err => {
      setLoading(false);
      modal.error({
        title: "Unable to get admin reports",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal]);

  const handleGetPopularService = useCallback(() => {
    setLoading(true);
    getAdminPopularServiceAndSatisfaction()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setUserSatifaction(res.data.data.userSatisfaction);
      }
    })
    .catch(err => {
      setLoading(false);
      modal.error({
        title: "Unable to get admin reports",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal]);

  useEffect(() => {
    handleGetAnalytics();
    handleGetPopularService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <AdminContainer active='Analytics'>
  <Card classNames={{ body: "bg-[#f6f6f6]!"}} loading={loading}>
    <div>
      <h1 className='t-pri !font-semibold text-[32px]'>Analytics & Reporting</h1>
      <p className='t-pri mb-6'>Platform performance metrics and insights</p>
    </div>

    <Row className='mt-6 mb-4' gutter={[15, 15]}>
      <Col lg={6} sm={12} xs={24}>
        <InfoWalletCards
          title='User Growth Rate'
          amount={`${reports.growthRate}%`}
          isWallet
          info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>This month</span> </p>}
          icon={<Icon icon="bx:dollar" color='#670316' />}
        />
      </Col>
      <Col lg={6} sm={12} xs={24}>
        <InfoWalletCards 
          title='New Users'
          amount={reports.newUsers}
          isWallet
          info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'> <ArrowUpOutlined /> {reports.newUsersPercentageChange}%</span> from last month</p>}
          icon={<Icon icon="mingcute:time-line"  color='#670316' />}
        />
      </Col>
      <Col lg={6} sm={12} xs={24}>
        <InfoWalletCards 
          title='Booking Frequency'
          amount={reports.bookingFrequency || 0}
          info={<p className='text-xs'>Average per month</p>}
          icon={<Icon icon="nrk:media-media-complete" color='#670316' />}
          isWallet
        />
      </Col>
      <Col lg={6} sm={12} xs={24}>
        <InfoWalletCards 
          title='Avg. Rating'
          amount={reports.averageRating}
          isWallet
          info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'> Platform-wide</span> </p>}
          icon={<Icon icon="carbon:analytics" color='#670316' />}
        />
      </Col>
    </Row>

       <Row className='mt-6 mb-4' gutter={[15, 15]}>
      <Col lg={12} sm={12} xs={24}>
        <Card loading={loading} title={<p className='text-[#1e1e1e] font-bold text-lg'>Popular Services</p>}>
          <Row className='' gutter={[15, 15]}>
            {reports.popularServices.map((service, i: number) => (
              <Col lg={24} sm={24} xs={24} key={i}>
                <PopularServiceCard service={service} />
              </Col>
            ))}

            {reports.popularServices.length === 0 && (
              <Col lg={24} sm={24} xs={24}>
                <p className='text-[#1e1e1e] text-center'>You have no popular service</p>
              </Col>
            )}
          </Row>
        </Card>
      </Col>

      <Col lg={12} sm={12} xs={24}>
        <Card loading={loading} title={<p className='text-[#1e1e1e] font-bold text-lg'>User Satisfaction (NPS)</p>}>
          <div className='flex items-center justify-center'>
            <div className='w-[127px] h-[127px] flex items-center justify-center bg-[#FFF3F6] rounded-full border border-[#FFE4E9]'>
              <div className='w-[98px] h-[98px] flex items-center justify-center bg-[#FFEEF2] rounded-full border border-[#FFF9FA]'>
                <p className='text-5xl font-semibold'>{userSatisfaction.netPromoterScore}</p>
              </div>
            </div>
          </div>

          <p className='text-[#343434] font-semibold text-xl text-center mt-2'>Net Promoter Score</p>

          <Row gutter={[10, 10]} className='mt-6'>
            <Col lg={24} sm={24} xs={24}>
              <InfoDet 
                title="Promoters (9-10)"
                percent={`${userSatisfaction.promoters}%`}
                bg="#F1F6FF"
                color="#2860D8"
                border="#D9E5FF"
              />
            </Col>

             <Col lg={24} sm={24} xs={24}>
              <InfoDet 
                title="Passives (7-8)"
                percent={`${userSatisfaction.passives}%`}
                bg="#F8F3FF"
                color="#8A38F5"
                border="#E7D5FF"
              />
            </Col>

             <Col lg={24} sm={24} xs={24}>
              <InfoDet 
                title="Detractors (0-6)"
                percent={`${userSatisfaction.detractors}%`}
                bg="#FFF5F5"
                color="#ff0000"
                border="#FFDDDD"
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>

  </Card> 
  </AdminContainer>
  )
}

export default Page