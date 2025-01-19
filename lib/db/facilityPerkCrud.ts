"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import {
  CreateFacilityPerk,
  FacilityPerk,
  UpdateFacilityPerk,
} from "../types/type";

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
    throw new Error(error.response.data.message);
  }
};

export async function deleteFacilityPerk(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/facilityPerk/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting facilityPerk:", error);
    throw new Error("Failed to delete facilityPerk");
  }
}
