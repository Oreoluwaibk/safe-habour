import CardTitle from '@/components/general/CardTitle';
import { useAppDispatch } from '@/hook';
import { useLanguage } from '@/hooks/useLAnguage';
import { deActviateAccount, logoutUser as LogoutEndpoint } from '@/redux/action/auth';
import { logoutUser } from '@/redux/reducer/auth/auth';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { App, Button, Card, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { ILanguage } from '../../../../utils/interface';
import { updateGeneralSettings } from '@/redux/action/settings';
import { createErrorMessage } from '../../../../utils/errorInstance';
import { savedCurrency, savedTimeZone } from '../../../../utils/savedInfo';
import { useAuthentication } from '@/hooks/useAuthentication';

const FormItem = Form.Item;
const Option = Select.Option;
const Account = () => {
    const [form] = Form.useForm();
    const { modal, message } = App.useApp();
    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ generalLoad, setGeneralLoad ] = useState(false);
    const { languages, loading: languageLoading } = useLanguage();
    const [ selectedLang, setSelectedLang ] = useState<string[]>([]);
    const { authentication, handleGetAuthentication } = useAuthentication();
    const [ deactivateLoading, setDeActivateLoading ] = useState(false);

    useEffect(() => {
        if(authentication) {
            const setLang: string[] = [];
            const lang = languages.filter((a1: ILanguage) => authentication?.languages.some((a2: ILanguage) => a2.name === a1.name));
            lang.map(la => setLang.push(la.longCode || ""))
            form.setFieldsValue({ 
                ...authentication, 
                languages: setLang,
                currency: authentication.currency || "CAD",
                timeZone: authentication.timeZone || 1 
            });
            setSelectedLang(setLang);        
        }
    }, [form, authentication, languages]);

    
    const handleAskLogout = () => {
        modal.info({
            title: "Are you sure you want to logout?",
            onOk: ()=> handleLogout(),
            closable: true
        })
    }

    const handleAskDeactive = () => {
        modal.info({
            title: "Are you sure you want to deactivate your account?",
            onOk: ()=> handleDeactivateAccount(),
            closable: true
        })
    }

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
            console.log("err:", err)
            message.success("Logout successful!")
            dispatch(logoutUser());
        })
    }

    const handleSetGeneralSetting = () => {
        form.validateFields()
        .then(value => {
            const payload = {
                ...value,
                languages: handleDisplayLanguage(value.languages),
            }

             console.log("payload", payload, value.languages, handleDisplayLanguage(value.languages))
            setGeneralLoad(true)
            updateGeneralSettings(payload)
            .then(res => {
                if(res.status === 200) {
                    setGeneralLoad(false);
                    message.success(res.data.message || "Account settings updated!");
                    handleGetAuthentication();
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

    const handleDeactivateAccount = () => {
        setDeActivateLoading(true)
        deActviateAccount()
        .then(res => {
            if(res.status === 200) {
                setDeActivateLoading(false);
                message.success(res.data.message || "Account settings updated!");
                dispatch(logoutUser());
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to deactivate account",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setDeActivateLoading(false)
            });
        })
    }



    const handleDisplayLanguage = (languageCode: string[]): ILanguage[] => {
        const selectedLanguages = languages
        .filter(language => languageCode.includes(language.longCode || ""))
        .map(language => {
            return { 
                code: language.longCode || "",
                longCode: language.longCode,
                proficiencyLevel: "",
                isNative: true,
                name: language.name
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
                        {languages.map((language: ILanguage, i: number) => <Option value={language.longCode} key={i}>{language.name}</Option>)}
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
                onClick={handleAskLogout}
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
                    icon={deactivateLoading ? <LoadingOutlined spin /> :<Icon icon="mingcute:time-line" color='#fff' fontSize={22} className='mr-1' />}  
                />}
                
                onClick={handleAskDeactive}
                classNames={{body: "!p-0 !h-0", header: "!h-[42px] !py-1"}}
                className=' !p-0 !border-[#C3C3C3] !bg-[#FF0004] cursor-pointer'
            />
        </Card>
       
    </Card>
    </>
  )
}

export default Account