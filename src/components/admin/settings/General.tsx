import CardTitle from '@/components/general/CardTitle'
import { Card, Col, Form, Input, Row, Select } from 'antd'
import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";
import { savedCurrency, savedTimeZone } from '../../../../utils/savedInfo';
import { useLanguage } from '@/hooks/useLAnguage';
import RoundBtn from '@/components/general/RoundBtn';

const FormItem = Form.Item;
const Option = Select.Option;
const General = () => {
    const [form] = Form.useForm();
    const { languages, loading: languageLoading } = useLanguage();
    const [ isEdit, setIsEdit ] = useState(false);

  return (
    <Card 
        actions={[
            <div className='flex items-center justify-end gap-2 mr-6'>
                <RoundBtn primary={!isEdit} width={100} onClick={() => setIsEdit(!isEdit)} title={isEdit ? "Cancel" : 'Edit'} />
                {isEdit && <RoundBtn primary onClick={() => setIsEdit(!isEdit)} title="Save Changes" />}
            </div>
        ]} 
    >
        <Form layout="vertical" form={form}>
        <Row gutter={15}>
            <Col lg={12} sm={24} xs={24}>
                <Card
                    title={<CardTitle title="Contact Information" description="Support and business contact details" />}
                >   
                    <FormItem label="Support Email">
                        <Input disabled={!isEdit} placeholder='support@careservices.ca' />
                    </FormItem> 

                     <FormItem label="Business Email">
                        <Input disabled={!isEdit} placeholder='info@careservices.ca' />
                    </FormItem> 

                     <FormItem label="Support Phone">
                        <PhoneInput 
                            disabled={!isEdit} 
                            placeholder='+1 (416) 555-0100'
                            country="ca"
                            inputStyle={{width: "100%", height:50, backgroundColor: "transparent"}}
                        />
                    </FormItem> 
                </Card>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <Card
                    title={<CardTitle title="Regional Settings" description="Timezone, currency, and localization" />}
                >   
                    <FormItem label="Default Timezone" name="timeZone" rules={[{ required: true }]}>
                        <Select disabled={!isEdit} defaultValue="Eastern Time (Toronto)" placeholder="Eastern Time (Toronto)">
                            {savedTimeZone.map((zone: string, i: number) => (
                                <Option value={i+1} key={i}>{zone}</Option>
                            ))}
                        </Select>
                    </FormItem>

                    <FormItem label="Default Currency">
                        <Select disabled={!isEdit} defaultValue="Canadian Dollar (CAD)" placeholder="Canadian Dollar (CAD)">
                            {savedCurrency.map((currency: {short: string; name: string}, i: number) => (
                                <Option value={currency.short} key={i}>{currency.name}</Option>
                            ))}
                        </Select>
                    </FormItem> 

                     <FormItem label="Default Language" name="languages" rules={[{ required: true }]}>
                        <Select
                            // mode="tags"
                            loading={languageLoading} 
                            placeholder="Choose any languages you are comfortable with"  
                            style={{height:50}}
                            mode='multiple' disabled={!isEdit}
                        >
                            {languages.map((language, i: number) => <Option value={language.longCode} key={i}>{language.name}</Option>)}
                        </Select>
                    </FormItem>
                </Card>
            </Col>
        </Row>
        </Form>
    </Card>
  )
}

export default General