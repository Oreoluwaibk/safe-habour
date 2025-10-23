import CardTitle from '@/components/general/CardTitle';
import RoundBtn from '@/components/general/RoundBtn';
import { DatePicker, Form, Input, Modal } from 'antd';
import React from 'react'

interface props {
    open: boolean;
    onCancel: () => void;
}
const FormItem = Form.Item;
const AddException = ({ open, onCancel }: props) => {
    const [form] = Form.useForm();
  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        title={<CardTitle 
            title="Add Exception"
            description="Add an exception to your regular schedule for specific dates (holidays, vacation, etc.)."
        />}
        footer={<div className='flex items-center gap-4 justify-end'>
            <RoundBtn title='Cancel' onClick={onCancel} width={86} height={40}  />
            <RoundBtn title='Add Exception' primary onClick={() => {}} width={138} height={40}  />
        </div>}
        width={700}
    >
        <Form layout="vertical" form={form}>
            <FormItem label="Exception Date">
                <DatePicker placeholder='dd/mm/yyyy' style={{width: "100%"}} />
            </FormItem>

            <FormItem label="Reason">
                <Input.TextArea rows={3} placeholder='e.g., Holidays, Vacation, Personal Day, etc.' />
            </FormItem>
        </Form>
    </Modal>
  )
}

export default AddException