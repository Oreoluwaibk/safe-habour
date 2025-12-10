"use client"
import Notification from '@/components/admin/settings/Notification'
import ServiceCategory from '@/components/admin/settings/ServiceCategory'
import AdminContainer from '@/components/dashboard/AdminContainer'
import { Card, Segmented } from 'antd'
import React, { useState } from 'react'

const Page = () => {
  const [ active, setActive ] = useState("Notifications");
  return (
  <AdminContainer active='Settings'>
  <Card classNames={{ body: "bg-[#f6f6f6]!"}}>
    <div>
      <h1 className='t-pri !font-semibold text-[32px]'>System Settings</h1>
      <p className='t-pri mb-6'>Configure platform-wide settings and preferences</p>
    </div>

    <div  className='mb-6'>
      <Segmented 
        options={["General", "Financial", "Notifications", "Services"]}
        defaultValue={active}
        onChange={(value) => setActive(value)}
        value={active}
      />
    </div>

    {active === "Notifications" && <Notification />}
    {active === "Services" && <ServiceCategory />}
  </Card>
  </AdminContainer>
  )
}

export default Page