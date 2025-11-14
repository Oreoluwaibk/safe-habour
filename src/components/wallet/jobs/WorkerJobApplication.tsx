"use client"
import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { App, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IJobApplication } from '../../../../utils/interface'
import JobApplication from '../cards/JobApplication'
import { getWorkersApplications } from '@/redux/action/jobs'
import { createErrorMessage } from '../../../../utils/errorInstance'
import axios from 'axios'

const WorkerJobApplication = () => {
  const [ loading, setLoading ] = useState(false);
  const { modal } = App.useApp();
  const [ totalJobs, setTotalJobs ] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [ applications, setApplications ] = useState<IJobApplication[]>([]);
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const handleGetApplications = useCallback(
    async (isLoadMore = false) => {
      // prevent duplicate fetches
      if (loading) return;

      setLoading(true);
      try {

        const res = await getWorkersApplications(
          filters.pageNumber,
          filters.pageSize,
        );

        if (res.status === 200 || res.status === 201) {
          const newList = res.data.data?.list || [];

          setTotalJobs(res.data.data.totalItems || 0);
          // ✅ Append for load more, otherwise replace
          setApplications((prev) =>
            isLoadMore ? [...prev, ...newList] : newList
          );

          // ✅ Determine if more results exist
          setHasMore(newList.length === filters.pageSize);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          modal.error({
            title: "Unable to get applications",
            content: err.response
              ? createErrorMessage(err.response.data)
              : err.message,
          });
        } else if (err instanceof Error) {
          modal.error({
            title: "Unexpected Error",
            content: err.message,
          });
        } else {
          modal.error({
            title: "Unknown Error",
            content: "Something went wrong.",
          });
        }
      } finally {
        setLoading(false);
      }
    },
  [modal, loading, filters.pageNumber, filters.pageSize]);

  useEffect(() => {
    handleGetApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    if (filters.pageNumber > 1 && totalJobs > applications.length) 
      handleGetApplications(true);
  }, [filters.pageNumber, handleGetApplications, totalJobs, applications.length]);

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
      title={<CardTitle title='My Job Applications' status={<Status title={`${totalJobs} Opportunities`} size={12} bg='#F4F4F4' color='#343434' />} />}
      classNames={{
      header: "",
      }}
      className='h-[65vh] overflow-y-auto'
      // loading={loading}
    >
        <Row gutter={[15, 15]}>
        {applications.map((application: IJobApplication, index:number) => (
          <Col lg={24} sm={24} xs={24} key={index}>
          <JobApplication onRefresh={handleGetApplications} isApplication accepted={!!application.acceptedAt} application={application} />
          </Col>
        ))}

        {applications.length === 0 && (
          <Col lg={24} sm={24} xs={24}>
            <p className='text-center text-[#121212]'>You have no application</p>
          </Col>
        )}

        <Col  lg={24} sm={24} xs={24}>
        {loading && filters.pageNumber > 1 && (
          <p className="text-center text-gray-400 mt-3">Loading more...</p>
        )}
        {!hasMore && !loading && applications.length > 0 && (
          <p className="text-center text-gray-400 mt-3">
          No more application available
          </p>
        )}

        <div ref={observerRef} style={{ height: "1px" }} />
        </Col>
        </Row>
    </Card>
  )
}

export default WorkerJobApplication