import CardTitle from '@/components/general/CardTitle';
import { useAppDispatch, useAppSelector } from '@/hook';
import { useLanguage } from '@/hooks/useLAnguage';
import { logoutUser as LogoutEndpoint } from '@/redux/action/auth';
import { logoutUser } from '@/redux/reducer/auth/auth';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { App, Button, Card, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { languageType } from '../../../../utils/interface';
import { updateGeneralSettings } from '@/redux/action/settings';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { savedCurrency, savedTimeZone } from '../../../../utils/savedInfo';

const FormItem = Form.Item;
const Option = Select.Option;
const Account = () => {
    const [form] = Form.useForm();
    const { modal, message } = App.useApp();
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ generalLoad, setGeneralLoad ] = useState(false);
    const { languages, loading: languageLoading } = useLanguage();
    const [ selectedLang, setSelectedLang ] = useState<string[]>([]);

    useEffect(() => {
        if(user) {
            const setLang: string[] = [];
            const lang = languages.filter((a1: languageType) => user.languages.some((a2: languageType) => a2.name === a1.name));
            lang.map(la => setLang.push(la.longCode))
            form.setFieldsValue({ 
                ...user, 
                languages: setLang,
                currency: user.currency || "CAD",
                timeZone: user.timeZone || 1 
            });
            setSelectedLang(setLang);        
        }
    }, [form, user, languages])

    const handleLogout = () => {
        setLoading(true);
        LogoutEndpoint()
        .then(res => {
            if(res.status === 200 || res.status === 204) {
                setLoading(false);
                message.success(res.data.message || "Logout successful")
                dispatch(logoutUser());
            }
        })
        .catch(err => {
            setLoading(false);
            message.success("Logout successful!")
            dispatch(logoutUser());
        })
    }

    const handleSetGeneralSetting = () => {
        form.validateFields()
        .then(value => {
            const payload = {
                ...value,
                languages: handleDisplayLanguage(selectedLang),
            }
            setGeneralLoad(true)
            updateGeneralSettings(payload)
            .then(res => {
                if(res.status === 200) {
                    setGeneralLoad(false);
                    message.success(res.data.message || "Account settings updated!");
                }
            })
            .catch(err => {
                modal.error({
                    title: "Unable to update settings",
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                    onOk: () => setGeneralLoad(false)
                });
            })
        })
    }

    const handleDisplayLanguage = (languageCode: string[]): {
        name: string; 
        code: string; 
        proficiencyLevel: string; 
        isNative: boolean;
    }[] => {
        const selectedLanguages = languages
        .filter(language => languageCode.includes(language.longCode))
        .map(language => {
            return { 
                ...language,
                code: language.longCode,
                proficiencyLevel: "",
                isNative: true
            }
        });
        return selectedLanguages;
    }
  return (
    <>
    <Card 
        title={<CardTitle title='General Settings' icon={<Icon color='#670316' icon="line-md:security" fontSize={18} className='mr-1' />}  />}
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        classNames={{ header: "linear" }}
    >
        <Card className='!mt-4'>
            <Form form={form} layout="vertical" onFinish={handleSetGeneralSetting}>
                <FormItem label="Language" name="languages" rules={[{ required: true }]}>
                    <Select
                        // mode="tags"
                        loading={languageLoading} 
                        placeholder="Choose any languages you are comfortable with"  
                        style={{height:50}}
                        mode='multiple'
                        onChange={(value) => console.log("Dd", value)}
                        value={selectedLang}
                    >
                        {languages.map((language: languageType, i: number) => <Option value={language.longCode} key={i}>{language.name}</Option>)}
                    </Select>
                </FormItem>

                <FormItem label="Timezone" name="timeZone" rules={[{ required: true }]}>
                    <Select defaultValue="Eastern Time (Toronto)" placeholder="Eastern Time (Toronto)">
                        {savedTimeZone.map((zone: string, i: number) => (
                            <Option value={i+1} key={i}>{zone}</Option>
                        ))}
                    </Select>
                </FormItem>

                <FormItem label="Currency" name="currency" rules={[{ required: true }]}>
                    <Select defaultValue="Canadian Dollar (CAD)" placeholder="Canadian Dollar (CAD)">
                        {savedCurrency.map((currency: {short: string; name: string}, i: number) => (
                            <Option value={currency.short} key={i}>{currency.name}</Option>
                        ))}
                    </Select>
                </FormItem>

                <FormItem >
                    <Button 
                        type="primary"
                        htmlType="submit"
                        loading={generalLoad}
                        className='w-full !h-[48px] !rounded-[68px]'
                    >Update</Button>
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

    <Card 
        title={<CardTitle title='Account Action' icon={<Icon color='#670316' icon="line-md:security" fontSize={18} className='mr-1' />}  />}
        variant="borderless"
        styles={{body: {padding: "0 20px"}}}
        classNames={{ header: "linear" }}
        className='!mt-6'
    >
        <Card className='!my-4' classNames={{body: "flex flex-col gap-4"}}>
            <Card 
                onClick={handleLogout}
                title={
                <CardTitle 
                    title='Sign out' 
                    icon={loading ? <LoadingOutlined spin /> :<Icon icon="mingcute:time-line" color='#4D4D4D' fontSize={22} className='mr-1' />}  
                />}
                classNames={{body: "!p-0 !h-0", header: "!h-[42px] !py-1"}}
                className=' !p-0 !border-[#C3C3C3] cursor-pointer'
            />

            <Card 
                
                title={
                <CardTitle 
                    isColorWhite
                    title='Deactivate Account' 
                    icon={<Icon icon="mingcute:time-line" color='#fff' fontSize={22} className='mr-1' />}  
                />}
                classNames={{body: "!p-0 !h-0", header: "!h-[42px] !py-1"}}
                className=' !p-0 !border-[#C3C3C3] !bg-[#FF0004] cursor-pointer'
            />
        </Card>
       
    </Card>
    </>
  )
}

export default Account