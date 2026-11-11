import { serviceType } from '@/extras/questions';
import { CheckOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Image from 'next/image';
import React from 'react'

interface props {
    service?: serviceType;
}

export const ListItem = ({ label }: { label: string }) => (
    <div className='flex items-start gap-4'>
      <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFF8F9]'>
        <CheckOutlined className='!text-[#670316]' />
      </div>
      <p className='tablist'>{label}</p>
    </div>
);


const IncludedServices = ({ service }: props) => {
  return (
    <section className="px-6 py-12 md:px-20 md:py-16 lg:px-28">
        <Row gutter={[40, 24]} className="!mx-0 !items-center">
            <Col lg={14} sm={24} xs={24}>
                <p className="care_p mb-3">Service Included</p>
                <p className="mb-8 max-w-xl text-lg text-[#1E1E1E]">Comprehensive care tailored to your needs</p>
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        {service?.services.map((item) => <ListItem key={item} label={item} />)}
                    </div>
                    <div className="flex flex-col gap-6">
                        {service?.services2.map((item) => <ListItem key={item} label={item} />)}
                    </div>
                </div>
            </Col>

            <Col lg={10} sm={24} xs={24}>
                {service?.image && (
                    <Image
                        src={service.image}
                        alt={service.title}
                        className="h-[260px] w-full rounded-2xl object-cover lg:h-[460px]"
                    />
                )}
            </Col>
        </Row>
    </section>
  )
}

export default IncludedServices
