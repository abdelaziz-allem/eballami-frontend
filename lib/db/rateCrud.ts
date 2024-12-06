"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreateRate, Rate, UpdateRate } from "../types/type";

export async function getRates(): Promise<Rate[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/rate", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw new Error("Failed to fetch rates");
  }
}

export async function getLatestRateOfBooking(bookingId: number): Promise<Rate> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get(`/rate/latest/${bookingId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw new Error("Failed to fetch rates");
  }
}

export async function getRatesOfBooking(bookingId: number): Promise<Rate[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get(`/rate/booking/${bookingId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw new Error("Failed to fetch rates");
  }
}

export const createRate = async (rateData: CreateRate): Promise<Rate> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.post("/rate", rateData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating rate:", error);
    throw new Error("Failed to create rate");
  }
};

export async function updateRate(
  rateId: number,
  updatedData: UpdateRate
): Promise<Rate> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.put(`/rate/${rateId}`, updatedData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating rate:", error);
    throw new Error("Failed to update rate");
  }
}

export async function deleteRate(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/rate/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting rate:", error);
    throw new Error("Failed to delete rate");
  }
}
