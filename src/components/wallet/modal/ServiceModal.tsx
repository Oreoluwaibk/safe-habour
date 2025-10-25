import RoundBtn from '@/components/general/RoundBtn';
import { Form, Input, InputNumber, Modal } from 'antd';
import React from 'react'

interface props {
    open: boolean;
    onCancel: () => void;
    isEdit?: boolean;
}
const FormItem = Form.Item;
const ServiceModal = ({ onCancel, open, isEdit }: props) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {}
  return (
    <Modal
        open={open}
        onCancel={onCancel}
        title={<p>{isEdit ? "Edit Service" : "Add New Service"}</p>}
        footer={<div className='flex justify-end items-center gap-4'>
            <RoundBtn width={86} title="Cancel" onClick={onCancel} />
            <RoundBtn width={86} title={isEdit ? "Save" : "Add Service"} primary onClick={onCancel} />
        </div>}
        // classNames={{ bod}}
        className='py-12'
    >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <FormItem name="name" label="Service Name">
                <Input placeholder='e.g., Pet Care' />
            </FormItem>

            <FormItem name="rate" label="Hourly Rate ($)">
                <InputNumber style={{ width: "100%"}} placeholder='25' />
            </FormItem>

            <FormItem name="experience" label="Experience">
                <InputNumber style={{ width: "100%"}} min={0} placeholder='e.g., 3 years' />
            </FormItem>
        </Form>
    </Modal>
  )
}

export default ServiceModal