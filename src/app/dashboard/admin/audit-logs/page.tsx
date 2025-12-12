"use client"
import AdminTable from '@/components/admin/AdminTable'
import AdminContainer from '@/components/dashboard/AdminContainer'
import InfoWalletCards from '@/components/wallet/cards/InfoWalletCards'
import useDebounce from '@/hooks/useDebounce'
import { getAdminAuditLogMetrics, getAdminAuditLogs, IAdminParams } from '@/redux/action/admin'
import { Icon } from '@iconify/react'
import { App, Card, Col, Input, Row, TableProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useCallback, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../../utils/errorInstance'

const Page = () => {
  const [ data, setData ] = useState<TableProps["dataSource"]>([]);
  const { modal } = App.useApp();
  const [ loading, setLoading ] = useState(false);
  const [ filters, setFilter ] = useState<IAdminParams>({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: "",
    IsAdminAction: true
  });
  const [ metrics, setMetrics ] = useState( {
    totalActions: 0,
    adminUsersActive: 2,
    lastActivity: null
  })
  const [ total, setTotal ] = useState(0);
  const [ search, setSearch ] = useState("");
  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    setFilter((prev) => ({...prev, searchTerm: debounceSearch as string}))
  }, [debounceSearch])

  const handleGetAuditMetrics = useCallback(() => {
    setLoading(true);
    getAdminAuditLogMetrics()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setMetrics(res.data.data);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get audit stats",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal]);
  
  const handleGetAuditLogs = useCallback(() => {
    setLoading(true);
    getAdminAuditLogs(
      filters.pageNumber,
      filters.pageSize,
      filters.searchTerm,
      filters.IsAdminAction
    )
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setData(res.data.data.list);
        setTotal(res.data.data.totalItems);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get audit logs",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
      setLoading(false);
    })
  }, [modal, filters]);

  useEffect(() => {
    handleGetAuditLogs();
    handleGetAuditMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handlePageChange = (pageNumber: number, pageSize?: number) => {
    setFilter((prev) => ({...prev, pageNumber, pageSize}))
  }

  const column: ColumnsType = [
    {
      key: "1",
      title: "Admin User",
      dataIndex: "userName",
    },
    {
      key: "2",
      title: "Action",
      dataIndex: "action",
    },
    {
      key: "3",
      title: "Target",
      dataIndex: "entityType"
    },
    {
      key: "4",
      title: "Category",
      dataIndex: "category",
    },
    {
      key: "5",
      title: "TimeStamp",
      dataIndex: "createdAt",
      
    },
    {
      key: "6",
      title: "IP Address",
      dataIndex: "ipAddress",
      render(value){
        return <span>{value || "N/A"}</span>
      }
    },
    
  ]

  return (
  <AdminContainer active='Audit Logs'>
  <Card classNames={{ body: "bg-[#f6f6f6]!"}}>
  <div>
    <h1 className='t-pri !font-semibold text-[32px]'>Audit Logs</h1>
    <p className='t-pri mb-6'>Complete log of all admin actions for accountability</p>
  </div>

  <Row className='mt-6 mb-4' gutter={[15, 15]}>
    <Col lg={8} sm={12} xs={24}>
      <InfoWalletCards 
        title='Total Actions'
        amount={metrics.totalActions}
        isWallet
        icon={<Icon icon="bx:dollar" color='#670316' />}
      />
    </Col>
    <Col lg={8} sm={12} xs={24}>
      <InfoWalletCards 
        title='Admin Users Active'
        amount={metrics.adminUsersActive}
        isWallet
        icon={<Icon icon="iconoir:piggy-bank"  color='#670316' />}
      />
    </Col>
    <Col lg={8} sm={12} xs={24}>
      <InfoWalletCards 
        title='Last Active'
        amount={metrics.lastActivity || "N/A"}
        icon={<Icon icon="mingcute:time-line" color='#670316' />}
        isWallet
      />
    </Col>
  </Row>

  <Card 
    title={<p className='text-[#1e1e1e] font-semibold text-lg'>Activity Log</p>}
    extra={<Input 
      prefix={<Icon icon="ic:round-search" />} 
      placeholder='Search...' 
      className='mt-2'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{backgroundColor: "#F4F4F4", height: 36, width: 146}} 
    />}
    classNames={{ body: "p-0!"}}
  >
    <AdminTable 
      title=""
      data={data}
      column={column}
      handlePageChange={handlePageChange}
      loading={loading}
      total={total}
      filter={{
        pageNumber: filters.pageNumber!,
        pageSize: filters.pageSize!
      }}
    />
  </Card>

  </Card>
  </AdminContainer>
  )
}

export default Page