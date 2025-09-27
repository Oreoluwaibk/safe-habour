"use client";

import React, { Suspense } from "react";
import CustomAuth from '@/components/auth/CustomAuth';
import AuthContainer from '@/components/dashboard/AuthContainer';
import { KeyOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';

const ForgotPasswordClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('email-sent');

  return (
    <>
      {!type && (
        <CustomAuth
          type='forgot'
          title='Forgot password?'
          description='No worries, we’ll send you reset instructions.'
          icon={<KeyOutlined rotate={180} className='!text-[#670316] !text-[24px]' />}
          btnTitle='Reset password'
          onClick={() => router.push("/auth/forgot-password?email-sent=true")}
        />
      )}
      {type === "true" && (
        <CustomAuth
          type='check your email'
          title='Check your email'
          description='We sent a password reset link to adekdebby67@gmail.com'
          icon={<MailOutlined className='!text-[#670316] !text-[24px]' />}
          btnTitle='Open email app'
          onClick={() => router.push("/auth/reset-password")}
        />
      )}
    </>
  );
};

const Page = () => {
  return (
    <AuthContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordClient />
      </Suspense>
    </AuthContainer>
  );
};

export default Page;
