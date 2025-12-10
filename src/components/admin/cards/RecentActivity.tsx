import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'
import { IActivityLog } from '../../../../utils/interface'
import { timeAgo } from '../../../../utils/converters'

interface RecentActivityProps {
  activity: IActivityLog;
}
const RecentActivity: React.FC<RecentActivityProps> = ({
  activity
}) => {
  return (
    <div className='flex rounded-xl items-center justify-between text-[#1e1e1e] border border-[#e4e4e4] px-4'>
    <div className='flex items-center gap-4'>
      <Avatar shape="circle" icon={<UserOutlined />} size={46} />
      <CardTitle  
        title={activity.userName}
        description={activity.action}
        status={<Status title={activity.status} color='#039855' bg='#edfff7' />}
      />
    </div>
    <span>{timeAgo(activity.createdAt)}</span>
    </div>
  )
}

export default RecentActivity