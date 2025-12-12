"use client"
import EscrowFunds from '@/components/admin/cards/EscrowFunds'
import AdminContainer from '@/components/dashboard/AdminContainer'
import Dot from '@/components/general/Dot'
import InfoWalletCards from '@/components/wallet/cards/InfoWalletCards'
import { getAdminEscrowFunds, getAdminFinanceStats,  getAdminRevenueBreakdown } from '@/redux/action/admin'
import { Icon } from '@iconify/react'
import { App, Card, Col, Progress, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  PieLabelRenderProps,
  PieProps
} from "recharts";
import { createErrorMessage } from '../../../../../utils/errorInstance'
import { IEscrowEntryResponse, IRevenueBreakdownSlice } from '../../../../../utils/interface'

const COLORS = ["#FED500", "#039855", "#2860D8", "#8A38F5"];


const Page = () => {
  const { modal } = App.useApp();
  const [ loading, setLoading ] = useState(false);
  const [ metrics, setMetrics ] = useState({
    totalTransactionVolume: 0.00,
    transactionVolumeChangePercent: 0,
    platformRevenue: 0.00,
    totalPayouts: 0.00,
    fundsInEscrow: 0.00,
    escrowActiveJobs: 0
  });
  const [ revenueBreakdown, setRevenueBreakdown ] = useState<IRevenueBreakdownSlice[]>([]);
  const [ data, setData ] = useState<PieProps["data"]>([]);
  const [ escrowWallet, setEscrowWallet ] = useState<IEscrowEntryResponse[]>([]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelRenderProps) => {
    if (
      cx === undefined ||
      cy === undefined ||
      midAngle === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      percent === undefined
    ) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={13}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(2)}%
      </text>
    );
  };

  const handleGetFinancialMetrics = useCallback(() => {
    setLoading(true);
    getAdminFinanceStats()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setMetrics(res.data.data);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get financial stats",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal]);

  const handleGetFinancialBreakDown = useCallback(() => {
    setLoading(true);
    getAdminRevenueBreakdown()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        const newSet: PieProps["data"] = [];
        const breakdown = res.data.data;
        breakdown.map((item: IRevenueBreakdownSlice) => {
          const payload = {
            name: item.serviceCategory,
            value: item.amount
          }
          newSet.push(payload)
        })
        setRevenueBreakdown(res.data.data);
        if(newSet.length > 0) setData(newSet);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get financial breakdown",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal]);

  const handleGetEscrowWallet = useCallback(() => {
    setLoading(true);
    getAdminEscrowFunds()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setEscrowWallet(res.data.data);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get escrow wallet",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal]);
  
  useEffect(() => {
    handleGetFinancialMetrics();
    handleGetFinancialBreakDown();
    handleGetEscrowWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <AdminContainer active='Financial'>
  <Card classNames={{ body: "bg-[#f6f6f6]!"}} loading={loading}>
    <div>
      <h1 className='t-pri !font-semibold text-[32px]'>Financial Dashboard</h1>
      <p className='t-pri mb-6'>Monitor and manage all platform bookings</p>
    </div>

    <Row className='mt-6 mb-4' gutter={[15, 15]}>
      <Col lg={6} sm={12} xs={24}>
        <InfoWalletCards 
          title='Total Transaction Volume'
          amount={`$${metrics.totalTransactionVolume}`}
          isWallet
          info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>{metrics.transactionVolumeChangePercent}% commission</span> </p>}
          icon={<Icon icon="bx:dollar" color='#670316' />}
        />
      </Col>
      <Col lg={6} sm={12} xs={24}>
        <InfoWalletCards 
          title='Platform Revenue'
          amount={`$${metrics.platformRevenue}`}
          isWallet
          info={`${metrics.platformRevenue} pending verification`}
          icon={<Icon icon="mingcute:time-line"  color='#670316' />}
        />
      </Col>
      <Col lg={6} sm={12} xs={24}>
        <InfoWalletCards 
          title='Total Payouts'
          amount={`$${metrics.totalPayouts}`}
          info={<p className='text-xs'>Paid to workers</p>}
          icon={<Icon icon="nrk:media-media-complete" color='#670316' />}
          isWallet
        />
      </Col>

    
      <Col lg={6} sm={12} xs={24}>
        <InfoWalletCards 
          title='Funds in Escrow'
          amount={`$${metrics.fundsInEscrow}`}
          isWallet
          info={`${metrics.escrowActiveJobs} active jobs`}
          icon={<Icon icon="carbon:analytics" color='#670316' />}
        />
      </Col>

    
      
    </Row>

    <Row className='mt-6 mb-4' gutter={[15, 15]}>
      <Col lg={12} sm={12} xs={24}>
        <Card title={<p className='text-[#1e1e1e] font-bold text-lg'>Funds in Escrow</p>}>
          <Row className='' gutter={[15, 15]}>
            {escrowWallet.map((wallet, i: number) => (
              <Col lg={24} sm={24} xs={24} key={i}>
                <EscrowFunds wallet={wallet} />
              </Col>
            ))}

            {escrowWallet.length === 0 && (
              <Col lg={24} sm={24} xs={24}>
                <p className='text-[#1e1e1e] text-center'>You have not fund in your escrow</p>
              </Col>
            )}
          </Row>
        </Card>
      </Col>

      <Col lg={12} sm={12} xs={24}>
        <Card title={<p className='text-[#1e1e1e] font-bold text-lg'>Revenue Breakdown (%)</p>}>
        {data!.length > 0 && <Row gutter={[5,5]}>
          <Col lg={16} sm={24} xs={24}>
            <div style={{height: data!.length > 0 ? 250 : 20}}>
              <ResponsiveContainer className="h-full!">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}     // 👈 Makes it a donut!
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={3}
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {data!.map((_, index) => (
                      <Cell 
                        key={index} 
                        fill={COLORS[index % COLORS.length]}  
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  {/* <Legend /> */}
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Col>
          <Col lg={8} sm={24} xs={24} className="flex flex-col justify-end gap-1">
            <div className="flex flex-col justify-end gap-1 h-[250px]">
              {revenueBreakdown.map((breakdown, i) => (
                <Dot key={i} color={COLORS[i] || "#2860D8"} title={breakdown.serviceCategory} />
              ))}
            </div>
          </Col>
        </Row>}
        {data!.length === 0 && <p className='w-full text-center text-[#1e1e1e] font-semibold'>No Statistic to display!</p>}
        </Card>
      </Col>
    </Row>
  </Card>
  </AdminContainer>
  )
}

export default Page