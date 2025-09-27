import { serviceType } from '@/extras/questions';
import { CheckOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react'

interface props {
    service?: serviceType;
}

export const ListItem = ({ label }: { label: string }) => (
    <div className='flex md:items-center items-start gap-4'>
      <div className='h-[28px] w-[28px] rounded-[100px] !bg-[#FFF8F9] flex items-center justify-center'>
        <CheckOutlined className='!text-[#670316]' />
      </div>
      <p className='tablist'>{label}</p>
    </div>
);


const IncludedServices = ({ service}: props) => {
  return (
    <Row gutter={[15,15]} className='!mx-0 px-[10px] md:px-[100px] !items-center md:!h-[632px]'>
        <Col lg={14} sm={24} xs={24}>
            <div className='flex flex-col gap-2'>
                <p className='care_p mb-4'> Service Included</p>

                <p className='p_p2 mb-8'>Comprehensive care tailored to your needs</p>
                <Row >
                    <Col lg={12} sm={12} xs={24}>
                        {<div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5 !ml-4 md:!ml-0'>
                            {service?.services.map((service, i)  => <ListItem key={i} label={service} />)}
                        </div>} 
                    </Col>
                     <Col lg={12} sm={12} xs={24}>
                        {<div className='flex flex-col gap-6 mb-6 md:mb-10 mt-2.5 !ml-4 md:!ml-0'>
                            {service?.services2.map((service, i)  => <ListItem key={i} label={service} />)}
                        </div>} 
                    </Col>
                </Row>    
            </div>
        </Col>

        <Col lg={10} sm={24} xs={24}>
            {service?.image &&<Image src={service?.image} alt='c 1' className='' />}
        </Col>
    </Row>
  )
}

export default IncludedServices