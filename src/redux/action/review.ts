import axiosInstance from "../../../utils/axiosConfig";
import { review } from "../../../utils/interface";

export const getWorkerReview = async (id: string) => {
    const url = `/Review/serviceworker/${id}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getWorkerJobReview = async (id: string) => {
    const url = `/Review/job/${id}/serviceworker-review`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getClientReview = async (id: string) => {
    const url = `/Review/client/${id}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getClientJobReview = async (id: string) => {
    const url = `/Review/job/${id}/client-review`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const postWorkerJobReview = async (data: review) => {
    const url = `/Review/serviceworker/review-client`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}

export const postClientJobReview = async (data: review) => {
    const url = `/Review/client/review-serviceworker`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}