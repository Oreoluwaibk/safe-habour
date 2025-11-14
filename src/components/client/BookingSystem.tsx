"use client"
import { App, Col, Pagination, PaginationProps, Row, Segmented, SegmentedProps, Skeleton } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import BookingCard from './cards/BookingCard'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
// import { getJobApplicationsByStatus } from '@/redux/action/jobs'
import { createErrorMessage } from '../../../utils/errorInstance'
import { IBooking } from '../../../utils/interface'
import axios from 'axios'
import { getClientBookings } from '@/redux/action/client'

const BookingSystem = () => {
    const [ active, setActive ] = useState(1);
    const [ workers, setWorkers ] = useState<IBooking[]>([]);
    const [ loading, setLoading ] = useState(false);
    const { modal } = App.useApp();
    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 10,
        status: 1
    });
    
    const [ totalWorkers, setTotalWorkers ] = useState(0);

    const handleGetApplications = useCallback(
    async (pageNumber: number = 1, status: number = 1) => {
        // prevent duplicate fetches
        if (loading) return;

        setLoading(true);
        try {
            const res = await getClientBookings(
                pageNumber,
                filters.pageSize,
                status
            );

            if (res.status === 200 || res.status === 201) {
                const newList = res.data.data?.list || [];
                const totalItems = res.data.data?.totalItems || 0;
                setWorkers(newList);
                setTotalWorkers(totalItems || 0);
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
    [modal, loading, filters.pageSize]
    );

    useEffect(() => {
        handleGetApplications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePagination = (page: number) =>  {
        handleGetApplications(page, filters.status);
        setFilters((prev) => ({
            ...prev,
            pageNumber: page
        }));
    }

    const handlegetWorkersByStatus = (status: number) => {
        handleGetApplications(1, status);
        setActive(status);
        setFilters((prev) => ({
            ...prev,
            pageNumber: 1,
            status: status
        }));
    }

    const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
        if(type === "prev")return <p className="text-[#667085] w-full text-left"><ArrowLeftOutlined className="mr-2" /> Previous</p>
        if(type === "next")return <p className="text-[#667085] w-full text-right">Next <ArrowRightOutlined className="ml-2" /></p>
        return originalElement
    }

    const segmentedItem: SegmentedProps["options"] = [
        {label: "Pending", value: 1},
        {label: "Accepted", value: 2},
        {label: "Declined", value: 3},
        {label: "Completed", value: 4},
        {label: "Cancelled", value: 5},
    ]
  return (
    <div>
        <div className='mb-2 mt-0'>
            <Segmented 
                options={segmentedItem}
                defaultValue={active}
                onChange={(value) => handlegetWorkersByStatus(Number(value))}  
            />
        </div>
        <Skeleton loading={loading} className='h-full' >
            <Row gutter={[0, 30]} className='min-h-screen'>
                <Col lg={24} sm={24} xs={24}>
                    <Row gutter={[15,15]}>
                        {workers.map((worker) => (
                            <Col key={worker.serviceWorkerId} lg={12} sm={24} xs={24}>
                                <BookingCard worker={worker} onRefresh={() => handleGetApplications(filters.pageNumber, filters.status)} />
                            </Col>
                        ))}
                        {workers.length === 0 && !loading && (
                            <p className="text-center w-full text-[#121212] my-6">No workers found</p>
                        )}
                    </Row>
                </Col>

                <Col lg={24} sm={24} xs={24}>
                    <Pagination 
                        responsive
                        // style={{width: "100%", alignItems: "center", justifyContent:"center"}}
                        showSizeChanger={false}
                        itemRender={itemRender}
                        total={totalWorkers}
                        align="center"
                        className="border-t border-t-[#eaecf0] !py-4"
                        pageSize={filters.pageSize}
                        current={filters.pageNumber}
                        onChange={handlePagination}
                    />
                </Col>
            </Row>
        </Skeleton>
    </div>
  )
}

export default BookingSystem