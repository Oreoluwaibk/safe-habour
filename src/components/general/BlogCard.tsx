import Image from 'next/image';
import React from 'react'
import "@/app/styles/blog.css";
import { ArrowUpOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface props {
    image: any;
    title: string;
    description: string;
    category: string;
    date: string;
    poster: string;
}
const BlogCard = ({
    image,
    title, description,
    category,
    date,
    poster
}: props) => {
  return (
    <div className='blog-card'>
        <div className='relative'>
             <Image src={image} alt={title} className='blog-image' />
            <div className='glossy'>
                <div className='flex items-center justify-between w-full'>
                    <p className='blog-poster'>{poster}</p>
                    <p className='blog-category'>{category}</p>
                </div>
                <p className='blog-date'>{date}</p>
            </div>
        </div>
       
        <p className='blog-title'>{title}</p>
        <p className='blog-description'>{description}</p>
        <Button type="text" className='!h-[46px] !w-fit !px-4'>Read post <ArrowUpOutlined rotate={45} className='!text-[#670316] !text-[20px] ml-2' /> </Button>
    </div>
  )
}

export default BlogCard