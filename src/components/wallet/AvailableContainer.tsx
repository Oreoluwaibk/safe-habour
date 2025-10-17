"use client"
import { Icon } from '@iconify/react'
import { Button, Card, Col, Row, Select } from 'antd'
import React from 'react';
import "@/styles/workers.css";
import AvailableJobCard from './cards/AvailableJobCard';
import { useRouter } from 'next/navigation';
import { FilterOutlined } from '@ant-design/icons';

interface props {
  isJobs?: boolean;
}
const AvailableContainer = ({ isJobs }: props) => {
  const router = useRouter();
  return (
    <Card
    title={<div className='flex flex-col pt-5 text-[#343434]'>
    <h1 className='t-pri flex gap-2 items-center !font-semibold text-lg'>Available Jobs</h1>
    <p className='t-pri mb-6 font-normal text-sm'>Opportunities matching your skills</p>
    </div>}
    extra={
    <>
      {!isJobs && <Button onClick={() => router.push("/dashboard/worker/jobs")} type="default" className='md:!min-w-[129px] !h-[48px] !text-[#3e3e3e] !border-[#A9A9A9]' style={{borderRadius: 50}}><Icon icon="material-symbols:service-toolbox-rounded" fontSize={16} /> View All Jobs</Button>}

      {isJobs && <Select style={{borderRadius: 200}} className='make-round !rounded-[200px] !h-10 !w-[155px]' placeholder="Sort: Latest" prefix={<FilterOutlined className='text-[#3e3e3e]' />}></Select>}
    </>
    }
    >
        <Row gutter={[15, 15]}>
            <Col lg={24} sm={24} xs={24}>
                <AvailableJobCard />
            </Col>
        </Row>
    </Card>
  )
}

export default AvailableContainer