"use client"
import React, { Suspense } from "react";
import CustomAuth from '@/components/auth/CustomAuth';
import AuthContainer from '@/components/dashboard/AuthContainer';
import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';

const VerifyEmailClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('verify');

  return (
    <>
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
    </>
  );
};

const Page = () => {
  return (
    <AuthContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailClient />
      </Suspense>
    </AuthContainer>
  );
};

export default Page;
