"use client"
import TransactionCard from '@/components/client/cards/TransactionCard';
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import CardTitle from '@/components/general/CardTitle';
// import Status from '@/components/general/Status';
import InfoWalletCards from '@/components/wallet/cards/InfoWalletCards';
import { ClockCircleOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Button, Card, Col, Form, Pagination, PaginationProps, Row, Segmented, Select } from 'antd';
import React, { useState } from 'react'

const FormItem = Form.Item;
const Page = () => {
    const [form] = Form.useForm();
    const [ active, setActive ] = useState("Payouts");
    const [ current ] = useState(1);
    const [ total ] = useState(10);
    const [ pageSize ] = useState(10)

    const extra = (
        <div className='flex items-center gap-3'>
            <span className='text-[#373737] bg-[#f7f7f7] p-1 rounded-[6px] cursor-pointer'>
                <SearchOutlined className='text-lg text-[#373737]' />
            </span>

            <Select style={{height: 30, width:104}} placeholder="All Types">

            </Select>
            <Select style={{height: 30, width:104}} placeholder="All Status">

            </Select>
            <Select style={{height: 30, width:104}} placeholder="All Times">

            </Select>
        </div>
    )

    const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
        if(type === "prev")return <div className='flex justify-start'><Button className='!border-[#D0D5DD] !h-8'>Previous</Button></div>
        if(type === "next")return <div className='flex justify-end'><Button className='!border-[#D0D5DD] !h-8'>Next</Button></div>
        return originalElement
    }
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
            amount="$1,280.50"
            isWallet
            // info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>10%</span>  vs last month</p>}
            icon={<Icon icon="bx:dollar" color='#670316' />}
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoWalletCards 
            title='Cleared Balance'
            amount="$1,432.00"
            isWallet
            info='Available for payout'
            icon={<Icon icon="iconoir:piggy-bank"  color='#670316' />}
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoWalletCards 
            title='Pending in Escrow'
            amount="23"
            info="Being processed"
            icon={<ClockCircleOutlined className='tetx-[#670316]' />}
            isWallet
          />
        </Col>
        <Col lg={6} sm={12} xs={24}>
          <InfoWalletCards 
            title='This Month'
            amount="$1320.32"
            isWallet
            info={<p className='text-xs'><span className='bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-[16px]'>10%</span>  vs last month</p>}
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
                    <p className='text-lg text-[#191919] font-medium'>$1,560.60</p>
                </div>]}
            >
                <div className='flex items-center justify-between'>
                    <p className='text-lg text-[#343433]'>Gross Earnings</p>
                    <p className='text-lg text-[#323232] font-medium'>$1,734.00</p>
                </div>

                <div className='flex items-center justify-between'>
                    <p className='text-lg text-[#343433]'>Platform Fees (10%)</p>
                    <p className='text-lg text-[#ff0044] font-medium'>-$173.40</p>
                </div>
            </Card>
        </Col>
        <Col lg={24} sm={24} xs={24} className='mb-6'>
            <Card 
              variant="borderless" 
              style={{border: "none", boxShadow: "none"}}
              title={<p className='text-lg text-[#1e1e1e]'>Recent Activity</p>}
              extra={  <Button onClick={() => setActive("Transactions")} type="default" className='!h-[38px] !text-[#393939] !border-[#E9E9E9] !bg-[#F6F6F6] !rounded-[68px]'>View all</Button>}
              styles={{body: {display: "flex", flexDirection: "column", gap: 10}}}
            >
              <TransactionCard isTransaction />
              <TransactionCard isTransaction />
              <TransactionCard isTransaction />

            </Card>
        </Col>
    </Row>}

    {active === "Transactions"&& <Row className='my-6' gutter={[15, 15]}>
        <Col lg={24} sm={24} xs={24} className='mb-6'>
            <Card 
              variant="borderless" 
              style={{border: "none", boxShadow: "none"}}
              title={<p className='text-lg text-[#1e1e1e]'>Transaction History</p>}
              extra={extra}
              styles={{body: {display: "flex", flexDirection: "column", gap: 10}}}
            >
              <TransactionCard isTransaction />
              <TransactionCard isTransaction />
              <TransactionCard isTransaction />

            </Card>
        </Col>
        <Col lg={24} sm={24} xs={24}>
            <Pagination 
                responsive
                // style={{width: "100%", alignItems: "center", justifyContent:"center"}}
                // showSizeChanger={false}
                itemRender={itemRender}
                // total={400}
                align="center"
                current={current}
                total={total}
                pageSize={pageSize}
                className="border-t border-t-[#eaecf0] !pt-4 !w-full custom"
                showTotal={(total) =>
                    `Page ${current} of ${Math.ceil(total / (pageSize || 1))}`
                }
            />
        </Col>
    </Row>}

    {active === "Payouts"&& <Row className='my-6' gutter={[15, 15]}>
        <Col lg={14} sm={24} xs={24} className='mb-6'>
            <Card 
              title={<p className='text-lg text-[#1e1e1e]'>Payout Settings</p>}
            //   extra={extra}
              styles={{body: {display: "flex", flexDirection: "column", gap: 10}}}
              actions={[<div key={1} className='flex items-center justify-between px-6 font-medium'>
                <Button type="primary" className='md:!w-full !h-[48px]' style={{borderRadius: 50}}>Update Settings</Button>
            </div>]}
            >
            <Form form={form} layout="vertical">
            <FormItem label="Payout Schedule" name="schdule">
                <Select placeholder="Weekly (friday)"></Select>
            </FormItem>

            <FormItem label="Payout Method" name="schdule">
                <Select placeholder="Card"></Select>
            </FormItem>
            </Form>

            <div className='flex items-center justify-between bg-[#FFF4F6] border-[#FFD6DE] rounded-[5px] p-4'>
                <CardTitle title='Connected Account' description="RBC Royal Bank - Account ending in 4567" icon={<Icon icon="fluent:payment-48-regular" fontSize={18} />}/>

                <div className='flex flex-col gap-0'>
                    <Button type="primary" className='md:!min-w-[129px] !h-[48px]' style={{borderRadius: 50}}>Defaults</Button>
                </div>
            </div>
            <div className='flex items-center justify-between font-medium'>
                <Button type="default" className='md:!w-full !h-[48px]' icon={<PlusOutlined />} style={{borderRadius: 50}}>Add Payment Method</Button>
            </div>

            </Card>
        </Col>

        <Col lg={10} sm={24} xs={24} className='mb-6'>
            <Card 
              title={<p className='text-lg text-[#1e1e1e]'>Payout History</p>}
            //   extra={extra}
              styles={{body: {display: "flex", flexDirection: "column", gap: 10}}}
            >
              <TransactionCard isTransaction payout />
              <TransactionCard isTransaction payout/>
              <TransactionCard isTransaction payout/>

            </Card>
        </Col>
       
    </Row>}
    </WorkerContainer>
  )
}

export default Page