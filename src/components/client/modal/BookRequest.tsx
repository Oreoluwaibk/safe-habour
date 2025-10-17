"use client"
import { Button, DatePicker, Form, Modal, Select } from 'antd'
import React from 'react';
import "@/styles/modal.css";

interface props {
  open: boolean;
  onCancel: () => void;
}

const FormItem = Form.Item;
const BookRequest = ({ open, onCancel }: props) => {
  const [form] = Form.useForm();
  return (
  <Modal
    open={open}
    onCancel={onCancel}
    footer={null}
    title={<p className='t-pri text-xl'>Book Request</p>}
    width={700}
    styles={{body: { padding: "20px 0 0" }}}
  >
    <Form layout="vertical" form={form} className=''>
      <FormItem label="Day" name="date" rules={[{required: true}]}>
        <DatePicker style={{width: "100%", height: 52}} placeholder="Select Date" />
      </FormItem>

      <FormItem label="Duration(hours)" name="time" rules={[{required: true}]}>
        <Select placeholder="Select TIme">

        </Select>
      </FormItem>

      <div className='rate-calculator mt-8'>
        <div className='flex items-center justify-between text-lg'>
          <p>Hourly Rate:</p>
          <p>$35/hr</p>
        </div>

        <div className='flex items-center justify-between text-lg'>
          <p>Duration:</p>
          <p>2 hours</p>
        </div>

        <div className='flex items-center justify-between text-lg font-semibold border-t border-t-[#e8e8e8] pt-3'>
          <p>Estimated Total:</p>
          <p>$105.00</p>
        </div>
      </div>

      <FormItem style={{width: "100%"}} className='flex justify-end'>
        <Button type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Send Request</Button>
      </FormItem>
    </Form>
  </Modal>
  )
}

export default BookRequest