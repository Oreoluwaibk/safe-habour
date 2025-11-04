import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react';
import "@/styles/search.css";

interface props {
  isClient?: boolean;
  search: string;
  location: string;
  onChangeLocation: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSearch: React.ChangeEventHandler<HTMLInputElement>;
  onSearchClick: () => void;
  loading: boolean
}
const Search = ({ 
  isClient, 
  search, 
  onChangeSearch, 
  onSearchClick,
  loading,
  location,
  onChangeLocation 
}: props) => {
  return (
    <div className={`search ${isClient ? "" : "md:!mx-[148px]"}`}>
      <Input 
        className='search1' 
        prefix={<SearchOutlined />} 
        placeholder='Job title or keywords' 
        value={search}
        onChange={onChangeSearch}
      />
        <div className='line'></div>
      <Input 
        className='search2' 
        prefix={<EnvironmentOutlined />} 
        placeholder='Location' 
        value={location} 
        onChange={onChangeLocation}
      />
      
      <Button loading={loading} onClick={onSearchClick} type="primary" className='h-[48px] md:h-[58px] !w-[133px] !px-18 mx-4'>
        Search
      </Button>
    </div>
  )
}

export default Search