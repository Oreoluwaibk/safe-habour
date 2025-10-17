"use client"
import Container from '@/components/dashboard/Container'
import Steps from '@/components/general/Steps'
import { ArrowLeftOutlined, ArrowRightOutlined, UploadOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Upload } from 'antd'
import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";

const title = [
    "Personal Information", 
    "Professional Profile",
    "Services & Expertise",
    "Document Verification",
    "Pricing & Finalization"
];
const description = [
    "Let's start with your basic details", 
    "Tell client about yourself and your location",
    "Select the services you want to offer.",
    "Upload required documents to maintain your verified status.",
    "Set your hourly rate and review your profile"
]

const icons = [
    "iconamoon:profile-fill",
    "ic:outline-work",
    "material-symbols:service-toolbox-rounded",
    "material-symbols:service-toolbox-rounded",
    "famicons:pricetags"
]
const FormItem = Form.Item;
const Page = () => {
    const [form] = Form.useForm();
    const [ steps, setSteps ] = useState(1);

    const renderStep = (step: number) => {
    switch (step) {
        case 1:
        return (
        <>
        <Col lg={12} sm={24} xs={24}>
            <FormItem label="First Name" name="firstName" rules={[{required: true}]}>
                <Input placeholder='Enter your first name' style={{height:50,}}  />
            </FormItem>
        </Col>

        <Col lg={12} sm={24} xs={24}>
            <FormItem label="Last Name" name="lastName" rules={[{required: true}]}>
                <Input placeholder='Enter your last name' style={{height:50,}}  />
            </FormItem>
        </Col>

        <Col lg={12} sm={24} xs={24}>
            <FormItem label="Email Address" name="email" rules={[{required: true}]}>
                <Input placeholder='Enter your email' style={{height:50,}} />
            </FormItem>
        </Col>

        <Col lg={12} sm={24} xs={24}>
            <FormItem label="Phone Number" name="phoneNumber" rules={[{required: true}]}>
                <PhoneInput 
                    placeholder='Enter your phone number'
                    country="ca"
                    inputStyle={{width: "100%", height:50, backgroundColor: "transparent"}}
                    
                />
            </FormItem>
        </Col>
        </>)
        break;
        case 2: 
        return (
        <>
        <Col lg={24} sm={24} xs={24}>
            <FormItem label="Professional Bio" name="bio" rules={[{required: true}]}>
                <Input.TextArea rows={4} placeholder='Describe your experience, skills, and what makes you a great care provider...' maxLength={500} showCount styles={{count: {textAlign: "left"}}} /> 
            </FormItem>
        </Col>
        <Col lg={24} sm={24} xs={24}>
            <FormItem label="Location" name="location" rules={[{required: true}]}>
                <Input placeholder='City, Province (e.g., Toronto, ON)' style={{height:50,}}  /> 
            </FormItem>
        </Col>
        <Col lg={24} sm={24} xs={24}>
            <FormItem label="Location" name="recurring" rules={[{required: false}]}>
                <Select placeholder="Choose any languages you are comfortable with"  style={{height:50,}}>

                </Select>
            </FormItem>
        </Col>
        </>)
        case 3: 
        return (
        <>
        <Col lg={24} sm={24} xs={24}>
            <FormItem label="Services (Select all that apply)" name="recurring" rules={[{required: false}]}>
                <Select placeholder="Select Services" style={{height:50,}}>

                </Select>
            </FormItem>
            <p className='text-[#7B7B7B] text-xs !mt-[-15px]'>Selected: 0 services</p>
        </Col>
        
        </>)
        case 4: 
        return (
        <Col lg={24} sm={24} xs={24}>
            <Card 
                title={<div className='flex flex-col pt-5 text-[#343434]'>
                <h1 className='t-pri flex gap-2 items-center !font-semibold text-base'><Icon icon="line-md:security" fontSize={14} className='mr-1' />Police Background Check</h1>
                <p className='t-pri mb-6 font-normal text-sm'>Current police background check report</p>
            </div>}
             actions={[<div key={1} className='flex items-center justify-between px-6 py-4'>
                <Upload className='w-full' style={{width: "100%"}}>
                <Button type="default" className='md:!w-full !h-[48px]' style={{borderRadius: 50}} icon={<UploadOutlined />}>Upload Document</Button>
                </Upload>
            </div>]}
            styles={{body: {padding: 0}}}
            />

            <Card 
                title={<div className='flex flex-col pt-5 text-[#343434]'>
                <h1 className='t-pri flex gap-2 items-center !font-semibold text-base'><Icon icon="line-md:security" fontSize={14} className='mr-1' />Vulnerable Sector Check</h1>
                <p className='t-pri mb-6 font-normal text-sm'>Child/Adult abuse screening report</p>
            </div>}
             actions={[<div key={1} className='flex items-center justify-between px-6 py-4'>
                <Upload className='w-full' style={{width: "100%"}}>
                <Button type="default" className='md:!w-full !h-[48px]' style={{borderRadius: 50}} icon={<UploadOutlined />}>Upload Document</Button>
                </Upload>
            </div>]}
            styles={{body: {padding: 0}}}
            className='!mt-4'
            />
        </Col>)
        case 5: 
        return (
        <>
        <Col lg={24} sm={24} xs={24}>
            <FormItem label="Hourly Rate (CAD)" name="recurring" rules={[{required: false}]}>
                <InputNumber placeholder='$ 25.00' style={{padding:"5px 10px", width: "100%"}} min={15.00} decimalSeparator='.'  /> 
            </FormItem>
            <p className='text-[#7B7B7B] text-xs !mt-[-15px]'>Minimum rate is $15.00/hour. You can adjust this later</p>
        </Col>
        <Col lg={24} sm={24} xs={24} className='!mt-4'>
         <Card style={{borderColor: "#670316", borderWidth:2, background: "linear-gradient(45deg, rgba(103, 3, 22, 0) 0%, #FFF3F5 100%)"}} styles={{body: {display: "flex", flexDirection: "column", gap:25, padding: "20px"}}}>
            <h1 className='text-[#101828] font-semibold text-2xl'>Profile Summary</h1>

            <div className='flex flex-col gap-4 text-lg'>
                <p className='flex items-center gap-2 text-[#0e0e0e]'><Icon icon="iconamoon:profile" fontSize={18} fontWeight={300} /> Anjola Adekunle</p>

                <p className='flex items-center gap-2 text-[#0e0e0e]'><Icon icon="ic:outline-work" fontSize={18} /> Lagos, Nigeria</p>

                <p className='flex items-center gap-2 text-[#0e0e0e]'><Icon icon="famicons:pricetags-outline" fontSize={18} /> $/hr</p>
            </div>

            <div>
                <h1 className='text-[#101828] font-semibold text-lg'>Services</h1>

                <div className='flex items-center gap-2'>
                    <div className='bg-[#FFF8F9] !min-w-[129px] rounded-[68px] flex items-center justify-center text-[#670316]'>
                        <span>House Cleaning</span>
                    </div>
                </div>
            </div>
         </Card>
        </Col>
       
        </>)
        default:<></>
            break;
    }
    }

    const handlePrevious = (step: number) => {
        if(step === 1) return;
        setSteps(step-1);
    }

     const handleNext = (step: number) => {
        if(step === 5) return;
        setSteps(step+1);
    }
  return (
    <Container active='s' hide center>
        <Card 
            variant="borderless"
            title={<div className='flex flex-col items-center pb-4'>
                <h1 className='t-pri !font-semibold text-[32px]'>Worker Profile Setup</h1>
                <p className='t-pri mb-6 font-light'>Step {steps} of 5 - Let&apos;s create your professional profile</p>
                    <Steps value={steps} />
                </div>
            }
            actions={[<div key={1} className='flex items-center justify-between px-6 py-4'>
                <Button disabled={steps===1} onClick={() => handlePrevious(steps)} type="default" className='md:!w-[129px] !h-[48px] !text-[#670316]' style={{borderRadius: 50}}><ArrowLeftOutlined /> Previous</Button>
                <Button disabled={steps===5} onClick={() => handleNext(steps)} type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Next <ArrowRightOutlined className='ml-1' /></Button>
            </div>]}
            className='md:!w-[712px] justify-self-center !my-6'
            styles={{ body: {display: "flex", flexDirection: "column", gap: 20}}}

        >
            <div className='flex flex-col items-center'>
                <div className='step-icon'>
                    <div className="step-icon-inner">
                        <Icon icon={icons[steps-1]} color="#670316" fontSize={24} />
                    </div>
                </div>
                <h1 className='t-pri !font-semibold text-[32px]'>{title[steps-1]}</h1>
                <p className='t-pri mb-6 font-light'>{description[steps-1]}</p>
            </div>

            <Form layout='vertical' form={form}>
                <Row gutter={[15, 15]}>
                    {renderStep(steps)}
                </Row>
                
            </Form>
        </Card>
    </Container>
  )
}

export default Page