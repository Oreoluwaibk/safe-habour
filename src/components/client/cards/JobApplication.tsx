"use client"
import { App, Col, Row, Skeleton } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import JobApplicationCard from './JobApplicationCard'
import { IJobApplication } from '../../../../utils/interface'
import { getAllJobApplications } from '@/redux/action/jobs'
import { createErrorMessage } from '../../../../utils/errorInstance'

const JobApplication = () => {
  const [ loading, setLoading ] = useState(false);
  const { modal } = App.useApp();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [ applications, setApplications ] = useState<IJobApplication[]>([]);
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [ totalApplications, setTotalApplications ] = useState(0);

  const handleGetApplications = useCallback(
    async (isLoadMore = false) => {
      // prevent duplicate fetches
      if (loading) return;

      setLoading(true);
      try {

        const res = await getAllJobApplications(
          filters.pageNumber,
          filters.pageSize,
        );

        if (res.status === 200 || res.status === 201) {
          const newList = res.data.data?.list || [];

          const totalList =  isLoadMore ? [...applications, ...newList] : newList;
          const totalItems = res.data.data?.totalItems || 0;
          setTotalApplications(totalItems || 0);
          setApplications((prev) => isLoadMore ? [...prev, ...newList] : newList);

          // ✅ Determine if more results exist
          if(totalList.length === totalItems || totalList.length > totalItems) {
            setHasMore(false);
          }else setHasMore(totalList.length < totalItems);
        }
      } catch (err: any) {
        modal.error({
          title: "Unable to get applications",
          content: err?.response
            ? createErrorMessage(err.response.data)
            : err.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [modal, loading, filters.pageNumber, filters.pageSize]
  );

  useEffect(() => {
    handleGetApplications();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    if (filters.pageNumber > 1 && totalApplications > applications.length) {
      handleGetApplications(true);
    }
  }, [filters.pageNumber, handleGetApplications, totalApplications, applications.length]);

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
    return observer.disconnect();
  }, [hasMore, loading]);

  return (
    <Skeleton loading={loading} className='h-full'>
      <Row gutter={[15, 15]} className='h-full'>
      {applications.map((application) => (
        <Col key={application.id} lg={24} sm={24} xs={24}>
          <JobApplicationCard application={application} />
        </Col>
      ))}
      
      <Col lg={24} sm={24} xs={24} className='pb-4'>
        {loading && filters.pageNumber > 1 && (
          <p className="text-center text-gray-400">Loading more...</p>
        )}
        {!hasMore && !loading && applications.length > 0 && (
          <p className="text-center text-gray-400">
            No more jobs available
          </p>
        )}

        {/* ✅ Intersection trigger */}
        <div ref={observerRef} style={{ height: "1px" }} />
      </Col>
     
    </Row>
    </Skeleton>
  )
}

export default JobApplication