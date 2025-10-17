"use client"
import React, { useEffect, useState } from 'react';
import "@/styles/howworks.css"
import { Col, Row } from 'antd';
import WorkList from './WorkList';
import { ArrowLeftOutlined, ArrowRightOutlined, ShoppingOutlined } from '@ant-design/icons';
import useWindowWidth from '@/hooks/useWindowResize';
import ColoredText from './ColoredText';
import { LuUserCheck } from 'react-icons/lu';

const HowWorks = () => {
    const [ showWorker, setShowWorker ] = useState(false);
    const [fontSize, setFontSize] = useState<number>(72);
    const width = useWindowWidth();

    useEffect(() => {
        const size = width <= 1042 ? 24 : 32;
        setFontSize(size);
    }, [width]);
    
  return (
    <div className='howowrks md:pb-[60px]'>
        <p className='header'>How <ColoredText title='SafeHarbour' size={fontSize} /> works</p>
        <p className='p2'>Getting reliable care and home services has never been easier. Our simple 3-step process connects you with trusted professionals.</p>

       {!showWorker &&<Row className='!mt-6 md:!mt-[58px] !px-2 md:!px-[100px]' gutter={[0, 15]}>
            <Col lg={8} sm={24} xs={24}>
                <WorkList 
                    icon={<ShoppingOutlined className='!text-[#670316]' />}
                    title='Post your Needs'
                    p1='Tell us what kind of care or service you need, when you need it, and your location.'
                    p2='Describe your specific requirements, preferred schedule, and any special needs or preferences.'
                />
            </Col>
            <Col lg={8} sm={24} xs={24}>
                <WorkList 
                    icon={<LuUserCheck className='!text-[#670316]' size={20}/>}
                    title='Get Matched'
                    p1='We connect you with pre-screened, qualified professionals in your area.'
                    p2='All workers are background-checked, reference-verified, and fully insured for your peace of mind.'
                />
            </Col>
            <Col lg={8} sm={24} xs={24}>
                <WorkList 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
<path d="M13.75 9.5C13.5511 9.5 13.3603 9.57902 13.2197 9.71967C13.079 9.86032 13 10.0511 13 10.25C13 10.4489 13.079 10.6397 13.2197 10.7803C13.3603 10.921 13.5511 11 13.75 11H16.25C16.4489 11 16.6397 10.921 16.7803 10.7803C16.921 10.6397 17 10.4489 17 10.25C17 10.0511 16.921 9.86032 16.7803 9.71967C16.6397 9.57902 16.4489 9.5 16.25 9.5H13.75ZM0 3.25C0 2.38805 0.34241 1.5614 0.951903 0.951903C1.5614 0.34241 2.38805 0 3.25 0H16.75C17.1768 0 17.5994 0.0840639 17.9937 0.247392C18.388 0.410719 18.7463 0.650112 19.0481 0.951903C19.3499 1.25369 19.5893 1.61197 19.7526 2.00628C19.9159 2.40059 20 2.8232 20 3.25V10.75C20 11.1768 19.9159 11.5994 19.7526 11.9937C19.5893 12.388 19.3499 12.7463 19.0481 13.0481C18.7463 13.3499 18.388 13.5893 17.9937 13.7526C17.5994 13.9159 17.1768 14 16.75 14H3.25C2.38805 14 1.5614 13.6576 0.951903 13.0481C0.34241 12.4386 0 11.612 0 10.75V3.25ZM18.5 4.5V3.25C18.5 2.78587 18.3156 2.34075 17.9874 2.01256C17.6592 1.68437 17.2141 1.5 16.75 1.5H3.25C2.78587 1.5 2.34075 1.68437 2.01256 2.01256C1.68437 2.34075 1.5 2.78587 1.5 3.25V4.5H18.5ZM1.5 6V10.75C1.5 11.716 2.284 12.5 3.25 12.5H16.75C17.2141 12.5 17.6592 12.3156 17.9874 11.9874C18.3156 11.6592 18.5 11.2141 18.5 10.75V6H1.5Z" fill="#670316"/>
</svg>}
                    title='Escrow Secured Payment'
                    p1='Pay safely through our platform with our escrow system and satisfaction guarantee.'
                    p2='Your payment is protected until service is completed to your satisfaction.'
                />
            </Col>
            <Col lg={24} sm={24} xs={24} className='mt-6'>
                <div className='flex items-center gap-4 justify-center cursor-pointer' onClick={() => setShowWorker(!showWorker)}>
                    <span>Client</span>
                    
                    <div className='arrow'>
                        <ArrowRightOutlined className='!text-[10px]' /> 
                    </div>
                </div>
            </Col>
       </Row>}

       {showWorker &&<Row className='!mt-6 md:!mt-[58px] !px-2 md:!px-[100px]' gutter={[0, 15]}>
            <Col lg={8} sm={24} xs={24}>
                <WorkList 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path d="M18.05 9.175L21.575 5.625C21.775 5.425 22.0127 5.325 22.288 5.325C22.5633 5.325 22.8007 5.425 23 5.625C23.1993 5.825 23.2993 6.06267 23.3 6.338C23.3007 6.61333 23.2007 6.85067 23 7.05L18.75 11.3C18.55 11.5 18.3167 11.6 18.05 11.6C17.7833 11.6 17.55 11.5 17.35 11.3L15.225 9.175C15.025 8.975 14.925 8.73767 14.925 8.463C14.925 8.18833 15.025 7.95067 15.225 7.75C15.425 7.54933 15.6583 7.44933 15.925 7.45C16.1917 7.45067 16.425 7.55067 16.625 7.75L18.05 9.175ZM9.5 12C8.4 12 7.45833 11.6083 6.675 10.825C5.89167 10.0417 5.5 9.1 5.5 8C5.5 6.9 5.89167 5.95833 6.675 5.175C7.45833 4.39167 8.4 4 9.5 4C10.6 4 11.5417 4.39167 12.325 5.175C13.1083 5.95833 13.5 6.9 13.5 8C13.5 9.1 13.1083 10.0417 12.325 10.825C11.5417 11.6083 10.6 12 9.5 12ZM1.5 18V17.2C1.5 16.6333 1.646 16.1127 1.938 15.638C2.23 15.1633 2.61733 14.8007 3.1 14.55C4.13333 14.0333 5.18333 13.646 6.25 13.388C7.31667 13.13 8.4 13.0007 9.5 13C10.6 12.9993 11.6833 13.1287 12.75 13.388C13.8167 13.6473 14.8667 14.0347 15.9 14.55C16.3833 14.8 16.771 15.1627 17.063 15.638C17.355 16.1133 17.5007 16.634 17.5 17.2V18C17.5 18.55 17.3043 19.021 16.913 19.413C16.5217 19.805 16.0507 20.0007 15.5 20H3.5C2.95 20 2.47933 19.8043 2.088 19.413C1.69667 19.0217 1.50067 18.5507 1.5 18ZM3.5 18H15.5V17.2C15.5 17.0167 15.4543 16.85 15.363 16.7C15.2717 16.55 15.1507 16.4333 15 16.35C14.1 15.9 13.1917 15.5627 12.275 15.338C11.3583 15.1133 10.4333 15.0007 9.5 15C8.56667 14.9993 7.64167 15.112 6.725 15.338C5.80833 15.564 4.9 15.9013 4 16.35C3.85 16.4333 3.729 16.55 3.637 16.7C3.545 16.85 3.49933 17.0167 3.5 17.2V18ZM9.5 10C10.05 10 10.521 9.80433 10.913 9.413C11.305 9.02167 11.5007 8.55067 11.5 8C11.4993 7.44933 11.3037 6.97867 10.913 6.588C10.5223 6.19733 10.0513 6.00133 9.5 6C8.94867 5.99867 8.478 6.19467 8.088 6.588C7.698 6.98133 7.502 7.452 7.5 8C7.498 8.548 7.694 9.019 8.088 9.413C8.482 9.807 8.95267 10.0027 9.5 10Z" fill="#670316"/>
  <path d="M18.05 9.175L21.575 5.625C21.775 5.425 22.0127 5.325 22.288 5.325C22.5633 5.325 22.8007 5.425 23 5.625C23.1993 5.825 23.2993 6.06267 23.3 6.338C23.3007 6.61333 23.2007 6.85067 23 7.05L18.75 11.3C18.55 11.5 18.3167 11.6 18.05 11.6C17.7833 11.6 17.55 11.5 17.35 11.3L15.225 9.175C15.025 8.975 14.925 8.73767 14.925 8.463C14.925 8.18833 15.025 7.95067 15.225 7.75C15.425 7.54933 15.6583 7.44933 15.925 7.45C16.1917 7.45067 16.425 7.55067 16.625 7.75L18.05 9.175ZM9.5 12C8.4 12 7.45833 11.6083 6.675 10.825C5.89167 10.0417 5.5 9.1 5.5 8C5.5 6.9 5.89167 5.95833 6.675 5.175C7.45833 4.39167 8.4 4 9.5 4C10.6 4 11.5417 4.39167 12.325 5.175C13.1083 5.95833 13.5 6.9 13.5 8C13.5 9.1 13.1083 10.0417 12.325 10.825C11.5417 11.6083 10.6 12 9.5 12ZM1.5 18V17.2C1.5 16.6333 1.646 16.1127 1.938 15.638C2.23 15.1633 2.61733 14.8007 3.1 14.55C4.13333 14.0333 5.18333 13.646 6.25 13.388C7.31667 13.13 8.4 13.0007 9.5 13C10.6 12.9993 11.6833 13.1287 12.75 13.388C13.8167 13.6473 14.8667 14.0347 15.9 14.55C16.3833 14.8 16.771 15.1627 17.063 15.638C17.355 16.1133 17.5007 16.634 17.5 17.2V18C17.5 18.55 17.3043 19.021 16.913 19.413C16.5217 19.805 16.0507 20.0007 15.5 20H3.5C2.95 20 2.47933 19.8043 2.088 19.413C1.69667 19.0217 1.50067 18.5507 1.5 18ZM3.5 18H15.5V17.2C15.5 17.0167 15.4543 16.85 15.363 16.7C15.2717 16.55 15.1507 16.4333 15 16.35C14.1 15.9 13.1917 15.5627 12.275 15.338C11.3583 15.1133 10.4333 15.0007 9.5 15C8.56667 14.9993 7.64167 15.112 6.725 15.338C5.80833 15.564 4.9 15.9013 4 16.35C3.85 16.4333 3.729 16.55 3.637 16.7C3.545 16.85 3.49933 17.0167 3.5 17.2V18ZM9.5 10C10.05 10 10.521 9.80433 10.913 9.413C11.305 9.02167 11.5007 8.55067 11.5 8C11.4993 7.44933 11.3037 6.97867 10.913 6.588C10.5223 6.19733 10.0513 6.00133 9.5 6C8.94867 5.99867 8.478 6.19467 8.088 6.588C7.698 6.98133 7.502 7.452 7.5 8C7.498 8.548 7.694 9.019 8.088 9.413C8.482 9.807 8.95267 10.0027 9.5 10Z" fill="#670316"/>
</svg>}
                    title='Get Vetted'
                    p1='Show case your skills, set your own rates, and complete the one-time verification process.'
                    p2='This is the process of you thoroughly investigated as an individual, company, or other entity.'
                />
            </Col>
            <Col lg={8} sm={24} xs={24}>
                <WorkList 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M12.9999 0L14 0.999984L13.9999 3H19.9999V17H0V3H6V0.999984L6.99994 0H12.9999ZM1.99992 10.3563V15H18V10.3563C16.0019 10.928 14.0016 11.2856 12 11.4285V13H7.99997V11.4286C5.99831 11.2856 3.99802 10.9281 1.99997 10.3564M18 5.00006H1.99997V8.27034C4.67053 9.09066 7.33622 9.50006 9.99994 9.50006C12.6637 9.50006 15.3294 9.09066 18 8.27034V5.00006ZM12 2.00006H8.00002V3H12V2.00006Z" fill="#670316"/>
</svg>}
                    title='Get a Job'
                    p1='Tell us what kind of care or service you need, when you need it, and your location.'
                    p2='Describe your specific requirements, preferred schedule, and any special needs or preferences.'
                />
            </Col>
            <Col lg={8} sm={24} xs={24}>
                <WorkList 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M3.57649 1.3105C4.80349 0.71 6.81649 0 9.01949 0C11.1765 0 13.1365 0.6805 14.357 1.273L14.426 1.3065C14.794 1.4885 15.091 1.6605 15.3 1.8L13.453 4.5C17.711 8.853 21 17.9985 9.01949 17.9985C-2.96101 17.9985 0.23949 9.019 4.53449 4.5L2.69949 1.8C2.84099 1.7075 3.02049 1.6 3.23449 1.486C3.34049 1.429 3.45449 1.37017 3.57649 1.3105ZM12.266 4.4645L13.7445 2.303C12.3695 2.402 10.7335 2.725 9.15849 3.181C8.03349 3.506 6.78349 3.4565 5.62599 3.243C5.33429 3.18899 5.04461 3.12462 4.75749 3.05L5.71749 4.4635C7.77499 5.196 10.208 5.196 12.266 4.4645ZM5.13999 5.315C7.54749 6.245 10.441 6.245 12.8485 5.314C13.8532 6.37356 14.6938 7.57736 15.3425 8.8855C16.0185 10.2645 16.3865 11.643 16.3265 12.831C16.2685 13.9775 15.8175 14.957 14.7875 15.685C13.714 16.4435 11.9085 16.9985 9.01899 16.9985C6.12649 16.9985 4.31249 16.453 3.22899 15.703C2.19149 14.9845 1.73599 14.018 1.67149 12.887C1.60399 11.712 1.96399 10.3405 2.63749 8.952C3.27999 7.628 4.17649 6.3535 5.13999 5.315ZM4.56499 1.958C4.96499 2.077 5.38299 2.1805 5.80699 2.259C6.88199 2.457 7.95999 2.486 8.87999 2.2195C9.95207 1.90705 11.0425 1.66141 12.145 1.484C11.225 1.207 10.149 1 9.01899 1C7.29649 1 5.68999 1.4805 4.56499 1.958Z" fill="#670316"/>
</svg>}
                    title='Start Earning'
                    p1='Pay safely through our platform with our escrow system and satisfaction guarantee.'
                    p2='Your payment is protected until service is completed to your satisfaction.'
                />
            </Col>
            <Col lg={24} sm={24} xs={24} className='mt-6'>
                <div className='flex items-center gap-4 justify-center cursor-pointer' onClick={() => setShowWorker(!showWorker)}>
                    <div className='arrow'>
                        <ArrowLeftOutlined className='!text-[10px]' /> 
                    </div>
                    <span>Worker</span>
                </div>
            </Col>
       </Row>}
    </div>
  )
}

export default HowWorks