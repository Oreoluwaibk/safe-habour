import { categoryType } from "./interface";

export function toFormData(payload: Record<string, any>): FormData {
  // Use the browser FormData if available, otherwise fallback to a polyfill
  const formData = new (typeof window !== "undefined" ? FormData : (require("form-data") as any))();

  const appendFormData = (data: any, parentKey?: string) => {
    if (data && typeof data === "object" && !(data instanceof File) && !(data instanceof Blob)) {
      Object.keys(data).forEach((key) => {
        appendFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      formData.append(parentKey!, data == null ? "" : data);
    }
  };

  appendFormData(payload);
  return formData;
}

export const handleDisplayServices = (serviceIds: number, categories: categoryType[]): categoryType | undefined => {
  const selectedServices = categories
  .find(service => serviceIds === (service.id))

  return selectedServices;
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  const weeksAgo = Math.floor(daysAgo / 7);
  if (weeksAgo < 4) return `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  const yearsAgo = Math.floor(daysAgo / 365);
  return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
}

export function getRelativeDateLabel(dateString: string): string {
  const inputDate = new Date(dateString);
  const now = new Date();

  // Normalize to midnight for accurate day difference
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.floor(
    (inputDate.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / oneDay
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Tomorrow";
  if (diffInDays === -1) return "Yesterday";

  if (diffInDays > 1 && diffInDays < 7) return `In ${diffInDays} days`;
  if (diffInDays >= 7 && diffInDays < 14) return "1 week from now";
  if (diffInDays >= 14 && diffInDays < 21) return "2 weeks from now";
  if (diffInDays >= 21 && diffInDays < 30) return "3 weeks from now";
  if (diffInDays >= 30 && diffInDays < 60) return "1 month from now";
  if (diffInDays >= 60) return "More than a month from now";

  // Handle past dates
  if (diffInDays < -1 && diffInDays > -7) return `${Math.abs(diffInDays)} days ago`;
  if (diffInDays <= -7 && diffInDays > -14) return "1 week ago";
  if (diffInDays <= -14 && diffInDays > -21) return "2 weeks ago";
  if (diffInDays <= -21 && diffInDays > -30) return "3 weeks ago";
  if (diffInDays <= -30 && diffInDays > -60) return "1 month ago";
  if (diffInDays <= -60) return "More than a month ago";

  return "Invalid date";
}

export interface ScheduleItem {
  id: string;
  serviceWorkerId: string;
  dayOfWeek: string;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  notes: string;
  createdAt: string;
}

export interface GroupedSchedule {
  dayOfWeek: string;
  startTime: string[];
  endTime: string[];
  isAvailable: boolean[];
  id: string[];
  scheduleDate: string[];
}

export function groupSchedulesByDay(schedules: ScheduleItem[]): GroupedSchedule[] {
  const grouped: Record<
    string,
    { startTime: string[]; endTime: string[]; isAvailable: boolean[]; id: string[]; scheduleDate: string[];}
  > = {};

  // Group by dayOfWeek
  for (const schedule of schedules) {
    const day = schedule.dayOfWeek;

    if (!grouped[day]) {
      grouped[day] = { startTime: [], endTime: [], isAvailable: [], id: [], scheduleDate: [] };
    }

    grouped[day].startTime.push(schedule.startTime);
    grouped[day].endTime.push(schedule.endTime);
    grouped[day].isAvailable.push(schedule.isAvailable);
    grouped[day].id.push(schedule.id);
    grouped[day].scheduleDate.push(schedule.scheduleDate);
  }

  // Define order of days
  const dayOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Convert grouped object to array and sort by day order
  return Object.entries(grouped)
    .map(([dayOfWeek, data]) => ({
      dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
      isAvailable: data.isAvailable,
      id: data.id,
      scheduleDate: data.scheduleDate
    }))
    .sort(
      (a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek)
    );
}


