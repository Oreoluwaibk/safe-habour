"use client";

import { Button, Drawer, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CloseOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Logo } from "../../../assets/logo";

interface Props {
  open: boolean;
  onCancel: () => void;
  active: string;
  handleLogout: () => void;
  loading: boolean;
}

export default function AdminSideMenu({ active, onCancel, open, handleLogout, loading }: Props) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // --- Detect Screen Size (mobile/tablet vs desktop) ---
  useEffect(() => {
    const updateWidth = () => {
      setIsMobile(window.innerWidth < 768); // mobile + small tablets
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // --- Menu items ---
  const items = [
    { label: "Overview", key: "Overview", path: "/dashboard/admin" },
    { label: "Users", key: "Users", path: "/dashboard/admin/users" },
    { label: "KYC Verification", key: "KYC Verification", path: "/dashboard/admin/kyc" },
    { label: "Jobs & Bookings", key: "Job & Bookings", path: "/dashboard/admin/jobs-bookings" },
    { label: "Financial", key: "Financial", path: "/dashboard/admin/financial" },
    { label: "Transactions", key: "Transactions", path: "/dashboard/admin/transactions" },
    { label: "Analytics", key: "Analytics", path: "/dashboard/admin/analytics" },
    { label: "Worker Availability", key: "Worker Availability", path: "/dashboard/admin/worker-availability" },
    { label: "Role Based Access Control", key: "Role Based Access Control", path: "/dashboard/admin/role-based-access-control" },
    { label: "Audit Logs", key: "Audit Logs", path: "/dashboard/admin/audit-logs" },
    { label: "Settings", key: "Settings", path: "/dashboard/admin/settings" },
  ];

  // --- Click Handler (cleaner version) ---
  const handleMenuClick = (info: { key: string }) => {
    const found = items.find((x) => x.key === info.key);
    if (found?.path) router.push(found.path);

    if (isMobile) onCancel(); // close drawer after navigation
  };

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="bg-[#670316] rounded-xl py-4">
          <Menu
            className="admin-side-menu"
            theme="light"
            mode="inline"
            selectedKeys={[active]}
            items={items}
            onClick={handleMenuClick}
            expandIcon={({ isOpen }) =>
              isOpen ? <DownOutlined /> : <RightOutlined />
            }
          />
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobile && open && (
        <Drawer
          open={open}
          onClose={onCancel}
          placement="left"
          width={260}
          closeIcon={null}
          title={
            <div className="flex items-center justify-between">
              <Image src={Logo} alt="Safe Harbour" className="bg-white" />
              <CloseOutlined className="cursor-pointer" onClick={onCancel} />
            </div>
          }
        >
          {/* Admin Menu (Not Worker menu — FIXED) */}
          <Menu
            mode="inline"
            selectedKeys={[active]}
            items={items}
            onClick={handleMenuClick}
          />

          {/* Logout Button */}
          <div className="mt-6">
            <Button
              type="primary"
              className="!h-[50px] w-full !rounded-[50px] primary-bg !font-medium"
              onClick={handleLogout}
              loading={loading}
            >
              Logout
            </Button>
          </div>
        </Drawer>
      )}
    </>
  );
}
