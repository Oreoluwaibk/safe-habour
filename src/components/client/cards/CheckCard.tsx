import RoundBtn from '@/components/general/RoundBtn';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Card, Switch } from 'antd'
import React from 'react'

interface props {
  title: string;
  description: string;
  value?: boolean;
  onClick?: () => void
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  isEdit?: () => void
}
const CheckCard = ({ 
  title, 
  description,
  value,
  onChange,
  onClick,
  loading ,
  isEdit
}: props) => {
  return (
  <Card 
    style={{backgroundColor: "#FBFBFB", width: "100%"}} 
    styles={{body: {display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}}
  >
    <div className='w-full'>
      <p className='text-[#505050] font-medium text-lg'>{title}</p>
      <p className='text-[#808080]'>{description}</p>
    </div>

    <div className='flex items-center gap-3'>
    {loading ? <LoadingOutlined spin /> :<Switch value={value} checked={value} onClick={onClick} onChange={onChange} />}
    {isEdit && <RoundBtn width={86} onClick={isEdit} title='Edit' icon={<Icon icon="flowbite:edit-outline" fontSize={20} />} />}
    </div>
  </Card>
  )
}

export default CheckCard