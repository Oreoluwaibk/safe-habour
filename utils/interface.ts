export interface signinReducer {
    user: any,
    isAuthenticated: boolean,
    token: any,
    tokenExpiry: any;
    loading: boolean,
    success: boolean,
    error: any,
    authentication?: {}
    loginType?: string | null
} 

export interface loginData {
    email: string;
    password: string;
}

export interface registerPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  clientType?: number;
  latitude: number | null;
  longitude: number | null;
  bio?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  dateOfBirth?: string;
  services?: [
    {
      name: string;
      description: string;
      category: string;
      isActive: boolean;
    }
  ],
  languages?: [
    {
      name: string;
      code: string;
      proficiencyLevel: string;
      isNative: boolean
    }
  ],
  hourlyRate?: number;
}

export interface userProfile {
  UserId: string;
  FirstName?: string;
  LastName?:string;
  PhoneNumber?: string;
  DateOfBirth?: string;
  Gender?: string;
  Bio?: string;
  ProfilePicture?: string;
  StreetAddress?: string;
  City?: string
  Country?: string
  PostalCode?: string
  Latitude?: number;
  Longitude?: number;
  ClientType?: number
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string | null;
  gender: string | null;
  bio: string | null;
  profilePicturePath: string | null;
  streetAddress: string | null;
  city: string | null;
  country: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
  isProfileComplete: boolean;
  isVerified: boolean;
  emailConfirmed: boolean;
  isActive: boolean;
  roles: string[];
  isStripeConnectEnabled: boolean;
  hasIdentificationDocument: boolean;
  hasLocationDocument: boolean;
  isTwoFactorAuthenticationEnabled: boolean;
  isServiceWorkerOnboarded: boolean | null;
  notificationSettings: any[]; // or define a NotificationSetting type if structure known
}

export interface Service {
  name: string;
  description: string;
  category: string;
  isActive: boolean;
}

export interface Language {
  name: string;
  code: string;
  longCode: string;
  isNative?: boolean;
}

export interface WorkerProfile {
  bio: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  services: {
    serviceCategoryIds: number[];
  }[];
  languages: Language[] | string[];
  hourlyRate: number;
  latitude: number;
  longitude: number;
  step?: number;
}

export interface serviceWorkerProfile {
  UserId: string;
  FirstName?: string;
  LastName?:string;
  PhoneNumber?: string;
  DateOfBirth?: string;
  Gender?: string;
  Bio?: string;
  ProfilePicture?: string;
  StreetAddress?: string;
  City?: string
  Country?: string
  PostalCode?: string
  Latitude?: number;
  Longitude?: number;
  ClientType?: number
}

export interface notificationSettings {
  userId: string;
  notificationType: number;
  emailNotificationEnabled: boolean;
  inAppNotificationEnabled: boolean;
}

export interface jobs {
  id?: string;
  serviceCategory: number;
  jobTitle: string;
  jobDescription: string;
  dateNeeded: string;
  timePreference: number;
  isReocurringJob: boolean;
  reoccurringDays?: number[];
  location: string;
  budget: number;
}

export interface jopApply {
  jobId: string;
  message: string;
  proposedRate: number;
}

export interface hireWorker {
  serviceWorkerId: string;
  jobId: string;
  message: string;
  proposedRate: number;
}

export interface acceptInvite {
  applicationId: string;
  message: string;
  negotiatedRate: number;
}

export interface rejectInvite {
  applicationId: string;
  rejectionReason: string;
  message: string;
}

export interface schedule {
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
  isAvailable?: boolean;
  notes?: string;
}

export interface approveUser {
  userIds: string[];
  isApproved: boolean;
  reason: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string | null;
  bio: string | null;
  gender: string | null;
  city: string | null;
  country: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
  dateOfBirth: string; // ISO string e.g. "0001-01-01T00:00:00"
  isActive: boolean;
  isVerified: boolean;
  isProfileComplete: boolean;
  hasIdentificationDocument: boolean;
  hasLocationDocument: boolean;
  isStripeConnectEnabled: boolean;
  isTwoFactorAuthenticationEnabled: boolean;
  isServiceWorkerOnboarded: boolean | null;
  roles: string[];
  notificationSettings: any[]; // You can replace with a proper type if defined
  profilePicturePath: string | null;
}

export interface bulkApprove {
  approveOnlyActiveUsers: boolean;
  approveOnlyCompleteProfiles: boolean;
  reason: string;
}

export interface languageType {
  name: string;
  code: string;
  longCode: string;  
}

export interface categoryType {
    id: number;
    name: string;
    description: string;
  }