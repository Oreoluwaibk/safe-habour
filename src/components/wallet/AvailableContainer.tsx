"use client"
import { Icon } from '@iconify/react'
import { App, Button, Card, Col, Row, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react';
import "@/styles/workers.css";
import AvailableJobCard from './cards/AvailableJobCard';
import { useRouter } from 'next/navigation';
import { FilterOutlined } from '@ant-design/icons';
import { getAllJobs } from '@/redux/action/jobs';
import { createErrorMessage } from '../../../utils/errorInstance';
import { jobs } from '../../../utils/interface';

interface props {
  isJobs?: boolean;
}
const AvailableContainer = ({ isJobs }: props) => {
  const router = useRouter();
  const { modal } = App.useApp()
  const [ loading, setLoading ] = useState(false);
  const [ allJobs, setAllJobs ] = useState<jobs[]>([]);

   const handleGetJobs = useCallback(() => {
    setLoading(true);
    getAllJobs()
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setAllJobs(res.data.data.list);
        }
      })
      .catch((err) => {
        modal.error({
          title: "Error",
          content: err?.response
            ? createErrorMessage(err.response.data)
            : err.message,
          onOk: () => setLoading(false),
        });
      })
      .finally(() => setLoading(false)); // ✅ ensures loading resets even if error
  }, [modal]); 

  useEffect(() => {
    handleGetJobs();
  }, [handleGetJobs]);

  return (
    <Card
    title={<div className='flex flex-col pt-5 text-[#343434]'>
    <h1 className='t-pri flex gap-2 items-center !font-semibold text-lg'>Available Jobs</h1>
    <p className='t-pri mb-6 font-normal text-sm'>Opportunities matching your skills</p>
    </div>}
    loading={loading}
    extra={
    <>
      {!isJobs && <Button onClick={() => router.push("/dashboard/worker/jobs")} type="default" className='md:!min-w-[129px] !h-[48px] !text-[#3e3e3e] !border-[#A9A9A9]' style={{borderRadius: 50}}><Icon icon="material-symbols:service-toolbox-rounded" fontSize={16} /> View All Jobs</Button>}

      {isJobs && <Select style={{borderRadius: 200}} className='make-round !rounded-[200px] !h-10 !w-[155px]' placeholder="Sort: Latest" prefix={<FilterOutlined className='text-[#3e3e3e]' />}></Select>}
    </>
    }
    >
      <Row gutter={[15, 15]}>
        {allJobs.map((job: jobs, i: number) => (
          <Col lg={24} sm={24} xs={24} key={i}>
            <AvailableJobCard job={job} />
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default AvailableContainer