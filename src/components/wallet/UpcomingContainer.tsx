"use client"
import { StarFilled } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { App, Button, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import CardTitle from '../general/CardTitle'
import UpcomingJobCard from './cards/UpcomingJobCard'
import { useRouter } from 'next/navigation'
import { getServiceWorkerUpcomingJobs } from '@/redux/action/jobs'
import { createErrorMessage } from '../../../utils/errorInstance'
import { EarningsSummary, IJobApplication } from '../../../utils/interface'
import { getWorkerReview } from '@/redux/action/review'
import { useAppSelector } from '@/hook'

interface props {
    metrics: EarningsSummary
}
const UpcomingContainer = ({ metrics }: props) => {
    const router = useRouter();
    const { user } = useAppSelector(state => state.auth);
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ upcomingJobs, setUpcomingJobs ] = useState<IJobApplication[]>([]);
    const [ reviews, setReviews ] = useState([]);
    const [ rating, setRating ] = useState("0.0")

    const handleGetUpcomingJobs = useCallback(() => {
        setLoading(true);
        getServiceWorkerUpcomingJobs()
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const upcomingOrTodayJobs = res.data.data.list.filter((job: IJobApplication) => {
                    const baseDate = new Date(job.acceptedAt ?? job.createdAt);
                    baseDate.setHours(0, 0, 0, 0);
                    return baseDate >= today;
                });

                setUpcomingJobs(upcomingOrTodayJobs);
            }
        })
        .catch(err => {
            modal.error({
            title: "Unable to get upcoming jobs",
            content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        })
    }, [])

    const handleGetWorkerReview = useCallback((id: string) => {
        setLoading(true);
        getWorkerReview(id)
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setReviews(res.data.data);
            }
        })
        .catch(err => {
            modal.error({
            title: "Unable to get review",
            content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        })
    }, [user])

    useEffect(() => {
        handleGetUpcomingJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    useEffect(() => {
        if(user?.id) handleGetWorkerReview(user?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
  return (
<>
<Card
    title={<CardTitle 
        title='Upcoming Jobs' 
        icon={<span className='bg-[#FFEAEE] flex items-center justify-center !h-6 !w-6 rounded-[100px]'>
            <Icon icon="stash:data-date-light" fontSize={16} />
            </span>}
        />}
    classNames={{
        header: "linear"
    }}
    loading={loading}
    actions={[<div key={1} className='md:px-6'><Button onClick={() => router.push("/dashboard/worker/schedule")} type="default" className='md:!w-full !h-[48px] !border-[#A9A9A9]' style=     {{borderRadius: 50}} icon={<Icon icon="stash:data-date-light" fontSize={16} />}>View Full Schedule</Button></div>]}
>
    <Row gutter={[15, 15]}>
        {upcomingJobs.map((job:IJobApplication, i: number) => (
            <Col lg={24} sm={24} xs={24} key={i}>
                <UpcomingJobCard job={job} />
            </Col>
        ))}

        {upcomingJobs.length === 0 && (
            <Col lg={24} sm={24} xs={24}>
                <p className='text-center'>You have no upcoming job at the moment</p>
            </Col>
        )}
    </Row>
</Card>

<Card
    title={<CardTitle 
        title='Performance Summary' 
        icon={<span className='bg-[#FFEAEE] flex items-center justify-center !h-6 !w-6 rounded-[100px]'>
            <Icon icon="carbon:analytics" fontSize={16} />
            </span>}
        />}
    classNames={{
        header: "linear",
        body: "flex flex-col gap-6"
    }}
    className='!mt-6'
    loading={loading}
    >
        <div className='flex items-center justify-between'>
            <p className='text-lg text-[#1e1e1e]'>Rating</p>
            <div className='flex items-center gap-1'>
                <StarFilled className='!text-[#ffdd33]' />
                <span className='t-pri font-medium'>{rating}</span>
                <span className='text-[#585858]'>({reviews.length} Reviews)</span>
            </div>
        </div>

        <div className='flex items-center justify-between'>
            <p className='text-lg text-[#1e1e1e]'>Job Completed</p>
             <p className='text-lg text-[#1e1e1e] font-medium'>{metrics.totalCompletedJobs}</p>
        </div>

        <div className='flex items-center justify-between'>
            <p className='text-lg text-[#1e1e1e]'>Response Rate</p>
             <p className='text-lg text-[#1e1e1e] font-medium'>{metrics.responseRate}%</p>
        </div>
</Card>
</>
  )
}

export default UpcomingContainer