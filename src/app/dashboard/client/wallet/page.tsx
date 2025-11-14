"use client"
import InfoCards from '@/components/client/cards/InfoCards'
import ClientContainer from '@/components/dashboard/ClientContainer'
import { App, Card, Col, Row, Segmented, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import EscrowInfo from '@/components/general/EscrowInfo'
import { SearchOutlined } from '@ant-design/icons'
import TransactionCard from '@/components/client/cards/TransactionCard'
import { IClientDashboardMetrics, PaymentTransaction } from '../../../../../utils/interface'
import { getClientMetrics } from '@/redux/action/client'
import { createErrorMessage } from '../../../../../utils/errorInstance'
import { getClientFee } from '@/redux/action/transaction'

const Page = () => {
  const [ isHistory, setIsHistory ] = useState(false);
  const { modal } = App.useApp();
  const [ transactions, setTransactions ] = useState<PaymentTransaction[]>([]);
  const [ loading, setLoading ] = useState(false);
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

  const handleGetTransactions = useCallback(() => {
    setLoading(true);
    getClientFee()
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
    handleGetMetrics();
    handleGetTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ClientContainer active='Wallet'>
      <Card loading={loading} variant="borderless" style={{padding: 0, border: "none"}}>
        <Row className='min-h-[85vh]!' gutter={[15, 15]} >
          <Col lg={24} sm={24} xs={24} className='mb-6'>
            <Segmented 
              options={["Escrow Wallet", "Transactions History"]}
              defaultValue='Escrow Wallet'
              onChange={(value) => value === "Escrow Wallet" ? setIsHistory(false) : setIsHistory(true)}
            />
          </Col>

          {!isHistory && <Col lg={24} sm={24} xs={24} className='mb-6'>
            <EscrowInfo />
          </Col>}
          {!isHistory && <Col lg={8} sm={12} xs={24}>
            <InfoCards 
              title='Fund Helds'
              amount={`$${metrics.activeJobs} CAD`}
              isWallet
              info='Currently in Escrow'
            />
          </Col>}
          {!isHistory && <Col lg={8} sm={12} xs={24}>
            <InfoCards 
              title='Released'
              isWallet
              amount="$24.00 CAD"
              info='Paid to Workers'
            />
          </Col>}
          <Col lg={8} sm={12} xs={24}>
            <InfoCards 
              title='Total Transactions'
              amount={metrics.totalTransactions}
              isWallet
              info='All Time'
            />
          </Col>
          {isHistory && <Col lg={8} sm={12} xs={24}>
            <InfoCards 
              title='Net Amount'
              amount={`$${metrics.totalSpent.toFixed(2)} CAD`}
              isWallet
              info='Debit'
              red
            />
          </Col>}
          {isHistory && <Col lg={8} sm={12} xs={24}>
            <InfoCards 
              title='Pending Transactions'
              amount={metrics.pendingTransactions}
              isWallet
              info='Awaiting completion'
            />
          </Col>}

          <Col lg={24} sm={24} xs={24} className='mb-6'>
            <Card 
              variant="borderless" 
              style={{border: "none", boxShadow: "none"}}
              title={<p className='text-lg text-[#1e1e1e]'>{isHistory ? "Transaction History" : "Escrow Transactions"}</p>}
              extra={isHistory && (
                <div className='flex items-center gap-3'>
                  <SearchOutlined className='text-[#676767]' />
                  <Select placeholder="All Statuses" className='extra' style={{backgroundColor: "#fcfcfc",}} />
                </div>
              )}
              styles={{body: {display: "flex", flexDirection: "column", gap: 10}}}
            >
              <Row gutter={[15, 15]}>
                {transactions.length > 0 && transactions.map((transaction: PaymentTransaction, i: number) => (
                  <Col lg={24} sm={24} xs={24} key={i}>
                    <TransactionCard key={i} isTransaction={isHistory} transaction={transaction} />
                  </Col>
                ))}
                {transactions.length === 0 && <Col lg={24} sm={24} xs={24} className='my-4'>
                  <p className='text-[#121212] text-center'>No transaction yet</p>
                </Col>}
              </Row>
            </Card>
          </Col>
      </Row>
      </Card>
    </ClientContainer>
  )
}

export default Page