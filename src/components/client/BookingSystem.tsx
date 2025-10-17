"use client"
import { Col, Pagination, PaginationProps, Row, Segmented } from 'antd'
import React, { useState } from 'react'
import BookingCard from './cards/BookingCard'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

const BookingSystem = () => {
    const [ active, setActive ] = useState("Pending");
    const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
        if(type === "prev")return <p className="text-[#667085] w-full text-left"><ArrowLeftOutlined className="mr-2" /> Previous</p>
        if(type === "next")return <p className="text-[#667085] w-full text-right">Next <ArrowRightOutlined className="ml-2" /></p>
        return originalElement
    }
  return (
    <div>
        <Row gutter={[0, 30]}>
            <Col lg={24} sm={24} xs={24}>
                <Segmented 
                    options={["Pending", "Accepted", "Declined", "Completed", "Cancelled"]}
                    defaultValue={active}
                    onChange={(value) => setActive(value)}  
                />
            </Col>

            <Col lg={24} sm={24} xs={24}>
                <Row gutter={[15,15]}>
                    <Col lg={12} sm={24} xs={24}>
                        <BookingCard 
                        
                        />
                    </Col>
                </Row>
            </Col>

            <Col lg={24} sm={24} xs={24}>
                <Pagination 
                    responsive
                    // style={{width: "100%", alignItems: "center", justifyContent:"center"}}
                    showSizeChanger={false}
                    itemRender={itemRender}
                    total={400}
                    align="center"
                    className="border-t border-t-[#eaecf0] !py-4"
                />
            </Col>
        </Row>
    </div>
  )
}

export default BookingSystem