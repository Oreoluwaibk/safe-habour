"use client"
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Collapse, CollapseProps } from 'antd';
import React from 'react';
import { faqQuestions } from '@/extras/questions';

interface FaqQuestion {
  key: string;
  question: string;
  answer: string;
}

const FaqComponent = () => {
    const item: CollapseProps["items"] = [
        ...faqQuestions.map((question: FaqQuestion, i) => {
            return {
                key: question.key,
                label: question.question,
                children: <p>{question.answer}</p>
            }
        })
    ]

   
  return (
    <div className='faqs'>
        <p>Frequently Asked Questions</p>
        <p>Everything you need to know about the product and billing.</p>

        <div 
           className='collapsediv'
        >
            <Collapse
                bordered={false}
                defaultActiveKey={['1']} 
                expandIcon={({ isActive }) => isActive ? <MinusCircleOutlined className='!text-[#670316] !h-6 !w-6' /> :<PlusCircleOutlined className='!text-[#670316] !h-6 !w-6' />}
                items={item}
                expandIconPosition="end"
                className="collapse-custom-faq"
                // ghost
                // key={index}
            />  
        </div>
    </div>
  )
}

export default FaqComponent;