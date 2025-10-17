import { Calendar, Card, Flex, } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import React from 'react'
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

dayjs.extend(dayLocaleData);

const AvailabilityCard = () => {
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
  return (
    <Card title="Availability" variant="borderless" styles={{ body: {}}}>
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
            />
        </Card>

        <div className='mt-6 text-[#646464] flex flex-col gap-1'>
            <p className='text-[#1e1e1e]'>Typical working hours:</p>
            <div className='flex items-center justify-between'>
                <p>Monday - Friday:</p>
                <p>9:00 AM - 6:00 PM</p>
            </div>
            <div className='flex items-center justify-between'>
                <p>Saturday:</p>
                <p>10:00 AM - 4:00 PM</p>
            </div>
            <div className='flex items-center justify-between'>
                <p>Sunday</p>
                <p>Closed</p>
            </div>
        </div>
    </Card>
  )
}

export default AvailabilityCard