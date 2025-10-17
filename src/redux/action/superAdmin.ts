import axiosInstance from "../../../utils/axiosConfig";
import { approveUser, bulkApprove } from "../../../utils/interface";


export const getSuperAdmins = async () => {
    const url = `/SuperAdmin/users`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getASuperAdmin = async (userId: string) => {
    const url = `/SuperAdmin/users/${userId}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getSuperAdminStat = async () => {
    const url = `/SuperAdmin/statistics`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const approveUsers = async (data: approveUser) => {
    const url = `/SuperAdmin/users/approve`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export const bulkUserApprove = async (data: bulkApprove) => {
    const url = `/SuperAdmin/users/bulk-approve`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}