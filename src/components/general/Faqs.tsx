"use client"
import { CaretRightOutlined, MinusCircleOutlined, PlusCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Collapse, CollapseProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { faqQuestions } from '@/extras/questions';


const FaqComponent = () => {
    const item: CollapseProps["items"] = [
        ...faqQuestions.map((question: any, i) => {
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