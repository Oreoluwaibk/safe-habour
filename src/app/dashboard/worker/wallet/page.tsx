"use client"
import TransactionCard from '@/components/client/cards/TransactionCard';
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import CardTitle from '@/components/general/CardTitle';
// import Status from '@/components/general/Status';
import InfoWalletCards from '@/components/wallet/cards/InfoWalletCards';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { App, Button, Card, Col, Row, Segmented } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { EarningsSummary, PaymentTransaction } from '../../../../../utils/interface';
import { getServiceWorkerMetrics } from '@/redux/action/serviceWorker';
import { createErrorMessage } from '../../../../../utils/errorInstance';
import Payout from '@/components/wallet/transactions/Payout';
import Transactions from '@/components/wallet/transactions/Transactions';
import { getWorkerPayments } from '@/redux/action/transaction';

const Page = () => {
  const { modal } = App.useApp();
  const [ active, setActive ] = useState("Overview");
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
  const [ transactions, setTransactions ] = useState<PaymentTransaction[]>([]);
  const [ loading, setLoading ] = useState(false);

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

  const handleGetTransactions = useCallback(() => {
    setLoading(true);
    getWorkerPayments()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setTransactions(res.data.slice(0, 3));
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
    if(active === "Overview"){
      handleGetMetrics();
      handleGetTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  
  return (
  <WorkerContainer active='Wallet'>
  <div>
    <h1 className='t-pri !font-semibold text-[32px]'>Wallet & Earnings</h1>
    <p className='t-pri mb-6'>Manage your earnings and payout preferences</p>
  </div> 

  <div  className='mb-6'>
    <Segmented 
      options={["Overview", "Transactions", "Payouts"]}
      defaultValue='Overview'
      value={active}
      onChange={(value) => setActive(value)}
    />
  </div>

  {active === "Overview"&& <Row className='mt-6' gutter={[15, 15]}>
    <Col lg={6} sm={12} xs={24}>
      <InfoWalletCards 
        title='Total Earnings'
        amount={`$${metrics.totalEarnings.toFixed(2)}`}
        isWallet
        // info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>10%</span>  vs last month</p>}
        icon={<Icon icon="bx:dollar" color='#670316' />}
      />
    </Col>
    <Col lg={6} sm={12} xs={24}>
      <InfoWalletCards 
        title='Cleared Balance'
        amount={`$${metrics.clearedBalance.toFixed(2)}`}
        isWallet
        info='Available for payout'
        icon={<Icon icon="iconoir:piggy-bank"  color='#670316' />}
      />
    </Col>
    <Col lg={6} sm={12} xs={24}>
      <InfoWalletCards 
        title='Pending in Escrow'
        amount={metrics.pendingInEscrow}
        info="Being processed"
        icon={<ClockCircleOutlined className='tetx-[#670316]' />}
        isWallet
      />
    </Col>
    <Col lg={6} sm={12} xs={24}>
      <InfoWalletCards 
        title='This Month'
        amount={`$${metrics.currentMonth.totalEarnings.toFixed(2)}`}
        isWallet
        info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>{metrics.percentageChangeFromLastMonth}%</span>  vs last month</p>}
        icon={<Icon icon="carbon:analytics" color='#670316' />}
      />
    </Col>
  </Row>}

  {active === "Overview"&& <Row className='mt-6' gutter={[15, 15]}>
    <Col lg={14} sm={24} xs={24} className='mb-6'>
        <Card
            title={<CardTitle title='Next Scheduled Payout' icon={<Icon icon="fluent:payment-48-regular" fontSize={18} />}/>}
            classNames={{
                header: "",
                body: "flex flex-col gap-2"
            }}
            actions={[<div key={1} className='flex items-center justify-between px-6 font-medium'>
                <Button type="primary" className='md:!w-full !h-[48px]' style={{borderRadius: 50}} icon={<Icon icon="fluent:payment-48-regular" />}>Instant Payment ($2.99 fee)</Button>
            </div>]}
        >
            <div className='flex items-center justify-between bg-[#FFF4F6] border-[#FFD6DE] rounded-[5px] p-4'>
                <div className='flex flex-col gap-0'>
                    <p className='text-sm text-[#343433]'>Available for payout</p>
                    <p className='text-lg text-[#101828] font-medium'>$1,432.00</p>
                </div>

                <div className='flex flex-col gap-0'>
                    <p className='text-sm text-[#343433]'>Next payout</p>
                    <p className='text-lg text-[#101828] font-medium'>Sat, Sept 20</p>
                </div>
            </div>

            <p className='text-[#343434] text-sm'>Automatic weekly payouts are processed every Friday</p>
        </Card>
    </Col>
    <Col lg={10} sm={24} xs={24} className='mb-6'>
        <Card
            title={<CardTitle title='Earnings Breakdown'/>}
            classNames={{
                header: "linear",
                body: "flex flex-col gap-4"
            }}
            actions={[<div key={1} className='flex items-center justify-between px-6 font-medium'>
                <p className='text-lg text-[#191919]'>Net Earnings</p>
                <p className='text-lg text-[#191919] font-medium'>${metrics.totalEarnings.toFixed(2)}</p>
            </div>]}
        >
            <div className='flex items-center justify-between'>
                <p className='text-lg text-[#343433]'>Gross Earnings</p>
                <p className='text-lg text-[#323232] font-medium'>${metrics.totalGrossEarnings.toFixed(2)}</p>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-lg text-[#343433]'>Platform Fees (10%)</p>
                <p className='text-lg text-[#ff0044] font-medium'>-${metrics.totalPlatformFees.toFixed(2)}</p>
            </div>
        </Card>
    </Col>
    <Col lg={24} sm={24} xs={24} className='mb-6'>
      <Card 
        variant="borderless" 
        loading={loading}
        style={{border: "none", boxShadow: "none"}}
        title={<p className='text-lg text-[#1e1e1e]'>Recent Activity</p>}
        extra={  <Button onClick={() => setActive("Transactions")} type="default" className='!h-[38px] !text-[#393939] !border-[#E9E9E9] !bg-[#F6F6F6] !rounded-[68px]'>View all</Button>}
        styles={{body: {display: "flex", flexDirection: "column", gap: 10}}}
      >
        {transactions.map((transaction: PaymentTransaction, i: number) => (
          <TransactionCard key={i} isTransaction transaction={transaction} />
        ))}

        {transactions.length === 0 && (
          <p className='text-center text-[#121212]'>You have no transaction</p>
        )}
      </Card>
    </Col>
  </Row>}

  {active === "Transactions"&& <Transactions />}

  {active === "Payouts"&& <Payout />}
  </WorkerContainer>
  )
}

export default Page