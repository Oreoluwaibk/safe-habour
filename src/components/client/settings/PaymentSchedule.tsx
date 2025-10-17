"use client"
import { CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
// import { Icon } from '@iconify/react'
import { Button, Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import AddCard from '../modal/AddCard'
import PayCard from '../cards/PayCard'


const PaymentSchedule = () => {
    const [ openAdd, setOpenAdd ] = useState(false);
    const [ selected, setSelected ] = useState("");
    const [ isCardSet, setIsCardSet ] = useState(false);
  return (
    <Card 
        title="Payment Methods" 
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
    >
        <Row gutter={[5, 5]}  className='py-6'>
            {!isCardSet && <Col lg={24} sm={24} xs={24} className='!flex !flex-col !items-center gap-4 w-full'>
                <div className='bg-[#FFEAEE] h-[48px] w-[48px] rounded-[100px] flex items-center justify-center'>
                    <CheckCircleOutlined className='text-[#670316] text-xl' color='#670316'  />
                </div>
                <p className='text-[#101828] text-lg'>No Payment Method</p>
                <p className='text-[#667085] text-sm'>Add a payment method to start booking services</p>
                <Button type="primary" onClick={() => {
                    setSelected("")
                    setOpenAdd(true)
                }} className='!w-full !h-[40px] !rounded-[100px]'>Add Payment Method</Button> 
            </Col>}
            
            {isCardSet && <Col lg={24} sm={24} xs={24} className='!flex !flex-col !items-center gap-4 w-full'>
                
                <Row className='!w-full' gutter={[15, 15]}>
                    <Col lg={12} sm={24} xs={24} className='W-full'>
                        <PayCard isMaster />
                    </Col>
                    <Col lg={12} sm={24} xs={24} className='W-full'>
                        <PayCard isChecked />
                    </Col>
                    <p className='text-[#1e1e1e] text-lg font-semibold my-3'>Accounts</p>
                    <Col lg={24} sm={24} xs={24} className='W-full'>
                        <Card variant="borderless" style={{width: "100%"}} styles={{ body: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}}>
                            <div className='flex items-start gap-2 w-full'>
                                <PlusCircleOutlined className='mt-1' />
                                <div>
                                    <p className='font-medium text-[#1e1e1e]'>Link Debit Card</p>
                                    <p className='font-light text-[#525252] text-sm'>You can link your debit card to Safeharbour directly</p>
                                </div>
                            </div>
                            <Button onClick={() => {
                                setSelected("Card");
                                setOpenAdd(true)
                            }} type="primary" className='md:!w-[69px] !h-[34px]' style={{borderRadius: 50}}>Link</Button>
                        </Card>
                        
                    </Col>

                    <Col lg={24} sm={24} xs={24} className='W-full'>
                        <Card variant="borderless" style={{width: "100%"}} styles={{ body: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}}>
                            <div className='flex items-start gap-2 w-full'>
                                <PlusCircleOutlined className='mt-1' />
                                <div>
                                    <p className='font-medium text-[#1e1e1e]'>Link Bank Account</p>
                                    <p className='font-light text-[#525252] text-sm'>You can link your Safeharbour directly to any of your bank accounts</p>
                                </div>
                            </div>
                            <Button onClick={() => {
                                setSelected("Bank Account");
                                setOpenAdd(true)
                            }} type="primary" className='md:!w-[69px] !h-[34px]' style={{borderRadius: 50}}>Link</Button>
                        </Card>
                        
                    </Col>
                </Row> 
            </Col>}
        </Row>
        {openAdd && <AddCard onCancel={() => setOpenAdd(false)} onClick={() => setIsCardSet(true)} open={openAdd} selection={selected} />}
        </Card>
        
  )
}

export default PaymentSchedule