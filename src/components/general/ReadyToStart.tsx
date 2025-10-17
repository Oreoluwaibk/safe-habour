"use client"
import React from 'react'
import "@/styles/ready.css"
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

const ReadyToStart = () => {
   const router = useRouter();
  return (
    <div className='container'>
      <div className='colorbg'>
        <p>Ready to Get Started?</p>
        <p>Join thousands of Canadian families who trust Safe Harbour for their care needs.</p>
        <div className='flex items-center gap-6 mt-4'>
          <Button className='!bg-[#670316] !border-white button !text-white'  onClick={() => router.push("/auth/choose-auth")}>Find a Care Worker</Button>
          <Button type='primary' className='!bg-white button !text-[#670316]'  onClick={() => router.push("/auth/sign-up")}>Join as a Worker</Button>
        </div>
      </div>
    </div>
  )
}

export default ReadyToStart