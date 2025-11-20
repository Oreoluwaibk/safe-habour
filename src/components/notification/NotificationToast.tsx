"use client";

import { useEffect } from "react";
import { useSignalR } from "@/hooks/useSignalR";
import { App } from "antd";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hook";

export default function NotificationToast() {
  const { subscribeToNotifications } = useSignalR();
  const { notification } = App.useApp();
  const router = useRouter();
  const { loginType } = useAppSelector(state => state.auth);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((notif) => {

      notification.open({
        message: notif.title,
        description: notif.message,
        placement: "topRight",
        duration: 5,
        onClick: () => {
          if(loginType === "ServiceWorker")
            router.push("/dashboard/worker/notification")
            else router.push("/dashboard/notification")
          }
        });
    });

    return unsubscribe;
  }, [subscribeToNotifications, notification, loginType, router]);

  return null;
}
