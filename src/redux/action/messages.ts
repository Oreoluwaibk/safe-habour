import axiosInstance from "../../../utils/axiosConfig";

export const sendMessage = async (data: {message: string;applicationId:string}) => {
    const url = `/Message/send`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}

export const getMessages = async (id: string) => {
    const url = `/Message/message/${id}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getMessageHistory = async (id: string) => {
    const url = `/Message/${id}/history`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getAllMessages = async () => {
    const url = `/Message/chats`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getUnreadMessageCount = async (id: string) => {
    const url = `/Message/${id}/unread-count`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}
