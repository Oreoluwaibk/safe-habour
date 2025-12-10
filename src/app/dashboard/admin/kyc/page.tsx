"use client"
import KycCard from '@/components/admin/cards/KycCard'
import AdminContainer from '@/components/dashboard/AdminContainer'
import Status from '@/components/general/Status'
import { Icon } from '@iconify/react'
import { App, Card, Col, Input, Row, Segmented } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { IAdminVerificationList, IUser } from '../../../../../utils/interface'
import { getClientPendingVerification, getServiceWOrkerPendingVerification, IAdminParams } from '@/redux/action/admin'
import { createErrorMessage } from '../../../../../utils/errorInstance'

const Page = () => {
  const { modal } = App.useApp();
  const [ active, setActive ] = useState("Clients");
  const [ verification, setVerification ] = useState<IAdminVerificationList[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ filters, setFilter ] = useState<IAdminParams>({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: ""
  });
  const [ total, setTotal ] = useState(0);

  const handleGetVerification = useCallback((value: string = "Clients") => {
    setLoading(true);

    const api = value === "Clients" ? getClientPendingVerification : getServiceWOrkerPendingVerification
    api(
      filters.pageNumber,
      filters.pageSize,
      filters.searchTerm!,
    )
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        setTotal(res.data.data.totalItems)
        setVerification(res.data.data.list);
      }
    })
    .catch(err => {
      modal.error({
        title: `Unable to get ${active} verifications`,
        content: err?.response
        ? createErrorMessage(err.response.data)
        : err.message,
      });
    })
  }, [modal, filters, active]);
  
  useEffect(() => {
    handleGetVerification();
  }, [filters]);

  const handleChange = (value: string) => {
    setActive(value);
    handleGetVerification(value);
  }
  return (
  <AdminContainer active='KYC Verification'>
  <Card classNames={{ body: "bg-[#f6f6f6]!"}}>
  <div>
    <h1 className='t-pri !font-semibold text-[32px]'>KYC Verification Queue</h1>
    <p className='t-pri mb-6'>Review and process worker verification documents</p>
  </div>

  <div  className='mb-6'>
    <Segmented 
      options={["Clients", "Workers"]}
      defaultValue={active}
      onChange={(value) => handleChange(value)}
      value={active}
    />
  </div>

    <Card 
      title={<p className='text-[#1e1e1e] font-semibold text-lg'>
        {active} KYC Verification {" "}
        <Status title={`${total} Pending`} bg='#FFECEC' color='#ff0000' />
      </p>}
      extra={<Input 
        prefix={<Icon icon="ic:round-search" />} 
        placeholder='Search...' 
        className='mt-2'
        style={{backgroundColor: "#F4F4F4", height: 36, width: 146}} 
      />}
      classNames={{ body: "p-0!"}}
      loading={loading}
    >
      <Row gutter={[15, 15]}>
        {verification.map((verify, i: number) => (
          <Col lg={12} sm={12} xs={24} key={i}>
            <KycCard verification={verify} refresh={() => handleGetVerification(active)} />
          </Col>
        ))}
        {verification.length === 0 && <Col lg={24} sm={24} xs={24}>
          <p className='text-center my-6 text-[#1e1e1e] text-lg font-medium'>No verification to review</p>
        </Col>}
      </Row>
    </Card>
  </Card>  
  </AdminContainer>
  )
}

export default Page