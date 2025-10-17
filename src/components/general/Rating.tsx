import { StarFilled } from '@ant-design/icons'
import React from 'react'

const Rating = () => {
  return (
    <div className='flex items-center gap-1'>
        <StarFilled className='!text-[#ffdd33]' />
        <span className='t-pri font-medium'>4.7</span>
        <span className='text-[#585858]'>(3 Reviews)</span>
    </div>
  )
}

export default Rating