import axiosInstance from "../../../utils/axiosConfig";
import { acceptInvite, hireWorker, jobs, jopApply, rejectInvite } from "../../../utils/interface";

interface IParams {
  pageNumber: number; 
  pageSize: number;
  search?: string;
  CreatedFrom?: string;
  CreatedTo?: string;
  PreferredStartDate?: string;
  PreferredEndDate?: string;
  Status?: number | undefined
}
export const getClientJobs = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  search?: string,
  CreatedFrom?: string,
  CreatedTo?: string,
  PreferredStartDate?: string,
  PreferredEndDate?: string,
) => {
    const params: { 
      pageNumber: number; 
      pageSize: number;
      search?: string;
      CreatedFrom?: string;
      CreatedTo?: string;
      PreferredStartDate?: string;
      PreferredEndDate?: string;
      Status?: number | undefined
    } = {
      pageNumber,
      pageSize,
    };

    if (search) params.search = search;
    if (CreatedFrom) params.CreatedFrom = CreatedFrom;
    if (CreatedTo) params.CreatedTo = CreatedTo;
    if (PreferredStartDate) params.PreferredStartDate = PreferredStartDate;
    if (PreferredEndDate) params.PreferredEndDate = PreferredEndDate;
    const url = `/Job/client/jobs`;
    const response = await axiosInstance.get(url, { params });

    return Promise.resolve(response);
}

export const getAllJobs = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  search?: string,
  CreatedFrom?: string,
  CreatedTo?: string,
  PreferredStartDate?: string,
  PreferredEndDate?: string,
) => {
    const params: IParams = {
      pageNumber,
      pageSize,
    };

    if (search) params.search = search;
    if (CreatedFrom) params.CreatedFrom = CreatedFrom;
    if (CreatedTo) params.CreatedTo = CreatedTo;
    if (PreferredStartDate) params.PreferredStartDate = PreferredStartDate;
    if (PreferredEndDate) params.PreferredEndDate = PreferredEndDate;
    
    const url = `/Job/all`;
    const response = await axiosInstance.get(url, { params });

    return Promise.resolve(response);
}

export const getAJob = async (id: string) => {
    const url = `/Jobs/${id}`;
    const response = await axiosInstance.get(url, { baseURL: "https://safeharbour.azurewebsites.net" });

    return Promise.resolve(response);
}

export const postAJob = async (data: jobs) => {
    const url = `/job`;
    const response = await axiosInstance.post(url, data, { baseURL: "https://safeharbour.azurewebsites.net" });

    return Promise.resolve(response);
}


/////////////////////////////////JOB APPLICATION //////////////////////////////////////////////////////////////
export const applyForAJob = async (data: jopApply) => {
    const url = `/JobApplication/apply`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}

export const getJobApplications = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  search?: string,
  CreatedFrom?: string,
  CreatedTo?: string,
  PreferredStartDate?: string,
  PreferredEndDate?: string,
  Status?: number
) => {
  const url = `/JobApplication/serviceworker/applications`;

  const params: { 
    pageNumber: number; 
    pageSize: number;
    search?: string;
    CreatedFrom?: string;
    CreatedTo?: string;
    PreferredStartDate?: string;
    PreferredEndDate?: string;
    Status?: number | undefined
  } = {
    pageNumber,
    pageSize,
  };

  if (search) params.search = search;
  if (CreatedFrom) params.CreatedFrom = CreatedFrom;
  if (CreatedTo) params.CreatedTo = CreatedTo;
  if (PreferredStartDate) params.PreferredStartDate = PreferredStartDate;
  if (PreferredEndDate) params.PreferredEndDate = PreferredEndDate;
  if (Status !== undefined) params.Status = Status;

  const response = await axiosInstance.get(url, { params });
  return Promise.resolve(response);
};

export const getAllJobApplications = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  search?: string,
  CreatedFrom?: string,
  CreatedTo?: string,
  PreferredStartDate?: string,
  PreferredEndDate?: string,
  Status?: number
) => {
  const url = `/JobApplication/all`;

  const params: {
    pageNumber: number,
    pageSize: number,
    search?: string,
    CreatedFrom?: string,
    CreatedTo?: string,
    PreferredStartDate?: string,
    PreferredEndDate?: string,
    Status?: number
  } = {
    pageNumber,
    pageSize,
  };

  if (search) params.search = search;
  if (CreatedFrom) params.CreatedFrom = CreatedFrom;
  if (CreatedTo) params.CreatedTo = CreatedTo;
  if (PreferredStartDate) params.PreferredStartDate = PreferredStartDate;
  if (PreferredEndDate) params.PreferredEndDate = PreferredEndDate;
  if (Status !== undefined) params.Status = Status;

  const response = await axiosInstance.get(url, { params });
  return Promise.resolve(response);
};

export const getJobServiceApplications = async (
  id: string| number,
  pageNumber: number = 1,
  pageSize: number = 10,
  search?: string,
  CreatedFrom?: string,
  CreatedTo?: string,
  PreferredStartDate?: string,
  PreferredEndDate?: string,
  Status?: number
) => {
  const url = `/JobApplication/job`;

  const params: {
    id: string| number,
  pageNumber: number
  pageSize: number
  search?: string,
  CreatedFrom?: string,
  CreatedTo?: string,
  PreferredStartDate?: string,
  PreferredEndDate?: string,
  Status?: number
  } = {
    id,
    pageNumber,
    pageSize,
  };

  if (search) params.search = search;
  if (CreatedFrom) params.CreatedFrom = CreatedFrom;
  if (CreatedTo) params.CreatedTo = CreatedTo;
  if (PreferredStartDate) params.PreferredStartDate = PreferredStartDate;
  if (PreferredEndDate) params.PreferredEndDate = PreferredEndDate;
  if (Status !== undefined) params.Status = Status;

  const response = await axiosInstance.get(url, { params });
  return Promise.resolve(response);
};

export const getAJobApplication = async (id: string) => {
    const url = `/JobApplication/application/${id}`;
    const response = await axiosInstance.get(url);

    return Promise.resolve(response);
}

export const AcceptJobApplication = async (id: string) => {
    const url = `/JobApplication/application/${id}/accept`;
    const response = await axiosInstance.put(url);

    return Promise.resolve(response);
}

export const hireServiceWorker = async (data: hireWorker) => {
    const url = `/JobApplication/hire-service-worker`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}

export const acceptWorkInvite = async (data: acceptInvite) => {
    const url = `/JobApplication/accept-hire-invitation`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}

export const rejectWorkInvite = async (data: rejectInvite) => {
    const url = `/JobApplication/reject-hire-invitation`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}