"use client"
import { changePassword } from '@/redux/action/auth';
import { App, Button, Card, Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import { createErrorMessage } from '../../../../utils/errorInstance';

const FormItem = Form.Item;
const ResetPassword = () => {
    const [form] = Form.useForm();
    const { modal } = App.useApp();
    const [loading, setLoading] = useState(false);

    const handleChangePassword = () => {
        form.validateFields()
        .then(value => {
            setLoading(true);
            changePassword(value)
            .then(res => {
                if(res.status === 200 || res.status === 201){
                    modal.success({
                        title: res.data.message || "Password reset successfully!",
                        onOk: () => {
                            setLoading(false);
                            form.resetFields();
                            const savedCredentials = localStorage.getItem("safehabour_credentials");
                            if (savedCredentials) {
                                const { email } = JSON.parse(savedCredentials);
                                localStorage.setItem("safehabour_credentials", JSON.stringify({ email, password: value.newPassword }));
                            }
                        }
                    })
                }
            })
            .catch(err => {
                modal.error({
                    title: "Unable to change your password",
                    content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                    onOk: () => setLoading(false)
                });
            })
        })
    }
  return (
   <Row>
    <Col lg={24} sm={24} xs={24}>
        <Card title="Reset Password" variant="borderless">
        <Form layout="vertical" onFinish={handleChangePassword} form={form}>
            <Row gutter={[15, 0]} >
            <Col lg={24} sm={24} xs={24}>
                <FormItem
                    label="Current Password" 
                    className="font-semibold" 
                    name="currentPassword"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input.Password 
                        placeholder='Enter passsword' 
                        // size='large' 
                        style={{fontWeight: 400, height:48}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col>

            <Col lg={24} sm={24} xs={24}>
                <FormItem 
                    label="New Password" 
                    className="font-semibold" 
                    name="newPassword"
                    rules={[
                        { required: true, message: "Please enter your new password!" },
                        { min: 8, message: "Password must be at least 8 characters long!" },
                        {
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
                            message: "Password must contain letters and numbers.",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue("currentPassword") !== value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error("Your new password is the same as the old one!")
                            );
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password 
                        placeholder='Enter new passsword' 
                        // size='large' 
                        style={{fontWeight: 400, height:48}}
                        className='border-none'
                    />
                </FormItem>
            </Col>

            <Col lg={24} sm={24} xs={24}>
            <FormItem className='flex items-center justify-end'>
                <Button loading={loading} htmlType="submit" type="primary" className='!min-w-[81px] !h-[40px] !rounded-[100px]'>Reset Password</Button>              
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