"use client"
import React from 'react'
import Hero from '@/components/wailist/Hero';
import PromoBanner from '@/components/wailist/PromoBanner';
import ValueProp from '@/components/wailist/ValueProps';
import Services from '@/components/wailist/WaitlistServices';
import Cities from '@/components/wailist/Cities';
import HowItWorks from '@/components/wailist/HowItWorks';
import SeekerForm from '@/components/wailist/SeekerForm';
import HelperForm from '@/components/wailist/HelperForm';
import Container from '@/components/dashboard/Container';
import FaqComponent from '@/components/general/Faqs';

const Page = () => {
  return (
    <>
    <Container active='Waitlist'>
        <Hero />
        <PromoBanner />
        <ValueProp />
        <Services />
        <Cities />
        <HowItWorks />
        <SeekerForm />
        <HelperForm />
        {/* <FaqComponent /> */}
    </Container>
    </>
  )
}

export default Page