import Review from '@/components/client/settings/Review'
import { getWorkerReview } from '@/redux/action/review';
import { App } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance';
import { review } from '../../../../utils/interface';

interface props {
    userId: string;
}
const WorkerReview = ({ userId }: props) => {
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ reviews, setReviews ] = useState<review[]>([]);

    const handleGetReview = useCallback(() => {
        setLoading(true);
        getWorkerReview(userId)
        .then(res => {
            if(res.status === 200 || res.status === 201){
                setLoading(false);
                // console.log("response", res.data);
                setReviews(res.data.data);
            }
        })
        .catch((err) => {
            modal.error({
                title: "Unable to get worker's review",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false),
            });
        });
    }, [modal, userId]);

    useEffect(() => {
        handleGetReview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <div>
        <Review 
            worker
            loading={loading}
            reviews={reviews}
        />
    </div>
  )
}

export default WorkerReview