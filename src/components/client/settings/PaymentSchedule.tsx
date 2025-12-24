"use client"
import { CheckCircleOutlined } from '@ant-design/icons'
// import { Icon } from '@iconify/react'
import { App, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import PayCard from '../cards/PayCard'
import { ICardDetails } from '../../../../utils/interface'
import { getPaymentMethods } from '@/redux/action/transaction'
import { createErrorMessage } from '../../../../utils/errorInstance'
import AddPaymentMethod from '@/components/general/AddCardElement'


const PaymentSchedule = () => {
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ cards, setCards ] = useState<ICardDetails[]>([]);

    const handleGetPaymentMethods = useCallback(() => {
        setLoading(true);
        getPaymentMethods()
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setCards(res.data.data);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to get card details",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })
    }, [modal]);

    useEffect(() => {
        handleGetPaymentMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <Card 
        title="Payment Methods" 
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        loading={loading}
    >
        <Row gutter={[5, 5]}  className='py-6'>
            {cards.length === 0 && <Col lg={24} sm={24} xs={24} className='!flex !flex-col !items-center gap-4 w-full'>
                <div className='bg-[#FFEAEE] h-[48px] w-[48px] rounded-[100px] flex items-center justify-center'>
                    <CheckCircleOutlined className='text-[#670316] text-xl' color='#670316'  />
                </div>
                <p className='text-[#101828] text-lg'>No Payment Method</p>
                <p className='text-[#667085] text-sm'>Add a payment method to start booking services</p>
            </Col>}
            
            {cards.length > 0 && <Col lg={24} sm={24} xs={24} className='!flex !flex-col !items-center gap-4 w-full'>
                <Row className='!w-full' gutter={[15, 15]}>
                    {cards.map((card, i) => (
                        <Col lg={12} key={i} sm={24} xs={24} className='W-full'>
                            <PayCard 
                                isChecked={card.isDefault} 
                                isMaster={card.cardBrand === "mastercard"} 
                                card={card} 
                                refresh={handleGetPaymentMethods}
                            />
                        </Col>
                    ))}

                    <Col lg={24} sm={24} xs={24} className='W-full'>
                       <AddPaymentMethod refresh={handleGetPaymentMethods} />
                    </Col>
                </Row> 
            </Col>}
        </Row>
        </Card>
        
  )
}

export default PaymentSchedule