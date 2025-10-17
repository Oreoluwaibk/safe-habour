"use client"
import { Avatar, Button, Card, Col, DatePicker, Form, Input, message, Row, Upload } from 'antd'
import { RcFile } from 'antd/es/upload';
import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { UserOutlined } from '@ant-design/icons';
import PhoneInput from "react-phone-input-2";

const FormItem = Form.Item;
const maxFileSize = 10000000;
const PersonalSettings = () => {
    const [form] = Form.useForm();
    // const [ uploadName, setUploadName ] = useState<any>("");
     const [ uploadValue, setUploadValue ] = useState<RcFile[]>([]);
     const [ date, setDate ] = useState<string | string[]>("");

    const handleBeforeUpload = async (file: RcFile) => {
        if (file.size > maxFileSize) return message.warning("Cannot upload file more than 10mb");
        return setUploadValue([file]);
    }

    console.log("date", date, uploadValue);
    
    
    const  handleRemovePicture = () => {
        setUploadValue([]);
        // setUploadName("");
    };
  return (
    <Row>
    <Col lg={24} sm={24} xs={24} className='mb-6'>
    <Card 
        title="Personal Information" 
        variant="borderless"
    >
        <div className='flex items-center gap-6 mt-3 mb-8'>
            <div className='relative'>
                {/* <Image
                    src={C1} 
                    alt='avatar' 
                    className='w-[65px] h-[65px] rounded-[100px] object-cover'
                /> */}
                <Avatar icon={<UserOutlined />} size={65} />
                <Upload 
                    className='absolute bottom-[0px] right-0 cursor-pointer bg-[#003E8F] h-[20px] w-[20px] flex items-center justify-center rounded-[100px]'
                    beforeUpload={handleBeforeUpload}
                    onRemove={handleRemovePicture}
                    accept=".jpg,.png,.jpeg," 
                >
                    <Icon icon="mdi:edit" color='#fff' />
                </Upload>   
            </div>
            
            <Upload
                beforeUpload={handleBeforeUpload}
                onRemove={handleRemovePicture}
                accept=".jpg,.png,.jpeg,"
            >
                <Button type="primary" className='!h-[40px] !rounded-[3.2px] !font-semibold'>Upload New</Button>
            </Upload>
            

            <Button type="default" className='!h-[40px] !font-semibold !rounded-[3.2px] !bg-[#F1F1F1] !text-[#5D5D5D] !border-none'>Delete Avatar</Button>
        </div>
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

                <FormItem className='flex items-center justify-end'>
                    <Button type="primary" className='!w-[81px] !h-[40px] !rounded-[100px]'>Edit</Button>              
                </FormItem>
            </Col>
            </Row>
        </Form>
    </Card>
    </Col>

    <Col lg={24} sm={24} xs={24}>
        <Card title="Address Information" variant="borderless">
             <Form layout="vertical" form={form}>
            <Row gutter={[15, 0]} >
            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Street Address" 
                    className="font-semibold" 
                    name="firstName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='124, main street' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="City" 
                    className="font-semibold" 
                    name="lastName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='Toronto' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Country" 
                    className="font-semibold" 
                    name="email"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='Canada' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            

                <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Postal Code" 
                    className="font-semibold" 
                    name="email"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='M5V 3A1' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        
                    />
                </FormItem>
                <FormItem className='flex items-center justify-end'>
                    <Button type="primary" className='!w-[81px] !h-[40px] !rounded-[100px]'>Edit</Button>              
                </FormItem>
            </Col>
           
            
            </Row>
        </Form>
        </Card>
    </Col>
    </Row>
  )
}

export default PersonalSettings