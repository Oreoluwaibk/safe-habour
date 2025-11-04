"use client"
import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React, { useEffect } from 'react'
import { IJobApplication } from '../../../../utils/interface'
import { getRelativeDateLabel } from '../../../../utils/converters'
import moment from 'moment'

interface props {
  job: IJobApplication
}
const UpcomingJobCard = ({ job }: props) => {
  const [ statusTitle, setStatusTitle ] = React.useState<string>("");
  useEffect(() => {
    if (job.status !== undefined) {
      switch (job.status) {
        case 1: setStatusTitle("Open"); break;
        case 2: setStatusTitle("InProgress"); break;
        case 3: setStatusTitle("Completed"); break;
        case 4: setStatusTitle("Cancelled"); break;
        case 5: setStatusTitle("Disputed"); break;
        case 6: setStatusTitle("ServiceWorkerCompleted"); break;
        default: setStatusTitle("Unknown"); break;
      }
    }
  }, [job.status]);
  return (
    <Card
      title={<CardTitle icon={<span className='bg-[#039855] h-3 w-3 rounded-full'></span>} title={job.jobDetails.jobTitle} description={job.jobDetails.client?.name} />}
      extra={<span className='text-[#646464]'><ClockCircleOutlined className='mr-2' />{getRelativeDateLabel(job.acceptedAt || job.createdAt)}, {moment(job.acceptedAt || job.createdAt).format("hh:mm a")}</span>}
      actions={[<div key={1} className='px-4 text-left'>
        <Status title={statusTitle} />
      </div>
      ]}
      classNames={{ body: "!h-[0px] !p-0" }}
    />
  )
}

export default UpcomingJobCard