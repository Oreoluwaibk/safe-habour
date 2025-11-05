import TransactionCard from '@/components/client/cards/TransactionCard'
import { SearchOutlined } from '@ant-design/icons'
import { App, Button, Card, Col, Pagination, PaginationProps, Row, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { PaymentTransaction } from '../../../../utils/interface'
import { getWorkerFee, getWorkerPayments, getWorkerPayouts } from '@/redux/action/transaction'
import { createErrorMessage } from '../../../../utils/errorInstance'

const Option = Select.Option;
const Transactions = () => {
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false); 
    const [ transactions, setTransactions ] = useState<PaymentTransaction[]>([]);
    const [ filter, setFilters ] = useState({
        pageNumber: 1,
        pageSize: 10,
        StatusFilter: 0,
        TimePeriod: 0
    });
    const [ total, setTotal ] = useState(0);
    const [ type, setType ] = useState("");


    const handleGetTransactions = useCallback((
        pageNumber: number = 1,
        pageSize: number = 10,
        StatusFilter?: number,
        TimePeriod?: number
    ) => {
        setLoading(true);
        getWorkerPayments(
            pageNumber,
            pageSize,
            StatusFilter,
            TimePeriod
        )
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setTotal(res.data.length);
                setTransactions(res.data.slice(0, 3));
            }
        })
        .catch(err => {
            modal.error({
            title: "Unable to get transactions",
            content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        })
    }, [modal]);

    const handleGetFees = useCallback((
        pageNumber: number = 1,
        pageSize: number = 10,
        StatusFilter?: number,
        TimePeriod?: number
    ) => {
        setLoading(true);
        getWorkerFee(
            pageNumber,
            pageSize,
            StatusFilter,
            TimePeriod
        )
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setTransactions(res.data.slice(0, 3));
            }
        })
        .catch(err => {
            modal.error({
            title: "Unable to get transactions",
            content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        })
    }, [modal]);

    const handleGetPayouts = useCallback((
        pageNumber: number = 1,
        pageSize: number = 10,
        StatusFilter?: number,
        TimePeriod?: number
    ) => {
        setLoading(true);
        getWorkerPayouts(
            pageNumber,
            pageSize,
            StatusFilter,
            TimePeriod
        )
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setTransactions(res.data.slice(0, 3));
            }
        })
        .catch(err => {
            modal.error({
            title: "Unable to get transactions",
            content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
            });
        })
    }, [modal]);

    const handleGetFilter = useCallback(() => {
        if(type === "all" || type === "earning") 
            handleGetTransactions(filter.pageNumber, filter.pageSize, filter.StatusFilter, filter.TimePeriod);
        if(type === "fee") 
            handleGetFees(filter.pageNumber, filter.pageSize, filter.StatusFilter, filter.TimePeriod);
        if(type === "payout") 
            handleGetPayouts(filter.pageNumber, filter.pageSize, filter.StatusFilter, filter.TimePeriod);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    const handleStatusFilter = useCallback((value: number) => {
        if(type === "all" || type === "earning" || type === "")
            handleGetTransactions(filter.pageNumber, filter.pageSize, value, filter.TimePeriod);
        if(type === "fee") 
            handleGetFees(filter.pageNumber, filter.pageSize, value, filter.TimePeriod);
        if(type === "payout") 
            handleGetPayouts(filter.pageNumber, filter.pageSize, value, filter.TimePeriod);

        setFilters(prev => ({...prev, StatusFilter: value}));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, type]);

    const handleTimeFilter = useCallback((value: number) => {
        if(type === "all" || type === "earning" || type === "")
            handleGetTransactions(filter.pageNumber, filter.pageSize, filter.StatusFilter, value);
        if(type === "fee") 
            handleGetFees(filter.pageNumber, filter.pageSize, filter.StatusFilter, value);
        if(type === "payout") 
            handleGetPayouts(filter.pageNumber, filter.pageSize, filter.StatusFilter, value);

        setFilters(prev => ({...prev, TimePeriod: value}));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, type]);
    
    useEffect(() => {
        handleGetTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(type) {
            handleGetFilter();
            setFilters({
                pageNumber: 1,
                pageSize: 10,
                StatusFilter: 0,
                TimePeriod: 0
            })
        }
    }, [type, handleGetFilter])

    const extra = (
      <div className='flex items-center gap-3'>
          <span className='text-[#373737] bg-[#f7f7f7] p-1 rounded-[6px] cursor-pointer'>
              <SearchOutlined className='text-lg text-[#373737]' />
          </span>

          <Select onChange={setType} value={type} style={{height: 30, width:104}} placeholder="All Types">
            <Option value="all">All Types</Option>
            <Option value="earning">Earnings</Option>
            <Option value="payout">Payouts</Option>
            <Option value="fee">Fees</Option>
          </Select>
          <Select value={filter.StatusFilter} onChange={(value) => handleStatusFilter(value)} style={{height: 30, width:104}} placeholder="All Status">
            <Option value={0}>All Status</Option>
            <Option value={1}>Pending</Option>
            <Option value={2}>Completed</Option>
          </Select>
          <Select value={filter.TimePeriod} onChange={(value) => handleTimeFilter(value)} style={{height: 30, width:104}} placeholder="All Times">
            <Option value={0}>All Time</Option>
            <Option value={1}>Last Week</Option>
            <Option value={2}>Last Month</Option>
            <Option value={3}>Last Quarter</Option>
          </Select>
      </div>
  )

    const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
        if(type === "prev")return <div className='flex justify-start'><Button className='!border-[#D0D5DD] !h-8'>Previous</Button></div>
        if(type === "next")return <div className='flex justify-end'><Button className='!border-[#D0D5DD] !h-8'>Next</Button></div>
        return originalElement
    }

    const handlePagination = (page: number, size: number) =>  {
        if(type === "all" || type === "earning" || type === "")
            handleGetTransactions(page, size, filter.StatusFilter, filter.TimePeriod);
        if(type === "fee") 
            handleGetFees(page, size, filter.StatusFilter, filter.TimePeriod);
        if(type === "payout") 
            handleGetPayouts(page, size, filter.StatusFilter, filter.TimePeriod);
        setFilters((prev) => ({
            ...prev,
            pageNumber: page,
            pageSize: size
        }));
    }
  return (
    <Row className='my-6 min-h-[58vh]' gutter={[15, 15]} >
        <Col lg={24} sm={24} xs={24} className='mb-6'>
            <Card 
                loading={loading}
                variant="borderless" 
                style={{border: "none", boxShadow: "none"}}
                title={<p className='text-lg text-[#1e1e1e]'>Transaction History</p>}
                extra={extra}
                styles={{body: {display: "flex", flexDirection: "column", gap: 10}}}
            >
                {transactions.map((transaction: PaymentTransaction, i: number) => (
                    <TransactionCard key={i} isTransaction transaction={transaction} />
                ))}

                {transactions.length === 0 && (
                    <p className='text-center text-[#121212]'>You have no transaction</p>
                )}

            </Card>
        </Col>
        <Col lg={24} sm={24} xs={24}>
            <Pagination 
                responsive
                itemRender={itemRender}
                align="center"
                current={filter.pageNumber}
                total={total}
                pageSize={filter.pageSize}
                className="border-t border-t-[#eaecf0] !pt-4 !w-full custom"
                showTotal={(total) =>
                    `Page ${filter.pageNumber} of ${Math.ceil(total / (filter.pageSize || 1))}`
                }
                onChange={handlePagination}
            />
        </Col>
    </Row>
  )
}

export default Transactions