"use client"
import React, { useMemo, useState } from "react";
import {
  Checkbox,
  Col,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Row,
} from "antd";
import {
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import SelectionCard from "./SelectionCard";

interface Props {
  selected: string[];
  setSelected: (items: string[]) => void;
  isLanguage?: boolean;
}

const allServices = [
  "Deep Cleaning",
  "Childcare",
  "Elder Care",
  "Pet Sitting",
  "Dog Walking",
  "Handyman Services",
  "Meal Preparation",
  "Laundry Service",
  "Snow Removal",
  "Cooking",
  "House Cleaning",
];

const allLanguages = ["English", "Français", "Spanish"];

const ItemSelect = ({ selected, setSelected, isLanguage }: Props) => {
  // const [search] = useState("");
  const [open, setOpen] = useState(false);

  // const dataList = isLanguage ? allLanguages : allServices;

  // const filteredList = useMemo(
  //   () =>
  //     dataList.filter((item) =>
  //       item.toLowerCase().includes(search.toLowerCase())
  //     ),
  //   [dataList, search]
  // );

  const handleToggleItem = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };
    const languageItem: MenuProps['items'] = 
    [ 
        { key: "search", label: <Input placeholder='Search' style={{ }} prefix={<SearchOutlined />} className='!rounded-[5px] !py-0  !bg-[#f6f6f6] border border-[#e2e2e2]' /> }, ...allLanguages.map((language, i) => {return { key: i.toString(), label: <Checkbox>{language}</Checkbox>, }}) 
    ] 
    const serviceItem: MenuProps['items'] = 
   [ 
    // ...allServices.map((service, i) => {return { key: i.toString(), label: <SelectionCard title={service} />, }}),
    {
        key: "extra",
        label: <Row className="!w-[400px]" gutter={[15, 15]}>{allServices.map((service: string, i: number) =><Col key={i} lg={8} sm={12} xs={24}> <SelectionCard title={service} /></Col>)}</Row>
    }

   ]

    // const menuItems: MenuProps["items"] = [
    //     {
    //     key: "search",
    //     label: (
    //         <Input
    //         placeholder="Search..."
    //         prefix={<SearchOutlined />}
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //         className="!rounded-[5px] !bg-[#f6f6f6] border border-[#e2e2e2] mb-2"
    //         />
    //     ),
    //     },
    //     ...filteredList.map((item, index) => ({
    //     key: item,
    //     label: (
    //         <Checkbox
    //         checked={selected.includes(item)}
    //         onChange={() => handleToggleItem(item)}
    //         >
    //         {item}
    //         </Checkbox>
    //     ),
    //     })),
    // ];

  return (
    <Flex wrap gap="small">
      {selected.map((item) => (
        <SelectionCard
          key={item}
          title={item}
          suffix={<CloseOutlined />}
          onClick={() => handleToggleItem(item)}
        />
      ))}
    <Dropdown
        open={open}
        onOpenChange={setOpen}
        trigger={["click"]}
        menu={{ items: isLanguage ? languageItem : serviceItem }}
        
        placement="top"
        getPopupContainer={(triggerNode) => triggerNode.parentElement as HTMLElement}
        >
        <div 
            className='rounded-full h-7 min-w-[128px] border border-[#707070] text-[#343434] px-1 flex items-center gap-2' 
            style={{cursor: "pointer"}} 
        >
            <PlusOutlined />
            <p>{isLanguage ? "Add Language" : "Add Service"}</p> 
        </div>
        </Dropdown>
    </Flex>
  );
};

export default ItemSelect;
