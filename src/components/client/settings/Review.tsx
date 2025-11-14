import { App, Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import RateCard from '../cards/RateCard'
import { review } from '../../../../utils/interface';
import { getClientReview, getWorkerReview } from '@/redux/action/review';
import { useAppSelector } from '@/hook';
import { createErrorMessage } from '../../../../utils/errorInstance';

interface props {
    worker?: boolean;
    loading?: boolean;
    reviews?: review[]
}
const Review = ({ worker, loading }: props) => {
    const { modal } = App.useApp();
    const { user } = useAppSelector(state => state.auth);
    const [ checkLoading, setLoading ] = useState(false);
    const [ reviews, setReviews ] = useState<review[]>([]);

    const handleGetWorkerReviews = () => {
        setLoading(true);
        getWorkerReview(user.id)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setReviews(res.data.data);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to get reviews",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false),
            });
        })
    }

    const handleGetClientReviews = () => {
        setLoading(true);
        getClientReview(user.id)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setReviews(res.data.data);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to get reviews",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false),
            });
        })
    }

    useEffect(() => {
        if(worker) handleGetWorkerReviews();
        else handleGetClientReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [worker])

  return (
    <Card 
        title={worker ? "Client Rating & Review" :"Worker's Rating & Review"} 
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        loading={loading || checkLoading}
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