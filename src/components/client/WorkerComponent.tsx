"use client"
import "@/styles/client.css"
import { Checkbox, Col, Layout, Row, Tabs, TabsProps, Slider, Input, Pagination, PaginationProps } from 'antd';
import React, { useEffect, useState } from 'react'
import Search from '../general/Search';
import { ArrowLeftOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons';
import { FaCloudRain } from "react-icons/fa";
import Image from "next/image";
import { Filter } from "../../../assets/icons";
import { GiCook } from "react-icons/gi";
import { HealthWorker, PlantationWorker } from "healthicons-react";
import WorkersCard from "./cards/WorkersCard";

interface props {
    isDashboard?: boolean;
}
const { Content, Sider } = Layout;

const WorkerComponent = ({ isDashboard }: props) => {
    const [ showSearch, setShowSearch ] = useState(false);
    const [ collasped, setCollapsed ] = useState(true);
    const [ active, setActive ] = useState("1");

    useEffect(() => {
        if(isDashboard) setShowSearch(true);
        else setShowSearch(false);
    }, [isDashboard]);

    useEffect(() => {
        if(collasped && isDashboard) setShowSearch(true)
        else if(!collasped && isDashboard) setShowSearch(false)
    }, [collasped, isDashboard])
    const tabItems: TabsProps["items"] = [
        {
            key: "1",
            label: <div className="worker-tab-item">
                <HealthWorker />
                <p>Care Worker</p>
            </div>
        },
        {
            key: "2",
            label: <div className="worker-tab-item">
                <FaCloudRain />
                <p>Snow Plowing</p>
            </div>
        },
        {
            key: "3",
            label: <div className="worker-tab-item">
                <GiCook />
                <p>Personal Cook</p>
            </div>
        },
        {
            key: "4",
            label: <div className="worker-tab-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Cleaning-Room-Woman--Streamline-Sharp" height="24" width="24">
                <desc>
                    Cleaning Room Woman Streamline Icon: https://streamlinehq.com
                </desc>
                <g id="cleaning-room-woman">
                    <path id="Union" fill={active === "4" ? "#670316" :"#000000"} fillRule="evenodd" d="M6.5 1C4.98122 1 3.75 2.23122 3.75 3.75S4.98122 6.5 6.5 6.5s2.75 -1.23122 2.75 -2.75S8.01878 1 6.5 1ZM4 19.0001v4h5v-4h2.5L10 9.50009S9 8 6.5 8 3 9.50009 3 9.50009L1.5 19.0001H4Zm16.6688 -3.6882c-0.3094 -0.1669 -0.7045 -0.337 -1.1688 -0.4457V1.5h-2v13.3664c-0.464 0.1086 -0.8589 0.2787 -1.1682 0.4455 -0.2576 0.139 -0.4615 0.2787 -0.6037 0.3861 -0.0714 0.0539 -0.1278 0.1001 -0.1685 0.1348 -0.0203 0.0173 -0.0367 0.0318 -0.0491 0.0429l-0.0155 0.0141 -0.0055 0.0051 -0.0022 0.0021 -0.0009 0.0009c-0.0002 0.0002 -0.0009 0.0008 0.5139 0.5462l-0.5148 -0.5454 -0.1796 0.1695 -1.2029 6.6817h8.7941l-1.2024 -6.6817 -0.1796 -0.1695 -0.0008 -0.0008 -0.001 -0.0009 -0.0021 -0.0021 -0.0055 -0.0051 -0.0156 -0.0141c-0.0124 -0.0111 -0.0288 -0.0256 -0.0491 -0.0429 -0.0406 -0.0347 -0.0971 -0.0809 -0.1684 -0.1348 -0.1423 -0.1074 -0.3462 -0.2471 -0.6038 -0.3861Z" clipRule="evenodd" strokeWidth="1"></path>
                </g>
                </svg>
                <p>House Chores & Cleaning</p>
            </div>
        },
        {
            key: "5",
            label: <div className="worker-tab-item">
                <PlantationWorker />
                <p>Support Workers</p>
            </div>
        },
        {
            key: "6",
            label: <div className="worker-tab-item">
                <HealthWorker />
                <p>Companion Workers</p>
            </div>
        }
    ];

    const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
        if(type === "prev")return <p className="text-[#667085] w-full text-left"><ArrowLeftOutlined className="mr-2" /> Previous</p>
        if(type === "next")return <p className="text-[#667085] w-full text-right">Next <ArrowRightOutlined className="ml-2" /></p>
        return originalElement
    }

  return (
    <div className='w-full'>
        <Row className='w-full'>
            {showSearch && <Col lg={24} sm={24} xs={24}>
                <Search isClient />
            </Col>}

            <Col lg={24} sm={24} xs={24}>
                <Layout className=" bg-white">
                    <Sider
                        title="Filter By"
                        collapsed={collasped}
                        collapsible
                        className="!bg-white flex flex-col gap-7 px-4 py-4"
                        width={318}
                        trigger={null}
                        onCollapse={(col) => setCollapsed(col)}
                        collapsedWidth={0}
                    >

                        <div className="flex items-center justify-between mb-4">
                            <p className="t-pri font-medium text-lg">Filter by</p>
                            <CloseOutlined onClick={() => setCollapsed(true)} />
                        </div>
                        <div className="filter-container">
                            <p className="t-pri text-base">Service Type</p>

                            <Checkbox.Group className="flex flex-col gap-2" onChange={(value) => console.log(value)}>
                                <Checkbox value={1}>
                                    Care Workers
                                </Checkbox>
                                <Checkbox>
                                    Babysitters & Childcare
                                </Checkbox>
                                <Checkbox>
                                    House Chores & Cleaning
                                </Checkbox>
                                <Checkbox>
                                    Personal Cook
                                </Checkbox>
                                <Checkbox>
                                    Support Workers
                                </Checkbox>
                                <Checkbox>
                                    Companion Workers
                                </Checkbox>
                            </Checkbox.Group>
                        </div>

                        <div className="filter-container">
                            <p className="t-pri text-base">Location</p>

                            <Checkbox.Group className="flex flex-col gap-2" onChange={(value) => console.log(value)}>
                                <Checkbox value={1}>
                                    Toronto
                                </Checkbox>
                                <Checkbox>
                                    Manitoba
                                </Checkbox>
                               
                            </Checkbox.Group>
                        </div>

                        <div className="filter-container">
                            <p className="t-pri text-base">Price</p>

                            <div className="flex items-center w-full gap-1">
                                <span>0</span>
                                <Slider 
                                    min={0}
                                    max={1000}
                                    style={{width: "100%"}}
                                    styles={{
                                        track: {backgroundColor: "#670318", height: 6},
                                        handle: {color: "#670318", backgroundColor: "#670318", },
                                        rail: {backgroundColor: "#ffecef", height: 6}
                                    }}
                                    range
                                    
                                />
                                <span>$999</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <Input placeholder="Min" className="bg-white h-[42px] !w-[81px] rounded-[12px]" />-
                                <Input placeholder="Max" className="bg-white h-[42px] !w-[81px] rounded-[12px]" />
                            </div>
                        </div>                      

                        <div className="filter-container">
                            <p className="t-pri text-base">Availability</p>

                            <Checkbox.Group className="flex flex-col gap-2" onChange={(value) => console.log(value)}>
                                <Checkbox value={1}>
                                    Days Available
                                </Checkbox>
                                <Checkbox>
                                    Weekly
                                </Checkbox>
                                <Checkbox>
                                    Monthly
                                </Checkbox>
                            </Checkbox.Group>
                        </div>
                    </Sider>
                    <Content className=" bg-white">
                        {collasped && <div className="flex items-center w-full bg-white gap-4">
                            {<Image src={Filter} alt="filter" className="cursor-pointer" onClick={() => setCollapsed(false)} />}
                            <Tabs 
                                activeKey={active}
                                items={tabItems}
                                onChange={(active) => setActive(active)}
                                className="w-full"
                            />
                        </div>}
                        
                        <Row gutter={[15,15]}>
                            <Col lg={collasped ? 6 : 8} sm={12} xs={24}>
                                <WorkersCard />
                            </Col>
                        </Row>

                        <Row gutter={[15,15]} className="mt-4">
                            <Col lg={24} sm={24} xs={24}>
                                <Pagination 
                                    responsive
                                    // style={{width: "100%", alignItems: "center", justifyContent:"center"}}
                                    showSizeChanger={false}
                                    itemRender={itemRender}
                                    total={400}
                                    align="center"
                                    className="border-t border-t-[#eaecf0] !pt-4"
                                />
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Col>

        </Row> 
    </div>
  )
}

export default WorkerComponent