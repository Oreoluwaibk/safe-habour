"use client"
import CalenderFilter from '@/components/admin/CalenderFilter'
import CalenderView from '@/components/admin/cards/CalenderView'
import ListView from '@/components/admin/cards/ListView'
import AdminContainer from '@/components/dashboard/AdminContainer'
import { getAdminWorkerAvailability, IAdminParams } from '@/redux/action/admin'
import { App, Button, Card, Col, Pagination, PaginationProps, Row, Segmented } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../../utils/errorInstance'
import { IAdminWorkerActivity } from '../../../../../utils/interface'

const Page = () => {
  const [ active, setActive ] = useState<string>("Calender View");
  const [ availabilites, setAvailabilites ] = useState<IAdminWorkerActivity[]>([]);
  const { modal } = App.useApp();
  const [ loading, setLoading ] = useState(false);
  const [ filters, setFilter ] = useState<IAdminParams>({
    pageNumber: 1,
    pageSize: 10,
    Date: ""
  });
  const [ total, setTotal ] = useState(0);

  const handleGetWorkerAvailability = useCallback(() => {
    setLoading(true);
    getAdminWorkerAvailability(
      filters.pageNumber,
      filters.pageSize,
      filters.Date
    )
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setAvailabilites(res.data.data.list);
        setTotal(res.data.data.totalItems);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get worker availability",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal, filters]);
  
  useEffect(() => {
    handleGetWorkerAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
    if(type === "prev")return <div className='flex justify-start'><Button disabled={filters.pageNumber === 1} className='!border-[#D0D5DD] !h-8'>Previous</Button></div>
    if(type === "next")return <div className='flex justify-end'><Button disabled={filters.pageSize! > total} className='!border-[#D0D5DD] !h-8'>Next</Button></div>
    return originalElement
  }

  const handlePageChange = (pageNumber: number, pageSize?: number) => {
    setFilter((prev) => ({...prev, pageNumber, pageSize}))
  }
  
  return (
  <AdminContainer active='Worker Availability'>
  <Card classNames={{ body: "bg-[#f6f6f6]!"}}>
    <div>
      <h1 className='t-pri !font-semibold text-[32px]'>Worker Availability</h1>
      <p className='t-pri mb-6'>View and manage worker schedules</p>
    </div>

    <div  className='mb-6'>
      <Segmented 
        options={["Calender View", "List View"]}
        defaultValue={active}
        onChange={(value) => setActive(value)}
        value={active}
      />
    </div>

    <Card 
      title={<p className='text-[#1e1e1e] font-semibold text-lg'>All Workers - Weekly Overview</p>}
      extra={
        <CalenderFilter 
          onChange={(value: string) => setFilter((prev) => ({...prev, Date: value}))}
        />
      }
      classNames={{ body: ""}}
      loading={loading}
    >
      {active === "Calender View" && ( 
        <Row gutter={[15, 15]} className='mb-4'>
          {availabilites.map((availability: IAdminWorkerActivity,i:number) => (
            <Col lg={8} sm={12} xs={24} key={i}>
              <CalenderView availability={availability} />
            </Col>
          ))}

          {availabilites.length === 0  && (
            <Col span={24} className='flex justify-center items-center h-[200px]'>
              <p className='text-[#1e1e1e] text-center font-medium'>No availability found</p>
            </Col>
          )}
        </Row>
      )}

      {active === "List View" && ( 
        <Row gutter={[15, 15]} className='mb-4'>
          {availabilites.map((availability: IAdminWorkerActivity,i:number) => (
            <Col lg={24} sm={24} xs={24} key={i}>
              <ListView availability={availability} />
            </Col>
          ))}

          {availabilites.length === 0  && (
            <Col span={24} className='flex justify-center items-center h-[200px]'>
              <p className='text-[#1e1e1e] text-center font-medium'>No availability found</p>
            </Col>
          )}
        </Row>
      )}

      {filters.pageSize! < total && <Pagination 
        responsive
        itemRender={itemRender}
        align="center"
        current={filters.pageNumber}
        total={total}
        pageSize={filters.pageSize}
        className="border-t border-t-[#eaecf0] !pt-4 !w-full custom"
        showTotal={(total) =>
            `Page ${filters.pageNumber} of ${Math.ceil(total / (filters.pageSize || 1))}`
        }
        onChange={handlePageChange}
      />}
    </Card>
  </Card>
  </AdminContainer>
  )
}

export default Page