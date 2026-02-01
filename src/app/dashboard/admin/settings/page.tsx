"use client"
import Financial from '@/components/admin/settings/Financial'
import General from '@/components/admin/settings/General'
import Notification from '@/components/admin/settings/Notification'
import ServiceCategory from '@/components/admin/settings/ServiceCategory'
import ResetPassword from '@/components/client/settings/ResetPassword'
import AdminContainer from '@/components/dashboard/AdminContainer'
import { Card, Segmented } from 'antd'
import { useState } from 'react'

const Page = () => {
  const [ active, setActive ] = useState("General");

  return (
  <AdminContainer active='Settings'>
  <Card classNames={{ body: "bg-[#f6f6f6]!"}}>
    <div>
      <h1 className='t-pri font-semibold! text-[32px]'>System Settings</h1>
      <p className='t-pri mb-6'>Configure platform-wide settings and preferences</p>
    </div>

    <div  className='mb-6 overflow-x-auto no-scrollbar'>
      <Segmented 
        options={["General", "Financial", "Security","Notifications", "Services"]}
        defaultValue={active}
        onChange={(value) => setActive(value)}
        value={active}
      />
    </div>

    {active === "Notifications" && <Notification />}
    {active === "General" && <General />}
    {active === "Financial" && <Financial />}
    {active === "Security" && <ResetPassword />}
    {active === "Services" && <ServiceCategory />}
  </Card>
  </AdminContainer>
  )
}

export default Page