import CardTitle from '@/components/general/CardTitle'
import { App, Card, Col, Form, Input, Row, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react';
import PhoneInput from "react-phone-input-2";
import { savedCurrency, savedTimeZone } from '../../../../utils/savedInfo';
import { useLanguage } from '@/hooks/useLAnguage';
import RoundBtn from '@/components/general/RoundBtn';
import { getAdminGeneralSettings, updateAdminGeneralSettings } from '@/redux/action/superAdmin';
import { createErrorMessage } from '../../../../utils/errorInstance';

const FormItem = Form.Item;
const Option = Select.Option;
const General = () => {
    const [form] = Form.useForm();
    const { languages, loading: languageLoading } = useLanguage();
    const [ isEdit, setIsEdit ] = useState(false);
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const [ updateLoading, setUpdateLoading ] = useState(false);

    const handeleUpdateSetting = () => {
        form.validateFields()
        .then(values => {
            setUpdateLoading(true)
            updateAdminGeneralSettings(values)
            .then(res => {
                if(res.status === 200){
                    setUpdateLoading(false);
                    modal.success({
                        title: res.data.message || "Upload successful",
                        onOk: () => {
                            handleGetGeneralSettings();
                            setIsEdit(!isEdit);
                        }
                    })
                }
            })
            .catch(err => {
                setUpdateLoading(false);
                modal.error({
                    title: `Unable to update admin settings`,
                    content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                });
            })
        })
    }

    const handleGetGeneralSettings = useCallback(()=> {
        setLoading(true);
        getAdminGeneralSettings()
        .then(res => {
        if(res.status === 200){
            setLoading(false);
            form.setFieldsValue({...res.data.data})
        }
        })
        .catch(err => {
        setLoading(false);
        modal.error({
            title: `Unable to update admin settings`,
            content: err?.response
            ? createErrorMessage(err.response.data)
            : err.message,
        });
        })
    }, []);

  useEffect(() => {
    handleGetGeneralSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
<Card 
    actions={[
        <div key={1} className='flex items-center justify-end gap-2 mr-6'>
            <RoundBtn primary={!isEdit} width={100} onClick={() => setIsEdit(!isEdit)} title={isEdit ? "Cancel" : 'Edit'} />
            {isEdit && <RoundBtn primary onClick={handeleUpdateSetting} loading={updateLoading} title="Save Changes" />}
        </div>
    ]} 
    loading={loading}
>
    <Form layout="vertical" form={form}>
        <Row gutter={15}>
            <Col lg={12} sm={24} xs={24}>
                <Card
                    title={<CardTitle title="Contact Information" description="Support and business contact details" />}
                >   
                    <FormItem name="supportEmail" label="Support Email" rules={[{ required: true }]}>
                        <Input type="email" disabled={!isEdit} placeholder='support@careservices.ca' />
                    </FormItem> 

                        <FormItem name="businessEmail" label="Business Email" rules={[{ required: true }]}>
                        <Input type="email" disabled={!isEdit} placeholder='info@careservices.ca' />
                    </FormItem> 

                        <FormItem name="supportPhone" label="Support Phone" rules={[{ required: true }]}>
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
                    <FormItem label="Default Timezone" name="defaultTimezone" rules={[{ required: true }]}>
                        <Select disabled={!isEdit} defaultValue="Eastern Time (Toronto)" placeholder="Eastern Time (Toronto)">
                            {savedTimeZone.map((zone: string, i: number) => (
                                <Option value={zone} key={i}>{zone}</Option>
                            ))}
                        </Select>
                    </FormItem>

                    <FormItem name="defaultCurrency" label="Default Currency">
                        <Select disabled={!isEdit} defaultValue="Canadian Dollar (CAD)" placeholder="Canadian Dollar (CAD)">
                            {savedCurrency.map((currency: {short: string; name: string}, i: number) => (
                                <Option value={currency.name} key={i}>{currency.name}</Option>
                            ))}
                        </Select>
                    </FormItem> 

                        <FormItem label="Default Language" name="defaultLanguage" rules={[{ required: true }]}>
                        <Select
                            // mode="tags"
                            loading={languageLoading} 
                            placeholder="Choose any languages you are comfortable with"  
                            style={{height:50}}
                             disabled={!isEdit}
                        >
                            {languages.map((language, i: number) => <Option value={language.name} key={i}>{language.name}</Option>)}
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