"use client"
import { Button, DatePicker, Form, Input, InputNumber, Modal, Radio, Select } from 'antd';
import React, { useState } from 'react'
import "@/styles/modal.css";

interface props {
    open: boolean;
    onCancel: () => void;
}

const FormItem = Form.Item;
const PostJob = ({ open, onCancel }: props) => {
    const [form] = Form.useForm();
    const [ steps, setSteps ] = useState<number>(1);

    const renderStep = (step: number) => {
        switch (step) {
            case 1:
                return <>
                    <FormItem label="Service Category" name="category" rules={[{required: true}]}>
                        <Select placeholder="Select a sevice category">

                        </Select>
                    </FormItem>
                    <FormItem label="Job Title" name="title" rules={[{required: true}]}>
                        <Input placeholder='e.g., Weekly house cleaning needed' /> 
                    </FormItem>

                    <FormItem label="Description" name="description" rules={[{required: true}]}>
                        <Input.TextArea rows={5} placeholder='Describe what you need help with any specific requirements, and what to expect..' /> 
                    </FormItem>

                     <FormItem className='flex justify-end'>
                        <Button onClick={() => setSteps(2)} type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Next</Button>
                    </FormItem>
                </>
            break;
            case 2: 
            return <>
                    <FormItem label="Date Needed" name="date" rules={[{required: true}]}>
                        <DatePicker style={{width: "100%", height: 52}} placeholder="Select Date" />
                    </FormItem>
                    <FormItem label="Time Preference" name="time" rules={[{required: true}]}>
                        <Select placeholder="Select TIme">

                        </Select>
                    </FormItem>

                    <FormItem label="Budget (CAD)" name="budget" rules={[{required: true}]}>
                        <InputNumber placeholder='$120' style={{width: "100%"}} /> 
                    </FormItem>

                    <FormItem label="Location" name="location" rules={[{required: true}]}>
                        <Input placeholder='Your verified address will be used by default' style={{width: "100%"}} /> 
                    </FormItem>

                    <FormItem label="" name="recurring" rules={[{required: false}]}>
                        <Radio>This is a recurring job</Radio>
                    </FormItem>

                     <div style={{width: "100%"}} className='flex justify-between !w-full'>
                        <Button onClick={() => setSteps(1)} type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Previous</Button>
                        <Button type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Post Job</Button>
                    </div>
                </>
            default:<></>
                break;
        }
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