import axiosInstance from "../../../utils/axiosConfig";
import { schedule } from "../../../utils/interface";

export const saveSchedule = async (data: schedule) => {
    const url = `/Schedules`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}

export const updateSchedule = async (id: string, data: schedule) => {
    const url = `/Schedules/${id}`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export const deleteSchedule = async (id: string) => {
    const url = `/Schedules/${id}`;
    const response = await axiosInstance.delete(url);

    return Promise.resolve(response);
}

export const getSchedule = async () => {
    const url = `/Schedules`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getScheduleDay = async (dayOfWeek: number) => {
    const url = `/Schedules/day/${dayOfWeek}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getWorkerSchedule = async (workerId: string) => {
    const url = `/Schedules/worker/${workerId}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}///api/Schedules/worker/{workerId}/day/{dayOfWeek}

export const getWorkerScheduleDay = async (workerId: string, dayOfWeek: number) => {
    const url = `/Schedules/worker/${workerId}/day/${dayOfWeek}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}