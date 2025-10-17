import { Icon } from '@iconify/react'
import { Card, Checkbox } from 'antd'
import React from 'react'
import { CardBg } from '../../../../assets/icons';

type props = {
    isMaster?: boolean;
    isChecked?: boolean;
}
const PayCard = ({ isMaster, isChecked }: props) => {
  return (
    <Card variant="borderless" style={{height: 138, backgroundImage: `url(${CardBg.src})`}} styles={{body: {position: "relative", display: "flex", alignItems: "flex-end", height: "100%"}}}>
        <Checkbox className='absolute right-4 top-4' checked={isChecked} />
        <div className='flex items-center gap-2'>
            <Icon icon={isMaster ? "logos:mastercard" :"logos:visaelectron"} fontSize={12} />
            <div className='text-xs' style={{color: isChecked ? "#5E5E5E" : "#adadad"}}>
                <p className='font-medium' style={{color: isChecked ? "#670316": "#a7a7a7"}}>{isMaster ?"Mastercard debit 5678" : "Visa debit 5678"}</p>
                <span>{isMaster ?"Mastercard" : "Visa"}</span>{" | "}<span>Exp: 11/27</span>
            </div>
        </div>
    </Card>
  )
}

export default PayCard