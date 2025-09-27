import { GlobalOutlined, LinkedinFilled, TwitterOutlined } from '@ant-design/icons';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image'
import React from 'react'

interface props {
  image: string | StaticImport;
  name: string;
  position: string;
  description: string;
}
const TeamCard = ({
  image,
  name,
  position,
  description
}: props) => {
  return (
    <div className='!flex !flex-col gap-4'>
      <Image src={image} alt={name} className='md:!h-[296px] object-cover w-full' />
      <p className='teamname'>{name}</p>
      <p className='teamposition'>{position}</p>
      <p className='teamdesc'>{description}</p>

      <div className='flex items-center gap-3'>
        <TwitterOutlined className='!text-[#98A2B3] !text-[24px]' />
        <LinkedinFilled className='!text-[#98A2B3] !text-[24px]'/>
        <GlobalOutlined className='!text-[#98A2B3] !text-[24px]'/>
      </div>
    </div>
  )
}

export default TeamCard