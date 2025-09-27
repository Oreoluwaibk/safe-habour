import { CheckCircleOutlined, CheckOutlined, FileProtectOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React from 'react'
import { Check2, Check3, Check4, Check5, SafeRec } from '../../../assets/image';
import Image from 'next/image';

export const ListItem = ({ label }: { label: string }) => (
    <div className='flex items-center gap-4'>
      <div className='h-[28px] w-[28px] rounded-[100px] !bg-[#FFF8F9] flex items-center justify-center'>
        <CheckOutlined className='!text-[#670316]' />
      </div>
      <p className='tablist'>{label}</p>
    </div>
);

interface props {
    checkedValue: number;
}

const images = [SafeRec, Check2, Check3, Check4, Check5]
const icons = [
    <FileProtectOutlined className='!text-[#670316]' key={1} />, 
    <FileProtectOutlined className='!text-[#670316]' key={2} />, 
    <PhoneOutlined className='!text-[#670316]' key={3} />, 
    <CheckCircleOutlined className='!text-[#670316]' key={4} />, 
    <LockOutlined className='!text-[#670316]' key={5} />
]
const title = [
    "Comprehensive Background Checks",
    "Secure Escrow Payments", 
    "24/7 Support", 
    "Quality Assurance",
    "Privacy Protection"
]
const description = [
    "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
    "Your payment is held securely until service is completed to your satisfaction", 
    "Round-the-clock customer support and emergency assistance when you need it", 
    "Ongoing monitoring and quality checks to ensure excellent service standards",
    "Your personal information is protected with bank-level security measures"
]
const SafetyCheck = ({ checkedValue }: props) => {
    
  return (
    <Row gutter={[15,15]} className='px-2 md:px-0'>
        <Col lg={14} sm={24} xs={24}>
            <div className='flex flex-col gap-2'>

            <div className='lovelayout mb-6'>
                {icons[checkedValue-1]}
            </div>
            <p className='care_p mb-4'>{title[checkedValue-1]}</p>

            <p className='p_p2 mb-8'>{description[checkedValue-1]}</p>
            {checkedValue === 1 && <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5 !ml-4 md:!ml-0'>
                <ListItem label="Social activities" />
                <ListItem label="Conversation" />
                <ListItem label="Light housework" />
                <ListItem label="Errands & appointments" />
            </div>}

            {checkedValue === 2 && <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5 !ml-4 md:!ml-0'>
                <ListItem label="Payment protection" />
                <ListItem label="Dispute resolution" />
                <ListItem label="Satisfaction guarantee" />
                <ListItem label="Secure transactions" />
            </div>}
            {checkedValue === 3 && <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5 !ml-4 md:!ml-0'>
                <ListItem label="24/7 helpline" />
                <ListItem label="Emergency support" />
                <ListItem label="Live chat assistance" />
                <ListItem label="Dedicated account managers" />
            </div>}
            {checkedValue === 4 && <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5 !ml-4 md:!ml-0'>
                <ListItem label="Regular quality reviews" />
                <ListItem label="Customer feedback system" />
                <ListItem label="Worker performance tracking" />
                <ListItem label="Continuous improvement" />
            </div>}
            {checkedValue === 5 && <div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5 !ml-4 md:!ml-0'>
                <ListItem label="Data encryption" />
                <ListItem label="PIPEDA compliance" />
                <ListItem label="Secure data storage" />
                <ListItem label="Privacy by design" />
            </div>}
            </div>
        </Col>

        <Col lg={10} sm={24} xs={24}>
            <Image src={images[checkedValue-1]} alt='c 1' className='' />
        </Col>
    </Row>
  )
}

export default SafetyCheck