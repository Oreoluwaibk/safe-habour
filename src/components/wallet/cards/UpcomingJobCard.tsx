"use client"
import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React, { useEffect } from 'react'
import { IJobApplication } from '../../../../utils/interface'
import { getRelativeDateLabel } from '../../../../utils/converters'
import moment from 'moment'
import useApplicationStatus from '@/hooks/useApplicationStatus'

interface props {
  job: IJobApplication
}
const UpcomingJobCard = ({ job }: props) => {
  const { statusTitle, colors } = useApplicationStatus(job.status, "application")
  
  return (
    <Card
      title={<CardTitle icon={<span className='bg-[#039855] h-3 w-3 rounded-full'></span>} title={job.jobDetails.jobTitle || "Hire Service"} description={job.client?.name} />}
      extra={<span className='text-[#646464]'><ClockCircleOutlined className='mr-2' />{getRelativeDateLabel(job.acceptedAt || job.createdAt)}, {moment(job.acceptedAt || job.createdAt).format("hh:mm a")}</span>}
      actions={[<div key={1} className='px-4 text-left'>
        <Status title={statusTitle} bg={colors.bg} color={colors.color} />
      </div>
      ]}
      classNames={{ body: "!h-[0px] !p-0" }}
    />
  )
}

export default UpcomingJobCard