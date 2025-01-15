import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BookingStatus, ROLE } from "./types/type";
import timeList from "@/app/dashboard/manage/timeList";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateTime: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateTime));
}

export const getRoleColor = (status: ROLE) => {
  switch (status) {
    case ROLE.ADMIN:
      return "bg-primary_color-500 hover:bg-primary_color-600 ";
    case ROLE.OWNER:
      return "bg-blue-500 hover:bg-blue-600 ";
    case ROLE.USER:
      return "bg-sky-500 hover:bg-sky-600 ";
    default:
      return "bg-gray-500 hover:bg-gray-600 ";
  }
};

export const getDayStatus = (isActive: boolean) => {
  switch (isActive) {
    case true:
      return "bg-primary_color-500 hover:bg-primary_color-600 ";
    case false:
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600 ";
  }
};

export const getTimeInBetween = (startTime: number, endTime: number) => {
  const period = [];
  for (let i = startTime; i <= endTime; i++) {
    const nextHour = (i + 1) % 24;
    period.push(`${timeList[i].label}-${timeList[nextHour].label}`);
  }
  return period;
};

export const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.BOOKED:
      return "bg-emerald-500 hover:bg-emerald-600";
    case BookingStatus.RESCHEDULED:
      return "bg-secondary_color-500 hover:bg-secondary_color-600";

    case BookingStatus.CANCELLED:
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};
