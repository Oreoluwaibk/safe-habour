"use client"
import SignUp from '@/components/auth/SignUp'
import AuthContainer from '@/components/dashboard/AuthContainer'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  console.log("type", type);
  
  return (
    <AuthContainer>
      <SignUp type={type} />
    </AuthContainer>
  )
}

export default Page