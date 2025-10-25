"use client"
import Container from '@/components/dashboard/Container'
import Steps from '@/components/general/Steps'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { App, Button, Card, Col, Form, Input, InputNumber, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react';
import PhoneInput from "react-phone-input-2";
import { categoryType, languageType, WorkerProfile } from '../../../../../utils/interface'
import { useLanguage } from '@/hooks/useLAnguage'
import { useAppSelector } from '@/hook';
import { useServiceCategory } from '@/hooks/useServiceCategory'
import VerificationUpload from '@/components/wallet/cards/VerificationUpload'
import { RcFile } from 'antd/es/upload'
import { useGeolocation } from '@/hooks/useGeolocation'
import { onBoardServiceWorker } from '@/redux/action/auth'
import { createErrorMessage } from '../../../../../utils/errorInstance'
import { useRouter } from 'next/navigation'

const title = [
    "Personal Information", 
    "Professional Profile",
    "Services & Expertise",
    "Document Verification",
    "Pricing & Finalization"
];
const description = [
    "Let's start with your basic details", 
    "Tell client about yourself and your location",
    "Select the services you want to offer.",
    "Upload required documents to maintain your verified status.",
    "Set your hourly rate and review your profile"
]

const icons = [
    "iconamoon:profile-fill",
    "ic:outline-work",
    "material-symbols:service-toolbox-rounded",
    "material-symbols:service-toolbox-rounded",
    "famicons:pricetags"
]
const FormItem = Form.Item;
const Option = Select.Option;
const Page = () => {
    const router = useRouter();
    const { user } = useAppSelector(state => state.auth);
    const [form] = Form.useForm();
    const { modal } = App.useApp()
    const [ steps, setSteps ] = useState(1);
    const { languages, loading: languageLoading } = useLanguage();
    const { location: geoLocate, getLocation } = useGeolocation();
    const { categories, loading: serviceLoading } = useServiceCategory();
    const [ services, setServices ] = useState<number[]>([]);
    const [ policeReport, setPoliceReport ] = useState<RcFile | null>(null);
    const [ sectorCheck, setSectorCheck ] = useState<RcFile | null>(null);
    const [ location, setLocation ] = useState("");
    const [ hourlyRate, setHourlyRate ] = useState<number | null>(0);
    const [ loading, setLoading ] = useState(false);
    const [ selectedLang, setSelectedLang ] = useState<string[]>([])
 
    useEffect(() => {
        const getLocal = async () => {
            await getLocation();
        };

        getLocal();
    }, [getLocation]);

    useEffect(() => {
        if(user) 
        form.setFieldsValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber
        })
    }, [user, form]);

    useEffect(() => {
        const storedProfile = localStorage.getItem("safe-habour-worker-profile");
        let profile = null;
        if(storedProfile) {
            profile = JSON.parse(storedProfile);
            setSteps(profile.step);
            form.setFieldsValue({ ...profile });
            setServices(profile.services);
            setLocation(profile.address);
            setHourlyRate(profile.hourlyRate);
            setSelectedLang(profile.languages);
        }
    }, [form])

    const renderStep = (step: number) => {
    switch (step) {
        case 1:
        return (
        <>
        <Col lg={12} sm={24} xs={24}>
            <FormItem label="First Name" name="firstName" rules={[{required: true}]}>
                <Input disabled placeholder='Enter your first name' style={{height:50,}}  />
            </FormItem>
        </Col>

        <Col lg={12} sm={24} xs={24}>
            <FormItem label="Last Name" name="lastName" rules={[{required: true}]}>
                <Input disabled placeholder='Enter your last name' style={{height:50,}}  />
            </FormItem>
        </Col>

        <Col lg={12} sm={24} xs={24}>
            <FormItem label="Email Address" name="email" rules={[{required: true}]}>
                <Input disabled placeholder='Enter your email' style={{height:50,}} />
            </FormItem>
        </Col>

        <Col lg={12} sm={24} xs={24}>
            <FormItem label="Phone Number" name="phoneNumber" rules={[{required: true}]}>
                <PhoneInput 
                    placeholder='Enter your phone number'
                    country="ca"
                    inputStyle={{width: "100%", height:50, backgroundColor: "transparent"}}
                    disabled
                />
            </FormItem>
        </Col>
        </>)
        break;
        case 2: 
        return (
        <>
        <Col lg={24} sm={24} xs={24}>
            <FormItem label="Professional Bio" name="bio" rules={[{required: true}]}>
                <Input.TextArea rows={4} placeholder='Describe your experience, skills, and what makes you a great care provider...' maxLength={500} showCount styles={{count: {textAlign: "left"}}} /> 
            </FormItem>
        </Col>
        <Col lg={24} sm={24} xs={24}>
            <FormItem label="Location" name="address" rules={[{required: true}]}>
                <Input onChange={(e) => setLocation(e.target.value)} placeholder='City, Province (e.g., Toronto, ON)' style={{height:50,}}  /> 
            </FormItem>
        </Col>
        <Col lg={24} sm={24} xs={24}> 
            <FormItem label="Languages" name="languages" rules={[{ required: true }]}>
                <Select 
                    loading={languageLoading} 
                    placeholder="Choose any languages you are comfortable with"  
                    style={{height:50}}
                    mode='multiple'
                    onChange={setSelectedLang}
                >
                    {languages.map((language: languageType, i: number) => <Option value={language.longCode} key={i}>{language.name}</Option>)}
                </Select>
            </FormItem>
        </Col>
        </>)
        case 3: 
        return (
        <>
        <Col lg={24} sm={24} xs={24}>
            <FormItem label="Services (Select all that apply)" name="services" rules={[{ required: true }]}>
                <Select onChange={setServices} loading={serviceLoading} placeholder="Select Services" style={{height:50,}} mode="multiple">
                    {categories.map((category: categoryType, i: number) => <Option value={category.id} key={i}>{category.name}</Option>)}
                </Select>
            </FormItem>
            <p className='text-[#7B7B7B] text-xs !mt-[-15px]'>Selected: {services.length} service(s)</p>
        </Col>
        
        </>)
        case 4: 
        return (
        <Col lg={24} sm={24} xs={24} className='!flex flex-col !gap-4'>
            <VerificationUpload 
                title='Police Background Check'
                description='Current police background check report'
                noStatus
                value={policeReport}
                setValue={setPoliceReport}
                type={1}
            />

            <VerificationUpload 
                title='Vulnerable Sector Check'
                description='Child/Adult abuse screening report'
                noStatus
                value={sectorCheck}
                setValue={setSectorCheck}
                type={2}
            />
        </Col>)
        case 5: 
        return (
        <>
        <Col lg={24} sm={24} xs={24}>
            <FormItem label="Hourly Rate (CAD)" name="hourlyRate" rules={[{ required: true }]}>
                <InputNumber onChange={(value) => setHourlyRate(value)} placeholder='$ 25.00' style={{padding:"5px 10px", width: "100%"}} min={15.00} decimalSeparator='.'  /> 
            </FormItem>
            <p className='text-[#7B7B7B] text-xs !mt-[-15px]'>Minimum rate is $15.00/hour. You can adjust this later</p>
        </Col>
        <Col lg={24} sm={24} xs={24} className='!mt-4'>
         <Card style={{borderColor: "#670316", borderWidth:2, background: "linear-gradient(45deg, rgba(103, 3, 22, 0) 0%, #FFF3F5 100%)"}} styles={{body: {display: "flex", flexDirection: "column", gap:25, padding: "20px"}}}>
            <h1 className='text-[#101828] font-semibold text-2xl'>Profile Summary</h1>

            <div className='flex flex-col gap-4 text-lg'>
                <p className='flex items-center gap-2 text-[#0e0e0e]'><Icon icon="iconamoon:profile" fontSize={18} fontWeight={300} /> {user?.firstName} {user?.lastName}</p>

                <p className='flex items-center gap-2 text-[#0e0e0e]'><Icon icon="ic:outline-work" fontSize={18} /> {location}</p>

                <p className='flex items-center gap-2 text-[#0e0e0e]'><Icon icon="famicons:pricetags-outline" fontSize={18} /> ${hourlyRate}/hr</p>
            </div>

            <div>
                <h1 className='text-[#101828] font-semibold text-lg'>Services</h1>

                <div className='flex items-center gap-2 flex-wrap'>
                    {handleDisplayServices(services).map((service: string, i: number) => {
                        return (
                            <div key={i} className='bg-[#FFF8F9] !min-w-[129px] rounded-[68px] flex items-center justify-center text-[#670316]'>
                                <span>{service}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
         </Card>
        </Col>
       
        </>)
        default:<></>
            break;
        }
    }

    const handlePrevious = (step: number) => {
        if(step === 1) return;
        setSteps(step-1);
    }

    const handleNext = (step: number) => {
        if(step === 5) return;
        setSteps(step+1);
    }

    const handleSubmit = (data: WorkerProfile) => {
        const payload: WorkerProfile = {
            ...data,
            latitude: geoLocate.latitude!,
            longitude: geoLocate.longitude!,
            languages: handleDisplayLanguage(selectedLang),
            services: [ { serviceCategoryIds: services } ]
        }

        delete payload.step

        setLoading(true);
        onBoardServiceWorker(payload)
        .then(res => {
            if(res.status === 200 || res.status === 201){
                setLoading(false);
                modal.success({
                    title: res.data.message,
                    onOk: () => router.push("/dashboard/worker")
                })
            }
        })
        .catch((err) => {
            modal.error({
                title: "Error",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false),
            });
        });

    }

    const handleCheck = (step: number) => {
        const { validateFields } = form;
        validateFields()
        .then(values  => {
            const storedProfile = localStorage.getItem("safe-habour-worker-profile");
            let profile = null;
            if(storedProfile) {
                profile = JSON.parse(storedProfile);
                localStorage.setItem("safe-habour-worker-profile", JSON.stringify({...profile, ...values, step: steps}))
            }else localStorage.setItem("safe-habour-worker-profile", JSON.stringify({...values, step: steps}));

            if(step === 5) handleSubmit({...profile, ...values});
            else handleNext(step);
        })
        .catch(err => console.log("Validation Error", err))
    }

    const handleDisplayServices = (serviceIds: number[]): string[] => {
        const selectedServices = categories
        .filter(service => serviceIds.includes(service.id))
        .map(service => service.name);

        return selectedServices;
    }
    
    const handleDisplayLanguage = (languageCode: string[]): {name: string; code: string; longCode: string;}[] => {
        const selectedLanguages = languages
        .filter(language => languageCode.includes(language.longCode))
        .map(language => {
            return { ...language }
        });

        console.log("selected", selectedLanguages);
        

        return selectedLanguages;
    }
  return (
    <Container active='s' hide center>
        <Card 
            variant="borderless"
            title={<div className='flex flex-col items-center pb-4'>
                <h1 className='t-pri !font-semibold text-[32px]'>Worker Profile Setup</h1>
                <p className='t-pri mb-6 font-light'>Step {steps} of 5 - Let&apos;s create your professional profile</p>
                    <Steps value={steps} />
                </div>
            }
            actions={[<div key={1} className='flex items-center justify-between px-6 py-4'>
                <Button disabled={steps===1} onClick={() => handlePrevious(steps)} type="default" className='md:!w-[129px] !h-[48px] !text-[#670316]' style={{borderRadius: 50}}><ArrowLeftOutlined /> Previous</Button>
                <Button loading={loading} onClick={() => handleCheck(steps)} type="primary" className='md:!w-[129px] !h-[48px]' style={{borderRadius: 50}}>{steps===5 ? "Submit" : "Next"} {steps !== 5 &&<ArrowRightOutlined className='ml-1' />}</Button>
            </div>]}
            className='md:!w-[712px] justify-self-center !my-6'
            styles={{ body: {display: "flex", flexDirection: "column", gap: 20}}}

        >
            <div className='flex flex-col items-center'>
                <div className='step-icon'>
                    <div className="step-icon-inner">
                        <Icon icon={icons[steps-1]} color="#670316" fontSize={24} />
                    </div>
                </div>
                <h1 className='t-pri !font-semibold text-[32px]'>{title[steps-1]}</h1>
                <p className='t-pri mb-6 font-light'>{description[steps-1]}</p>
            </div>

            <Form layout='vertical' form={form}>
                <Row gutter={[15, 15]}>
                    {renderStep(steps)}
                </Row>
            </Form>
        </Card>
    </Container>
  )
}

export default Page