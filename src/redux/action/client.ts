import axiosInstance from "../../../utils/axiosConfig";
import { userProfile } from "../../../utils/interface";


export const getClientProfile = async () => {
    const url = `/ClientUser/profile`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const updateClientProfile = async (data: userProfile) => {
    const url = `/ClientUser/profile`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export const getClientUser = async (id: string) => {
    const url = `/ClientUser/user/${id}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getClientUsers = async (id: string) => {
    const url = `/ClientUser/${id}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getClientUserCompletion = async () => {
    const url = `/ClientUser/profile/completion`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}