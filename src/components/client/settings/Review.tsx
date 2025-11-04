import { Card, Col, Row } from 'antd'
import React from 'react'
import RateCard from '../cards/RateCard'
import { review } from '../../../../utils/interface';

interface props {
    worker?: boolean;
    loading?: boolean;
    reviews?: review[]
}
const Review = ({ worker, loading, reviews = [] }: props) => {
  return (
    <Card 
        title={worker ? "Client Rating & Review" :"Worker's Rating & Review"} 
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        loading={loading}
    >
        <Row gutter={[5, 5]}  className='py-6'>
            {reviews.map((review, i: number) => (
                <Col lg={24} sm={24} xs={24} key={i}>
                    <RateCard reviewDetails={review} />
                </Col>
            ))}

            {reviews.length === 0 && (
                <Col lg={24} sm={24} xs={24}>
                    <p className='text-[#121212] text-center mt-8'>There are no review</p>
                </Col>
            )}
        </Row>
        </Card>
        
  )
}

export default Review