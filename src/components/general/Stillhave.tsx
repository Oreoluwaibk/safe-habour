import React from 'react';
import { Button } from 'antd';
import Image from 'next/image';;
// import { useRouter } from 'next/router';
import { AvatarGroup } from '../../../assets/image';

const StillHave = () => {
  return (
    <div className="stilhave">
        <Image src={AvatarGroup} alt='avatar group' className='!h-[70px] !w-[70px]' />
        <p className='text-[#101828] text-xl'>Still have questions?</p>
        <p className='text-[#667085] text-lg'>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
        <Button type='primary' className="!h-[58px] !w-[150px] md:!w-[220px] mt-4" > 
            Get in Touch
        </Button>
    </div>
  )
}

export default StillHave