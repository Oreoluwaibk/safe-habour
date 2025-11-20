import axiosInstance from "../../../utils/axiosConfig";
import { acceptInvite, completeJob, IJobHireRequest, jobs, jopApply, rejectInvite } from "../../../utils/interface";

interface IParams {
  pageNumber: number; 
  pageSize: number;
  search?: string;
  SearchTerm?: string;
  CreatedFrom?: string;
  CreatedTo?: string;
  NeededFrom?: string;
  NeededTo?: string;
  PreferredStartDate?: string;
  PreferredEndDate?: string;
  Status?: number | undefined;
  serviceTypeIds?: number[],
  maxPrice?:number | undefined,
  minPrice?:number | undefined,
  availability?: boolean;
  rating?: number;
  location?: string;
  from?: string;
  to?: string;
  Rating?: string;
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
  serviceTypeIds?: number[],
  maxPrice?:number | undefined,
  minPrice?:number | undefined,
  rating?: number,
  location?: string,
  from?: string,
  to?: string,
) => {
  const params: IParams = {
    pageNumber,
    pageSize,
  };

  if (search) params.SearchTerm = search;
  if (from) params.NeededFrom = from;
  if (to) params.NeededTo = to;
  if (serviceTypeIds) params.serviceTypeIds = serviceTypeIds;
  if (maxPrice) params.maxPrice = maxPrice;
  if (minPrice) params.minPrice = minPrice;
  if (location) params.location = location;
  if (rating) params.rating = rating;
  
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

export const completeJobAsWorker = async (data: completeJob) => {
  const url = `/Job/serviceworker/complete`;
  const response = await axiosInstance.post(url, data);

  return Promise.resolve(response);
}

export const completeJobAsClient = async (data: completeJob) => {
  const url = `/Job/client/complete`;
  const response = await axiosInstance.post(url, data);

  return Promise.resolve(response);
}


/////////////////////////////////JOB APPLICATION //////////////////////////////////////////////////////////////
export const applyForAJob = async (data: jopApply) => {
    const url = `/JobApplication/apply`;
    const response = await axiosInstance.post(url, data);

    return Promise.resolve(response);
}

export const getWorkersApplications = async (
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

export const getJobApplicationsByStatus = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  Status?: number
) => {
  const url = `/JobApplication/all`;

  const params: {
    pageNumber: number,
    pageSize: number,
    Status?: number
  } = {
    pageNumber,
    pageSize,
    Status
  };

  if (Status !== undefined) params.Status = Status;

  const response = await axiosInstance.get(url, { params });
  return Promise.resolve(response);
};

export const getUpcomingJobs = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  IsUpcomingJobs: boolean = true
) => {
  const url = `/JobApplication/all`;

  const params: {
    pageNumber: number,
    pageSize: number,
    IsUpcomingJobs: boolean;
  } = {
    pageNumber,
    pageSize,
    IsUpcomingJobs
  };

  const response = await axiosInstance.get(url, { params });
  return Promise.resolve(response);
};

export const getServiceWorkerUpcomingJobs = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  IsUpcomingJobs: boolean = true
) => {
  const url = `/JobApplication/serviceworker/applications`;

  const params: {
    pageNumber: number,
    pageSize: number,
    IsUpcomingJobs: boolean;
  } = {
    pageNumber,
    pageSize,
    IsUpcomingJobs
  };

  const response = await axiosInstance.get(url, { params });
  return Promise.resolve(response);
};

export const getServiceWorkerJobHistory = async (
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  const url = `/JobApplication/serviceworker/completed-history`;

  const params: {
    pageNumber: number,
    pageSize: number
  } = {
    pageNumber,
    pageSize,
  };

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

export const getSingleJobApplication = async (
  id: string, 
  pageNumber: number = 1,
  status?: number
) => {
    const params: {
      pageNumber: number
      status?: number,
    } = {
      pageNumber,
    };
    if (status !== undefined) params.status = status;
    const url = `/JobApplication/job/${id}`;
    const response = await axiosInstance.get(url, { params });

    return Promise.resolve(response);
}

export const acceptJobApplication = async (id: string) => {
  const url = `/JobApplication/application/${id}/accept`;
  const response = await axiosInstance.put(url);

  return Promise.resolve(response);
}

export const rejectJobApplication = async (data: {applicationId: string;rejectionReason: string;}) => {
  const url = `/JobApplication/reject`;
  const response = await axiosInstance.post(url, data);

  return Promise.resolve(response);
}

export const cancelJobApplication = async (data: {applicationId: string;cancellationReason: string;}) => {
  const url = `/JobApplication/cancel`;
  const response = await axiosInstance.post(url, data);

  return Promise.resolve(response);
}

export const hireServiceWorker = async (data: IJobHireRequest) => {
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