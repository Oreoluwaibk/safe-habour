import { Card, Rate } from 'antd'
import React from 'react'
import { review } from '../../../../utils/interface'

interface props {
  reviewDetails: review;
}
const RateCard = ({ reviewDetails }: props) => {
  return (
    <Card  
      variant="borderless"
      styles={{body: {display: "flex", flexDirection: "column", gap:16, padding: "0 20px"}}}
    >
      <div className='flex items-center justify-between'>
      <div>
          <p className='text-[#1e1e1e] text-lg'>Sarah John</p>
          <p className='text-[#6a6a6a] text-sm'>20/08/2025</p>
      </div>
      <Rate count={5} value={reviewDetails.rating} className='text-[#ffdd33] !text-lg'  />
      </div>

      <div className='border-t border-t-[#f1f1f1] pt-3 font-medium'>
      <p>{reviewDetails.comment}</p>
      </div>
    </Card>
       
  )
}

export default RateCard