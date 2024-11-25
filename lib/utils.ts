import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RoomStatus, TaskStatus } from "./types/type";

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
      return `bg-green-500`;
    case RoomStatus.AVAILABLE:
      return `bg-blue-500`;
    case RoomStatus.MAINTENANCE:
      return `bg-red-500`;
    default:
      return `bg-gray-500`;
  }
};

export const getRoomTaskStatusColor = (status: string, part: string) => {
  switch (status) {
    case TaskStatus.DONE:
      return `${part}-green-500`;
    case TaskStatus.PENDING:
      return `${part}-blue-500`;
    case TaskStatus.CANCELLED:
      return `${part}-red-500`;
    default:
      return `${part}-gray-500`;
  }
};
