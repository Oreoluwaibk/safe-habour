"use client"
import "@/app/styles/auth.css";
import { Button, Col, Radio, Row } from 'antd';
import "@/app/styles/form.css";
import AuthChooser from "../general/AuthChooser";
import { ArrowLeftOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ChooseAuth = () => {
    const [ selected, setSelected ] = useState(1);
    const [ phase, setPhase ] = useState(1);
    const router = useRouter();
  return (
    <div className='auth-div chooser-div '>
        {phase === 2 && <ArrowLeftOutlined onClick={() => setPhase(1)} />}
        <div>
            <p className='auth-header !text-center'>{phase === 1 ? "Sign up as a Client or Worker" : "Sign up as an Individual or Organisation"}</p>
        </div>

        {phase === 1 && <Row gutter={[0,15]} className="md:!mt-2">
            <Col lg={12} sm={24} xs={24}>
                <AuthChooser 
                    title="Sign up as a Client"
                    icon={<UserOutlined className={`${selected === 2 ? "!text-[#670316]" : "!text-[#5B5B5B]"} !text-[28px]`} />}
                    isSelected={selected === 1}
                    onCheck={() => setSelected(1)}
                />
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <AuthChooser 
                    title="Sign up as a Worker"
                    icon={<UsergroupAddOutlined className={`${selected === 2 ? "!text-[#670316]" : "!text-[#5B5B5B]"} !text-[28px]`} />}
                    isSelected={selected === 2}
                    onCheck={() => setSelected(2)}
                />
            </Col>
        </Row>}

        {phase === 2 && <Row gutter={[0,15]} className="md:!mt-2">
            <Col lg={12} sm={24} xs={24}>
                <AuthChooser 
                    title="Sign up as an Individual"
                    icon={<UserOutlined className={`${selected === 2 ? "!text-[#670316]" : "!text-[#5B5B5B]"} !text-[28px]`} />}
                    isSelected={selected === 1}
                    onCheck={() => setSelected(1)}
                />
            </Col>

            <Col lg={12} sm={24} xs={24}>
                <AuthChooser 
                    title="Sign up as an Organisation"
                    icon={<UsergroupAddOutlined className={`${selected === 2 ? "!text-[#670316]" : "!text-[#5B5B5B]"} !text-[28px]`} />}
                    isSelected={selected === 2}
                    onCheck={() => setSelected(2)}
                />
            </Col>
        </Row>}

        <div className="flex flex-col items-center gap-6 mt-2">
            {phase === 1&& <Button className="md:!h-[58px] md:!w-[220px] !w-[150px]" type="primary" onClick={() =>selected === 1 ? setPhase(2) : router.push("/auth/sign-up")}>Sign Up</Button> }
            {phase === 2&& 
                <Button 
                    className="md:!h-[58px] md:!w-[220px] !w-[150px]" 
                    type="primary" 
                    onClick={() => router.push(`/auth/sign-up?type=${selected === 1 ? "individual" : "organisation"}`)}
                >Join as a Client</Button> }
                
            <div className='flex items-center justify-center gap-2 mt-2'>
                <p>Already have an account?</p>
                <Link href="/auth/login">Log in</Link>
            </div>
        </div>
    </div>
  )
}

export default ChooseAuth