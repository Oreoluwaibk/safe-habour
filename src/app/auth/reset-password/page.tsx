"use client";

import React, { Suspense, useEffect, useState } from "react";
import CustomAuth from '@/components/auth/CustomAuth';
import AuthContainer from '@/components/dashboard/AuthContainer';
import { KeyOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ email, setEmail ] = useState<string| null>("");
  const [ token, setToken ] = useState<string| null>("");

  useEffect(() => {
    if (!searchParams) return;
    const rawEmail = searchParams.get("email");
    const rawToken = searchParams.get("token");
    setEmail(rawEmail ? decodeURIComponent(rawEmail) : null);
    setToken(rawToken ? decodeURIComponent(rawToken) : null);
  }, [searchParams]);

  const type = searchParams.get('success');

  return ( 
    <>
      {!type && <CustomAuth 
        type='reset'
        title='Set new password'
        description='Your new password must be different to previously used passwords.'
        icon={<KeyOutlined rotate={180} className='!text-[#670316] !text-[24px]' />}
        btnTitle='Reset password'
        onClick={() => router.push("/auth/reset-password?success=true")}
        token={token}
        email={email}
      />}
      {type === "true" && <CustomAuth 
        type='true'
        title='Password reset'
        description='Your password has been successfully reset. Click below to log in magically.'
        icon={<KeyOutlined  className='!text-[#670316] !text-[24px]' />}
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
        <ResetPasswordClient />
      </Suspense>
    </AuthContainer>
  );
};

export default Page;
