"use client"
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, App, Checkbox } from 'antd';
import React, { useState } from 'react'
import "@/styles/modal.css";
import { useServiceCategory } from '@/hooks/useServiceCategory';
import { categoryType, jobs } from '../../../../utils/interface';
import dayjs from "dayjs";
import { postAJob } from '@/redux/action/jobs';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { dayOfWeek } from '../../../../utils/savedInfo';
import Status from '@/components/general/Status';

interface props {
    open: boolean;
    onCancel: () => void;
}

const FormItem = Form.Item;
const Option = Select.Option;
const PostJob = ({ open, onCancel }: props) => {
    const [form] = Form.useForm();
    const [ steps, setSteps ] = useState<number>(1);
    const { modal, message } = App.useApp();
    const [ jobDetails, setJobDetails ] = useState<jobs>();
    const { categories, loading: serviceLoading } = useServiceCategory();
    const [ selected, setSelected ] = useState<number[]>([]);
    const [ isRecurring, setIsRecurring ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const renderStep = (step: number) => {
    switch (step) {
        case 1:
        return <>
            <FormItem label="Service Category" name="serviceCategoryId" rules={[{required: true}]}>
                <Select placeholder="Select a sevice category" loading={serviceLoading}>
                    {categories.map((category: categoryType, i: number) => <Option value={category.id} key={i}>{category.name}</Option>)}
                </Select>
            </FormItem>
            <FormItem label="Job Title" name="jobTitle" rules={[{required: true}]}>
                <Input placeholder='e.g., Weekly house cleaning needed' /> 
            </FormItem>

            <FormItem label="Description" name="jobDescription" rules={[{required: true}]}>
                <Input.TextArea draggable={false} rows={5} placeholder='Describe what you need help with any specific requirements, and what to expect..' /> 
            </FormItem>

            <FormItem className='flex justify-end'>
                <Button onClick={() => handleProcess(steps)} type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Next</Button>
            </FormItem>
        </>
        case 2: 
        return <>
            <FormItem label="Date Needed" name="dateNeeded" rules={[{ required: true, message: "Please select a date" }]}>
                <DatePicker style={{width: "100%",}} placeholder="Select Date" />
            </FormItem>

            <FormItem label="Time Preference" name="timePreference" rules={[{required: true}]}>
                <Select placeholder="Select TIme">
                    <Option value={1}>Morning (8AM - 12PM)</Option>
                    <Option value={2}>Afternoon (12PM - 5PM)</Option>
                    <Option value={3}>Evening (5PM - 9PM)</Option>
                    <Option value={4}>Overnight (9PM - 8AM)</Option>
                </Select>
            </FormItem>

            <FormItem label="Budget (CAD)" name="budget" rules={[{required: true}]}>
                <InputNumber placeholder='$120' style={{width: "100%"}} /> 
            </FormItem>

            <FormItem label="Location" name="location" rules={[{required: true}]}>
                <Input placeholder='Your verified address will be used by default' style={{width: "100%"}} /> 
            </FormItem>

            <FormItem label="" name="isReocurringJob" rules={[{required: false}]}>
                <Checkbox checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)}>This is a recurring job</Checkbox>
            </FormItem>

            {isRecurring && 
            <div className='mt-[-25px] mb-6'>
            <p className='text-[#1e1e1e] text-sm'>Select days of the week</p>
            <div className='flex items-center gap-2'>
                
                {dayOfWeek
                .map((days: {id: number, title: string}, i: number) => 
                    <Status 
                    key={i} 
                    color={selected.includes(i) ? "#fff" : "#670316"} 
                    bg={selected.includes(i) ? "#670316" : "#fff"} 
                    title={days.title} 
                    onClick={() => handleSelectDays(i)}  
                />
                )}
            </div>
            </div>
            }

            <div style={{width: "100%"}} className='flex justify-between !w-full'>
            <Button onClick={() => handlePrevious(steps)} type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Previous</Button>
            <Button loading={loading} type="primary" onClick={() => handleProcess(steps)} className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Post Job</Button>
            </div>
        </>
        default:<></>
            break;
        }
    }

    const handlePrevious = (step: number) => {
        if(step === 1) return;
        setSteps(step-1);
    }

    const handleNext = (step: number) => {
        if(step === 5) return;
        setSteps(step+1);
    }

    const handleSelectDays = (id: number) => {
        if(selected.includes(id)) return setSelected((prev) => [...prev.filter(day => day!= id)])
        else setSelected((prev) => [...prev, id]);
    }

    const handlePostJob = (details: jobs) => {
        const payload: jobs = {
            ...details!,
            dateNeeded: jobDetails?.dateNeeded
            ? dayjs(jobDetails.dateNeeded).toISOString()
            : "",
            isReocurringJob: isRecurring,
        }
        if(isRecurring) payload.reoccurringDays = selected;
        if(isRecurring && selected.length === 0) return message.info("Select days for recurring job!")

        setLoading(true);
        postAJob(payload!)
        .then(res => {
            if(res.status === 200 || res.status === 201) {
                setLoading(false);
                modal.success({
                    title: res.data.message,
                    onOk: () => {
                        form.resetFields();
                        onCancel();
                    }
                })
            }
        })
        .catch(err => {
            modal.error({
            title: "Unable to create job!",
            content: err?.response
                ? createErrorMessage(err.response.data)
                : err.message,
                onOk: () => setLoading(false),
            });
        });
    }

    const handleProcess = (step: number) => {
        const { validateFields } = form;
        validateFields()
        .then(values  => {
            setJobDetails((prev => {return {...prev, ...values}}))
            if(step === 2) return handlePostJob({...jobDetails, ...values});
            handleNext(step);
        })
        .catch(err => console.log("Validation Error", err))
    }
  return (
    <Modal
        open={open}
        onCancel={onCancel}
        footer={null}
        title={<p className='t-pri text-xl'>Post a New Job</p>}
        width={700}
        styles={{body: { padding: "20px 0 0" }}}
    >
        <Form layout="vertical" form={form} className='py-8'>
           {renderStep(steps)}           
        </Form>
    </Modal>
  )
}

export default PostJob