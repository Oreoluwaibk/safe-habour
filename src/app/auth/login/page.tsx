import Login from '@/components/auth/Login'
import AuthContainer from '@/components/dashboard/AuthContainer'
import React from 'react'

const Page = () => {
  return (
    <AuthContainer>
        <Login />
    </AuthContainer>
  )
}

export default Page