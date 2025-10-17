"use client"
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import Status from '@/components/general/Status'
import { EnvironmentOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import { C1 } from '../../../../assets/image'
import PhoneInput from 'react-phone-input-2'
import ItemSelect from '@/components/general/ItemSelect'


const FormItem = Form.Item;
const ProfileInfo = () => {
    const [form] = Form.useForm();
    const [ date, setDate ] = useState<string | string[]>("");
    const [ languages, setLanguages ] = useState<string[]>([]);
    const [ services, setServices ] = useState<string[]>([]);

    console.log("dd", date);
    
  return (
    <Card
        title={<CardTitle
            title='Account Information' 
            icon={<span className='bg-[#FFEAEE] flex items-center justify-center !h-6 !w-6 rounded-[100px]'>
                <UserOutlined className="" />
                </span>}
            />}
        classNames={{
            header: "linear",
            body: "flex flex-col gap-6"
        }}
        className='!mt-6'
    >
        <Card
            title={
                <div className='flex items-center gap-2'>
                    <Image src={C1} alt='' className='h-[84px] w-[84px] rounded-full object-cover' />
                <div className='flex flex-col gap-1'>
                    <CardTitle title='Senior Care Assistant' status={<Status title='Verified pro' color='#018A06' bg='#f3fff4' />} />
                    <div className='flex items-center gap-3'>
                        <span className='text-[#646464]'><EnvironmentOutlined className='mr-1' /> Manitoba</span>
                        <Rating />
                        <p className='text-lg text-[#646464] font-medium'>$28/hr</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Status size={12} title='Senior care' bg='#F6F6F6' color='#343434' />
                    </div>
                </div>
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-0'
        /> 

        <Card
            classNames={{ header: "",}}
            className='!mt-0'
            // extra={<Button  type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Apply Now</Button>}
        >
        <Form layout="vertical" form={form}>
        <Row gutter={[15, 0]} >
            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="First Name" 
                    className="font-semibold" 
                    name="firstName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='Enter First Name' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Last Name" 
                    className="font-semibold" 
                    name="lastName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='Enter Last Name' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Email" 
                    className="font-semibold" 
                    name="email"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='Enter Email' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Date of Birth" 
                    className="font-semibold" 
                    name="age"
                    // rules={[
                    //     {required:true}
                    // ]}
                >
                    <DatePicker 
                        size="large"
                        className='w-full border-none'
                        placeholder='Select Date of Birth'
                        onChange={(date, dateString) => setDate(dateString)}
                        style={{width: "100%", border: "none", height:50, backgroundColor: "#f6f6f6"}}
                    /> 
                        
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Gender" 
                    className="font-semibold" 
                    name="email"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='Female' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Phone Number" 
                    className="font-semibold" 
                    name="phoneNumber"
                    rules={[
                        {required:true}
                    ]}
                >
                    <PhoneInput 
                        placeholder='09039476798'
                        country="ca"
                        // onChange={(value, count:any) => {
                        //     setCountry(count && count.countryCode.toUpperCase())
                        // }}
                        // inputClass='phone_input2'
                        inputStyle={{width: "100%", border: "none", height:50, backgroundColor: "#f6f6f6"}}
                        
                    />
                </FormItem>
            </Col>
            
            <Col lg={24} sm={24} xs={24}>
                <FormItem 
                    label="Bio" 
                    className="font-semibold" 
                    name="email"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input.TextArea 
                        placeholder='Tell us about yourself' 
                        size='large' 
                        style={{fontWeight: 400}}
                        rows={3}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Hourly Rate (CAD)" 
                    className="font-semibold" 
                    name="firstName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <InputNumber 
                        placeholder='30' 
                        size='large' 
                        style={{fontWeight: 400, width: "100%", height: 50}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Experience" 
                    className="font-semibold" 
                    name="lastName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='5 years' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>
            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Languages" 
                    className="font-semibold" 
                    name="firstName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <ItemSelect selected={languages} isLanguage setSelected={() => setLanguages} />
                </FormItem>
            </Col>
            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Services Offered" 
                    className="font-semibold" 
                    name="firstName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <ItemSelect selected={services} setSelected={() => setServices} />
                </FormItem>
            </Col>

             <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Certificate" 
                    className="font-semibold" 
                    name="firstName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <ItemSelect selected={services} setSelected={() => setLanguages} />
                </FormItem>
            </Col>

            
            <Col lg={24} sm={24} xs={24}>
                <FormItem className='flex items-center justify-end'>
                    <Button type="primary" className='!w-[81px] !h-[40px] !rounded-[100px]'>Edit</Button>              
                </FormItem>
            </Col>
        </Row>
        </Form>    
        </Card>    
    </Card>
  )
}

export default ProfileInfo