// lib/signalr-service.ts
import * as signalR from "@microsoft/signalr";
import { IMessage, IUserMessageProfile } from "../../utils/interface";

export interface Notification {
  title: string;
  message: string;
  type: number;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  applicationId: string;
  senderId: string;
  receiverId: string;
  sender?: IUserMessageProfile;
  receiver?: IUserMessageProfile;
  content: string;
  sentAt: string;
  isRead: boolean;
  readAt: string | null;
}

class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private isConnecting = false;

  // Build/start connection; handles token option safely (no undefined overload)
  async startConnection(token: string | null, userId: string): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) return;
    if (this.isConnecting) return;

    this.isConnecting = true;

    try {
      const url = process.env.NEXT_PUBLIC_SIGNALR_URL!;
      const builder = new signalR.HubConnectionBuilder();

      // call proper overload depending on token presence
      if (token) {
        builder.withUrl(url, {
          accessTokenFactory: () => token,
          transport:
            signalR.HttpTransportType.WebSockets |
            signalR.HttpTransportType.ServerSentEvents |
            signalR.HttpTransportType.LongPolling,
          withCredentials: true,
        });
      } else {
        // no auth token
        builder.withUrl(url, {
          transport:
            signalR.HttpTransportType.WebSockets |
            signalR.HttpTransportType.ServerSentEvents |
            signalR.HttpTransportType.LongPolling,
        });
      }

      this.connection = builder
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            if (retryContext.previousRetryCount === 0) return 0;
            if (retryContext.previousRetryCount === 1) return 2000;
            if (retryContext.previousRetryCount === 2) return 10000;
            return 30000;
          },
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.setupEventHandlers();

      await this.connection.start();
      console.log("✅ SignalR Connected successfully");

      // join user-specific group (Hub must implement)
      await this.joinUserGroup(userId);

      this.isConnecting = false;
    } catch (err) {
      this.isConnecting = false;
      console.error("❌ SignalR Connection Error:", err);
      throw err;
    }
  }

  private async joinUserGroup(userId: string) {
    if (!this.connection) return;
    try {
      await this.connection.invoke("JoinUserGroup", userId);
      console.log(`✅ Joined notification group: user_${userId}`);
    } catch (err) {
      console.warn("Could not join user group:", err);
    }
  }

  private setupEventHandlers() {
    if (!this.connection) return;

    this.connection.onreconnecting((err) =>
      console.warn("⚠️ SignalR reconnecting", err)
    );
    this.connection.onreconnected((connId) =>
      console.log("✅ SignalR reconnected:", connId)
    );
    this.connection.onclose((err) => {
      console.error("❌ SignalR closed:", err);
      this.isConnecting = false;
    });
  }

  onNotification(callback: (n: Notification) => void) {
    if (!this.connection) {
      console.warn("SignalR: not connected yet - onNotification skipped");
      return;
    }
    this.connection.on("ReceiveNotification", (payload: Notification) => {
      // Optionally validate/normalize here
      callback(payload as Notification);
    });
  }

  offNotification() {
    this.connection?.off("ReceiveNotification");
  }

  onMessage(callback: (m: IMessage) => void) {
    if (!this.connection) {
      console.warn("SignalR: not connected yet - onMessage skipped");
      return;
    }
    this.connection.on("ReceiveMessage", (payload: IMessage) => {
      console.log("Message recieved", payload);
      
      callback(payload as IMessage);
    });
  }

  offMessage() {
    this.connection?.off("ReceiveMessage");
  }

  async stopConnection() {
    if (!this.connection) return;
    try {
      await this.connection.stop();
      this.connection = null;
      console.log("✅ SignalR Disconnected");
    } catch (err) {
      console.error("❌ Error stopping SignalR:", err);
    }
  }

  getConnectionState(): signalR.HubConnectionState | null {
    return this.connection?.state ?? null;
  }

  isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }
}

export const signalRService = new SignalRService();
export default signalRService;
