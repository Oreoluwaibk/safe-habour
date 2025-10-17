import { Button, Card, Checkbox, Input, InputNumber, Select, Slider } from 'antd'
import React from 'react'
import "@/styles/client.css"
import CardTitle from '@/components/general/CardTitle'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'

const FilterCard = () => {
  return (
    <Card
        title={
        <CardTitle 
        title="Filter Jobs" 
        icon={<span className='bg-[#FFEAEE] flex items-center justify-center !h-6 !w-6 rounded-[100px]'>
        <FilterOutlined className='text-[#670316]' />
        </span>}          
        />}
         classNames={{ header: "linear" }}
    >
    <div className='flex items-center justify-between !mb-4'>
        <p className="t-pri text-base">Filter By</p>

        <div className='flex gap-2'>
            <Button type="default" className='!h-[38px] !text-[#670316] !border-[#670316] !bg-[#FFF5F7] !rounded-[68px]'>Advance</Button>
            <Button type="default" className='!h-[38px] !text-[#393939] !border-[#E9E9E9] !bg-[#F6F6F6] !rounded-[68px]'>Clear</Button>
        </div>
    </div>
    <div className="filter-container">
        <p className="t-pri text-base">Location</p>

        <Select placeholder="Toronto">
            
        </Select>
    </div>
    <div className="filter-container">
        <p className="t-pri text-base">Search Jobs</p>

        <Input placeholder='Search for jobs' prefix={<SearchOutlined />} />
    </div>

    <div className="filter-container">
        <p className="t-pri text-base">Service Type</p>

        <Checkbox.Group className="flex flex-col gap-2" onChange={(value) => console.log(value)}>
            <Checkbox value={1}>
                Care Workers
            </Checkbox>
            <Checkbox>
                Babysitters & Childcare
            </Checkbox>
            <Checkbox>
                House Chores & Cleaning
            </Checkbox>
            <Checkbox>
                Personal Cook
            </Checkbox>
            <Checkbox>
                Support Workers
            </Checkbox>
            <Checkbox>
                Companion Workers
            </Checkbox>
        </Checkbox.Group>
    </div>

    <div className="filter-container">
        <p className="t-pri text-base">Price</p>

        <div className="flex items-center w-full gap-1">
            <span>0</span>
            <Slider 
                min={0}
                max={1000}
                style={{width: "100%"}}
                styles={{
                    track: {backgroundColor: "#670318", height: 6},
                    handle: {color: "#670318", backgroundColor: "#670318", },
                    rail: {backgroundColor: "#ffecef", height: 6}
                }}
                range
                
            />
            <span>$999</span>
        </div>

        <div className="flex items-center gap-4">
            <InputNumber placeholder="Min" className="bg-white h-[35px] !w-[81px] !rounded-[12px]" />-
            <InputNumber placeholder="Max" className="bg-white h-[35px] !w-[81px] !rounded-[12px]" />
        </div>
    </div> 
    <div className="filter-container">
        <p className="t-pri text-base">Availability</p>

        <Select placeholder="Any Time">
            
        </Select>
    </div>
    <div className="filter-container">
        <p className="t-pri text-base">Minimum Client Rating</p>

        <Select placeholder="Any Rating">
            
        </Select>
    </div>
    </Card>
  )
}

export default FilterCard