"use client"
import SignUp from '@/components/auth/SignUp'
import React, { Suspense } from "react";
import AuthContainer from '@/components/dashboard/AuthContainer';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordClient = () => {
  const searchParams = useSearchParams();
   const type = searchParams.get('type');

  return (
    <>
      <SignUp type={type} />
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
