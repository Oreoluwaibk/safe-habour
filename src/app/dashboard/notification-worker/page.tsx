"use client"
import ClientContainer from '@/components/dashboard/ClientContainer'
import NotificationCard from '@/components/general/NotificationCard'
import { getPushNotifications } from '@/redux/action/extra'
import { App, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance'
import { INotification } from '../../../../utils/interface'

const Page = () => {
  const [ loading, setLoading ] = React.useState(false);
  const { modal } = App.useApp();
  const [ notifications, setNotifications ] = useState<INotification[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [ totalJobs, setTotalJobs ] = useState(0);
  const [filters, setFilters] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  const handleGetNotifications = useCallback(
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

    getPushNotifications(
      queryParams.pageNumber,
      queryParams.pageSize
    ).then(res => {
      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        const newList = res.data.data?.list || [];
        const totalList =  isLoadMore ? [...notifications, ...newList] : newList;
        setTotalJobs(res.data.data?.totalItems || 0);
        setNotifications((prev) =>
          isLoadMore ? [...prev, ...newList] : newList
        );

        if(totalList.length === res.data.data?.totalItems || totalList.length > res.data.data?.totalItems) {
          setHasMore(false);
        }else setHasMore(totalList.length < res.data.data?.totalItems);
      }
    })
    .catch(err => {
        modal.error({
        title: "Unable to get notifications",
        content: err?.response
          ? createErrorMessage(err.response.data)
          : err.message,
        onOk: () => setLoading(false)
      });
    })
  }, [modal, loading, filters, notifications]);

  // const handleGetNotifications = useCallback(() => {
  //   setLoading(true);
  //   getPushNotifications()
  //   .then(res => {
  //     if(res.status === 200 || res.status ===201){
  //       setLoading(false);
  //       console.log("www", res.data);
        
  //       setNotifications(res.data.data || []);
  //     }
  //   })
  //   .catch(err => {
  //     modal.error({
  //       title: "Unable to get notifications",
  //       content: err?.response
  //         ? createErrorMessage(err.response.data)
  //         : err.message,
  //       onOk: () => setLoading(false),
  //     });
  //   })
  // }, []);


  useEffect(() => {
  if (filters.pageNumber > 1 && totalJobs > notifications.length) 
    handleGetNotifications(true);
  }, [filters.pageNumber, handleGetNotifications, totalJobs, notifications.length]);

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

  // const handleMArkAsRead = useCallback((id: number) => {

  //   // mark notification as read logic here
  //   message.success("Notification marked as read");
  // }, [message]);

  React.useEffect(() => {
    handleGetNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
  <ClientContainer active='Notification'>
    <Card variant="borderless" styles={{body: {border: "none", padding: 0}}} style={{ minHeight: "90vh", border: "none", boxShadow: "none", padding: 0}}>
      <Row gutter={[15,15]}>
        {notifications.map((notification) => (
        <Col lg={24} sm={24} xs={24} key={notification.id}>
          <NotificationCard
            notification={notification}
          />
        </Col>
        ))}
        {notifications.length === 0 && !loading && (
          <Col lg={24} sm={24} xs={24} className='flex flex-col items-center justify-center mt-10'>
            <p className='text-[#121212] text-center mt-8'>No notification available.</p>
          </Col>
        )}
        <Col lg={24} sm={24} xs={24}>
          {loading && filters.pageNumber > 1 && (
            <p className="text-center text-gray-400 mt-3">Loading more...</p>
          )}
          {!hasMore && !loading && notifications.length > 0 && (
            <p className="text-center text-gray-400 mt-3">
              No more notification available
            </p>
          )}
          <div ref={observerRef} style={{ height: "1px" }} />
        </Col>
      </Row>
    </Card>
  </ClientContainer>
  )
}

export default Page