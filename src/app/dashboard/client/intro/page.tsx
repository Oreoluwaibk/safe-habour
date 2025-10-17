"use client"
import Container from '@/components/dashboard/Container'
import { Col, Row, Form, Select, Input, DatePicker, Button, Radio, InputNumber } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import { Post } from '../../../../../assets/image'


const FormItem = Form.Item;
const Page = () => {
  const [form] = Form.useForm();
  const [ steps, setSteps ] = useState<number>(1);

  const renderStep = (step: number) => {
        switch (step) {
            case 1:
                return <>
                    <FormItem label="Service Category" name="category" rules={[{required: true}]}>
                        <Select placeholder="Select a sevice category">

                        </Select>
                    </FormItem>
                    <FormItem label="Job Title" name="title" rules={[{required: true}]}>
                        <Input placeholder='e.g., Weekly house cleaning needed' /> 
                    </FormItem>

                    <FormItem label="Description" name="description" rules={[{required: true}]}>
                        <Input.TextArea rows={5} placeholder='Describe what you need help with any specific requirements, and what to expect..' /> 
                    </FormItem>

                     <FormItem label="Date Needed" name="date" rules={[{required: true}]}>
                        <DatePicker style={{width: "100%",}} placeholder="Select Date" />
                    </FormItem>
                    <FormItem label="Time Preference" name="time" rules={[{required: true}]}>
                        <Select placeholder="Select TIme">

                        </Select>
                    </FormItem>

                     <FormItem className='flex justify-end'>
                        <Button onClick={() => setSteps(2)} type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Next</Button>
                    </FormItem>
                </>
            break;
            case 2: 
            return <>
                   

                    <FormItem label="Budget (CAD)" name="budget" rules={[{required: true}]}>
                        <InputNumber placeholder='$120' style={{width: "100%"}} /> 
                    </FormItem>

                    <FormItem label="Location" name="location" rules={[{required: true}]}>
                        <Input placeholder='Your verified address will be used by default' style={{width: "100%"}} /> 
                    </FormItem>

                    <FormItem label="" name="recurring" rules={[{required: false}]}>
                        <Radio>This is a recurring job</Radio>
                    </FormItem>

                     <div style={{width: "100%"}} className='flex justify-between !w-full'>
                        <Button onClick={() => setSteps(1)} type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Previous</Button>
                        <Button type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Post Job</Button>
                    </div>
                </>
            default:<></>
                break;
        }
  }
  return (
    <Container active='s' hide>
    <Row gutter={[40, 15]} className='!m-0 md:!px-[100px] !my-[40px]'>
      <Col lg={12} sm={12} xs={24}>
      <Image src={Post} alt='image' className='object-cover h-full w-full' />
      </Col>

      <Col lg={12} sm={12} xs={24} className='!flex !flex-col justify-center gap-6'>
        <div>
          <h1 className='t-pri !font-semibold text-[32px]'>Post A Job</h1>
          <p className='t-pri mb-6'>Post a job to see a list of top-matched workers</p>
        </div>

        <Form layout="vertical" form={form}>
          {renderStep(steps)}     
        </Form>
      </Col>
    </Row>
    </Container>
  )
}

export default Page