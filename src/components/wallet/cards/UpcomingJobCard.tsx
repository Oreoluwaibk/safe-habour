import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'

const UpcomingJobCard = () => {
  return (
    <Card
      title={<CardTitle icon={<span className='bg-[#039855] h-3 w-3 rounded-full'></span>} title='Eldercare Support' description='Robert Chen' />}
      extra={<span className='text-[#646464]'><ClockCircleOutlined className='mr-2' />Today, 2:00 PM</span>}
      actions={[<div key={1} className='px-4 text-left'>
          <Status title='Confirmed' />
      </div>
      ]}
      classNames={{ body: "!h-[0px] !p-0" }}
    />
  )
}

export default UpcomingJobCard