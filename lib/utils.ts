import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ROLE, RoomStatus, TaskStatus } from "./types/type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}

export const getRoomStatusColor = (status: RoomStatus) => {
  switch (status) {
    case RoomStatus.OCCUPIED:
      return `bg-emerald-500  hover:bg-emerald-600 text-white`;
    case RoomStatus.AVAILABLE:
      return `bg-primary_color-500  hover:bg-primary_color-600 text-white`;
    case RoomStatus.MAINTENANCE:
      return `bg-red-500 hover:bg-red-600 text-white`;
    default:
      return `bg-gray-500 hover:bg-gray-600 text-white`;
  }
};

export const getRoomTaskStatusColor = (status: string, part: string) => {
  switch (status) {
    case TaskStatus.DONE:
      return `${part}-emerald-500 text-white`;
    case TaskStatus.PENDING:
      return `${part}-sky-500 text-white`;
    case TaskStatus.CANCELLED:
      return `${part}-red-500 text-white`;
    default:
      return `${part}-gray-500 text-white`;
  }
};

export const getRoleColor = (status: ROLE) => {
  switch (status) {
    case ROLE.ADMIN:
      return "bg-primary_color-500 hover:bg-primary_color-600 text-white";
    case ROLE.RECEPTION:
      return "bg-sky-500 hover:bg-sky-600 text-white";
    case ROLE.HOUSEKEEPING:
      return " bg-emerald-500 hover:bg-emerald-600  text-white";
    case ROLE.HOUSEKEEPING_ADMIN:
      return "bg-pink-500 hover:bg-pink-600 text-white";
    default:
      return "bg-gray-500 hover:bg-gray-600 text-white";
  }
};

export const calculateNights = (checkInDate: string): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  const checkIn = new Date(checkInDate);
  const checkOut = new Date();
  return Math.round(
    Math.abs((checkIn.getTime() - checkOut.getTime()) / oneDay)
  );
};
