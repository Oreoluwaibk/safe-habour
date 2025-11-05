"use client"
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn'
import { App, Card, Col, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import WeeklyCard from '../flows/WeeklyCard'
import { PlusOutlined } from '@ant-design/icons'
import AddException from '../modal/AddException'
import ApplyTemplate from '../modal/ApplyTemplate'
import { schedule } from '../../../../utils/interface'
import { getSchedule } from '@/redux/action/schedules'
import { createErrorMessage } from '../../../../utils/errorInstance'
import { GroupedSchedule, groupSchedulesByDay } from '../../../../utils/converters'

const WeeklyTemplate = () => {
  const { modal } = App.useApp();
  const [ openException, setOpenException ] = useState(false);
  const [ openTemplate, setOpenTemplate ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ avaliableDays, setAvailableDays ] = useState<GroupedSchedule[]>([]);
  const [ allSchedule, setAllSchedule ] = useState<schedule[]>([]) 

  const handleGetAvailabilty = useCallback(() => {
    setLoading(true);
    getSchedule()
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        const groupedSchedule = groupSchedulesByDay(res.data.data);
        setAllSchedule(res.data.data);
        setAvailableDays(groupedSchedule);
      }
    })
    .catch(err => {
      setLoading(false);
      modal.error({
        title: "Unable to get schedule",
        content: err?.response ? createErrorMessage(err.response.data) : err.message,
      });
    })
  }, [modal]);

  useEffect(() => {
    handleGetAvailabilty();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  return (
    <Card
      title={<CardTitle title='Weekly Availability Template' description="Set your default weekly schedule. This template can be applied to future weeks." />}
      classNames={{
        header: "",
      }}
      extra={<RoundBtn title='Apply Template' onClick={() => setOpenTemplate(true)} height={40} />}
      actions={[<div key={1} className='flex items-center justify-end gap-4'>
        {/* <RoundBtn title='Save Template' primary onClick={() => {}} height={40} /> */}
        <RoundBtn title='Add Exception' icon={<PlusOutlined />} onClick={() => setOpenException(true)} height={40} />
      </div>]}
      loading={loading}
    >
      <Row gutter={[15, 15]}>
        {avaliableDays.map((days: GroupedSchedule, i: number) => (
          <Col lg={24} sm={24} xs={24} key={i}>
            <WeeklyCard refresh={handleGetAvailabilty} available={days.isAvailable[0]} title={days.dayOfWeek} days={days} />
          </Col>
        ))}
      </Row>

      {openException && <AddException open={openException} onCancel={() => setOpenException(false)} />}
      {openTemplate && <ApplyTemplate avaliableDays={avaliableDays} refresh={handleGetAvailabilty} allSchedule={allSchedule} open={openTemplate} onCancel={() => setOpenTemplate(false)} />}
    </Card>
  )
}

export default WeeklyTemplate