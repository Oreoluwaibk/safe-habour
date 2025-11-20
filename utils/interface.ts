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
    lastRoute: null | string
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
  isIdentityDocumentApproved: boolean;
  hasLocationDocument: boolean;
  isTwoFactorAuthenticationEnabled: boolean;
  isServiceWorkerOnboarded: boolean | null;
  hourlyRate: number;
  notificationSettings: INotificationSetting[];

  services: IServiceDetail[];
  languages: ILanguage[];
}
export interface INotificationSetting {
  id?: string;
  notificationType?: number;
  notificationTypeName?: string;
  emailNotificationEnabled?: boolean;
  inAppNotificationEnabled?: boolean;
}
export interface Service {
  name: string;
  description: string;
  category: string;
  isActive: boolean;
}

export interface INotification {
  id?: string;
  title: string;
  message: string;
  type: number;
  typeName?: string;
  priority?: number;
  priorityName?: string;
  data?: {
    [key: string]: any;
  };
  actionUrl?: string;
  iconUrl?: string;
  requiresAction?: boolean;
  isRead?: boolean;
  isDelivered?: boolean;
  expiresAt?: string;
  createdAt?: string;
  readAt?: string;
  deliveredAt?: string;
  timestamp?: string;

}

export interface IBooking {
  applicationId: string;
  jobId: string;
  serviceWorkerId: string;
  serviceWorkerFullName: string;
  bio: string;
  status: number;
  hourlyRate: number;
  location: string;
  photoUrl: string;
  dateCreated: string;
  totalRating: number;
  numberOfReviews: number;
}


export interface Language {
  name: string;
  code: string;
  longCode: string;
  isNative?: boolean;
  proficiencyLevel?: string;
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
  client?: {
    name: string;
    imageUrl: string;
    createdAt: string;
    isVerified: boolean;
  }
  createdAt?: string;
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

export enum HireType {
  OneTime = 0,
  Recurring = 1,
}

export interface IJobHireRequest {
  serviceWorkerId: string;
  serviceCategoryId?: number;
  budget?: number;
  hireType: HireType;
  preferredStartDate: string;
  timePreference: number;
  reoccurringDays?: number[];
  proposedRate: number;
  paymentMethodId?: string;
}

export interface acceptInvite {
  applicationId: string;
  message: string;
  negotiatedRate: number;
}

export interface completeJob {
  jobId: string;
  completionNotes: string;
}

export interface rejectInvite {
  applicationId: string;
  rejectionReason: string;
  message: string;
}

export interface schedule {
  dayOfWeek: number | null | string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  notes?: string;
  id?: string | null;
  scheduleDate: string;
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
// types/job.ts

export interface JobDetails {
  applicantCount: number;
  id: string;
  serviceCategoryId: number;
  createdAt: string;
  dateNeeded: string;
  jobTitle: string;
  isReocurringJob: boolean;
  timePreference: number;
  location: string;
  reoccurringDays: string[];
  budget: number;
  jobDescription: string;
  clientId: string;
  status: number;
  isHireDirectly: boolean;
}

export interface IClient {
  name: string;
  imageUrl: string;
  createdAt: string;
  isVerified: boolean;
  reviews: review[]; // You can replace `any` with a proper review type if available
}

export interface IJobApplication {
  id: string;
  jobId: string;
  message: string;
  proposedRate: number;
  status: number;
  createdAt: string;
  acceptedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  jobDetails: JobDetails;
  client?: IClient | null;
}

export interface PushNotificationPayload {
  title: string;
  message: string;
  data?: any;
  createdAt?: string;
}

export interface EarningsSummary {
  totalGrossEarnings: number;
  totalPlatformFees: number;
  totalEarnings: number;
  clearedBalance: number;
  pendingInEscrow: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  percentageChangeFromLastMonth: number;
  changeDescription: string;
  totalCompletedJobs: number;
  responseRate: number;
  responseRateDescription: string;
  totalFeesPaid: number;
  currentMonth: MonthlyEarnings;
  previousMonth: MonthlyEarnings;
}

export interface MonthlyEarnings {
  jobsCompleted: number;
  grossEarnings: number;
  platformFees: number;
  netEarnings: number;
  totalEarnings: number;
  feesPaid: number;
  year: number;
  month: number;
  monthName: string;
}

export interface review {
  jobId: string;
  rating: number;
  comment: string;
  isPublic: boolean;
}


export interface PaymentTransaction {
  id: string;
  jobId?: string;                     // optional (not in payouts)
  clientId?: string;                  // optional (not in payouts)
  serviceWorkerId: string;
  serviceWorkerName?: string;
  amount: number;
  currency?: string;                  // new from payout
  status: number;
  statusDescription: string;
  stripePaymentIntentId?: string;     // optional (not in payouts)
  stripeChargeId?: string;            // optional (not in payouts)
  stripePayoutId?: string;            // new from payout
  payoutType?: string;                // new from payout
  balanceTransactionId?: string;      // new from payout
  bankAccountId?: string;             // new from payout
  bankAccountLast4?: string;          // new from payout
  jobTitle?: string;
  serviceTypeName?: string;
  clientName?: string;
  createdAt: string;
  authorizedAt?: string;              // only in transactions
  capturedAt?: string;                // only in transactions
  transferredAt?: string;             // only in transactions
  refundedAt?: string;                // only in transactions
  paidAt?: string;                    // only in payouts
  arrivalDate?: string;               // only in payouts
  canceledAt?: string;                // only in payouts
  failedAt?: string;                  // only in payouts
  refundAmount?: number;              // only in transactions
  failureCode?: string;               // only in payouts
  failureMessage?: string;            // only in payouts
  notes?: string;
}
export interface MessageUserDto {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePicturePath?: string | null;
  isVerified: boolean;
  lastMessage: string;
  sentAt: string; 
}
export interface IConversation {
  applicationId: string;
  otherUserId: string;
  otherUserName: string;
  otherUserProfilePicture: string;
  jobTitle: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface IUserMessageProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePicturePath: string;
  isVerified: boolean;
}

export interface IMessage {
  id?: string;
  applicationId: string;
  senderId: string;
  receiverId: string;
  sender: IUserMessageProfile;
  receiver: IUserMessageProfile;
  content: string;
  sentAt: string;
  isRead: boolean;
  readAt: string | null;
}
export interface MessageDto {
  id: string;
  applicationId: string;
  senderId: string;
  receiverId: string;
  sender?: MessageUserDto | null;
  receiver?: MessageUserDto | null;
  content: string;
  sentAt: string;       // ISO date string (was DateTime in C#)
  isRead: boolean;
  readAt?: string | null;  // nullable DateTime
}

export interface UserWorkerProfile {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string | null;
  bio: string;
  profilePicturePath: string | null;
  streetAddress: string;
  city: string | null;
  country: string | null;
  postalCode: string | null;
  latitude: number;
  longitude: number;

