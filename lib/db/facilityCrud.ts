"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreateFacility, Facility, UpdateFacility } from "../types/type";

export async function getFacilities(): Promise<Facility[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/facility/all", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching facilitys:", error);
    throw new Error("Failed to fetch facilitys");
  }
}

export async function getFacility(
  facilityId: number
): Promise<Facility | null> {
  const headers = getAuthHeaders();

  try {
    const response = await axiosInstance.get(`/facility/${facilityId}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching facility:", error);
  }
}
export const createFacility = async (
  facilityData: CreateFacility
): Promise<Facility> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.post("/facility", facilityData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating facility:", error.response.data.message);
    throw new Error("Failed to create facility");
  }
};

export async function updateFacility(
  id: number,
  updatedData: UpdateFacility
): Promise<Facility> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.put(`/facility/${id}`, updatedData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating facility:", error);
    throw new Error("Failed to update facility");
  }
}

export async function deleteFacility(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/facility/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting facility:", error);
    throw new Error("Failed to delete facility");
  }
}
