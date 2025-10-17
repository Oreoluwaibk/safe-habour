import axiosInstance from "../../../utils/axiosConfig";

export const sendMessage = async (id: string, message: string) => {
    const url = `/Message/${id}/send`;
    const response = await axiosInstance.post(url, { message });

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

export const getUnreadMessageCount = async (id: string) => {
    const url = `/Message/${id}/unread-count`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}
