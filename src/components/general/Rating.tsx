import { StarFilled } from '@ant-design/icons'
import React from 'react'

const Rating = ({ value, count }: { value?: number | null; count?: number }) => {
  const reviews = count ?? 0;
  const hasRating = typeof value === "number" && !Number.isNaN(value);

  if (!hasRating) {
    return (
      <div className='flex items-center gap-1'>
        <StarFilled className='!text-[#E4E4E4]' />
        <span className='text-[#585858] text-sm'>No reviews yet</span>
      </div>
    )
  }

  return (
    <div className='flex items-center gap-1'>
        <StarFilled className='!text-[#ffdd33]' />
        <span className='t-pri font-medium'>{hasRating ? value.toFixed(1) : "—"}</span>
        <span className='text-[#585858]'>({reviews} {reviews === 1 ? "Review" : "Reviews"})</span>
    </div>
  )
}

export default Rating