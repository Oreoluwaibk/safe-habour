"use client";

import { useEffect, useState } from "react";
import { useSignalR } from "@/hooks/useSignalR";
// import type { Notification } from "@/lib/signalr-service";
import { BellFilled } from "@ant-design/icons";
import { Badge, Dropdown, Divider, Button } from "antd";
import { Notification } from "@/lib/signalRConnection";
import NotificationCard from "../general/NotificationCard";
import { markNotificationAsRead } from "@/redux/action/extra";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hook";

export function NotificationBell() {
    const { loginType } = useAppSelector(state => state.auth);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unread, setUnread] = useState(0);
    const router = useRouter();
    const { subscribeToNotifications } = useSignalR();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToNotifications((n) => {
            console.log("the new notification",n);
            
            setNotifications((prev) => [n, ...prev]);
            setUnread((u) => u + 1);
        });

        return unsubscribe;
    }, [subscribeToNotifications]);

    const handleClick = () => {
        setLoading(true);
        markNotificationAsRead()
        .then(res => {
            if(res.status === 200) {
                setUnread(0);
                setLoading(false)
            }
        })
        .catch(err => {
            setLoading(false);
            console.log("err", err);
        })
    }

    const items = [
    {
        key: "header",
        label: (
        <div className="flex justify-between items-center font-semibold">
            <span>Notifications</span>
            <Button 
                type="text" 
                loading={loading}
                 onClick={(e) => {
                    e.stopPropagation();
                    handleClick()
                }}
                disabled={notifications.length === 0}
            >
                Mark all read
            </Button>
        </div>
        ),
    },
    {
        key: "content",
        label: (
        <div className="max-h-80 overflow-y-auto hidescroll">
            {notifications.length === 0 ? (
            <div 
                className="text-[#121212] text-sm py-5 text-center"
            >
                No notifications
            </div>
            ) : (
            notifications.map((n, index) => (
                <div key={index}>
                <NotificationCard 
                    isFixed  
                    notification={n}
                    onClick={() => {
                        if(loginType === "ServiceWorker")
                        router.push("/dashboard/worker/notification")
                        else router.push("/dashboard/notification")
                    }}
                />
                {/* <div className="py-2">
                    <div className="font-medium text-sm">{n.title}</div>
                    <div className="text-xs text-gray-600">{n.message}</div>
                    <div className="text-[10px] text-gray-400 mt-1">
                    {new Date(n.timestamp).toLocaleString()}
                    </div>
                </div> */}
                {index !== notifications.length - 1 && <Divider size="small" />}
                </div>
            ))
            )}
        </div>
        ),
    },
    ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      overlayStyle={{ width: "400px" }}
    >
      <div className="cursor-pointer">
        <Badge count={unread}>
            <div className="icon-div icon-bg">
                <BellFilled className="!text-white !text-lg"/>
            </div>
        </Badge>
      </div>
    </Dropdown>
  );
}
