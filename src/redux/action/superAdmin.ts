import axiosInstance from "../../../utils/axiosConfig";
import { approveUser, bulkApprove, IAdminUserProfile } from "../../../utils/interface";


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

export const getAdminProfile = async () => {
    const url = `/SuperAdmin/get-profile`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const updateAdminProfile = async (data: FormData) => {
    const url = `/SuperAdmin/edit-profile`;
    const response = await axiosInstance.put(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return Promise.resolve(response);
}

export const updateAdminProfilePic = async (data: FormData) => {
    const url = `/SuperAdmin/edit-profile`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}///api/SuperAdmin/system/general

export const getAdminGeneralSettings = async () => {
    const url = `/SuperAdmin/system/general`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const updateAdminGeneralSettings = async (data: FormData) => {
    const url = `/SuperAdmin/system/general`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export interface IService {
  "name": "string",
  "commisionRate": 0,
  "description": "string"
}

export const getAllServices = async () => {
    const url = `/ServiceCategories`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const createServiceCategory = async (data: IService) => {
    const url = `/ServiceCategories`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}

export const editServiceCategory = async (id:string | number, data: IService) => {
    const url = `/ServiceCategories/${id}`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export const activateDeactivateServices = async (id:string | number) => {
    const url = `/ServiceCategories/${id}/activate-deactivate`;
    const response = await axiosInstance.put(url);

    return Promise.resolve(response);
}

export const deleteServicesCategory = async (id:string|number) => {
    const url = `/ServiceCategories/${id}`;
    const response = await axiosInstance.delete(url);

    return Promise.resolve(response);
}