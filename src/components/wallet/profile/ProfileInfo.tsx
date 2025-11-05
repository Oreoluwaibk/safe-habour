"use client"
import CardTitle from '@/components/general/CardTitle'
import Rating from '@/components/general/Rating'
import Status from '@/components/general/Status'
import { EnvironmentOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons'
import { App, Avatar, Button, Card, Col, DatePicker, Form, Image, Input, InputNumber, Row, Select, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { categoryType, IUser } from '../../../../utils/interface'
import { toFormData } from 'axios'
import { updateServiceWorkerProfile } from '@/redux/action/serviceWorker'
import { createErrorMessage } from '../../../../utils/errorInstance'
import moment from 'moment'
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Icon } from '@iconify/react'
import { RcFile } from 'antd/es/upload'
import { pictureUrl } from '../../../../utils/axiosConfig'


interface props {
    authentication: IUser;
    handleGetAuthentication: () => void;
    categories: categoryType[];
    authLoading: boolean;
}
const FormItem = Form.Item;
const Option = Select.Option;
const ProfileInfo = ({ 
    authentication, 
    handleGetAuthentication, 
    categories, 
    authLoading 
}: props) => {
    const { modal, message } = App.useApp();
    const [form] = Form.useForm();
    const [ loading, setLoading ] = useState(false);
    const [ isEdit, setIsEdit ] = useState(false);
    const [ state, setState ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ initialCode, setInitialCode ] = useState("ca");
    const [ uploading, setUploading ] = useState(false);

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
            updateServiceWorkerProfile(formData)
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
        const payload = {
            ProfilePicture: file,
            userId: authentication?.id 
        }

        const formData = toFormData(payload) as FormData;
        setUploading(true);
        updateServiceWorkerProfile(formData)
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
    <Card
        title={<CardTitle
            title='Account Information' 
            icon={<span className='bg-[#FFEAEE] flex items-center justify-center !h-6 !w-6 rounded-[100px]'>
                <UserOutlined className="" />
                </span>}
            />}
        classNames={{
            header: "linear",
            body: "flex flex-col gap-6"
        }}
        className='!mt-6'
        loading={authLoading}
    >
        <Card
            title={
                <div className='flex items-center gap-2'>
                    <div className='relative'>
                        {authentication?.profilePicturePath && <Image src={`${pictureUrl}${authentication?.profilePicturePath}`} height={84} width={84} alt='' className='h-[84px] w-[84px] rounded-full object-cover' />}
                        {!authentication?.profilePicturePath && 
                            <Avatar 
                                icon={<UserOutlined className='text-2xl' />} 
                                alt=''
                                size={84} 
                                className='h-[84px] w-[84px] rounded-full object-cover' 
                            />}
                        {isEdit && (uploading ? <LoadingOutlined spin /> :<Upload
                            className='absolute bottom-2 right-0'
                            accept=".jpg, .png, .jpeg"
                            beforeUpload={handleUploadPicture}
                            showUploadList={false}
                        >
                            <div className='cursor-pointer bg-[#003E8F] w-[27px] h-[27px] rounded-full flex items-center justify-center'>
                                <Icon icon="mdi:edit" color='#fff' />
                            </div>
                        </Upload>)}
                    </div>
                    

                    <div className='flex flex-col gap-1'>
                        <CardTitle title={authentication?.fullName || ""} status={<Status title={authentication?.isVerified ? 'Verified' : "Unverified"} color={authentication?.isVerified ? '#018A06': "#ff0004"} bg={authentication?.isVerified ? '#f3fff4' : "#FFF7F9"} />} />
                        <div className='flex items-center gap-3'>
                            <span className='text-[#646464]'><EnvironmentOutlined className='mr-1' />{authentication?.streetAddress} {authentication?.city} {authentication?.country}</span>
                            <Rating />
                            <p className='text-lg text-[#646464] font-medium'>${authentication?.hourlyRate}/hr</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            {authentication?.services.map((service,i:number) => (
                                <Status key={i} size={12} title={categories[service?.serviceCategoryId]?.name} bg='#F6F6F6' color='#343434' />
                            ))}
                        </div>
                    </div>
                </div>
            }
            classNames={{ header: "!py-4", body: "!h-0 !p-0", }}
            className='!mt-0'
        /> 

        <Card
            classNames={{ header: "",}}
            className='!mt-0'
            // extra={<Button  type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>Apply Now</Button>}
        >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={[15, 0]} >
            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="First Name" 
                    className="font-semibold" 
                    name="firstName"
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
                >
                    <Input 
                        placeholder='Enter Email' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        disabled={!isEdit}
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Date of Birth" 
                    className="font-semibold" 
                    name="dateOfBirth"
                >
                    <DatePicker 
                        size="large"
                        className='w-full border-none'
                        placeholder={authentication?.dateOfBirth ? moment(authentication.dateOfBirth).format("DD/MM/YYYY") : 'Select Date of Birth'}
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

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Hourly Rate (CAD)" 
                    className="font-semibold" 
                    name="hourlyRate"
                    rules={[
                        {required:true}
                    ]}
                >
                    <InputNumber 
                        placeholder='30' 
                        size='large' 
                        style={{fontWeight: 400, width: "100%", height: 50}}
                        className='border-none'
                        disabled={!isEdit}
                    />
                </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Street Address" 
                    className="font-semibold" 
                    name="streetAddress"
                >
                    <Input 
                        placeholder='Enter Street Address' 
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
                >
                    <CountryDropdown
                        defaultOptionLabel="Select Your Country"
                        value={country}
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

            {/* <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Experience" 
                    className="font-semibold" 
                    name="lastName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <Input 
                        placeholder='5 years' 
                        size='large' 
                        style={{fontWeight: 400}}
                        className='border-none'
                        
                    />
                </FormItem>
            </Col> */}
            {/* <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Languages" 
                    className="font-semibold" 
                    name="firstName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <ItemSelect selected={languages} isLanguage setSelected={() => setLanguages} />
                </FormItem>
            </Col> */}
            {/* <Col lg={12} sm={24} xs={24}>
                <FormItem label="Services (Select all that apply)" name="services" rules={[{ required: true }]}>
                <Select 
                    onChange={setServices} 
                    loading={serviceLoading} 
                    placeholder="Select Services" 
                    style={{height:50,}} 
                    mode="multiple"
                >
                    {categories.map((category: categoryType, i: number) => <Option value={category.id} key={i}>{category.name}</Option>)}
                </Select>
            </FormItem>
            </Col> */}

             {/* <Col lg={12} sm={24} xs={24}>
                <FormItem 
                    label="Certificate" 
                    className="font-semibold" 
                    name="firstName"
                    rules={[
                        {required:true}
                    ]}
                >
                    <ItemSelect selected={services} setSelected={() => setLanguages} />
                </FormItem>
            </Col> */}

            
            <Col lg={24} sm={24} xs={24}>
                <FormItem className='flex items-center justify-end'>
                    <Button loading={loading} htmlType="submit" type="primary" className='!w-[81px] !h-[40px] !rounded-[100px]'>{isEdit ? "Save" : "Edit"}</Button>              
                </FormItem>
            </Col>
        </Row>
        </Form>    
        </Card>    
    </Card>
  )
}

export default ProfileInfo