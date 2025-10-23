import { Card, Col, Row } from 'antd'
import React from 'react'
import RateCard from '../cards/RateCard'

interface props {
    worker?: boolean;
}
const Review = ({ worker }: props) => {
  return (
    <Card 
        title={worker ? "Client Rating & Review" :"Worker's Rating & Review"} 
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
    >
        <Row gutter={[5, 5]}  className='py-6'>
            <Col lg={24} sm={24} xs={24} >
                <RateCard />
            </Col>
            <Col lg={24} sm={24} xs={24} >
                <RateCard />
            </Col>
        </Row>
        </Card>
        
  )
}

export default Review