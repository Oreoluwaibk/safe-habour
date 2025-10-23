import CardTitle from '@/components/general/CardTitle';
import { Icon } from '@iconify/react';
import { Card, Form, Select } from 'antd';
import React from 'react'

const FormItem = Form.Item;
const Option = Select.Option;
const Account = () => {
    const [form] = Form.useForm();
  return (
    <>
    <Card 
        title={<CardTitle title='General Settings' icon={<Icon color='#670316' icon="line-md:security" fontSize={18} className='mr-1' />}  />}
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        classNames={{ header: "linear" }}
    >
        <Card className='!mt-4'>
            <Form form={form} layout="vertical">
                <FormItem label="Language" name="method">
                    <Select  mode="tags">
                        <Option>English</Option>
                        <Option>Français</Option>
                        <Option>Espanol</Option>
                    </Select>
                </FormItem>

                <FormItem label="Timezone" name="schedule">
                    <Select defaultValue="Eastern Time (Toronto)" placeholder="Eastern Time (Toronto)">
                        <Option>Eastern Time (Toronto)</Option>
                        <Option>Central Time (Winnipeg)</Option>
                        <Option>Mountain Time (Calgary)</Option>
                        <Option>Pacific Time (Vancouver)</Option>
                    </Select>
                </FormItem>

                <FormItem label="Currency" name="schedule" >
                    <Select defaultValue="Canadian Dollar (CAD)" placeholder="Canadian Dollar (CAD)">
                        <Option>Canadian Dollar (CAD)</Option>
                        <Option>US Dollar (CAD)</Option>
                        <Option>Monthly</Option>

                    </Select>
                </FormItem>
            </Form>
        </Card>
       
    </Card>

    <Card 
        title={<CardTitle title='Support & Help' icon={<Icon color='#670316' icon="line-md:security" fontSize={18} className='mr-1' />}  />}
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        classNames={{ header: "linear" }}
        className='!mt-6'
    >
        <Card className='!my-4' classNames={{body: "flex flex-col gap-4"}}>
            <Card 
                title={
                <CardTitle 
                    title='Help Center' 
                    icon={<Icon icon="mingcute:time-line" color='#4D4D4D' fontSize={22} className='mr-1' />}  
                />}
                classNames={{body: "!p-0 !h-0", header: "!h-[42px] !py-1"}}
                className=' !p-0 !border-[#C3C3C3]'
            />

             <Card 
                title={
                <CardTitle 
                    title='Contact Support' 
                    icon={<Icon icon="mingcute:time-line" color='#4D4D4D' fontSize={22} className='mr-1' />}  
                />}
                classNames={{body: "!p-0 !h-0", header: "!h-[42px] !py-1"}}
                className=' !p-0 !border-[#C3C3C3]'
            />
             <Card 
                title={
                <CardTitle 
                    title='Report a Problem' 
                    icon={<Icon icon="mingcute:time-line" color='#4D4D4D' fontSize={22} className='mr-1' />}  
                />}
                classNames={{body: "!p-0 !h-0", header: "!h-[42px] !py-1"}}
                className=' !p-0 !border-[#C3C3C3]'
            />
        </Card>
       
    </Card>
    </>
  )
}

export default Account