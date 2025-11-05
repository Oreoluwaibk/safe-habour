"use client"
import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { App, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import JobHistoryCard from '../cards/JobHistoryCard'
import { IJobApplication } from '../../../../utils/interface'
import { getServiceWorkerJobHistory } from '@/redux/action/jobs'
import { createErrorMessage } from '../../../../utils/errorInstance'
import axios from 'axios'
import { useAuthentication } from '@/hooks/useAuthentication'

const WorkerJobHistory = () => {
    const [ loading, setLoading ] = useState(false);
    const { modal } = App.useApp();
    const [ jobs, setJobs ] = useState<IJobApplication[]>([]);
    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 10,
    });
    const { authentication } = useAuthentication();
    const [ totalJobs, setTotalJobs ] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const handleGetHistory = useCallback(
    async (isLoadMore = false) => {
        // prevent duplicate fetches
        if (loading) return;

        setLoading(true);
        try {

            const res = await getServiceWorkerJobHistory(
                filters.pageNumber,
                filters.pageSize,
            );

            if (res.status === 200 || res.status === 201) {
                const newList = res.data.data?.list || [];

                setTotalJobs(res.data.data.totalItems || 0);
                // ✅ Append for load more, otherwise replace
                setJobs((prev) =>
                    isLoadMore ? [...prev, ...newList] : newList
                );

                    // ✅ Determine if more results exist
                setHasMore(newList.length === filters.pageSize);
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                modal.error({
                title: "Unable to get worker's job history",
                content: err.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                });
            } else if (err instanceof Error) {
                modal.error({
                title: "Unable to get worker's job history",
                content: err.message,
                });
            } else {
                modal.error({
                title: "Unable to get worker's job history",
                content: "Something went wrong.",
                });
            }
        } finally {
            setLoading(false);
        }
    },
    [modal, loading, filters.pageNumber, filters.pageSize]
    );

    useEffect(() => {
    handleGetHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
    
    useEffect(() => {
        if (filters.pageNumber > 1 && totalJobs > jobs.length) 
            handleGetHistory(true);
    }, [filters.pageNumber, handleGetHistory, totalJobs, jobs.length]);

    useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
        (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
            setFilters((prev) => ({
            ...prev,
            pageNumber: prev.pageNumber + 1, // ✅ increment page safely
            }));
        }
        },
        { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => 
        observer.disconnect();
    }, [hasMore, loading]);

  return (
    <Card
    title={<div className='flex items-center gap-4'>
        <CardTitle title='Job History' />
        <Status title={`${jobs.length} Completed`} bg='#f4f4f4' color='#373737' />
    </div>}
    loading={loading}
    >
        <Row gutter={[15, 15]} className='pb-6'>
            {jobs.map((job:IJobApplication, i: number) => (
                <Col lg={24} sm={24} xs={24} key={i}>
                    <JobHistoryCard user={authentication!} refresh={handleGetHistory} job={job} />
                </Col>
            ))}

            {jobs.length === 0 && (
                <Col lg={24} sm={24} xs={24}>
                    <p className='text-center text-[#121212]'>You have no job history</p>
                </Col>
            )}

            <Col  lg={24} sm={24} xs={24}>
                {loading && filters.pageNumber > 1 && (
                    <p className="text-center text-gray-400 mt-3">Loading more...</p>
                )}
                {!hasMore && !loading && jobs.length > 0 && (
                    <p className="text-center text-gray-400 mt-3">
                    No more history available
                    </p>
                )}

                <div ref={observerRef} style={{ height: "1px" }} />
            </Col>
        </Row>
    </Card>
  )
}

export default WorkerJobHistory