  // Updated to match new structure
  services: IServiceDetail[];

  // Languages remain the same
  languages: ILanguage[];

  hourlyRate: number | null;
  timeZone?: string | null;
  currency?: string | null;
  isOnboarded?: boolean;

  // Preserve previous optional fields (for compatibility)
  distanceKm?: number | null;
  averageRating?: number | null;
  reviewCount?: number;
  isAvailable?: boolean;
  isVerified?: boolean;
  joinedDate?: string;
  lastActiveDate?: string;
}

export interface IServiceDetail {
  serviceCategoryId: number;
  hourlyRate: number | null;
  yearsOfExperience: number | null;
  id?: string;
}

export interface ILanguage {
  name: string;
  code: string;
  proficiencyLevel: string | null;
  isNative: boolean | null;
}


export interface IClientDashboardMetrics {
  activeJobs: number;
  totalSpent: number;
  refundsIssued: number;
  pendingTransactions: number;
  totalTransactions: number;
  totalTransactionAmount: number;
  thisMonthTransactions: number;
  thisMonthAmount: number;
  lastMonthTransactions: number;
  lastMonthAmount: number;
  percentageChangeFromLastMonth: number;
  changeDescription: string;
  totalCompletedJobs: number;
  averageJobCost: number;
  currentMonth: IClientDashboardMonthMetrics;
  previousMonth: IClientDashboardMonthMetrics;
  activeJobsList: any[]; // Replace `any` with a job type if available
}
export interface IClientDashboardMonthMetrics {
  jobsCompleted: number;
  jobsPosted: number;
  transactionCount: number;
  totalSpent: number;
  averageJobCost: number;
  year: number;
  month: number;
  monthName: string;
}

// Enum to represent notification types
export enum NotificationType {
  // ===== CLIENT USER NOTIFICATIONS =====
  BookingUpdates = 1,
  Messages = 2,
  PaymentUpdates = 3,
  PromotionsAndMarketing = 4,
  PlatformUpdates = 5,
  System = 6,

  // ===== SERVICE WORKER NOTIFICATIONS =====
  JobMatches = 7,
  PaymentAlerts = 8,
  MarketingEmail = 9,
  EmailNotification = 10,
}

// Represents a single user notification preference record
export interface IUserNotificationPreference {
  id: string;
  notificationType: NotificationType;
  notificationTypeName:
    | keyof typeof NotificationType
    | string; // Example: "MarketingEmail"
  emailNotificationEnabled: boolean;
  inAppNotificationEnabled: boolean;
}

// Example: list of user notification preferences
export type IUserNotificationPreferences = IUserNotificationPreference[];

export const notificationDescriptions: Record<keyof typeof NotificationType, string> = {
  // ===== CLIENT USER NOTIFICATIONS =====
  BookingUpdates: "Changes to your bookings",
  Messages: "Receive emails when you get new messages from workers",
  PaymentUpdates: "Get notified about payment processing and receipts",
  PromotionsAndMarketing: "Tips, updates, and promotions",
  PlatformUpdates: "Get notified when there are updates on the platform",
  System: "General system notifications like account or policy changes",

  // ===== SERVICE WORKER NOTIFICATIONS =====
  JobMatches: "New jobs matching your skills",
  PaymentAlerts: "Earnings and payout notifications",
  MarketingEmail: "Tips, updates, and promotions",
  EmailNotification: "Receive notifications via email",
};

export interface IJobDetails {
  id: string;
  serviceCategoryId: number;
  createdAt: string;
  dateNeeded: string;
  jobTitle: string;
  isReocurringJob: boolean;
  timePreference: number;
  location: string;
  reoccurringDays: any[]; // You can type this better if you know the structure
  budget: number;
  jobDescription: string;
  clientId: string;
  status: number;
  isHireDirectly: boolean;
}

export interface IServiceWorker {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  photoUrl: string | null;
  bio: string;
  hourlyRate: number;
  location: string;
  totalRating: number;
  numberOfReviews: number;
}

export interface IClientApplicationDetails {
  id: string;
  jobId: string;
  serviceWorkerId: string;
  message: string;
  proposedRate: number;
  status: number;
  createdAt: string;
  acceptedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  jobDetails: IJobDetails;
  serviceWorker: IServiceWorker;
}


