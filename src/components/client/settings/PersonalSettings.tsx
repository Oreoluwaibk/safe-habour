"use client"
import { App, Avatar, Button, Card, Col, DatePicker, Form, Input, Image, message, Row, Select, Upload } from 'antd'
import { RcFile } from 'antd/es/upload';
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import PhoneInput from "react-phone-input-2";
import { toFormData } from 'axios';
import { IUser } from '../../../../utils/interface';
import { updateClientProfile } from '@/redux/action/client';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { createErrorMessage } from '../../../../utils/errorInstance';
import { pictureUrl } from '../../../../utils/axiosConfig';

interface props {
    authentication: IUser;
    handleGetAuthentication: () => void;
    // categories: categoryType[];
    authLoading: boolean;
}
const FormItem = Form.Item;
const Option = Select.Option;
const maxFileSize = 10000000;
const PersonalSettings = ({ 
    authentication, 
    handleGetAuthentication, 
    // authLoading 
}: props) => {
    const [form] = Form.useForm();
    // const [ date, setDate ] = useState<string | string[]>("");
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("Canada");
    const [ initialCode, setInitialCode ] = useState("ca");
    const [ uploading, setUploading ] = useState(false);
    const [ isEdit, setIsEdit ] = useState(false);
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if(authentication) 
        form.setFieldsValue({
            ...authentication,
            dateOfBirth: ""
        });
    }, [form, authentication]);

    const handleSubmit = () => {
        if(isEdit) handleFinish();
        else setIsEdit(true);
    }

    const handleFinish = () => {
        form.validateFields()
        .then(value => {
            const payload = {
                ...value,
                dateOfBirth: value.dateOfBirth ? new Date(value.dateOfBirth).toISOString(): authentication.dateOfBirth,
                userId: authentication.id 
            }

            const formData = toFormData(payload) as FormData
            setLoading(true)
            updateClientProfile(formData)
            .then(res => {
                if(res.status === 200) {
                    modal.success({
                        title: "Profile updated successfully!",
                        content: res.data.message,
                        onOk: () => {
                            setLoading(false);
                            handleGetAuthentication();
                            setIsEdit(false);
                        }
                    });
                }
            })
            .catch(err => {
                modal.error({
                    title: "Unable to update profile",
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                    onOk: () => setLoading(false)
                });
            })
        })
    }

    const handleCountrySelect = (value: string) => {
        if(value === "Benin") setInitialCode("bj");
        if(value === "Côte d'Ivoire, Republic of") setInitialCode("ci");
        if(value === "Nigeria") setInitialCode("ng");
        if(value === "Canada") setInitialCode("ca");
        setCountry(value);
    }

    const handleUploadPicture = (file: RcFile) => {
        if (file.size > maxFileSize) {
            message.warning("Cannot upload file more than 10mb");
            return;
        }
        const payload = {
            ProfilePicture: file,
            userId: authentication?.id 
        }

        const formData = toFormData(payload) as FormData;
        setUploading(true);
        updateClientProfile(formData)
        .then(res => {
            if(res.status === 200) {
                message.success("Profile picture uploaded successfully!")
                setUploading(false);
                handleGetAuthentication();
                setIsEdit(false);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to update profile picture",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setUploading(false)
            });
        })
    }
  return (
    <Row>
    <Col lg={24} sm={24} xs={24} className='mb-6'>
    <Card 
        title="Personal Information" 
        variant="borderless"
    >
        <div className='flex items-center gap-6 mt-3 mb-8'>
            <div className='relative'>
                {authentication?.profilePicturePath && <Image src={`${pictureUrl}${authentication?.profilePicturePath}`} height={84} width={84} alt='' className='h-[84px]! w-[84px]! rounded-full object-cover' />}
                 {!authentication?.profilePicturePath && 
                <Avatar 
                    icon={<UserOutlined className='text-2xl' />} 
                    alt=''
                    size={65} 
                    className='h-[84px] w-[84px] rounded-full object-cover' 
                />}
                {/* {<Avatar icon={<UserOutlined />} size={65} />} */}
                {uploading ? <LoadingOutlined spin className='absolute bottom-[10px] right-[5px]' /> :<Upload 
                    className='absolute bottom-[10px] right-[5px] cursor-pointer bg-[#003E8F] h-[30px] w-[30px] flex items-center justify-center rounded-[100px]'
                    beforeUpload={handleUploadPicture}
                    // onRemove={handleRemovePicture}
                    accept=".jpg,.png,.jpeg," 
                    disabled={!isEdit}
                    showUploadList={false}
                >
                    <Icon icon="mdi:edit" fontSize={20} color='#fff' />
                </Upload>}   
            </div>
            
            {<Upload
                beforeUpload={handleUploadPicture}
                // onRemove={handleRemovePicture}
                accept=".jpg,.png,.jpeg,"
                disabled={!isEdit}
                showUploadList={false}
            >
                <Button loading={uploading} type="primary" className='!h-[40px] !rounded-[3.2px] !font-semibold'>Upload New</Button>
            </Upload>}
            

           {<Button type="default" className='!h-[40px] !font-semibold !rounded-[3.2px] !bg-[#F1F1F1] !text-[#5D5D5D] !border-none' disabled={!isEdit}>Delete Avatar</Button>}
        </div>
        <Form layout="vertical" form={form}>
            <Row gutter={[15, 0]} >
            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="First Name" 
                    className="font-semibold" 
                    name="firstName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='Enter First Name' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        disabled={!isEdit}
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Last Name" 
                    className="font-semibold" 
                    name="lastName"
                    rules={[
                        {required:true}
                    ]}

                >
                    <Input 
                        placeholder='Enter Last Name' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        disabled={!isEdit}
                    />
                </FormItem>
            </Col>

            

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Email" 
                    className="font-semibold" 
                    name="email"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='Enter Email' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        disabled
                        
                    />
                </FormItem>
            </Col>

                <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Date of Birth" 
                    className="font-semibold" 
                    name="dateOfBirth"
                    // rules={[
                    //     {required:true}
                    // ]}
                >
                    <DatePicker 
                        size="large"
                        className='w-full border-none'
                        placeholder={authentication?.dateOfBirth || 'Select Date of Birth'}
                        // onChange={(date, dateString) => setDate(dateString)}
                        style={{width: "100%", border: "none", height:50, backgroundColor: "#f6f6f6"}}
                        disabled={!isEdit}
                    /> 
                        
                </FormItem>
            </Col>
            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Gender" 
                    className="font-semibold" 
                    name="gender"
                >
                    <Select size="large" style={{fontWeight: 400, height: 50}} className='border-none' disabled={!isEdit} placeholder='Female' >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Phone Number" 
                    className="font-semibold" 
                    name="phoneNumber"
                >
                    <PhoneInput 
                        placeholder='09039476798'
                        // onChange={(value, count:any) => {
                        //     setCountry(count && count.countryCode.toUpperCase())
                        // }}
                        // inputClass='phone_input2'
                        inputStyle={{width: "100%", border: "none", height:50, backgroundColor: "#f6f6f6"}}
                        disabled={!isEdit}
                        country={initialCode}
                    />
                </FormItem>
            </Col>
               <Col lg={24} sm={24} xs={24}>
                    <FormItem 
                        label="Bio" 
                        className="font-semibold" 
                        name="bio"
                        rules={[
                            {required:true}
                        ]}
                    >
                        <Input.TextArea 
                            placeholder='Tell us about yourself' 
                            size='large' 
                            style={{fontWeight: 400}}
                            rows={3}
                            className='border-none'
                            disabled={!isEdit}
                        />
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </Card>
    </Col>

    <Col lg={24} sm={24} xs={24}>
        <Card title="Address Information" variant="borderless">
             <Form layout="vertical" form={form}>
            <Row gutter={[15, 0]} >
            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Street Address" 
                    className="font-semibold" 
                    name="streetAddress"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='124, main street' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        disabled={!isEdit}
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Country" 
                    className="font-semibold" 
                    name="country"
                    initialValue="Canada"
                >
                    <CountryDropdown
                        defaultOptionLabel="Select Your Country"
                        value={country}
                        defaultValue="Canada"
                        onChange={(val) => handleCountrySelect(val)}
                        name='registration'
                        disabled={!isEdit}
                        style={{ 
                            height: 50, 
                            width: "100%", 
                            borderRadius: 8, 
                            outline: "none", 
                            backgroundColor: "#F6F6F6",
                            padding: "0 10px" 
                        }}
                        // whitelist={whitelist}
                        // disabled
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="City" 
                    className="font-semibold" 
                    name="city"
                >
                    <RegionDropdown
                        country={country}
                        value={state}
                        onChange={(val) => setState(val)}
                        defaultOptionLabel="Select Your State"
                        name='registration'
                        disabled={!isEdit}
                        style={{ 
                            height: 50, 
                            width: "100%", 
                            borderRadius: 8, 
                            outline: "none", 
                            backgroundColor: "#F6F6F6",
                            padding: "0 10px" 
                        }}
                    />
                </FormItem>
            </Col>

            

                <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Postal Code" 
                    className="font-semibold" 
                    name="postalCode"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='M5V 3A1' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        disabled={!isEdit}
                    />
                </FormItem>
                <FormItem className='flex items-center justify-end'>
                    <Button loading={loading} type="primary" onClick={handleSubmit} className='!w-[81px] !h-[40px] !rounded-[100px]'>{isEdit ? "Save" : "Edit"}</Button>              
                </FormItem>
            </Col>
           
            
            </Row>
        </Form>
        </Card>
    </Col>
    </Row>
  )
}

export default PersonalSettings