"use client"
import React, { Suspense, useEffect, useState } from "react";
import CustomAuth from '@/components/auth/CustomAuth';
import AuthContainer from '@/components/dashboard/AuthContainer';
import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';

const VerifyEmailClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ type, setType ] = useState("")
  const [ email, setEmail ] = useState<string| null>("");
  const [ token, setToken ] = useState<string| null>("");
  
  useEffect(() => {
    if (!searchParams) return;
    const rawEmail = searchParams.get("userId");
    const rawToken = searchParams.get("token");
    if(searchParams.get('verify')) setType("true");
    else setType("success")
    setEmail(rawEmail ? decodeURIComponent(rawEmail) : null);
    setToken(rawToken ? decodeURIComponent(rawToken) : null);
  }, [searchParams]);
  

  useEffect(() => {
    const savedMail = localStorage.getItem("emailToVerify");
    const rawEmail = searchParams.get("userId");

    if(savedMail && !rawEmail) setEmail(JSON.parse(savedMail));
  }, [searchParams])

  return (
  <>
    {type === "true" &&<CustomAuth 
      type='otp'
      title='Check your email'
      description={`We sent a verification link to ${email}`}
      icon={<MailOutlined className='!text-[#670316] !text-[24px]' />}
      btnTitle='Verify email'
      email={email}
      onClick={() => router.push("/auth/confirm-email?verify=success")}
    />}

    {type === "success" && <CustomAuth 
      type='email-verify'
      title='Email verified'
      email={email}
      token={token}
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
