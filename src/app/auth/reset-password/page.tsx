"use client"
import CustomAuth from '@/components/auth/CustomAuth'
import AuthContainer from '@/components/dashboard/AuthContainer'
import { KeyOutlined } from '@ant-design/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('success');
  return (
    <AuthContainer>
      {!type && <CustomAuth 
        type='reset'
        title='Set new password'
        description='Your new password must be different to previously used passwords.'
        icon={<KeyOutlined rotate={180} className='!text-[#670316] !text-[24px]' />}
        btnTitle='Reset password'
        onClick={() => router.push("/auth/reset-password?success=true")}
      />}
      {type === "true" && <CustomAuth 
        type=''
        title='Password reset'
        description='Your password has been successfully reset. Click below to log in magically.'
        icon={<KeyOutlined  className='!text-[#670316] !text-[24px]' />}
        btnTitle='Continue'
        onClick={() => router.push("/auth/login")}
      />}
    </AuthContainer>
  )
}

export default page