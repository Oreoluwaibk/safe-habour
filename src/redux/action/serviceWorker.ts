import axiosInstance from "../../../utils/axiosConfig";
import { IServiceDetail } from "../../../utils/interface";
// import { userProfile } from "../../../utils/interface";


export const getServiceWorkerProfile = async () => {
    const url = `/ServiceWorker/profile`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}//api/ServiceWorker/profile

export const getServiceWorkerMetrics = async () => {
    const url = `/ServiceWorker/walletdashboard`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const updateServiceWorkerProfile = async (data: FormData) => {
    const url = `/ServiceWorker/profile`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export const updateServiceWorkerRate = async (data: IServiceDetail) => {
    const url = `/ServiceWorker/service-rate`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export const editServiceWorkerProfile = async (data: FormData) => {
    const url = `/ServiceWorker/update`;
    const response = await axiosInstance.put(url, data, { headers: { "Content-Type": "multipart/form-data"}});

    return Promise.resolve(response);
}

export const getServiceWorkerUser = async (id: string) => {
    const url = `/ServiceWorker/user/${id}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getServiceWorkerUsers = async (id: string) => {
    const url = `/ServiceWorker/${id}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getServiceWorkerUserCompletion = async () => {
    const url = `/ServiceWorker/profile/completion`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getServiceWorkerByUserID = async (userId: string) => {
    const url = `/ServiceWorker/by-user/${userId}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getServiceWorkerStatus = async (userId: string) => {
    const url = `/ServiceWorker/profile-status/${userId}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}