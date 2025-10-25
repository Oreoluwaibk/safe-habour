"use client"
import RoundBtn from '@/components/general/RoundBtn'
import { CheckCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { Button, Col, DatePicker, Form, Row } from 'antd'
import React from 'react'

interface props {
    isAvailable: boolean;
    availability: boolean;
    setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
    setAvailability: React.Dispatch<React.SetStateAction<boolean>>;
}
const FormItem = Form.Item;
const AddCalenderFlow = ({ isAvailable, availability, setAvailability, setIsAvailable}: props) => {
    const [form] = Form.useForm();
  return (
    <>
    {!isAvailable && !availability && <div className='flex flex-col items-center gap-4 justify-center h-[300px]'>
        <Icon icon="mingcute:time-line" fontSize={80} color='#B9B9B9' />
        <p className='text-[#1E1E1E] text-lg'>No availability set for this date</p>
        <RoundBtn icon={<PlusOutlined />} title='Make Available' height={39} onClick={() => setIsAvailable(true)} primary />
    </div>}

    {isAvailable && <div className='flex flex-col gap-4'>
        <div className='bg-[#F5F5F5] flex items-center justify-between rounded-xl px-4 py-2'>
            <p className='text-[#151F32] text-lg'>Available this day</p>

            <RoundBtn 
                title={availability ? "Mark Unavailable" :'Mark Available'} 
                icon={<CheckCircleOutlined />} 
                height={39} 
                width={154}
                primary 
                onClick={() => {
                    if(availability) {
                        setAvailability(false);
                        setIsAvailable(false);
                    }else {
                        setAvailability(true)
                    }
                }} 
            />
        </div>

        {!availability && <div className='mt-2 flex flex-col gap-4'>
            <p className='text-[#3E3E3E]'>Add Time Slot</p>

            <div>
                <Form form={form} layout="vertical">
                    <Row gutter={[10, 0]}>
                        <Col lg={12} sm={12} xs={24}>
                            <FormItem label="From">
                                <DatePicker style={{width: "100%"}} />
                            </FormItem> 
                        </Col>

                        <Col lg={12} sm={12} xs={24}>
                            <FormItem label="To">
                                <DatePicker style={{width: "100%"}} />
                            </FormItem> 
                        </Col>

                        <Col lg={24} sm={24} xs={24}>
                            <FormItem label="">
                                <Button onClick={() => setAvailability(true)} className='w-full !h-[42px] !border-[#C7C7C7] rounded-[5px]' icon={<PlusOutlined />}>Add Time Slot</Button>
                            </FormItem> 
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>}

        {availability && <div className='flex flex-col gap-4 border border-[#E1E1E1] rounded-[5px] px-2 py-4'>
            <p className='text-[#3E3E3E] font-medium'>Available Time Slot</p>

            <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between px-4 py-2 rounded-xl border bg-[#F3FFF9] border-[#B1FFDC]'>
                    <p className='text-[#373737] font-semibold'>8:00 AM To 10:00 AM</p>

                    <Icon className='cursor-pointer' icon="material-symbols-light:delete-outline" fontSize={24} color='#373737' />
                </div>

                <div className='flex items-center justify-between px-4 py-2 rounded-xl border bg-[#F3FFF9] border-[#B1FFDC]'>
                    <p className='text-[#373737] font-semibold'>8:00 AM To 10:00 AM</p>

                    <Icon className='cursor-pointer' icon="material-symbols-light:delete-outline" fontSize={24} color='#373737' />
                </div>
            </div>

            
        </div>}
        
    </div>}
    
    </>
  )
}

export default AddCalenderFlow