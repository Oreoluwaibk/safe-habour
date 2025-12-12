import axiosInstance from "../../../utils/axiosConfig";

export interface IAdminParams {
  pageNumber?: number; 
  pageSize?: number;
  searchTerm?: string;
  IsProfileComplete?: boolean;
  IsProfileApproved?: boolean;
  IsVerified?: boolean;
  TimePeriod?: number;
  IsActive?: boolean;
  UserType?: string;
  CreatedFrom?: string;
  CreatedTo?: string;
  Status?: number;
  NeededFrom?: string;
  NeededTo?: string;
  Date?: string;
  IsAdminAction?: boolean;
//   status?: string;
//   minHourlyRate?: number | null;
//   maxHourlyRate?: number | null;
//   isAvailable?: boolean;
//   latitude?: number;
//   longitude?: number;
//   location?: string;
}

export interface ApproveUser {
  userIds: string[];
  isApproved: true;
  reason: string;
}

export const getUsers = async (
  pageNumber: number = 1, 
  pageSize: number = 10, 
  UserType: string,
  searchTerm?: string
) => {
  const params: IAdminParams = {
    pageNumber,
    pageSize,
    UserType
  };

  if(searchTerm) params.searchTerm = searchTerm;
  const url = `/SuperAdmin/users`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export const getAUsers = async (userId: string) => {
  const url = `/SuperAdmin/users/${userId}`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const approveAUsers = async (data: ApproveUser) => {
  const url = `/SuperAdmin/users/approve`;
  const response = await axiosInstance.put(url, data);

  return Promise.resolve(response);
}

export interface BulkApprove {
  approveOnlyActiveUsers: boolean;
  approveOnlyCompleteProfiles: boolean;
  reason: string; 
}
export const bulkApprove = async (data: BulkApprove) => {
  const url = `/SuperAdmin/users/bulk-approve`;
  const response = await axiosInstance.put(url, data);

  return Promise.resolve(response);
}

export const getAdminStats = async () => {
  const url = `/SuperAdmin/statistics`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getActivityLogs = async () => {
  const url = `/SuperAdmin/audit-logs`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getAdminPermissions = async () => {
  const url = `/SuperAdmin/permissions`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getAdminRoles = async (searchTerm?: string) => {

  console.log("Sss", searchTerm);
  
  const params: IAdminParams = {}
  if(searchTerm) params.searchTerm = searchTerm;
  const url = `/SuperAdmin/roles`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export interface IRoles {
  name: string;
  description: string;
  permissionIds: string[];
  roleId?: string;
  isActive?: boolean;
  createdAt?: string;
  id?: string;
  isAdminRole?: boolean;
}
export const createAdminRoles = async (data: IRoles) => {
  const url = `/SuperAdmin/roles`;
  const response = await axiosInstance.post(url, data);

  return Promise.resolve(response);
}

export const getAnAdminRoles = async (role_id: string) => {
  const url = `/SuperAdmin/roles/${role_id}`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const updateAnAdminRoles = async (role_id: string, data:IRoles) => {
  const url = `/SuperAdmin/roles/${role_id}`;
  const response = await axiosInstance.put(url, data);

  return Promise.resolve(response);
}

export const getAdminAuditLogMetrics = async () => {
  const url = `/SuperAdmin/audit-logs/metrics`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getAdminAuditLogs = async (pageNumber: number =1, pageSize:number = 10, search?: string, isAdminAction?: boolean) => {
  const params: IAdminParams = {
    pageNumber,
    pageSize
  }
  if(search) params.searchTerm = search;
  if(isAdminAction) params.IsAdminAction = isAdminAction;
  const url = `/SuperAdmin/audit-logs`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export const getDashboardAdminStats = async () => {
  const url = `/SuperAdmin/dashboard-metrics`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getAdminFinanceStats = async () => {
  const url = `/SuperAdmin/financial-metrics`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getAdminTransactionSummary = async () => {
  const url = `/SuperAdmin/transaction-summary`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getAdminEscrowFunds = async () => {
  const url = `/SuperAdmin/escrow-funds`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getAdminRevenueBreakdown = async () => {
  const url = `/SuperAdmin/revenue-breakdown`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getAdminFinancialBreakdown = async () => {
  const url = `/SuperAdmin/financial-breakdown`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getAdminPopularServiceAndSatisfaction = async () => {
  const url = `/SuperAdmin/popular-services-and-satisfaction`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getAdminWorkerAvailability = async (pageNumber: number =1, pageSize:number = 10, Date?: string) => {
   const params: IAdminParams = {
    pageNumber,
    pageSize
  }
  if(Date) params.Date = Date;
  const url = `/SuperAdmin/worker-availability`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export const getAdminFees = async (time?: number, search?: string) => {
  const params: IAdminParams = {}
   if(search) params.searchTerm = search;
  if(time) params.TimePeriod = time;
  const url = `/SuperAdmin/fees`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export const getAdminTransactionLogs = async (pageNumber: number =1, pageSize:number = 10, search?: string) => {
  const params: IAdminParams = {
    pageNumber,
    pageSize
  }
  if(search) params.searchTerm = search;
  const url = `/SuperAdmin/transaction-log`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export const getAdminFeesStat = async (time?: number, search?: string) => {
  const params: IAdminParams = {}
  if(search) params.searchTerm = search;
  if(time) params.TimePeriod = time;
  const url = `/SuperAdmin/fees/stats`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export const getAFee = async (id: string) => {
  const url = `/SuperAdmin/fees/${id}`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getClientPendingVerification = async (pageNumber: number =1, pageSize:number = 10, search?: string) => {
  const params: IAdminParams = {
    pageNumber,
    pageSize
  }
  if(search) params.searchTerm = search;
  const url = `/SuperAdmin/verifications/pending/client-user`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export const getServiceWOrkerPendingVerification = async (pageNumber: number =1, pageSize:number = 10, search?: string) => {
  const params: IAdminParams = {
    pageNumber,
    pageSize,
  }

  if(search) params.searchTerm = search;
  const url = `/SuperAdmin/verifications/pending/service-worker`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export const getAVerification = async (userId: string) => {
  const url = `/SuperAdmin/verifications/pending/${userId}`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const getSuperAdminJobs = async (
  pageNumber: number =1, 
  pageSize:number = 10, 
  search?: string, 
  Status?: number,
  CreatedFrom?: string,
  CreatedTo?: string,
  NeededFrom?: string,
  NeededTo?: string
) => {
  const params: IAdminParams = {
    pageNumber,
    pageSize,
  }

  if(search) params.searchTerm = search;
  if(NeededFrom) params.NeededFrom = NeededFrom;
  if(NeededTo) params.NeededTo = NeededTo;
  if(Status) params.Status = Status;
  if(CreatedFrom) params.CreatedFrom = CreatedFrom;
  if(CreatedTo) params.CreatedTo = CreatedTo;

  const url = `/SuperAdmin/job`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export const getASuperadminJob = async (jobId: string) => {
  const url = `/SuperAdmin/job/${jobId}`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}

export const completeASuperadminJob = async (jobId: string) => {
  const url = `/SuperAdmin/job/${jobId}/complete`;
  const response = await axiosInstance.post(url, {});

  return Promise.resolve(response);
}

export const cancelASuperadminJob = async (jobId: string) => {
  const url = `/SuperAdmin/job/${jobId}/cancel`;
  const response = await axiosInstance.post(url, {});

  return Promise.resolve(response);
}

export interface SuspendUser {
  userId: string;
  suspensionReason: string;
}

export interface UnSuspendUser {
  userId: string;
  reason: string;
}

export const suspendAUser = async (data: SuspendUser) => {
  const url = `/SuperAdmin/users/suspend`;
  const response = await axiosInstance.put(url, data);

  return Promise.resolve(response);
}

export const unSuspendAUser = async (data: UnSuspendUser) => {
  const url = `/SuperAdmin/users/unsuspend`;
  const response = await axiosInstance.put(url, data);

  return Promise.resolve(response);
}

export const getAdminUsers = async (
  pageNumber: number =1, 
  pageSize:number = 10, 
  search?: string, 
  IsProfileComplete?: boolean,
  IsProfileApproved?: boolean,
  IsVerified?: boolean,
  IsActive?: boolean,
  CreatedFrom?: string,
  CreatedTo?: string,
) => {
  const params: IAdminParams = {
    pageNumber,
    pageSize
  }

  if(search) params.searchTerm = search;
  if(IsProfileComplete) params.IsProfileComplete = IsProfileComplete;
  if(IsProfileApproved) params.IsProfileApproved = IsProfileApproved;
  if(IsVerified) params.IsVerified = IsVerified;
  if(IsActive) params.IsActive = IsActive;
  if(CreatedFrom) params.CreatedFrom = CreatedFrom;
  if(CreatedTo) params.CreatedTo = CreatedTo;
  const url = `/SuperAdmin/admin-users`;
  const response = await axiosInstance.get(url, { params });

  return Promise.resolve(response);
}

export interface IAdminCreateUser {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  userId?: string;
  isActive?: boolean;
}

export const createAdminUser = async (data: IAdminCreateUser) => {
  const url = `/SuperAdmin/admin-users`;
  const response = await axiosInstance.post(url, data);

  return Promise.resolve(response);
}

export const editAnAdminUser = async (user_id:string, data: IAdminCreateUser) => {
  const url = `/SuperAdmin/admin-users/${user_id}`;
  const response = await axiosInstance.put(url, data);

  return Promise.resolve(response);
}

export const disableAnAdminUser = async (user_id: string) => {
  const url = `/SuperAdmin/admin-users/${user_id}/disable`;
  const response = await axiosInstance.post(url, {});

  return Promise.resolve(response);
}

export const enableAnAdminUser = async (user_id: string) => {
  const url = `/SuperAdmin/admin-users/${user_id}/enable`;
  const response = await axiosInstance.post(url, {});

  return Promise.resolve(response);
}

export const getAdminReports = async () => {
  const url = `/SuperAdmin/reporting`;
  const response = await axiosInstance.get(url);

  return Promise.resolve(response);
}