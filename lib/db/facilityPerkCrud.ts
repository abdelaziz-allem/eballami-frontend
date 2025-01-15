"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import {
  CreateFacilityPerk,
  FacilityPerk,
  UpdateFacilityPerk,
} from "../types/type";

export async function getFacilityPerks(): Promise<FacilityPerk[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/facilityPerk/all", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching facilityPerks:", error);
    throw new Error("Failed to fetch facilityPerks");
  }
}
export async function getFacilityPerk(
  id: number
): Promise<FacilityPerk | null> {
  if (!id) {
    throw new Error("FacilityPerks id is required");
  }
  const headers = getAuthHeaders();

  try {
    const response = await axiosInstance.get(`/facilityPerk/${id}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching facilityPerk:", error);
  }
}
export const createFacilityPerk = async (
  data: CreateFacilityPerk
): Promise<FacilityPerk> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.post("/facilityPerk", data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating facilityPerk:", error);
    throw new Error("Failed to create facilityPerk");
  }
};

export async function updateFacilityPerk(
  id: number,
  updatedData: UpdateFacilityPerk
): Promise<FacilityPerk> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.put(
      `/facilityPerk/${id}`,
      updatedData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating facilityPerk:", error);
    throw new Error("Failed to update facilityPerk");
  }
}

export async function deleteFacilityPerk(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/facilityPerks/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting facilityPerk:", error);
    throw new Error("Failed to delete facilityPerk");
  }
}
