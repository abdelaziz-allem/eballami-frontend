"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import {
  CreateUserFacility,
  UserFacility,
  UpdateUserFacility,
} from "../types/type";

export async function getUserFacilities(): Promise<UserFacility[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/userFacility/all", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching userFacilitys:", error);
    throw new Error("Failed to fetch userFacilities");
  }
}

export async function getUserFacility(
  id: number
): Promise<UserFacility | null> {
  if (!id) {
    throw new Error("UserFacility id is required");
  }
  const headers = getAuthHeaders();

  try {
    const response = await axiosInstance.get(`/userFacility/${id}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching userFacility:", error);
  }
}
export const createUserFacility = async (
  data: CreateUserFacility
): Promise<UserFacility> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.post("/userFacility", data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating userFacility:", error);
    throw new Error("Failed to create userFacility");
  }
};

export async function updateUserFacility(
  id: number,
  updatedData: UpdateUserFacility
): Promise<UserFacility> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.put(
      `/userFacility/${id}`,
      updatedData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating userFacility:", error);
    throw new Error("Failed to update userFacility");
  }
}

export async function deleteUserFacility(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/userFacilitys/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting userFacility:", error);
    throw new Error("Failed to delete userFacility");
  }
}
