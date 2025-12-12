import CardTitle from '@/components/general/CardTitle'
import Status from '@/components/general/Status'
import { ArrowRightOutlined } from '@ant-design/icons'
import React from 'react'
import { IEscrowEntryResponse } from '../../../../utils/interface'

interface props {
  wallet: IEscrowEntryResponse
}
const EscrowFunds: React.FC<props> = ( { wallet }) => {
  return (
    <div className='flex rounded-xl items-center justify-between text-[#1e1e1e] border border-[#e4e4e4] px-4'>
    <div className='flex items-center gap-4'>
      <CardTitle  
        title={<p>{wallet.clientName} <ArrowRightOutlined /> {wallet.serviceWorkerName}</p>}
        description={wallet.serviceCategory}
      />
    </div>

    <div className='flex flex-col gap-3'>
      <span className='font-semibold text-lg text-[#1e1e1e]'>${Number(wallet.amount).toFixed(2)}</span>
      <Status title={wallet.statusLabel} bg='#FFF4F6' color='#670316' />
    </div>
    </div>
  )
}

export default EscrowFunds