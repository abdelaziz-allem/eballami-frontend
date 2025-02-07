"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import {
  CreateBooking,
  Booking,
  UpdateBooking,
  BookingStatus,
} from "../types/type";

export async function getBookings(facilityId: number): Promise<Booking[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get(
      `/booking/all?facilityId=${facilityId}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Bookings:", error);
    throw new Error("Failed to fetch Bookings");
  }
}

export async function getAvailableTimeByDate(
  facilityId: number,
  date: string
): Promise<{ id: number; dateTime: string }[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get(
      `/booking/available?facilityId=${facilityId}&date=${date}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Bookings:", error);
    throw new Error("Failed to fetch Bookings");
  }
}

export const getBookingsByDate = async (date: string): Promise<Booking[]> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get(`/booking/all/${date}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Bookings:", error);
    throw new Error("Failed to fetch Bookings");
  }
};

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
