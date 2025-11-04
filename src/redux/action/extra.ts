import axios from "axios";
import axiosInstance from "../../../utils/axiosConfig";

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

export const updateNotificationSetting = async (data: any) => {
    const url = `/Authentication/notification-settings`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

