"use client"
import AdminTable from '@/components/admin/AdminTable'
import AdminContainer from '@/components/dashboard/AdminContainer'
import RoundBtn from '@/components/general/RoundBtn'
import InfoWalletCards from '@/components/wallet/cards/InfoWalletCards'
import { getAdminTransactionLogs, getAdminTransactionSummary, IAdminParams } from '@/redux/action/admin'
import { Icon } from '@iconify/react'
import { App, Card, Col, Input, Row, TableProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useCallback, useEffect, useState } from 'react'
import { createErrorMessage } from '../../../../../utils/errorInstance'
import useDebounce from '@/hooks/useDebounce'

const Page = () => {
  const [ data, setData ] = useState<TableProps["dataSource"]>([]);
  const { modal } = App.useApp();
  const [ loading, setLoading ] = useState(false);
  const [ metrics, setMetrics ] = useState({
    totalProcessedAmount: 0.00,
    commissionEarned: 0.00,
    escrowAmount: 0.00,
    totalTransactions: 0
  })
  const [ filters, setFilter ] = useState<IAdminParams>({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: ""
  });
  const [ total, setTotal ] = useState(0);
  const [ search, setSearch ] = useState("");
  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    setFilter((prev) => ({...prev, searchTerm: debounceSearch as string}))
  }, [debounceSearch])

  const handleGetTransactionMetrics = useCallback(() => {
    setLoading(true);
    getAdminTransactionSummary()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setMetrics(res.data.data);
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to get transaction stats",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
      setLoading(false);
    })
  }, [modal]);

  const handleGetTransactionLogs = useCallback(() => {
    setLoading(true);
    getAdminTransactionLogs(
      filters.pageNumber,
      filters.pageSize,
      filters.searchTerm
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
        title: "Unable to get transaction logs",
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
      setLoading(false);
    })
  }, [modal, filters]);

  useEffect(() => {
    handleGetTransactionLogs();
  }, [filters])

  useEffect(() => {
    handleGetTransactionMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const column: ColumnsType = [
    {
      key: "1",
      title: "Transaction ID",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Type",
      dataIndex: "price",
    },
    {
      key: "2",
      title: "From",
      dataIndex: "price"
    },
    {
      key: "3",
      title: "To",
      dataIndex: "instructor",
    },
    {
      key: "4",
      title: "Amount",
      dataIndex: "ratings"
    },
    {
      key: "5",
      title: "Commission",
      dataIndex: "createdAt"
    },
    {
      key: "6",
      title: "Date & Time",
      dataIndex: "createdAt"
    },
    {
      key: "7",
      title: "Status",
      dataIndex: "duration"
    }
  ]

  const handlePageChange = (pageNumber: number) => {
    setFilter((prev) => ({...prev, pageNumber}))
  }
  return (
  <AdminContainer active='Transactions'>
  <Card 
    classNames={{ body: "bg-[#f6f6f6]!", header: "bg-[#f6f6f6]!"}}
    title={
      <div>
        <h1 className='t-pri !font-semibold text-[32px]'>Transaction Logs</h1>
        <p className='t-pri mb-6'>Complete audit trail of all financial transactions</p>
      </div>
    }
    extra={<RoundBtn 
      title='Export Report' 
      icon={<Icon icon="prime:download" fontSize={18} />} 
      primary
      onClick={() => {}}
    />}
  >
  

  <Row className='mt-0 mb-6' gutter={[15, 15]}>
    <Col lg={6} sm={12} xs={24}>
      <InfoWalletCards 
        title='Total Processed'
        amount={`$${metrics.totalProcessedAmount}`}
        isWallet
        // icon={<Icon icon="bx:dollar" color='#670316' />}
      />
    </Col>
    <Col lg={6} sm={12} xs={24}>
      <InfoWalletCards 
        title='Commission Earned'
        amount={`$${metrics.commissionEarned}`}
        isWallet
        // icon={<Icon icon="mingcute:time-line"  color='#670316' />}
      />
    </Col>
    <Col lg={6} sm={12} xs={24}>
      <InfoWalletCards 
        title='In Escrow'
        amount={`$${metrics.escrowAmount}`}
        // icon={<Icon icon="nrk:media-media-complete" color='#670316' />}
        isWallet
      />
    </Col>

  
    <Col lg={6} sm={12} xs={24}>
      <InfoWalletCards 
        title='Total Transactions'
        amount={`$${metrics.totalTransactions}`}
        isWallet
        // icon={<Icon icon="carbon:analytics" color='#670316' />}
      />
    </Col>
  </Row>

    <Card 
      title={<p className='text-[#1e1e1e] font-semibold text-lg'>All Transactions</p>}
      extra={<Input 
        prefix={<Icon icon="ic:round-search" />} 
        placeholder='Search...' 
        className='mt-2'
        style={{backgroundColor: "#F4F4F4", height: 36, width: 146}} 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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