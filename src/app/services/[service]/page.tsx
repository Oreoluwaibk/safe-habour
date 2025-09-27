"use client"
import Container from '@/components/dashboard/Container'
import MoreServiceCard from '@/components/general/MoreServiceCard'
import ReadyToStart from '@/components/general/ReadyToStart'
import IncludedServices from '@/components/pages/services/IncludedServices'
import ServiceLanding from '@/components/pages/services/ServiceLAnding'
import { serviceType, serviceTypes } from '@/extras/questions'
import { Col, Row } from 'antd'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'

const Page = ({ params }: {params: Promise<{ service: string }> }) => {
  const { service } = use(params);
  const router = useRouter();
  const [ services, setService ] = useState<serviceType>();

  useEffect(() => {
    if(service) setService(serviceTypes.find((servic: serviceType) => servic.id === service))
  }, [service])
  
  return (
    <Container active="Services">
      <div>
        <ServiceLanding 
          service={services} 
        />
        <IncludedServices service={services} />
        
        <div className='md:!px-[100px] !px-[10px] pb-10 mt-20 md:pt-0'>
          <div className='flex items-center justify-between !mb-10'>
            <p className='!text-[#101828] text-2xl font-semibold'>More Service</p>

            <BsArrowRightCircle size={30} className="cursor-pointer" onClick={() => router.push("/services")} />
          </div>
          <Row gutter={[15, 15]} className='!mx-0 !px-0'>
            {services?.more.map((more, i) => (
              <Col lg={8} sm={12} xs={24} key={i}>
                <MoreServiceCard link={more.link} title={more.name} description={more.description} image={more.image} items={more.service} />
              </Col>
            ))}
          </Row>
        </div>
       
        <ReadyToStart />
      </div>
    </Container>
  )
}

export default Page