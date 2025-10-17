"use client"
import WorkerContainer from '@/components/dashboard/WorkerContainer'
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import Status from '@/components/general/Status'
import { ArrowLeftOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { C1 } from '../../../../../assets/image'
import { Icon } from '@iconify/react'

const Page = () => {
    const router = useRouter();
  return (
    <WorkerContainer active='Dashboard'>
    <div onClick={() => router.back()} className='flex items-center gap-4 cursor-pointer my-2 text-[#343434]'>
        <ArrowLeftOutlined />
        <span>Back</span>
    </div>

    <Row gutter={[15, 15]} className='!pb-6'>
        <Col lg={24} sm={24} xs={24}>
        <Card
            title={
                <div className='flex flex-col gap-1'>
                    <CardTitle title='Senior Care Assistant' />
                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464]'><EnvironmentOutlined className='mr-1' /> Manitoba</span>
                        <Rating />
                        <p className='text-lg text-[#646464] font-medium'>$28/hr</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Status size={12} title='Senior care' bg='#F6F6F6' color='#343434' />
                    </div>
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-6'
            extra={<Button  type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Apply Now</Button>}
        />       
        </Col>

        <Col lg={14} sm={24} xs={24}>
        <Card
            title={
                <div className='flex flex-col gap-1'>
                    <CardTitle 
                        title='Job Description' 
                    />
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-0'
            actions={[<p key={1} className='text-left px-6 text-sm text-[#585858]'>We are seeking a compassionate and experienced senior care assistant to provide support for our elderly family member. The role involves assisting with daily activities including personal care, meal preparation, light housekeeping, and providing companionship. The ideal candidate should have experience working with seniors, particularly those with mobility challenges.</p>]}
        /> 

         <Card
            title={
                <div className='flex flex-col gap-1'>
                    <CardTitle 
                        title='Job Details' 
                    />
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-3'
            actions={[
                <div className='px-4 flex items-center gap-6' key={1}>
                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464] flex items-center gap-1'><Icon icon="lets-icons:date-today-light" fontSize={14} />State Date:</span>
                        <span>28/09/2025</span>
                    </div>

                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464] flex items-center gap-1'><Icon icon="si:dollar-line" fontSize={14} />Payment:</span>
                        <span>Hourly rate paid weekly</span>
                    </div>

                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464] flex items-center gap-1'><Icon icon="mingcute:time-line" fontSize={14} />Preferred Time:</span>
                        <span>4pm</span>
                    </div>
                </div>
            ]}
        />
        </Col>

        <Col lg={10} sm={24} xs={24}>
            <Card
                title={
                    <div>
                        <CardTitle title='Client Information' />
                        <div className='flex items-center gap-3'>
                            <Image src={C1} alt='title' className='rounded-full h-[56px] w-[56px] object-cover' />
                            <CardTitle title='Margaret Thompson' description={<Rating />} />
                        </div>
                    </div>
                }
                classNames={{ header: "!py-4", body: "flex flex-col gap-6" }}
                className='!mt-0'
            >

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Member Since</p>
                        <p className='text-lg text-[#1e1e1e] font-medium'>2025</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Response Rate</p>
                        <p className='text-lg text-[#1e1e1e] font-medium'>87%</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-lg text-[#1e1e1e]'>Verification</p>
                        <Status title='Verified' />
                    </div>

                   
            </Card>
        </Col>
    </Row>
    </WorkerContainer>
  )
}

export default Page