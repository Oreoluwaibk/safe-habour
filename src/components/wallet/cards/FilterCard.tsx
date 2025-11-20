// FilterCard.tsx
import { Card, Checkbox, Input, InputNumber, Select, Slider, DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import "@/styles/client.css"
import CardTitle from '@/components/general/CardTitle'
import { FilterOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import useDebounce from '@/hooks/useDebounce'
import { useServiceCategory } from '@/hooks/useServiceCategory'
import { RangePickerProps } from 'antd/es/date-picker'

const { RangePicker } = DatePicker;

interface Props {
  filter: {
    pageNumber: number;
    pageSize: number;
    search: string;
    serviceTypeIds: number[];
    maxPrice: number | undefined;
    minPrice: number | undefined;
    from: string;
    to: string;
    rating: number | undefined;
    location: string;
  };
  setFilter: React.Dispatch<React.SetStateAction<{
    pageNumber: number;
    pageSize: number;
    search: string;
    serviceTypeIds: number[];
    maxPrice: number | undefined;
    minPrice: number | undefined;
    from: string;
    to: string;
    rating: number | undefined;
    location: string;
  }>>;
}

const FilterCard = ({ filter, setFilter }: Props) => {
  const { loading: categoryLoading, categories } = useServiceCategory();
  const [ searchValue, setSearchValue ] = useState("");
  const [ location, setLocation ] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const debouncedLocation = useDebounce(location, 500);

  useEffect(() => {
    setFilter(prev => ({ 
        ...prev, 
        search: debouncedSearch.toString(),
        location: debouncedLocation.toString(), 
        pageNumber: 1 
    }));
  }, [debouncedSearch, setFilter, debouncedLocation]);

  const handleCheckbox = (checkedValues: number[]) => {
    setFilter(prev => ({
      ...prev,
      serviceTypeIds: checkedValues,
      pageNumber: 1
    }));
  };

  const handlePriceRange = (range: number[]) => {
    setFilter(prev => ({
      ...prev,
      minPrice: range[0],
      maxPrice: range[1],
      pageNumber: 1
    }));
  };

  const handleDate: RangePickerProps["onChange"] = (dates) => {
    setFilter(prev => ({
      ...prev,
      from: dates?.[0]?.toISOString() || "",
      to: dates?.[1]?.toISOString() || "",
      pageNumber: 1
    }));
  };

  return (
    <Card
      title={
        <CardTitle 
          title="Filter Jobs"
          icon={
            <span className='bg-[#FFEAEE] flex items-center justify-center !h-6 !w-6 rounded-[100px]'>
              <FilterOutlined className='text-[#670316]' />
            </span>
          }
        />
      }
      classNames={{ header: "linear" }}
    >
      <div className="filter-container">
        <p className="t-pri text-base">Location</p>
        <Input
          placeholder="Toronto"
          value={location}
          prefix={<SearchOutlined />}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <p className="t-pri text-base">Search Jobs</p>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search for jobs'
          prefix={<SearchOutlined />}
        />
      </div>

      <div className="filter-container">
        <p className="t-pri text-base">Service Type {categoryLoading && <LoadingOutlined spin />}</p>
        <Checkbox.Group  className="flex flex-col gap-2" onChange={handleCheckbox}>
          {categories.map(cat => (
            <Checkbox key={cat.id} value={cat.id}>
              {cat.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <div className="filter-container">
        <p className="t-pri text-base">Price</p>

        <Slider
          min={0}
          max={1000}
          range
          value={[filter.minPrice || 0, filter.maxPrice || 1000]}
          onChange={handlePriceRange}
        />

        <div className="flex items-center gap-4">
          <InputNumber
            placeholder="Min"
            value={filter.minPrice}
            onChange={(v) => setFilter(prev => ({ ...prev, minPrice: v || 0, pageNumber: 1 }))}
          />
          -
          <InputNumber
            placeholder="Max"
            value={filter.maxPrice}
            onChange={(v) => setFilter(prev => ({ ...prev, maxPrice: v || 1000, pageNumber: 1 }))}
          />
        </div>
      </div>

      <div className="filter-container">
        <p className="t-pri text-base">Availability</p>
        <RangePicker onChange={handleDate} />
      </div>

      <div className="filter-container">
        <p className="t-pri text-base">Minimum Rating</p>
        <Select
          placeholder="Any Rating"
          onChange={(value) =>
            setFilter(prev => ({
              ...prev,
              rating: value,
              pageNumber: 1,
            }))
          }
        >
          <Select.Option value={1}>⭐ 1+</Select.Option>
          <Select.Option value={2}>⭐ 2+</Select.Option>
          <Select.Option value={3}>⭐ 3+</Select.Option>
          <Select.Option value={4}>⭐ 4+</Select.Option>
          <Select.Option value={5}>⭐ 5</Select.Option>
        </Select>
      </div>
    </Card>
  );
};

export default FilterCard;
