import { serviceType } from '@/extras/questions';
import { Button, Col, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface props {
    service?: serviceType;
}
const ServiceLanding = ({
    service
}: props) => {
    const router = useRouter();
  return (
     <div style={{position: "relative", backgroundColor: "#FFF8F9"}} className='min-h-[614px] mb-4 pb-4 dashbottom'>
            <Row gutter={[0,5]} className='h-full !px-6 md:!px-25 !items-center !justify-center !pt-16'>
                <Col lg={14} sm={24} xs={24} className='!font-opensans h-full !flex !flex-col items-center md:items-start !justify-center gap-0 md:!px-10 md:!pr-20'>
                    <p className='text-[#670316] p-2 !bg-[#FFEFF2] rounded-[12px] !w-[116px] !font-semibold !text-center'>Our Service</p>
                    <p className='!flex !items-center !text-[40px] md:!text-[72px] !flex-wrap font-semibold md:!mb-6'>
                        {service?.title}
                    </p>
    
                    <p className='!text-lg md!text-2xl w-full text-center md:text-left'>{service?.description}</p>
    
                    <div className='flex items-center gap-8 mt-6'>
                        <Button type="primary" className='md:min-w-[220px]' onClick={() =>router.push("/auth/choose-auth")}>Book Service Now</Button>
                    </div>
                </Col>
    
                <Col lg={10} sm={24} xs={24} className='mt-8 md:mt-0'>
                    {service?.id === "care-workers" && <Row gutter={[15,15]} className='md:!pr-9 !relative'>
                       <Col lg={12} sm={12} xs={12}>
                        {service?.images?.[0] && <Image src={service.images[0]} alt='service 1' className='!rounded-[12px] object-cover !h-full md:!h-full' />}
                       </Col>
    
                       <Col lg={12} sm={12} xs={12} className='md:!pr-5 !pl-2 md:!pl-0 !flex flex-col !gap-4 !h-full'>
                        {service?.images?.[1] && <Image src={service?.images[1]} alt='service 1' className='!rounded-[12px] object-cover !h-[166px] md:!h-[48%]' />}
                        {service?.images?.[2] && <Image src={service?.images[2]} alt='service 1' className='!rounded-[12px] object-cover !h-[186px] md:!h-[48%]' />}
                       </Col>
                    </Row>}

                    {service?.id === "snow-plowings" && <Row gutter={[15,15]} className='md:!pr-9 !relative'>
                       <Col lg={12} sm={12} xs={12} className='md:!pr-5 !pl-2 md:!pl-0 !flex flex-col !gap-4 !h-full'>
                        {service?.images?.[0] && <Image src={service.images[0]} alt='service 1' className='!rounded-[12px] object-cover !h-[186px] md:!h-[60%]' />}
                        {service?.images?.[1] && <Image src={service.images[1]} alt='service 1' className='!rounded-[12px] object-cover !h-[166px] md:!h-[184px]' />}
                       </Col>
    
                       <Col lg={12} sm={12} xs={12} className='md:!pr-5 !pl-2 md:!pl-0 !flex flex-col !gap-4 !h-full'>
                        {service?.images?.[2] && <Image src={service?.images[2]} alt='service 1' className='!rounded-[12px] object-cover !h-[166px] md:!h-[42%]' />}
                        {service?.images?.[3] && <Image src={service?.images[3]} alt='service 1' className='!rounded-[12px] object-cover !h-[186px] md:!h-[56%]' />}
                       </Col>
                    </Row>}

                    {service?.id === "personal-cooks" && <Row gutter={[15,15]} className='md:!pr-9 !relative'>
                        <Col lg={14} sm={14} xs={14} className='md:!pr-5 !pl-2 md:!pl-0 !flex flex-col !gap-4 !h-full'>
                         {service?.images?.[0] && <Image src={service.images[0]} alt='service 1' className='!rounded-[12px] object-cover !h-[186px] md:!h-[186px]' />}
                        </Col>
                       <Col lg={10} sm={10} xs={10} className='md:!pr-5 !pl-2 md:!pl-0 !flex flex-col !gap-4 !h-full'>
                        {service?.images?.[1] && <Image src={service.images[1]} alt='service 1' className='!rounded-[12px] object-cover !h-[186px] md:!h-[186px]' />}
                       </Col>
    
                       <Col lg={12} sm={12} xs={12} className='md:!pr-5 !pl-2 md:!pl-0 !flex flex-col !gap-4 !h-full'>
                        {service?.images?.[2] && <Image src={service?.images[2]} alt='service 1' className='!rounded-[12px] object-cover !h-[186px] md:!h-[238px]' />}
                        
                       </Col>
                       <Col lg={12} sm={12} xs={12} className='md:!pr-5 !pl-2 md:!pl-0 !flex flex-col !gap-4 !h-full'>
                       {service?.images?.[3] && <Image src={service?.images[3]} alt='service 1' className='!rounded-[12px] object-cover !h-[186px] md:!h-[238px]' />}</Col>
                    </Row>}

                    {service?.id === "house-chores" && <Row gutter={[15,15]} className='md:!pr-9 !relative'>
                        <Col lg={12} sm={12} xs={12} className='md:!pr-5 !pl-2 md:!pl-0 !flex flex-col !gap-4 !h-full'>
                        {service?.images?.[0] && <Image src={service?.images[0]} alt='service 1' className='!rounded-[12px] object-cover !h-[166px] md:!h-[218px]' />}
                        {service?.images?.[1] && <Image src={service?.images[1]} alt='service 1' className='!rounded-[12px] object-cover !h-[186px] md:!h-[213px]' />}
                       </Col>

                       <Col lg={12} sm={12} xs={12}>
                        {service?.images?.[2] && <Image src={service.images[2]} alt='service 1' className='!rounded-[12px] object-cover !h-full md:!h-[442px]' />}
                       </Col>
                    </Row>}

                    {service?.id === "support-workers" && <Row gutter={[5,15]} className='md:!pr-9 !relative'>
                        <Col lg={14} sm={14} xs={14} className='md:!pr-5 !pl-2 md:!pl-0 !flex flex-col !gap-4 !h-full'>
                        {service?.images?.[0] && <Image src={service?.images[0]} alt='service 1' className='!rounded-[12px] object-cover !h-[320px] md:!h-[442px]' />}
                       </Col>

                       <Col lg={10} sm={10} xs={10}>
                        {service?.images?.[1] && <Image src={service.images[1]} alt='service 1' className='!rounded-[12px] object-cover !h-[320px] md:!h-[442px]' />}
                       </Col>
                    </Row>}

                    {service?.id === "companion-workers" && <Row gutter={[5,15]} className='md:!pr-9 !relative'>
                        <Col lg={10} sm={10} xs={10} className='md:!pr-5 !pl-2 md:!pl-0 !flex flex-col !gap-4 !h-full'>
                        {service?.images?.[0] && <Image src={service?.images[0]} alt='service 1' className='!rounded-[12px] object-cover !h-[320px] md:!h-[442px]' />}
                       
                       </Col>

                       <Col lg={14} sm={14} xs={14}>
                        {service?.images?.[1] && <Image src={service.images[1]} alt='service 1' className='!rounded-[12px] object-cover !h-[320px] md:!h-[442px]' />}
                       </Col>
                    </Row>}
                </Col>
            </Row>
        </div>
  )
}

export default ServiceLanding