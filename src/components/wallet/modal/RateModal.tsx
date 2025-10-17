import { Button, Input, Modal, Rate } from 'antd'
import Image from 'next/image';
import React from 'react'
import { C1 } from '../../../../assets/image';
import CardTitle from '@/components/general/CardTitle';

interface props {
  open: boolean;
  onCancel: () => void;
}

const RateModal = ({ open, onCancel }: props) => {
  return (
    <Modal
        open={open}
        onCancel={onCancel}
        footer={ <div className='flex items-center justify-end gap-4 px-6 py-4'>
            <Button onClick={onCancel} type="default" className='md:!min-w-[98px] !h-[48px] !text-[#670316]' style={{borderRadius: 50}} >Cancel</Button>
            <Button type="primary" className='md:!min-w-[98px] !h-[48px]' style={{borderRadius: 50}}>Send</Button>
        </div>}
        title={<p className='text-lg font-semibold'>Rate Experience</p>}
        width={700}
        styles={{body: { padding: "20px 0 10px" }}}
    >
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between bg-[#f9f9f9] px-2'>
                <div className='flex items-center gap-3'>
                    <Image className='!h-12 w-12 rounded-full object-cover' src={C1} alt='' />
                    <CardTitle title='Sarah John' description="sarahjohn45@gmail.com" />
                </div>
                <Rate className='text-[#FFDD33] text-sm' value={5} count={5}   />
            </div>
            <Input.TextArea placeholder='Rate Experience' rows={5} />
        </div>
    </Modal>
  )
}

export default RateModal