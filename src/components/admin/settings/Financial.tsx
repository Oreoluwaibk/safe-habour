import CardTitle from '@/components/general/CardTitle'
import { Card, Form, InputNumber, Switch } from 'antd'
import React, { useState } from 'react';
import RoundBtn from '@/components/general/RoundBtn';
import { useServiceCategory } from '@/hooks/useServiceCategory';

const FormItem = Form.Item;
const Financial = () => {
    const [form] = Form.useForm();
    const { categories } = useServiceCategory();
    const [ isEdit, setIsEdit ] = useState(false);
  return (
    <Card
        actions={[
            <div key={1} className='flex items-center justify-end gap-2 mr-6'>
                <RoundBtn primary={!isEdit} width={100} onClick={() => setIsEdit(!isEdit)} title={isEdit ? "Cancel" : 'Edit'} />
                {isEdit && <RoundBtn primary onClick={() => setIsEdit(!isEdit)} title="Save Changes" />}
            </div>
        ]} 
    >
        <Card
            title={<CardTitle title="Financial Configuration" description="Manage commission rates and payment settings" />}
        >   
            <Form form={form} layout="vertical">
                <FormItem 
                    label="Platform Commission Rate (%)"
                    help="Current commission: 10% of each transaction"
                >
                    <InputNumber disabled={!isEdit} placeholder='10' style={{ width: "100%" }} />
                </FormItem> 

                {/* <Card title="Service Categories">
                    {categories.map((savedCategory, i) => (
                        <FormItem key={i} className="finance_form" label={savedCategory.name} layout="horizontal"  style={{ justifyContent: "space-between "}}>
                            <InputNumber disabled={!isEdit} style={{ width: 95, height: 40, justifySelf: "end" }}  />
                        </FormItem>
                    ))}
                </Card> */}

                 <Card 
                    title={<CardTitle title="Auto-releae Escrow" description="Automatically release after job completion" />}
                    extra={(
                         <FormItem >
                            <Switch disabled={!isEdit} />
                        </FormItem>
                    )}
                    classNames={{ body: "h-0! p-0! mt-6!" }}
                />
            </Form>
        </Card>
    </Card>
  )
}

export default Financial