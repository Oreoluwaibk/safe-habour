import Image from 'next/image';
import React from 'react'
import { Smile, Star } from '../../../assets/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

interface props {
    title: string;
    description: string;
    items: string[];
    image: any;
    link: string;
}

export const ListItem = ({ label }: { label: string }) => (
<div className='flex items-center gap-2'>
    <div className='h-[28px] w-[28px] flex items-center justify-center'>
    <Image src={Star} alt='label' className='!text-[#670316]' />
    </div>
    <p className='!text-sm'>{label}</p>
</div>
);

const MoreServiceCard = ({ title, description, image, items, link }: props) => {
    const router = useRouter();
  return (
    <div className='!p-5 shadow rounded-xl'>
        <Image src={image} alt={title} className='!rounded-[12px] object-cover !w-full !h-[121px] md:!h-[249px]'  />
        <div className='flex flex-col gap-4 mt-4'>
            <div className='flex items-center gap-2'>
                <div style={{height: 24, width: 24, borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center"}}><Image src={Smile} alt='title' /></div>
                <p className='font-semibold text-lg'>{title}</p>
            </div>

            <p className='!text-sm !h-10'>{description}</p>

            <div>
                <ListItem label={items[0]} /> 
                <ListItem label={items[1]} /> 
            </div>

            <Button className='!w-full !h-[47px]' onClick={() => router.push(`service/${link}`)}>
                Learn More
            </Button>
        </div>
    </div>
  )
}

export default MoreServiceCard