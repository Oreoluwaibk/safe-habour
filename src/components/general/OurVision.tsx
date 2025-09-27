"use client"
import React, { useEffect, useState } from 'react';
import "@/app/styles/howworks.css"
import { Col, Row } from 'antd';
import WorkList from './WorkList';
import { ShoppingOutlined } from '@ant-design/icons';
import useWindowWidth from '@/hooks/useWindowResize';
import ColoredText from './ColoredText';
import { LuUserCheck } from 'react-icons/lu';

const OurVision = () => {
    const [fontSize, setFontSize] = useState<number>(72);
    const width = useWindowWidth();

    useEffect(() => {
        const size = width <= 1042 ? 24 : 32;
        setFontSize(size);
    }, []);
    
  return (
    <div className='howowrks dashbottom md:pb-[60px]' style={{backgroundColor: "#FFF8F9"}}>
        <p className='header'>Our <ColoredText title='Vision' size={fontSize} /></p>

       {<Row className='!mt-6 md:!mt-[58px] !px-2 md:!px-[100px]' gutter={[0, 15]}>
            <Col lg={8} sm={24} xs={24}>
                <WorkList 
                    icon={<ShoppingOutlined className='!text-[#670316]' />}
                    title='Trust & Safety'
                    p1="Every professional undergoes comprehensive background checks including police reports and abuse registry screenings to ensure your family's safety."
                    p2=''
                />
            </Col>
            <Col lg={8} sm={24} xs={24}>
                <WorkList 
                    icon={<LuUserCheck className='!text-[#670316]' size={20}/>}
                    title='Quality Care'
                    p1='We connect you with experienced, compassionate professionals who are passionate about providing exceptional care and support services.'
                    p2=''
                />
            </Col>
            <Col lg={8} sm={24} xs={24}>
                <WorkList 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
<path d="M13.75 9.5C13.5511 9.5 13.3603 9.57902 13.2197 9.71967C13.079 9.86032 13 10.0511 13 10.25C13 10.4489 13.079 10.6397 13.2197 10.7803C13.3603 10.921 13.5511 11 13.75 11H16.25C16.4489 11 16.6397 10.921 16.7803 10.7803C16.921 10.6397 17 10.4489 17 10.25C17 10.0511 16.921 9.86032 16.7803 9.71967C16.6397 9.57902 16.4489 9.5 16.25 9.5H13.75ZM0 3.25C0 2.38805 0.34241 1.5614 0.951903 0.951903C1.5614 0.34241 2.38805 0 3.25 0H16.75C17.1768 0 17.5994 0.0840639 17.9937 0.247392C18.388 0.410719 18.7463 0.650112 19.0481 0.951903C19.3499 1.25369 19.5893 1.61197 19.7526 2.00628C19.9159 2.40059 20 2.8232 20 3.25V10.75C20 11.1768 19.9159 11.5994 19.7526 11.9937C19.5893 12.388 19.3499 12.7463 19.0481 13.0481C18.7463 13.3499 18.388 13.5893 17.9937 13.7526C17.5994 13.9159 17.1768 14 16.75 14H3.25C2.38805 14 1.5614 13.6576 0.951903 13.0481C0.34241 12.4386 0 11.612 0 10.75V3.25ZM18.5 4.5V3.25C18.5 2.78587 18.3156 2.34075 17.9874 2.01256C17.6592 1.68437 17.2141 1.5 16.75 1.5H3.25C2.78587 1.5 2.34075 1.68437 2.01256 2.01256C1.68437 2.34075 1.5 2.78587 1.5 3.25V4.5H18.5ZM1.5 6V10.75C1.5 11.716 2.284 12.5 3.25 12.5H16.75C17.2141 12.5 17.6592 12.3156 17.9874 11.9874C18.3156 11.6592 18.5 11.2141 18.5 10.75V6H1.5Z" fill="#670316"/>
</svg>}
                    title='Escrow Secured Payment'
                    p1="We're building a supportive community that empowers both families and care professionals to thrive together across Canada."
                    p2=''
                />
            </Col>
       </Row>}

      
    </div>
  )
}

export default OurVision