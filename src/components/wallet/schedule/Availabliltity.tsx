import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Calendar, Card, Col, Flex, Row } from 'antd';
import type { CalendarProps } from 'antd';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import CardTitle from '@/components/general/CardTitle';
import AddCalenderFlow from '../flows/AddCalenderFlow';
import RoundBtn from '@/components/general/RoundBtn';
import { Icon } from '@iconify/react';



dayjs.extend(dayLocaleData);

const Availabliltity = () => {
    const [ isAvailable, setIsAvailable ] = useState(false);
    const [ availability, setAvailability ] = useState(false);
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
  return (//
    <Row gutter={[15, 15]}>
    <Col lg={12} sm={24} xs={24}>
        <Card 
            
            title={<CardTitle title='Availability' description={<div className='flex items-center gap-3'>
                <div className='flex items-center gap-1'>
                    <div className='h-[8px] w-[8px] bg-[#670316] rounded-full'></div>
                    <p className='text-[#343434] text-[10px]'>Available</p>
                </div>
                <div className='flex items-center gap-1'>
                    <div className='h-[8px] w-[8px] bg-[#039855] rounded-full'></div>
                    <p className='text-[#343434] text-[10px]'>Booked</p>
                </div>
                <div className='flex items-center gap-1'>
                    <div className='h-[8px] w-[8px] bg-[#f5f5f5] rounded-full'></div>
                    <p className='text-[#343434] text-[10px]'>Unavailable</p>
                </div>
            </div>} />} 
            styles={{ body: {}}}
        >
            <Card variant="borderless">
                <Calendar 
                    fullscreen={false}
                    headerRender={({ value, onChange,   }) => {
                        const year = value.year();
                        const month = value.month();
    
                        // const yearOptions = Array.from({ length: 20 }, (_, i) => {
                        //     const label = year - 10 + i;
                        //     return { label, value: label };
                        // });
    
                        // const monthOptions = value
                        //     .localeData()
                        //     .monthsShort()
                        //     .map((label, index) => ({
                        //     label,
                        //     value: index,
                        //     }));
    
                        return (
                            <div style={{ padding: 8 }}>
                            {/* <Typography.Title level={4}>Custom header</Typography.Title> */}
                            <Flex gap={8} justify="space-between" className='text-[#667085] text-xs'>
                                <LeftOutlined className='cursor-pointer' onClick={() => {
                                    const now = value.clone().month(month-1);
                                    onChange(now);
                                }}/>
                                <p className='text-[#344054]'>{value.format("MMMM")} {year}</p>
                                <RightOutlined className='cursor-pointer' onClick={() => {
                                    const now = value.clone().month(month+1);
                                    onChange(now);
                                }}/>
                                {/* <Radio.Group
                                size="small"
                                onChange={(e) => onTypeChange(e.target.value)}
                                value={type}
                                >
                                <Radio.Button value="month">Month</Radio.Button>
                                <Radio.Button value="year">Year</Radio.Button>
                                </Radio.Group>
                                <Select
                                size="small"
                                popupMatchSelectWidth={false}
                                value={year}
                                options={yearOptions}
                                onChange={(newYear) => {
                                    const now = value.clone().year(newYear);
                                    onChange(now);
                                }}
                                />
                                <Select
                                size="small"
                                popupMatchSelectWidth={false}
                                value={month}
                                options={monthOptions}
                                onChange={(newMonth) => {
                                    console.log("dd", newMonth, month);
                                    
                                    const now = value.clone().month(newMonth);
                                    onChange(now);
                                }}
                                /> */}
                            </Flex>
                            </div>
                        );
                    }}
                    onPanelChange={onPanelChange}
                    className='!bg-[#FAFAFA]'
                    rootClassName='!bg-[#FAFAFA]'
                />
            </Card>
        </Card>
    </Col>

    <Col lg={12} sm={24} xs={24}>
        <Card 
            title={<CardTitle title='Thursday, September 18' />} 
            styles={{ body: {}}}
            extra={isAvailable && availability && <RoundBtn width={86} height={40} title='Edit' icon={<Icon icon="flowbite:edit-outline" fontSize={18} />}  onClick={() => setAvailability(false)} />}
        >
            <Card variant="borderless">
               <AddCalenderFlow 
                    availability={availability} 
                    isAvailable={isAvailable} 
                    setAvailability={setAvailability} 
                    setIsAvailable={setIsAvailable} 
                />
            </Card>
        </Card>
    </Col>
    </Row>
  )
}

export default Availabliltity