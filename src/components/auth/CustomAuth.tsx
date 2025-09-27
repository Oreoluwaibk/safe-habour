"use client"
import React from 'react';
import "@/app/styles/auth.css";
import "@/app/styles/form.css";
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface props {
    icon: any;
    title: string;
    description: string;
    btnTitle: string;
    type: string;
    onClick?: () => void
}

const FormItem = Form.Item;
const CustomAuth = ({ icon, title, description, btnTitle, type, onClick }: props) => {
    const [form] = Form.useForm();
    const isEmail = type === "email verify" || type === "otp" || type === "check your email";

    const handleClick = () => {
        if(onClick) onClick();
    }
  return (
    <div className='login-div auth-div'>
        <div className='flex flex-col items-center gap-2'>
            <div className='icon-div'>{icon}</div>
            <p className='auth-header'>{title}</p>
            <p className='auth-description !text-center'>{description}</p>
        </div>

         <Form form={form} layout="vertical">
            {type === "forgot" && <FormItem label="Email">
                <Input placeholder="Enter your email" type="text" />
            </FormItem>}

            {type === "otp" && <FormItem label="" className='text-center'>
                <Input.OTP length={4} size="large"  />
            </FormItem>}
            {type === "reset" && <FormItem label="Password">
                <Input.Password placeholder="Password" type="password" />
            </FormItem>}

            {type === "reset" &&<FormItem label="Confirm password">
                <Input.Password placeholder="Password" type="password" />
            </FormItem>}

            <FormItem label="">
                <Button className="button_form" type="primary" onClick={handleClick}>{btnTitle}</Button>
            </FormItem>
            
            <FormItem label="">
                {isEmail && <div className='flex items-center justify-center gap-2 mt-2'>
                    <p>Didn’t receive the email?</p>
                    <p className='text-[#820116]'>Click to resend</p>
                </div>}
                <div className='flex items-center justify-center gap-2 mt-2'>
                    <ArrowLeftOutlined className='!text-[#667085]' />
                    <Link href="/auth/login" style={{color: "#667085"}}>Back to log in</Link>
                </div>
            </FormItem>
        </Form>
    </div>
  )
}

export default CustomAuth