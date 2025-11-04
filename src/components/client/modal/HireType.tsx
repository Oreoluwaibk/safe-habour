import { Col, Modal, Row } from 'antd';
import React, { useState } from 'react'
import { UserWorkerProfile } from '../../../../utils/interface';
import BookRequest from './BookRequest';

interface props {
  open: boolean;
  onCancel: () => void;
  worker: UserWorkerProfile
}
const HireType = ({ open, onCancel, worker }: props) => {
    const [ openHireModal, setOpenHireModal ] = useState(false);
    const [ type, setType ] = useState(0);

    const handleSelect = (value: number) => {
        setType(value)
        setOpenHireModal(true);
    }
  return (
    <Modal
        open={open}
        onCancel={onCancel}
        footer={null}
        title={<p className='t-pri text-xl'>Book Request</p>}
        width={700}
        styles={{body: { padding: "20px 0" }}}
    >
        <Row gutter={[15, 15]}>
            <Col lg={11} sm={12} xs={24} className='hover:bg-[#FFF5F7] hover:border hover:border-[#670316] transition-all bg-[#f4f4f4] cursor-pointer rounded-xl h-[145px] !flex flex-col items-center justify-center gap-4 text-[#151F32] px-2 md:mr-2' onClick={() => handleSelect(0)}>
                <p className='text-xl font-semibold'>Express Hire</p>
                <p className='text-center'>You’re instantly charged and money held in our escrow once you send a hire request. You’re prioritized</p>
            </Col>

            <Col lg={11} sm={12} xs={24} className='hover:bg-[#FFF5F7] hover:border hover:border-[#670316] transition-all bg-[#f4f4f4] cursor-pointer rounded-xl h-[145px] !flex flex-col items-center justify-center gap-4 text-[#151F32] px-2 md:ml-2' onClick={() => handleSelect(1)}>
                <p className='text-xl font-semibold'>Normal Hire</p>
                <p className='text-center'>You’re not charged until you find a worker. but it takes longer</p>
            </Col>
        </Row>

        {openHireModal && 
            <BookRequest 
                worker={worker} 
                open={openHireModal} 
                type={type}
                onCancel={() => setOpenHireModal(false)} 
            />}
    </Modal>
  )
}

export default HireType