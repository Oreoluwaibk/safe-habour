import CardTitle from '@/components/general/CardTitle'
import React from 'react'
import { IPopularService } from '../../../../utils/interface'

interface props {
  service: IPopularService
}
const PopularServiceCard = ({ service }: props) => {
  return (
  <div className='flex rounded-xl items-center justify-between text-[#1e1e1e] border border-[#e4e4e4] px-4'>
    <div className='flex items-center gap-4'>
      <CardTitle  
        title={service.serviceName}
        description={`${service.bookings} booking(s)`}
      />
    </div>
    <span className='text-[#039855]'>+{service.percentageChange}%</span>
  </div>
  )
}

export default PopularServiceCard