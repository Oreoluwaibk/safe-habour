"use client"
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn'
import { Card, Col, Row } from 'antd'
import React, { useState } from 'react'
import WeeklyCard from '../flows/WeeklyCard'
import { PlusOutlined } from '@ant-design/icons'
import AddException from '../modal/AddException'
import ApplyTemplate from '../modal/ApplyTemplate'

const WeeklyTemplate = () => {
  const [ openException, setOpenException ] = useState(false);
  const [ openTemplate, setOpenTemplate ] = useState(false);
  return (
    <Card
      title={<CardTitle title='Weekly Availability Template' description="Set your default weekly schedule. This template can be applied to future weeks." />}
      classNames={{
        header: "",
      }}
      extra={<RoundBtn title='Apply Template' onClick={() => setOpenTemplate(true)} height={40} />}
      actions={[<div key={1} className='flex items-center justify-end gap-4'>
        <RoundBtn title='Save Template' primary onClick={() => {}} height={40} />
        <RoundBtn title='Add Exception' icon={<PlusOutlined />} onClick={() => setOpenException(true)} height={40} />
      </div>]}
    >
      <Row gutter={[15, 15]}>
        <Col lg={24} sm={24} xs={24}>
          <WeeklyCard available title='Monday' />
        </Col>

        <Col lg={24} sm={24} xs={24}>
          <WeeklyCard title='Tuesday' />
        </Col>
      </Row>

      {openException && <AddException open={openException} onCancel={() => setOpenException(false)} />}
      {openTemplate && <ApplyTemplate open={openTemplate} onCancel={() => setOpenTemplate(false)} />}
    </Card>
  )
}

export default WeeklyTemplate