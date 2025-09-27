"use client"
import CustomAuth from '@/components/auth/CustomAuth'
import AuthContainer from '@/components/dashboard/AuthContainer'
import { CheckCircleOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('verify');
  return (
    <AuthContainer>
      {type === "true" &&<CustomAuth 
        type='otp'
        title='Check your email'
        description='We sent a verification link to adekdebby@gmail.com'
        icon={<MailOutlined className='!text-[#670316] !text-[24px]' />}
        btnTitle='Verify email'
        onClick={() => router.push("/auth/verify-email?verify=success")}
      />}

      {type === "success" &&<CustomAuth 
        type=''
        title='Email verified'
        description='Your password has been successfully reset. Click below to log in magically.'
        icon={<CheckCircleOutlined className='!text-[#670316] !text-[24px]' />}
        btnTitle='Continue'
        onClick={() => router.push("/auth/login")}
      />}
    </AuthContainer>
  )
}

export default page