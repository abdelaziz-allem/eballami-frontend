"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import {
  CreateBooking,
  Booking,
  UpdateBooking,
  BookingStatus,
} from "../types/type";

const headers = getAuthHeaders();

export async function getBookings(
  BookingStatus?: BookingStatus
): Promise<Booking[]> {
  try {
    if (BookingStatus) {
      const response = await axiosInstance.get(
        `/Booking?status=${BookingStatus}`,
        { headers }
      );
      return response.data;
    }
    const response = await axiosInstance.get("/Booking", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching Bookings:", error);
    throw new Error("Failed to fetch Bookings");
  }
}

export const createBooking = async (
  BookingData: CreateBooking
): Promise<Booking> => {
  try {
    const response = await axiosInstance.post("/Booking", BookingData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating Booking:", error);
    throw new Error("Failed to create Booking");
  }
};

export async function updateBooking(
  BookingId: number,
  updatedData: UpdateBooking
): Promise<Booking> {
  try {
    const response = await axiosInstance.put(
      `/Booking/${BookingId}`,
      updatedData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Booking:", error);
    throw new Error("Failed to update Booking");
  }
}

export async function deleteBooking(id: number): Promise<void> {
  try {
    await axiosInstance.delete(`/Booking/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting Booking:", error);
    throw new Error("Failed to delete Booking");
  }
}
