import axiosInstance from "../../../utils/axiosConfig";

// //////////////////////////////Service Worker/////////////////////////////////
interface IParams {
  pageNumber: number; 
  pageSize: number;
  StatusFilter?: number;
  TimePeriod?: number;
}

export const getWorkerPayouts = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  StatusFilter?: number,
  TimePeriod?: number,
) => {
  const params: IParams = {
    pageNumber,
    pageSize,
  };

  if (StatusFilter) params.StatusFilter = StatusFilter;
  if (TimePeriod) params.TimePeriod = TimePeriod;
  const url = `/ServiceWorker/payouts`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export const getAWorkerPayout = async (id: string) => {
  const url = `/ServiceWorker/payouts/${id}`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getWorkerPayments = async (
    pageNumber: number = 1,
    pageSize: number = 10,
    StatusFilter?: number,
    TimePeriod?: number,
) => {
    const params: IParams = {
      pageNumber,
      pageSize,
    };

    if (StatusFilter) params.StatusFilter = StatusFilter;
    if (TimePeriod) params.TimePeriod = TimePeriod;
    const url = `/ServiceWorker/payments`;
    const response = await axiosInstance.get(url, { params });

    return Promise.resolve(response);
}

export const getWorkerFee = async (
    pageNumber: number = 1,
    pageSize: number = 10,
    StatusFilter?: number,
    TimePeriod?: number,
) => {
    const params: IParams = {
      pageNumber,
      pageSize,
    };

    if (StatusFilter) params.StatusFilter = StatusFilter;
    if (TimePeriod) params.TimePeriod = TimePeriod;
    const url = `/ServiceWorker/fees`;
    const response = await axiosInstance.get(url, { params });

    return Promise.resolve(response);
}

export const getWorkerBankInfo = async () => {
  const url = `/StripeConnect/bank-info`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const createStripeAccount = async () => {
  const url = `/StripeConnect/create-account`;
  const response = await axiosInstance.post(url);

  return Promise.resolve(response);
}

export const onBoardWorkerOnStripe = async () => {
  const url = `/StripeConnect/onboarding-link`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}