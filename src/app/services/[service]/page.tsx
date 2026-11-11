"use client"
import Container from '@/components/dashboard/Container'
import MoreServiceCard from '@/components/general/MoreServiceCard'
import ReadyToStart from '@/components/general/ReadyToStart'
import IncludedServices from '@/components/pages/services/IncludedServices'
import ServiceLanding from '@/components/pages/services/ServiceLAnding'
import { serviceType, serviceTypes } from '@/extras/questions'
import { Col, Row } from 'antd'
import { useRouter } from 'next/navigation'
import React, { use } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'

const Page = ({ params }: {params: Promise<{ service: string }> }) => {
  const { service } = use(params);
  const router = useRouter();
  const current = serviceTypes.find((item: serviceType) => item.id === service);
  
  return (
    <Container active="Services">
      <div>
        <ServiceLanding 
          service={current} 
        />
        <IncludedServices service={current} />
        
        <div className='px-6 pb-12 md:px-20 md:pb-16 lg:px-28'>
          <div className='mb-8 flex items-center justify-between'>
            <p className='text-2xl font-semibold text-[#101828]'>More Services</p>

            <BsArrowRightCircle size={30} className="cursor-pointer" onClick={() => router.push("/services")} />
          </div>
          <Row gutter={[16, 16]} className='!mx-0'>
            {current?.more.map((more) => (
              <Col lg={8} sm={12} xs={24} key={more.link} className="!flex">
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