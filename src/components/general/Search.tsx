import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react';
import "@/styles/search.css";

interface props {
  isClient?: boolean;
}
const Search = ({ isClient }: props) => {
  return (
    <div className={`search ${isClient ? "" : "md:!mx-[148px]"}`}>
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