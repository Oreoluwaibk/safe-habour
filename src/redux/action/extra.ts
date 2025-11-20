import axios from "axios";
import axiosInstance from "../../../utils/axiosConfig";
import { INotificationSetting } from "../../../utils/interface";

export const getLanguages = async () => {
    const url = `https://api.languagetoolplus.com/v2/languages`;
    const response = await axios.get(url);

    return Promise.resolve(response);
}

export const getServiceCategories = async () => {
    const url = `/ServiceCategories`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getNotificationSettings = async () => {
    const url = `/Authentication/notification-settings`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getPushNotifications = async (pageNumber: number = 1, pageSize: number = 10) => {
    const params: {
        pageNumber: number;
        pageSize: number;
    } = {
      pageNumber,
      pageSize,
    };
    const url = `/PushNotification/my-notifications`;
    const response = await axiosInstance.get(url, { params });

    return Promise.resolve(response);
}///api/PushNotification/mark-all-as-read

export const markNotificationAsRead = async () => {
    const url = `/PushNotification/mark-all-as-read`;
    const response = await axiosInstance.post(url, {});

    return Promise.resolve(response);
}

export const markNotificationOneAsRead = async (data: {ids: string[], markAll: boolean}) => {
    const url = `/PushNotification/mark-as-read`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}

export const updateNotificationSetting = async (data: INotificationSetting) => {
    const url = `/Authentication/notification-settings`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

