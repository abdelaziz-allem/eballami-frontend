"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import {
  CreateBooking,
  Booking,
  UpdateBooking,
  BookingStatus,
} from "../types/type";

export async function getBookings(
  bookingStatus?: BookingStatus,
  isFalse?: false
): Promise<Booking[]> {
  const headers = getAuthHeaders();
  try {
    if (bookingStatus && isFalse === undefined) {
      const response = await axiosInstance.get(
        `/booking?status=${bookingStatus}`,
        { headers }
      );
      return response.data;
    } else if (bookingStatus && isFalse === false) {
      const response = await axiosInstance.get(
        `/booking?status=CheckedIn&isfalse=false`,
        {
          headers,
        }
      );
      return response.data;
    }
    const response = await axiosInstance.get("/booking", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching Bookings:", error);
    throw new Error("Failed to fetch Bookings");
  }
}

export const getBooking = async (id: number): Promise<Booking> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get(`/booking/${id}`, { headers });

    return response.data;
  } catch (error) {
    console.error("Error fetching Booking:", error);
    throw new Error("Failed to fetch Booking");
  }
};

export const createBooking = async (
  BookingData: CreateBooking
): Promise<Booking> => {
  const headers = getAuthHeaders();
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
  const headers = getAuthHeaders();
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
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/Booking/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting Booking:", error);
    throw new Error("Failed to delete Booking");
  }
}
