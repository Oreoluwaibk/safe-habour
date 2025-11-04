"use client"
import RoundBtn from '@/components/general/RoundBtn'
import { CheckCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { App, Button, Col, DatePicker, Form, FormInstance, Row, TimePicker } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { schedule } from '../../../../utils/interface'
import dayjs from 'dayjs'

interface props {
    isAvailable: boolean;
    availability: boolean;
    setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
    setAvailability: React.Dispatch<React.SetStateAction<boolean>>;
    payLoad: schedule;
    setPayload: React.Dispatch<React.SetStateAction<schedule>>;
    selectedDay: dayjs.Dayjs | null;
    handleSetSechedule: (availability: boolean) => void;
    loading: boolean;
    startTime: dayjs.Dayjs | null;
    endTime: dayjs.Dayjs | null;
    setStartTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
    setEndTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
    form: FormInstance<any>;
    handleToggleMarkAvaialable: (availability: boolean) => void;
    markLoading: boolean;
    deleteLoading: boolean;
    handledeleteSchedule: () => void;
}
const FormItem = Form.Item;
const AddCalenderFlow = ({ 
    isAvailable, 
    availability, 
    setAvailability, 
    setIsAvailable, 
    selectedDay,
    handleSetSechedule,
    loading,
    payLoad,
    setPayload,
    startTime,
    endTime,
    setEndTime,
    setStartTime,
    form,
    handleToggleMarkAvaialable,
    markLoading,
    deleteLoading,
    handledeleteSchedule
}: props) => {
    const { message } = App.useApp();
    const [error, setError] = useState("");

    const handleMakeAvailable = () => {
        if(!selectedDay) return message.error("Please select a day to continue!");
        setIsAvailable(true);
    }

    const handleSetStart = (date: any, dateString: string | string[]) => {
        setStartTime(date);
        setPayload(prev => ({...prev, startTime: dateString.toString()}))
    }

    const handleSetEnd = useCallback((date: any, dateString: string | string[]) => {
         if (startTime && date.isBefore(startTime)) {
            setError("End time cannot be earlier than start time");
        } else {
            setError("");
            setEndTime(date);
            setPayload(prev => ({...prev, endTime: dateString.toString()}))
        }
    }, []);

    const handleToggleAvailable = (value: boolean) => handleToggleMarkAvaialable(value);

  return (
    <>
    {!isAvailable && !availability && <div className='flex flex-col items-center gap-4 justify-center h-[300px]'>
        <Icon icon="mingcute:time-line" fontSize={80} color='#B9B9B9' />
        <p className='text-[#1E1E1E] text-lg'>No availability set for this date</p>
        <RoundBtn icon={<PlusOutlined />} title='Make Available' height={39} onClick={handleMakeAvailable} primary />
    </div>}

    {isAvailable && <div className='flex flex-col gap-4'>
        <div className='bg-[#F5F5F5] flex items-center justify-between rounded-xl px-4 py-2'>
            <p className='text-[#151F32] text-lg'>Available this day</p>

            <RoundBtn 
                title={payLoad.isAvailable ? "Mark Unavailable" :'Mark Available'} 
                icon={<CheckCircleOutlined />} 
                height={39} 
                width={154}
                primary 
                loading={markLoading}
                onClick={() => {
                    if(payLoad.isAvailable) handleToggleAvailable(false);
                    else handleToggleAvailable(true);
                }} 
            />
        </div>

        {!availability && <div className='mt-2 flex flex-col gap-4'>
            <p className='text-[#3E3E3E]'>Add Time Slot</p>

            <div>
                <Form form={form} layout="vertical">
                    <Row gutter={[10, 0]}>
                        <Col lg={12} sm={12} xs={24}>
                            <FormItem label="From" name="startTime">
                                <TimePicker 
                                    style={{width: "100%"}} 
                                    onChange={handleSetStart}
                                    value={startTime}
                                    format="HH:mm"
                                    // use12Hours
                                />
                            </FormItem> 
                        </Col>

                        <Col lg={12} sm={12} xs={24}>
                            <FormItem 
                                validateStatus={error ? "error" : ""}
                                help={error || ""}
                                label="To"
                                rules={[
                                    {
                                    validator(_, value) {
                                        const start = form.getFieldValue('startTime');
                                        if (!value || !start) {
                                            return Promise.resolve();
                                        }
                                        if (value.isBefore(start)) {
                                        return Promise.reject(new Error('End time cannot be before start time'));
                                        }
                                        return Promise.resolve();
                                    },
                                    },
                                ]}
                            >
                                <TimePicker 
                                    style={{width: "100%"}} 
                                    onChange={handleSetEnd}
                                    format="HH:mm"
                                    // use12Hours
                                />
                            </FormItem> 
                        </Col>

                        <Col lg={24} sm={24} xs={24}>
                            <FormItem label="">
                                <Button loading={loading} onClick={() => handleSetSechedule(false)} className='w-full !h-[42px] !border-[#C7C7C7] rounded-[5px]' icon={<PlusOutlined />}>Add Time Slot</Button>
                            </FormItem> 
                        </Col>

                        <Col lg={24} sm={24} xs={24}>
                            <p onClick={() => setAvailability(true)} className='text-[#121212] text-center cursor-pointer'>View Time Slots</p>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>}

        {availability && <div className='flex flex-col gap-4 border border-[#E1E1E1] rounded-[5px] px-2 py-4'>
            <p className='text-[#3E3E3E] font-medium'>Available Time Slot</p>

            <div className='flex flex-col gap-2'>
                {payLoad.startTime && payLoad.endTime && <div className='flex items-center justify-between px-4 py-2 rounded-xl border bg-[#F3FFF9] border-[#B1FFDC]'>
                    <p className='text-[#373737] font-semibold'>{payLoad.startTime} To {payLoad.endTime}</p>

                    {deleteLoading ? <LoadingOutlined spin /> :<Icon onClick={handledeleteSchedule} className='cursor-pointer' icon="material-symbols-light:delete-outline" fontSize={24} color='#373737' />}
                </div>}

                {!payLoad.startTime && !payLoad.endTime && <p className='text-[#3E3E3E] font-medium'>No Time slot allocated to this day</p>}

                {/* <div className='flex items-center justify-between px-4 py-2 rounded-xl border bg-[#F3FFF9] border-[#B1FFDC]'>
                    <p className='text-[#373737] font-semibold'>8:00 AM To 10:00 AM</p>

                    <Icon className='cursor-pointer' icon="material-symbols-light:delete-outline" fontSize={24} color='#373737' />
                </div> */}
            </div>

            
        </div>}
        
    </div>}
    
    </>
  )
}

export default AddCalenderFlow