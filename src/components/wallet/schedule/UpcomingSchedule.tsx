import CardTitle from '@/components/general/CardTitle'
import { App, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import UpcomingScheduleCard from '../cards/UpcomingScheduleCard'
import { createErrorMessage } from '../../../../utils/errorInstance'
import { IJobApplication } from '../../../../utils/interface'
import { getServiceWorkerUpcomingJobs } from '@/redux/action/jobs'

const UpcomingSchedule = () => {
  const { modal } = App.useApp();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [ loading, setLoading ] = useState(false);
  const [ upcomingJobs, setUpcomingJobs ] = useState<IJobApplication[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [ totalJobs, setTotalJobs ] = useState(0);
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const handleGetUpcomingJobs = useCallback(
      async (isLoadMore = false) => {
        if (loading) return;
  
        setLoading(true);
        const queryParams: Record<string, number> = {};

        Object.entries(filters).forEach(([key, value]) => {
          if (
            value !== undefined &&
            !(Array.isArray(value) && value.length === 0)
          ) {
            queryParams[key] = value;
          }
        });

        getServiceWorkerUpcomingJobs(
          queryParams.pageNumber,
          queryParams.pageSize
        ).then(res => {
          if (res.status === 200 || res.status === 201) {
            setLoading(false);
            const newList = res.data.data?.list || [];
  
            // ✅ Append for load more, otherwise replace
            const totalList =  isLoadMore ? [...upcomingJobs, ...newList] : newList;
            setTotalJobs(res.data.data?.totalItems || 0);
            setUpcomingJobs((prev) =>
              isLoadMore ? [...prev, ...newList] : newList
            );
  
            if(totalList.length === res.data.data?.totalItems || totalList.length > res.data.data?.totalItems) {
              setHasMore(false);
            }else setHasMore(totalList.length < res.data.data?.totalItems);
          }
        })
        .catch(err => {
            modal.error({
            title: "Unable to get upcoming jobs",
            content: err?.response
              ? createErrorMessage(err.response.data)
              : err.message,
            onOk: () => setLoading(false)
          });
        })
      }, [modal, loading, filters, upcomingJobs]);

  useEffect(() => {
      handleGetUpcomingJobs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filters.pageNumber > 1 && totalJobs > upcomingJobs.length) 
      handleGetUpcomingJobs(true);
  }, [filters.pageNumber, handleGetUpcomingJobs, totalJobs, upcomingJobs.length]);

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
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <Card
      title={<CardTitle title='Upcoming Jobs' />}
      classNames={{
        header: "",
      }}
      loading={loading}
    >
      <Row gutter={[15, 15]}>
        {upcomingJobs.map((application:IJobApplication, i: number) => (
          <Col lg={24} sm={24} xs={24} key={i}>
            <UpcomingScheduleCard confirmed={application.jobDetails.isHireDirectly} onRefresh={handleGetUpcomingJobs} application={application}  />
          </Col>
        ))}

        {upcomingJobs.length === 0 && (
          <Col lg={24} sm={24} xs={24}>
            <p className='text-[#121212] text-center mt-8'>You have no upcoming job at the moment</p>
          </Col>
        )}

        <Col lg={24} sm={24} xs={24}>
          {loading && filters.pageNumber > 1 && (
            <p className="text-center text-gray-400 mt-3">Loading more...</p>
          )}
          {!hasMore && !loading && upcomingJobs.length > 0 && (
            <p className="text-center text-gray-400 mt-3">
              No more jobs available
            </p>
          )}

          {/* ✅ Intersection trigger */}
        <div ref={observerRef} style={{ height: "1px" }} />
        </Col>
      </Row>
    </Card>
  )
}

export default UpcomingSchedule