import ChooseAuth from '@/components/auth/ChooseAuth'
import Login from '@/components/auth/Login'
import AuthContainer from '@/components/dashboard/AuthContainer'
import React from 'react'

const page = () => {
  return (
    <AuthContainer>
      <ChooseAuth />
    </AuthContainer>
  )
}

export default page