import { Card, Col, Row } from 'antd'
import React from 'react'
import CheckCard from '../cards/CheckCard'

const TwoFactor = () => {
  return (
   <Card 
        title="Two Factor Authentication" 
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
    >
        <Row gutter={[5, 5]} className='py-6'>
            <Col lg={24} sm={24} xs={24}>
                <CheckCard title='Enable Two-Factor Authentication' description='Whenever you sign in to your account, you will need to enter a security code sent to you.' />
            </Col>
           
        </Row>
    </Card>
  )
}

export default TwoFactor