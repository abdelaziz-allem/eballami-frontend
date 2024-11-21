"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreateGuest, Guest, UpdateGuest } from "../types/type";

export async function getGuests(): Promise<Guest[]> {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.get("/guest", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching guests:", error);
    throw new Error("Failed to fetch guests");
  }
}

export const createGuest = async (guestData: CreateGuest): Promise<Guest> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.post("/guest", guestData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating guest:", error);
    throw new Error("Failed to create guest");
  }
};

export async function updateGuest(
  guestId: number,
  updatedData: UpdateGuest
): Promise<Guest> {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.put(`/guest/${guestId}`, updatedData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating guest:", error);
    throw new Error("Failed to update guest");
  }
}

export async function deleteGuest(id: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await axiosInstance.delete(`/guest/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting guest:", error);
    throw new Error("Failed to delete guest");
  }
}
