import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react';
import "@/app/styles/search.css";

const Search = () => {
  return (
    <div className='search'>
        <Input className='search1' prefix={<SearchOutlined />} placeholder='Job title or keywords' />
         <div className='line'></div>
        <Input className='search2' prefix={<EnvironmentOutlined />} placeholder='Location'  />
       
        <Button type="primary" className='h-[48px] md:h-[58px] !w-[133px] !px-18 mx-4'>
            Search
        </Button>
    </div>
  )
}

export default Search