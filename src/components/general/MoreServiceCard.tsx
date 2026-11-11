import Image from 'next/image';
import React from 'react'
import { Smile, Star } from '../../../assets/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface props {
    title: string;
    description: string;
    items: string[];
    image:  string | StaticImport;
    link: string;
}

export const ListItem = ({ label }: { label: string }) => (
<div className='flex items-center gap-2'>
    <div className='h-7 w-7 flex items-center justify-center'>
    <Image src={Star} alt='label' className='text-[#670316]!' />
    </div>
    <p className='text-sm!'>{label}</p>
</div>
);

const MoreServiceCard = ({ title, description, image, items, link }: props) => {
    const router = useRouter();
    
  return (
    <div className='flex h-full w-full flex-col rounded-xl p-5 shadow'>
        <Image src={image} alt={title} className='h-[180px] w-full rounded-lg object-cover md:h-[220px]' />
        <div className='mt-4 flex flex-1 flex-col gap-4'>
            <div className='flex items-center gap-2'>
                <div className="flex h-6 w-6 items-center justify-center rounded-full"><Image src={Smile} alt="" /></div>
                <p className='text-lg font-semibold'>{title}</p>
            </div>

            <p className='text-sm text-[#475467]'>{description}</p>

            <div className="flex flex-col gap-2">
                {items[0] && <ListItem label={items[0]} />}
                {items[1] && <ListItem label={items[1]} />}
            </div>

            <Button className='mt-auto h-12! w-full!' onClick={() => router.push(link)}>
                Learn More
            </Button>
        </div>
    </div>
  )
}

export default MoreServiceCard