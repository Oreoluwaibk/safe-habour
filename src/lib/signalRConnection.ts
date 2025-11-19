import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const createSignalRConnection = (token?: string) => {
  if (!connection) {
    const builder = new signalR.HubConnectionBuilder();

    if (token) {
      builder.withUrl(process.env.NEXT_PUBLIC_SIGNALR_URL as string, {
        accessTokenFactory: () => token,
        withCredentials: true,
      });
    } else {
      builder.withUrl(process.env.NEXT_PUBLIC_SIGNALR_URL as string);
    }

    connection = builder
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  return connection;
};

export const getConnection = () => connection;
