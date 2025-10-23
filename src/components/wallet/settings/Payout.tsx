import AddCard from '@/components/client/modal/AddCard';
import CardTitle from '@/components/general/CardTitle'
import RoundBtn from '@/components/general/RoundBtn';
import { PlusOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react'
import { Button, Card, Form, Select } from 'antd'
import React, { useState } from 'react'

const FormItem = Form.Item;
const Option = Select.Option;
const Payout = () => {
    const [form] = Form.useForm();
     const [ openAdd, setOpenAdd ] = useState(false);
    
  return (
    
    <Card 
        title={<CardTitle title='Payout Settings' icon={<Icon icon="line-md:security" fontSize={18} className='mr-1' />}  />}
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        classNames={{ header: "linear" }}
         actions={[
        <div key={1} className='flex items-center justify-between px-6 py-4 !w-full'>
            <Button type="primary" className='!w-full !h-[48px]' style={{borderRadius: 50}} >Update Payout</Button>
        </div>]}
    >
        <Card className='!mt-4'>
            <div className='pb-6 pt-3 flex flex-col gap-4'>
                <Card 
                    title={
                    <CardTitle 
                        title='Connected Account' 
                        description="RBC Royal Bank - Account ending in 4567"
                        icon={<Icon icon="fluent:payment-48-regular" fontSize={18} className='mr-1' />}  
                    />}
                    extra={<RoundBtn title='Default' width={86} primary onClick={() => {}} />}
                    classNames={{body: "!p-0 !h-0"}}
                    className='!bg-[#FFF4F6] !border-[#FFD6DE]'
                />
                <Button onClick={() => setOpenAdd(true)} type="default" className='!w-full !h-[48px]' style={{borderRadius: 50}} icon={<PlusOutlined />} >Add Payment Method</Button>
            </div>

            <Form form={form} layout="vertical">
                <FormItem label="Payout Method" name="method">
                    <Select defaultValue="Card">
                        <Option>Card</Option>
                        <Option>Bank Account</Option>

                    </Select>
                </FormItem>

                <FormItem label="Payout Schedule" name="schedule">
                    <Select defaultValue="Weekly (Friday)">
                        <Option>Weekly (Friday)</Option>
                        <Option>Biweekly</Option>
                        <Option>Monthly</Option>

                    </Select>
                </FormItem>
            </Form>
        </Card>
       {openAdd && <AddCard onCancel={() => setOpenAdd(false)} onClick={() => {}} open={openAdd} selection="Bank Account" />}
    </Card>
  )
}

export default Payout