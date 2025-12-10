import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react'
import { Button, Calendar, CalendarProps, Dropdown, Flex } from 'antd'
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react'
import { schedule } from '../../../utils/interface';

interface ICalenderFilterProps {
  onChange: (value: string) => void;
}
const CalenderFilter: React.FC<ICalenderFilterProps> = ({ onChange }) => {
    const [selectedDays, setSelectedDays] = useState<Dayjs[]>([]);
    const onDateChange: CalendarProps<Dayjs>['onChange'] = (date) => {
        
            
        if (!date) return;

        const dateStr = dayjs(date).format('YYYY-MM-DD');
        console.log("this is chchc", dateStr);
        onChange(dateStr);
        const isSelected = selectedDays.some(d => d.isSame(date, 'day'));
        if (isSelected) {
            setSelectedDays(prev => prev.filter(d => !d.isSame(date, 'day')));
        } else {
            setSelectedDays(prev => [...prev, date]);
        }
    };

    const dropdownItem = [
    {
        key: '1',
        label: (
            <div onClick={(e) =>e.stopPropagation()}>
        <Calendar
            fullscreen={false}
            // fullCellRender={(date) => {
            //     const isSelected = selectedDays.some(d => d.isSame(date, 'day'));
            //     const selected = avaliableDays.find(day =>
            //         day.scheduleDate.split('T')[0] === dayjs(date).format('YYYY-MM-DD')
            //     );
            //     return (
            //         <div  className={`custom-day flex flex-col justify-center items-center text-xs w-[35px] h-[35px] rounded-[20px] 
            //         ${selected && (selected.isAvailable ? 'bg-[#F1FFF9]' : 'bg-[#FFF5F7]')} 
            //         ${isSelected ? 'bg-[#670316] text-black' : 'text-black'}`}>
            //         {date.date()}
            //         {selected && <Icon icon="mdi:circle" fontSize={5} className='mt-1' color={selected.isAvailable ? '#039855' : '#670316'} />}
            //         </div>
            //     );
            // }}
            onChange={onDateChange}
            headerRender={({ value, onChange }) => {
                const year = value.year();
                const month = value.month();
                return (
                    <Flex gap={8} justify="space-between" className='text-[#667085] text-xs p-2 py-4!'>
                        <LeftOutlined className='cursor-pointer' onClick={() => onChange(value.clone().month(month - 1))} />
                        <p className='text-[#344054]'>{value.format('MMMM')} {year}</p>
                        <RightOutlined className='cursor-pointer' onClick={() => onChange(value.clone().month(month + 1))} />
                    </Flex>
            );
            }}
            validRange={[dayjs(), dayjs().add(3, 'month')]}
            className='!bg-[#FAFAFA]'
        />
        </div>
        ),
    }
    ];
  return (
    <div>
    <Dropdown
        menu={{ items: dropdownItem, style: {width: 500 } }} 
        trigger={["click"]}
    >
        <Button 
            icon={<Icon icon="lets-icons:date-today-duotone-line" 
            fontSize={18} />}
            className='w-[123px]! h-9! rounded-[5px]! text-[#484848]! border border-[#767676]!'
        >
            Filter Date
        </Button>
    </Dropdown>
    </div>
  )
}

export default CalenderFilter