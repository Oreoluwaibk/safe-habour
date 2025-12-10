"use client"
import { Button, Card, Drawer, Menu, MenuProps } from 'antd';
import React from 'react'
import { NavItem } from './Container';
import Image from 'next/image';
import { Logo } from '../../../assets/logo';
import { useRouter } from 'next/navigation';
import { CloseOutlined, DownOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

interface props {
    open: boolean;
    onCancel: () => void;
    active: string;
    // loading: boolean;
}
const AdminSideMenu = ({
    open,
    onCancel,
    active
    // loading
}: props) => {
     const router = useRouter();
    
    const items = [
        {
          label: "Overview",
          key: "Overview"
        },
        {
            label: "Users",
            key: "Users"
        },
        {
            label: "KYC Verification",
            key: "KYC Verification"
        },
        {
            label: "Job & Bookings",
            key: "Job & Bookings"
        },
        {
            label: "Financial",
            key: "Financial"
        },
        {
            label: "Transactions",
            key: "Transactions",
        },
        {
            label: "Analytics",
            key: "Analytics",
        },
        {
            label: "Worker Availability",
            key: "Worker Availability",
        },
        {
            label: "Role Based Access Control",
            key: "Role Based Access Control",
        },
        {
            label: "Audit Logs",
            key: "Audit Logs",
        },
        {
            label: "Settings",
            key: "Settings",
        },
    ];
    
    const handleChangeMenu = (value: any) => {
        if(value?.key === "Overview")  router.push("/dashboard/admin");
        if(value?.key === "Users")  router.push("/dashboard/admin/users");
        if(value?.key === "KYC Verification")  router.push("/dashboard/admin/kyc");
        if(value?.key === "Job & Bookings")  router.push("/dashboard/admin/jobs-bookings");
        if(value?.key === "Financial")  router.push("/dashboard/admin/financial");
        if(value?.key === "Transactions")  router.push("/dashboard/admin/transactions");
        if(value?.key === "Analytics")  router.push("/dashboard/admin/analytics");
        if(value?.key === "Worker Availability")  router.push("/dashboard/admin/worker-availability");
        if(value?.key === "Role Based Access Control")  router.push("/dashboard/admin/role-based-access-control");
        if(value?.key === "Audit Logs")  router.push("/dashboard/admin/audit-logs"); 
        if(value?.key === "Settings")  router.push("/dashboard/admin/settings"); 
    }
  return (
    <div className='bg-[#670316]! rounded-xl py-4'>
        <Menu 
            className="admin-side-menu"
            // defaultSelectedKeys={[name]}
            theme="light"
            mode="inline"
            // activeKey={active}
            selectedKeys={[active]}
            items={items}
            onClick={handleChangeMenu}
            expandIcon={({ isOpen }) => isOpen ? <DownOutlined /> :<RightOutlined />}
        />
    </div>
  )
}

export default AdminSideMenu