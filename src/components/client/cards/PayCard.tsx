import { Icon } from '@iconify/react'
import { App, Card, Checkbox } from 'antd'
import React, { useState } from 'react'
import { CardBg } from '../../../../assets/icons';
import { ICardDetails } from '../../../../utils/interface';
import moment from 'moment';
import { setAsDefault } from '@/redux/action/transaction';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { LoadingOutlined } from '@ant-design/icons';

type props = {
  isMaster?: boolean;
  isChecked?: boolean;
  card: ICardDetails;
  refresh: () => void;
}
const PayCard = ({ isMaster, isChecked, card, refresh }: props) => {
  const [ loading, setLoading ] = useState(false);
  const { modal } = App.useApp();

  const handleSetAsDefault = () => {
    setLoading(true);
    setAsDefault(card.id)
    .then(res => {
      if(res.status === 200) {
        setLoading(false);
        modal.success({
          title: res.data.message || "Card set as default",
          onOk: () => {
            refresh();
          }
        })
      }
    })
    .catch(err => {
      modal.error({
        title: "Unable to set payment method as default",
        content: err?.response
            ? createErrorMessage(err.response.data)
            : err.message,
        onOk: () => setLoading(false)
      });
    })
  }
  
  return (
  <Card 
    variant="borderless" 
    style={{minHeight: 138, backgroundImage: `url(${CardBg.src})`}} 
    styles={{ body: {position: "relative", display: "flex", alignItems: "flex-end", height: "100%"}}}
    extra={<p className='text-[#a7a7a7] text-xs'>Date Created: {moment(card.createdAt).format("ddd MMM, YYYY")}</p>}
  >
    {loading ? 
      <LoadingOutlined spin className='absolute right-4 top-4 text-[#670316]!' /> 
      : <Checkbox className='absolute right-4 top-4' checked={isChecked} onClick={handleSetAsDefault} />}
    <div className='flex items-center gap-2'>
      <Icon icon={isMaster ? "logos:mastercard" :"logos:visaelectron"} fontSize={12} />
      <div className='text-xs' style={{color: isChecked ? "#5E5E5E" : "#adadad"}}>
        <p className='font-medium' style={{color: isChecked ? "#670316": "#a7a7a7"}}>{isMaster ? `Mastercard debit ${card.cardLast4}` : `Visa debit ${card.cardLast4}`}</p>
        <span>{isMaster ?"Mastercard" : "Visa"}</span>{" | "}<span>Exp: {card.cardExpMonth}/{card.cardExpYear}</span>
      </div>
    </div>
  </Card>
  )
}

export default PayCard