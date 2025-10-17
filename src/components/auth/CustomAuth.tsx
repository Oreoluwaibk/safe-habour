"use client"
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import "@/styles/auth.css";
import "@/styles/form.css";
import { App, Button, Form, Input } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { createErrorMessage } from '../../../utils/errorInstance';
import { forgotPassword, resendOtp, resetPassword, verifyOtp } from '@/redux/action/auth';
import { useRouter } from 'next/navigation';

interface props {
    icon: ReactNode;
    title: string;
    description: string;
    btnTitle: string;
    type: string;
    onClick?: () => void;
    email?: string | null;
    setEmail?: React.Dispatch<React.SetStateAction<string>>,
    token?: string | null;
}

const FormItem = Form.Item;
const CustomAuth = ({ 
    icon, 
    title, 
    description, 
    btnTitle, 
    type, 
    onClick, 
    setEmail, 
    email,
    token 
}: props) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [ loading, setLoading ] = useState(false);
    const [ resendLoading, setResendLoading ] = useState(false);
    const { modal } = App.useApp();
    const hasRun = useRef(false);
    const isEmail = type === "otp" || type === "check your email";

    const handleConfirmMail = useCallback(() => {
        if (!email || !token) return;

        const payload = { userId: email, token };
        setLoading(true);

        verifyOtp(payload)
        .then(async (res) => {
            if (res.status === 200) {
            setLoading(false);
            // you could show a success modal or redirect here if needed
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
    }, [email, token, modal]);

    useEffect(() => {
        if (type === "email-verify" && email && token && !hasRun.current) {
            handleConfirmMail();
            hasRun.current = true;
        }
    }, [type, email, token, handleConfirmMail]);

    const handleClick = () => {
        if(type === "forgot") handleForgotPassword();
        if(type === "check your email")  window.location.href = `mailto:${email}`;
        if(type === "reset") handleResetPassword();
        if(type === "true") router.push("/auth/login");
        if(type === "email-verify") router.push("/auth/login");
    }

    const handleResend = () => {
        if(type === "check your email") handleResendMail();
        if(type === "otp") handleResendIdToken();
    }

    const handleResendMail = () => {
        setResendLoading(true);
        const payload: { email: string } = { email: email! };
         
        forgotPassword(payload)
        .then(async (res) => {
            if (res.status === 200) {
                setResendLoading(false);
                 modal.success({
                    title: `Email sent to ${email}`,
                    content: `We sent a password reset link to ${email}`,
                    onOk: () => setResendLoading(false),
                });
            }
        })
        .catch((err) => {
            modal.error({
                title: "Error",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                    onOk: () => setResendLoading(false),
                });
            });
    }

    const handleForgotPassword = () => {
        const { validateFields } = form;

        validateFields()
        .then((value) => {
        const { email } = value;
        const payload: { email: string} = { email: email! };
        
        if(setEmail) setEmail(email);
        setLoading(true);
        forgotPassword(payload)
        .then(async (res) => {
            if (res.status === 200) {
                setLoading(false);
                if(onClick) onClick();
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
        })
        .catch(() => setLoading(false));
    };

    const handleResetPassword = () => {
        const { validateFields } = form;

        validateFields()
        .then((value) => {
        const { password } = value;
        const payload: { newPassword: string; token: string; email: string } = { newPassword: password!, token: token!, email: email! };
        
        setLoading(true);
        resetPassword(payload)
        .then(async (res) => {
            if (res.status === 200) {
                setLoading(false);
                if(onClick) onClick();
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
        })
        .catch(() => setLoading(false));
    };

    // const handleConfirmMail = () => {
    //     const payload = { userId: email!, token: token! };
    //     setLoading(true);
    //     verifyOtp(payload)
    //     .then(async (res) => {
    //         if (res.status === 200) {
    //             setLoading(false);
    //         }
    //     })
    //     .catch((err) => {
    //         modal.error({
    //             title: "Error",
    //             content: err?.response
    //                 ? createErrorMessage(err.response.data)
    //                 : err.message,
    //                 onOk: () => setLoading(false),
    //             });
    //         });
    // }

    const handleResendIdToken = () => {
        setResendLoading(true);
        const payload = { email: email! }; 
        resendOtp(payload)
        .then(async (res) => {
            if (res.status === 200) {
                setResendLoading(false);
                modal.success({
                    title: `Email sent to ${email}`,
                    content: `We sent a password reset link to ${email}`,
                    onOk: () => setResendLoading(false),
                });
            }
        })
        .catch((err) => {
            modal.error({
                title: "Error",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                    onOk: () => setResendLoading(false),
                });
            });
    }

  return (
    <div className='login-div auth-div'>
        <div className='flex flex-col items-center gap-2'>
            <div className='icon-div'>{icon}</div>
            <p className='auth-header'>{title}</p>
            <p className='auth-description !text-center'>{description}</p>
        </div>

         <Form form={form} layout="vertical">
            {type === "forgot" && <FormItem label="Email" name="email" rules={[{required: true}]}>
                <Input placeholder="Enter your email" style={{height: 48}} type="text" />
            </FormItem>}

            {/* {type === "otp" && <FormItem label="" className='text-center'>
                <Input.OTP length={4} size="large"  />
            </FormItem>} */}
            {type === "reset" && (
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
                    <Input.Password style={{height: 48}} placeholder="Password" type="password" />
                </FormItem>
            )}

            {type === "reset" &&(
                <FormItem 
                    label="Confirm password"
                    name="comfirmPassword"
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
                    <Input.Password style={{height: 48}} placeholder="Password" type="password" />
                </FormItem>
            )}

            <FormItem label="">
                <Button loading={loading} className="button_form" type="primary" onClick={handleClick}>{btnTitle}</Button>
            </FormItem>
            
            <FormItem label="">
                {isEmail && <div className='flex items-center justify-center gap-2 mt-2'>
                    <p>Didn’t receive the email?</p>
                    <p className='text-[#820116] cursor-pointer' onClick={handleResend}>Click to resend {resendLoading && <LoadingOutlined spin  />}</p>
                </div>}
                <div className='flex items-center justify-center gap-2 mt-2'>
                    <ArrowLeftOutlined className='!text-[#667085]' />
                    <Link href="/auth/login" style={{color: "#667085"}}>Back to log in</Link>
                </div>
            </FormItem>
        </Form>
    </div>
  )
}

export default CustomAuth