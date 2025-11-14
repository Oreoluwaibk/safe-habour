import axiosInstance from "../../../utils/axiosConfig";

export interface IClientParams {
  pageNumber: number; 
  pageSize: number;
  searchTerm?: string;
  TimePeriod?: number;
  status?: string;
  minHourlyRate?: number | null;
  maxHourlyRate?: number | null;
  isAvailable?: boolean;
  latitude?: number;
  longitude?: number;
  location?: string;
}


export const getClientProfile = async () => {
    const url = `/ClientUser/profile`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const updateClientProfile = async (data: FormData) => {
    const url = `/ClientUser/profile`;
    const response = await axiosInstance.put(url, data);

    return Promise.resolve(response);
}

export const getClientUser = async (id: string) => {
    const url = `/ClientUser/user/${id}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getClientBookings = async (pageNumber: number = 1, pageSize: number = 1, status: number = 1) => {
    const params: { pageNumber: number, pageSize: number, status: number } = {
        pageNumber,
        pageSize,
        status
    };
    const url = `/JobApplication/client/bookings`;
    const response = await axiosInstance.get(url, { params });

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

export const getClientMetrics = async () => {
    const url = `/ClientUser/dashboard`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const getServiceWorkerByCategory = async (
    data: { serviceNames: string[]},
    pageNumber: number = 1,
    pageSize: number = 8,
    searchTerm?: string,
    location?: string,
    minHourlyRate?: number | null,
    maxHourlyRate?: number | null,
    latitude?: number,
    longitude?: number,
) => {
    const params: IClientParams = {
        pageNumber,
        pageSize,
        minHourlyRate,
        maxHourlyRate,
        latitude,
        longitude,
        searchTerm,
        location
    //   isAvailable,
    };

    if (minHourlyRate) params.minHourlyRate = minHourlyRate;
    if (maxHourlyRate) params.maxHourlyRate = maxHourlyRate;
    if (latitude) params.latitude = latitude;
    if (longitude) params.longitude = longitude;
    if(searchTerm) params.searchTerm = searchTerm;
    if(location) params.location = location;
    
    // if(isAvailable) params.isAvailable = is
    const url = `/ServiceWorker/search`;
    const response = await axiosInstance.post(url, data, { params });

    return Promise.resolve(response);
}