"use client"
import React from 'react'
import "@/styles/ready.css"
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hook';

const ReadyToStart = () => {
  const router = useRouter();
  const { isAuthenticated, loginType } = useAppSelector(state => state.auth);

  const handleGoDashboard = (type: string) => {
    if(type === "choose") {
      if(isAuthenticated && loginType === "ClientUser") router.push("/dashboard/client")
      else router.push("/auth/choose-auth")
    }

    if(type === "worker") {
      if(isAuthenticated && loginType === "ServiceWorker") router.push("/dashboard/worker");
      else router.push("/auth/sign-up")
    }
  }
  return (
    <div className='container'>
      <div className='colorbg'>
        <p>Ready to Get Started?</p>
        <p>Join thousands of Canadian families who trust Safe Harbour for their care needs.</p>
        <div className='flex items-center gap-6 mt-4'>
          <Button className='!bg-[#670316] !border-white button !text-white'  onClick={() => handleGoDashboard("choose")}>Find a Care Worker</Button>
          <Button type='primary' className='!bg-white button !text-[#670316]'  onClick={() => handleGoDashboard("worker")}>Join as a Worker</Button>
        </div>
      </div>
    </div>
  )
}

export default ReadyToStart