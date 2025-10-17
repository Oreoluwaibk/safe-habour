"use client"
import InfoCards from '@/components/client/cards/InfoCards'
import ClientContainer from '@/components/dashboard/ClientContainer'
import { Card, Col, Row, Segmented, Select } from 'antd'
import React, { useState } from 'react'
import EscrowInfo from '@/components/general/EscrowInfo'
import { SearchOutlined } from '@ant-design/icons'
import TransactionCard from '@/components/client/cards/TransactionCard'

const Page = () => {
  const [ isHistory, setIsHistory ] = useState(false);
  return (
    <ClientContainer active='Wallet'>
      <Card variant="borderless" style={{padding: 0, border: "none"}}>
        <Row className='' gutter={[15, 15]}>
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
              amount="$48.00 CAD"
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
              amount="4"
              isWallet
              info='All Time'
            />
          </Col>
          {isHistory && <Col lg={8} sm={12} xs={24}>
            <InfoCards 
              title='Net Amount'
              amount="$56.00 CAD"
              isWallet
              info='Debit'
              red
            />
          </Col>}
          {isHistory && <Col lg={8} sm={12} xs={24}>
            <InfoCards 
              title='Pending Transactions'
              amount="1"
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
              <TransactionCard isTransaction={isHistory} />
              <TransactionCard isTransaction={isHistory} />
              <TransactionCard isTransaction={isHistory} />

            </Card>
          </Col>
      </Row>
      </Card>
    </ClientContainer>
  )
}

export default Page