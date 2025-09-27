import Login from '@/components/auth/Login'
import AuthContainer from '@/components/dashboard/AuthContainer'
import React from 'react'

const page = () => {
  return (
    <AuthContainer>
        <Login />
    </AuthContainer>
  )
}

export default page