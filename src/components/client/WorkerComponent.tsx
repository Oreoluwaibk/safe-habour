"use client"
import "@/styles/client.css"
import { Checkbox, Col, Layout, Row, Tabs, TabsProps, Slider, Pagination, PaginationProps, App, Skeleton, Radio, InputNumber } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import Search from '../general/Search';
import { ArrowLeftOutlined, ArrowRightOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { FaCloudRain } from "react-icons/fa";
import Image from "next/image";
import { Filter } from "../../../assets/icons";
import { GiCook } from "react-icons/gi";
import WorkersCard from "./cards/WorkersCard";
import { Icon } from "@iconify/react";
import { useServiceCategory } from "@/hooks/useServiceCategory";
import { categoryType, UserWorkerProfile } from "../../../utils/interface";
import { getServiceWorkerByCategory, IClientParams } from "@/redux/action/client";
import { createErrorMessage } from "../../../utils/errorInstance";
import useDebounce from "@/hooks/useDebounce";
import { useGeolocation } from "@/hooks/useGeolocation";
interface props {
    isDashboard?: boolean;
}
const { Content, Sider } = Layout;

const icons = [
    <Icon icon="healthicons:health-worker-24px" key={1} />,
    <FaCloudRain key={2} />,
    <GiCook key={3} />,
    <Icon key={4} icon="streamline-sharp:cleaning-room-woman-solid" />,
    <Icon key={5} icon="healthicons:plantation-worker" />,
    <Icon key={6} icon="healthicons:health-worker-24px" />,
]
const WorkerComponent = ({ isDashboard }: props) => {
    const { modal } = App.useApp();
    const [ showSearch, setShowSearch ] = useState(false);
    const [ collasped, setCollapsed ] = useState(true);
    const [ loading, setLoading ] = useState(false)
    const [ active, setActive ] = useState("Careworker");
    const { categories, loading: serviceLoading } = useServiceCategory();
    const { location } = useGeolocation();
    const [filters, setFilters] = useState<IClientParams>({
        pageNumber: 1,
        pageSize: 8,
        searchTerm: "",
        location: "",
        minHourlyRate: 0,
        maxHourlyRate: 0,
        latitude: 0,
        longitude: 0
    });
    const [ selectedCategory, setSelectedCategory ] = useState<string[]>(["Careworker"])
    const [ workers, setWorkers ] = useState<UserWorkerProfile[]>([]);
    const [ total, setTotal ] = useState(0);
    const [ nearMe, setNearMe ] = useState(false);

    const debouncedMin = useDebounce(filters.minHourlyRate!, 500);
    const debouncedMax = useDebounce(filters.maxHourlyRate!, 500);
    const debouncedSearch = useDebounce(filters?.searchTerm as string, 500);
    const debouncedLocation = useDebounce(filters?.location as string, 500);


    useEffect(() => {
        if(location) setFilters(prev => ({
            ...prev,
            latitude: location.latitude as number,
            longitude: location.longitude as number
        }))
    }, [location]);
    
    // useEffect(() => {
    //     if (debouncedSearch) handleSearch(debouncedSearch)
    //     // else handleGetInitial();
    // }, [debouncedSearch]);

    const handleGetWorker = useCallback((
        category?: string | string[],
        pageNumber: number = 1, 
        pageSize: number = 8,
        search?: string
    ) => {
        const payload = {
            serviceNames: category ? (Array.isArray(category) ? category : [category]) : selectedCategory
        }

        const latitude = nearMe ? filters.latitude : undefined;
        const longitude = nearMe ? filters.longitude : undefined; 
        const location = filters.location || undefined;
        const searchItem =  search ? search : filters.searchTerm ? filters.searchTerm : undefined;
        const minHour = filters.minHourlyRate || undefined;
        const maxHour = filters.maxHourlyRate || undefined;
        
        setLoading(true);
        getServiceWorkerByCategory(
            payload,
            pageNumber,
            pageSize,
            searchItem,
            location,
            minHour,
            maxHour,
            latitude,
            longitude
        )
        .then(res => {
            if(res.status === 200) {
                setLoading(false);
                setWorkers(res.data.items)
                setTotal(res.data.totalCount);
            }
        })
        .catch(err => {
            modal.error({
                title: "Unable to get workers by category",
                content: err?.response
                    ? createErrorMessage(err.response.data)
                    : err.message,
                onOk: () => setLoading(false)
            });
        })
    }, [selectedCategory, filters, nearMe, modal]);

    useEffect(() => {
        handleGetWorker();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        if (debouncedSearch) {
            handleGetWorker(undefined, 1, 8, debouncedSearch.toString())
            setFilters(prev => ({...prev, searchTerm: debouncedSearch.toString()}))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    useEffect(() => {
        if (debouncedLocation) {
            handleGetWorker()
            setFilters(prev => ({...prev, location: debouncedLocation.toString()}))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedLocation]);

    useEffect(() => {
        if (debouncedMin && debouncedMax) {
            handleGetWorker()
            setFilters(prev => ({
                ...prev, 
                maxHourlyRate: Number(debouncedMax),
                minHourlyRate: Number(debouncedMin)
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedMax, debouncedMin]);

    const handleCategoryChange = (category: string) => {
        handleGetWorker(category);
        setActive(category);
        setFilters(prev => ({
            ...prev,
            pageNumber: 1,
            pageSize: 8,
            location: "",
            minHourlyRate: 0,
            maxHourlyRate: 0
        }))
    }
    
    useEffect(() => {
        if(isDashboard) setShowSearch(true);
        else setShowSearch(false);
    }, [isDashboard]);

    useEffect(() => {
        if(collasped && isDashboard) setShowSearch(true)
        else if(!collasped && isDashboard) setShowSearch(false)
    }, [collasped, isDashboard]);

    const tabItems: TabsProps["items"] = [
        ...categories.map((category: categoryType) => ({
            key: category.name,
            label: <div className="worker-tab-item">
                {icons[category.id-1]}
                <p>{category.name}</p>
            </div>,
        })),
    ];

    const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
        if(type === "prev")return <p className="text-[#667085] w-full text-left"><ArrowLeftOutlined className="mr-2" /> Previous</p>
        if(type === "next")return <p className="text-[#667085] w-full text-right">Next <ArrowRightOutlined className="ml-2" /></p>
        return originalElement
    }

    const handlePagination = (page: number, size: number) =>  {
        handleGetWorker(undefined, page, size)
        setFilters((prev) => ({
            ...prev,
            pageNumber: page,
            pageSize: size
        }));
    }

    const handleFilterChange = (category: string[]) => {
        handleGetWorker(category);
        setSelectedCategory(category);
        setFilters(prev => ({
            ...prev,
            pageNumber: 1,
            pageSize: 8,
            location: ""
        }))
    }

    const handleNearMeChange = (value: boolean) => {
        setNearMe(value);
        handleGetWorker();
    }

    const handleResetFilter = () => {
        setFilters(prev => ({
            ...prev,
            pageNumber: 1,
            pageSize: 8,
            location: "",
            minHourlyRate: 0,
            maxHourlyRate: 0
        }));
        setNearMe(false);
    }

  return (
    <Skeleton loading={false} className='w-full'>
        <Row className='w-full'>
            {showSearch && <Col lg={24} sm={24} xs={24}>
                <Search 
                    isClient  
                    search={filters.searchTerm || ""}
                    location={filters.location || ""}
                    onChangeSearch={(e) => setFilters(prev => ({...prev, searchTerm: e.target.value}))}
                    onChangeLocation={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                    loading={loading}
                    onSearchClick={() => handleGetWorker(undefined, 1, 8, debouncedSearch.toString())}
                />
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
                            <CloseOutlined onClick={() => {
                                setCollapsed(true);
                                handleResetFilter();
                            }} />
                        </div>
                        <div className="filter-container">
                            <p className="t-pri text-base">Service Type</p>

                            <Checkbox.Group className="flex flex-col gap-2" value={selectedCategory} onChange={handleFilterChange}>
                                {categories.map((category: categoryType, i: number)=> (
                                    <Checkbox value={category.name} key={i}>
                                        {category.name}
                                    </Checkbox>
                                ))}
                            </Checkbox.Group>
                        </div>

                        <div className="filter-container">
                            <p className="t-pri text-base">Location</p>
                            <Radio.Group >
                                <Radio value="totronto" checked={false}>
                                    Toronto
                                </Radio>
                                <Radio onChange={() => handleNearMeChange(!nearMe)}>
                                    Around Me
                                </Radio>
                            </Radio.Group>
                        </div>

                        <div className="filter-container">
                            <p className="t-pri text-base">Price</p>

                            <div className="flex items-center w-full gap-1">
                                <span>${filters.minHourlyRate}</span>
                                <Slider 
                                    min={0}
                                    max={1000}
                                    style={{width: "100%"}}
                                    styles={{
                                        track: {backgroundColor: "#670318", height: 6},
                                        handle: {color: "#670318", backgroundColor: "#670318", },
                                        rail: {backgroundColor: "#ffecef", height: 6},
                                    }}
                                    range
                                    onChangeComplete={(value) => {
                                        console.log("value", value)
                                        setFilters(prev => ({
                                            ...prev, 
                                            minHourlyRate: value[0],
                                            maxHourlyRate: value[0] > value[1] ? value[0] : value[1]
                                        }))
                                    }}
                                    // value={[Number(filters.minHourlyRate), Number(filters.maxHourlyRate)]}
                                />
                                <span>${filters.maxHourlyRate}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <InputNumber 
                                    value={Number(filters.minHourlyRate)} 
                                    min={0} 
                                    onChange={(value) => setFilters(prev => ({...prev, minHourlyRate: Number(value)}))} placeholder="Min" 
                                    className="bg-white h-[42px] !w-[81px] rounded-[12px]" 
                                />-
                                <InputNumber 
                                    value={Number(filters.maxHourlyRate)} 
                                    min={Number(filters.minHourlyRate) || 0} 
                                    onChange={(value) => setFilters(prev => ({...prev, maxHourlyRate: Number(value)}))}  
                                    placeholder="Max" 
                                    className="bg-white h-[42px] !w-[81px] rounded-[12px]" 
                                />
                            </div>
                        </div>                      

                        {/* <div className="filter-container">
                            <p className="t-pri text-base">Availability</p>

                            <Checkbox.Group className="flex flex-col gap-2" onChange={(value) => console.log(value)}>
                                <Checkbox value={1}>
                                    Available
                                </Checkbox>
                            </Checkbox.Group>
                        </div> */}
                    </Sider>
                    <Content className=" bg-white">
                        {collasped && <div className="flex items-center w-full bg-white gap-4">
                            {serviceLoading ? <LoadingOutlined spin /> : <Image src={Filter} alt="filter" className="cursor-pointer" onClick={() => setCollapsed(false)} />}
                            <Tabs 
                                activeKey={active}
                                items={tabItems}
                                onChange={handleCategoryChange}
                                className="w-full"
                                defaultActiveKey="Careworker"
                                
                            />
                        </div>}
                        
                        <Skeleton loading={loading} className='h-full w-full'>
                            <Row gutter={[15,15]} className="min-h-2/5">
                                {workers.map((worker:UserWorkerProfile,i:number) => (
                                    <Col lg={collasped ? 6 : 8} sm={12} xs={24} key={i}>
                                        <WorkersCard worker={worker} />
                                    </Col>
                                ))}

                                {workers.length === 0 && (
                                    <Col lg={24} sm={24} xs={24} className="min-h-2/5 !flex items-center justify-center">
                                        <p className="text-center text-[#121212]">You have no worker in this category!</p>
                                    </Col>
                                )}
                            </Row>
                        </Skeleton>

                        <Row gutter={[15,15]} className="mt-4">
                            <Col lg={24} sm={24} xs={24}>
                                <Pagination 
                                    responsive
                                    // style={{width: "100%", alignItems: "center", justifyContent:"center"}}
                                    showSizeChanger={false}
                                    itemRender={itemRender}
                                    total={total}
                                    current={filters.pageNumber}
                                    pageSize={filters.pageSize}
                                    align="center"
                                    className="border-t border-t-[#eaecf0] !pt-4"
                                    onChange={handlePagination}
                                />
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Col>
        </Row> 
    </Skeleton>
  )
}

export default WorkerComponent