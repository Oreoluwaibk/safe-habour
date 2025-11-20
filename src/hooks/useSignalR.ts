// hooks/useSignalR.ts
import { useEffect, useCallback, useMemo } from "react";
// import { signalRService, Notification, ChatMessage } from "@/lib/signalr-service";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/hook";
import signalRService, { ChatMessage, Notification } from "@/lib/signalRConnection";
import { IMessage } from "../../utils/interface";

export function useSignalR() {
    const { user, token } = useAppSelector(state => state.auth); // user: { id: string, ... }, token: string | null

    useEffect(() => {
        if (!user || !token) return;
        let mounted = true;
        (async () => {
            try {
                await signalRService.startConnection(token, user.id);
                console.log("connetion started");
                
            } catch (err) {
                console.error("Failed to start SignalR:", err);
            }
        })();

        return () => {
            mounted = false;
            signalRService.stopConnection();
        };
    }, [user, token]);

    const subscribeToNotifications = useCallback((cb: (n: Notification) => void) => {
    signalRService.onNotification(cb);
    return () => signalRService.offNotification();
    }, []);

    const subscribeToMessages = useCallback((cb: (m: IMessage) => void) => {
        signalRService.onMessage(cb);
        return () => signalRService.offMessage();
    }, []);

    const isConnected = useMemo(() => signalRService.isConnected(), [signalRService.getConnectionState()]);

    return {
        isConnected,
        subscribeToNotifications,
        subscribeToMessages,
    };
}
