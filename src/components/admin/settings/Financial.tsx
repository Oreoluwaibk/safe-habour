import CardTitle from '@/components/general/CardTitle'
import { App, Card, Form, InputNumber, Switch } from 'antd'
import React, { useCallback, useEffect, useState } from 'react';
import RoundBtn from '@/components/general/RoundBtn';
import { useServiceCategory } from '@/hooks/useServiceCategory';
import { getAdminGeneralSettings, updateAdminGeneralSettings } from '@/redux/action/superAdmin';
import { createErrorMessage } from '../../../../utils/errorInstance';

const FormItem = Form.Item;
const Financial = () => {
    const [form] = Form.useForm();
    const { categories } = useServiceCategory();
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
            title: `Unable to get admin settings`,
            content: err?.response
            ? createErrorMessage(err.response.data)
            : err.message,
        });
        })
    }, []);

    useEffect(() => {
        handleGetGeneralSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <Card
        actions={[
            <div key={1} className='flex items-center justify-end gap-2 mr-6'>
                <RoundBtn primary={!isEdit} width={100} onClick={() => setIsEdit(!isEdit)} title={isEdit ? "Cancel" : 'Edit'} />
                {isEdit && <RoundBtn primary loading={updateLoading} onClick={handeleUpdateSetting} title="Save Changes" />}
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
                    name="commissionRate"
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
                         <FormItem name="autoEscrow">
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