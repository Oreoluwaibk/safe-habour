"use client"
import React, { useEffect, useState } from 'react';
import "@/styles/auth.css";
import { App, Button, Col, Form, Input, Row } from 'antd';
import "@/styles/form.css";
import Link from 'next/link';
import Socialbtn from '../general/Socialbtn';
import { LinkedinFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { registerClient, registerWorker } from '@/redux/action/auth';
import { createErrorMessage } from '../../../utils/errorInstance';
import { registerPayload } from '../../../utils/interface';
import { useGeolocation } from '@/hooks/useGeolocation';
import PhoneInput from "react-phone-input-2";

const FormItem = Form.Item;

const SignUp = ({ type }: { type: string | null }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { modal } = App.useApp();
    const [ loading, setLoading ] = useState(false);
    const { location, getLocation } = useGeolocation();

    useEffect(() => {
        const getLocal = async () => {
            await getLocation();
        };

        getLocal();
    }, [getLocation]);

    const handleRegister = () => {
        if(type === "worker") handleRegisterWorker()
        else handleRegisterClient();
    }

    const handleRegisterClient = () => {
        const { validateFields } = form;
        validateFields()
        .then(value => {
            const { 
                email, 
                password, 
                firstName, 
                lastName,
                confirmPassword,
                phoneNumber, 
            } = value;
            
            const payload: registerPayload = {
                email,
                password,
                firstName,
                lastName,
                confirmPassword,
                phoneNumber,
                clientType: type === "organisation" ? 1 : 2,
                latitude: location.latitude,
                longitude: location.longitude,
            }
            setLoading(true)
            registerClient(payload)
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    setLoading(false);
                    modal.success({
                        title: res.data.message,
                        content: "",
                        onOk: async () => {
                            localStorage.setItem("emailToVerify", JSON.stringify(email));
                            router.push("/auth/confirm-email?verify=true");
                        },
                    });  
                }
            })
            .catch(err => {
                modal.error({
                    title: "Error",
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                    onOk: () => setLoading(false),
                });
            })
        })
        // localStorage.setItem("emailToVerify", JSON.stringify("test@enail.com"));
        // router.push("/auth/verify-email?verify=true");
    }
    /*
     "errors": {
        "City": [
            "The City field is required."
        ],
        "Address": [
            "The Address field is required."
        ],
        "Country": [
            "The Country field is required."
        ],
        "HourlyRate": [
            "Hourly rate must be between 0.01 and 10,000.00"
        ],
        "PostalCode": [
            "The PostalCode field is required."
        ]
    },
    */ 

    const handleRegisterWorker = () => {
        const { validateFields } = form;
        validateFields()
        .then(value => {
            const { 
                email, 
                password, 
                firstName, 
                lastName,
                confirmPassword,
                phoneNumber, 
            } = value;
            
            const payload: registerPayload = {
                email,
                password,
                firstName,
                lastName,
                confirmPassword,
                phoneNumber,
                latitude: location.latitude,
                longitude: location.longitude,
            }
            setLoading(true)
            registerWorker(payload)
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    setLoading(false);
                    modal.success({
                        title: res.data.message,
                        content: "",
                        onOk: async () => {
                            localStorage.setItem("emailToVerify", JSON.stringify(email));
                            router.push("/auth/confirm-email?verify=true");
                        },
                    }); 
                }
            })
            .catch(err => {
                modal.error({
                    title: "Error",
                    content: err?.response
                        ? createErrorMessage(err.response.data)
                        : err.message,
                    onOk: () => setLoading(false),
                });
            })
        })
    }

  return (
    <div className='login-div auth-div'>
        <div>
            <p className='auth-header'>Sign up</p>
            <p className='auth-description'>{type === "worker" ? "Sign up as a Worker" :"Create an account to find a worker"}</p>
        </div>

        <Form form={form} layout="vertical">
            {/* {type === "organisation" && <FormItem label="Organisation Name" name="organisation_name" rules={[{required: true, message: "Name is required"}]}>
                <Input placeholder="Enter organisation name" type="text" />
            </FormItem>} */}
            <Row className="" gutter={[15, 0]}>
            <Col lg={12} sm={24} xs={24}>
               <FormItem label="First name" name="firstName" rules={[{required: true}]}>
                <Input placeholder="First name" style={{height: 48}} />
              </FormItem>
            </Col>

            <Col lg={12} sm={24} xs={24}>
              <FormItem label="Last name" name="lastName" rules={[{required: true}]}>
                <Input placeholder="Last name" style={{height: 48}} />
              </FormItem>
            </Col>
          </Row>
            <FormItem name="email" label={type === "organisation" ? "Company Email" : "Email"} rules={[{required: true}]}>
                <Input placeholder="Enter your email" style={{height: 48}} type="text" />
            </FormItem>

            <FormItem label="Referral Code" name="referral_code" >
                <Input placeholder="Enter your referral code" style={{height: 48}} type="text" />
            </FormItem>

             <FormItem 
                label="Phone Number" 
                className="font-semibold" 
                name="phoneNumber"
                rules={[
                    {required:true}
                ]}
            >
                <PhoneInput 
                    placeholder='09039476798'
                    country="ca"
                    inputStyle={{width: "100%", height: 48,}}
                />
            </FormItem>

            <FormItem 
                label="Password" 
                name="password" 
                rules={[
                    { required: true, message: "Please enter your new password!" },
                    { min: 8, message: "Password must be at least 8 characters long!" },
                    {
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
                        message: "Password must contain letters and numbers.",
                    },
                ]}
                hasFeedback
            >
                <Input.Password placeholder="Password" style={{height: 48}} type="password" />
            </FormItem>

            <FormItem 
                label="Confirm password"
                name="confirmPassword"
                rules={[
                    { required: true, message: "Please confirm your password!" },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error("Passwords do not match!")
                        );
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Password" style={{height: 48}} type="password" />
            </FormItem>

            {/* <div className='flex items-center justify-between'>
                <FormItem label="" className="flex items-center gap-1">
                    <Checkbox title="You agree to our friendly privacy policy." className="!mr-4"  />
                    <span className="agree">Remember me</span>
                </FormItem>

                <Link href="/auth/forgot-password">Forgot Password</Link>
            </div>   */}

            <FormItem label="" name="btn">
                <Button loading={loading} className="button_form" type="primary" onClick={() => handleRegister()}>Create account</Button>
            </FormItem>
            <FormItem label="" name="">
                <Socialbtn 
                    title='Sign up with Google'
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_584_7132)">
                        <path d="M23.7663 12.2763C23.7663 11.4605 23.7001 10.6404 23.559 9.83789H12.2402V14.4589H18.722C18.453 15.9492 17.5888 17.2676 16.3233 18.1054V21.1037H20.1903C22.4611 19.0137 23.7663 15.9272 23.7663 12.2763Z" fill="#4285F4"/>
                        <path d="M12.2401 24.0013C15.4766 24.0013 18.2059 22.9387 20.1945 21.1044L16.3276 18.106C15.2517 18.838 13.8627 19.2525 12.2445 19.2525C9.11388 19.2525 6.45946 17.1404 5.50705 14.3008H1.5166V17.3917C3.55371 21.4439 7.7029 24.0013 12.2401 24.0013Z" fill="#34A853"/>
                        <path d="M5.50277 14.3007C5.00011 12.8103 5.00011 11.1965 5.50277 9.70618V6.61523H1.51674C-0.185266 10.006 -0.185266 14.0009 1.51674 17.3916L5.50277 14.3007Z" fill="#FBBC04"/>
                        <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_584_7132">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                    </svg>}
                />
            </FormItem>
            <FormItem label="" name="">
                <Socialbtn 
                    title='Sign up with LinkedIn'
                    icon={<LinkedinFilled className="!text-2xl !text-[#0077B5]" />}
                />
                <div className='flex items-center justify-center gap-2 mt-2'>
                    <p>Already have an account?</p>
                    <Link href="/auth/login">Log in</Link>
                </div>
            </FormItem>

           
        </Form>
    </div>
  )
}

export default SignUp