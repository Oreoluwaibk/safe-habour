import ChooseAuth from '@/components/auth/ChooseAuth'
import AuthContainer from '@/components/dashboard/AuthContainer'
import React from 'react'

const Page = () => {
  return (
    <AuthContainer>
      <ChooseAuth />
    </AuthContainer>
  )
}

export default Page