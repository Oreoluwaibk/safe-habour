"use client"
import { Button, Card, Col, Form, Input, Row } from 'antd'
import React from 'react'

const FormItem = Form.Item;
const ResetPassword = () => {
     const [form] = Form.useForm();
  return (
   <Row>
    <Col lg={24} sm={24} xs={24}>
        <Card title="Reset Password" variant="borderless">
        <Form layout="vertical" form={form}>
            <Row gutter={[15, 0]} >
            <Col lg={24} sm={24} xs={24}>
                <FormItem
                    label="Current Password" 
                    className="font-semibold" 
                    name="firstName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input.Password 
                        placeholder='Enter passsword' 
                        size='large' 
                        style={{fontWeight: 400, height:50}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            <Col lg={24} sm={24} xs={24}>
                <FormItem 
                    label="New Password" 
                    className="font-semibold" 
                    name="lastName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input.Password 
                        placeholder='Enter new passsword' 
                        size='large' 
                        style={{fontWeight: 400, height:50}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            <Col lg={24} sm={24} xs={24}>
            <FormItem className='flex items-center justify-end'>
                <Button type="primary" className='!min-w-[81px] !h-[40px] !rounded-[100px]'>Reset Password</Button>              
            </FormItem> 
            </Col>
            
            
            
            </Row>
        </Form>
        </Card>
    </Col>
   </Row>
  )
}

export default ResetPassword