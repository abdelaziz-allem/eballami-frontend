"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreateUserFacility, UserFacility } from "../types/type";

export async function getUserFacilities(): Promise<UserFacility[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/userFacility/all", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching userFacilities:", error);
    throw new Error("Failed to fetch userFacilities");
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
    throw new Error(error.response.data.message);
  }
};

export async function deleteUserFacility(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/userFacility/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting userFacility:", error);
    throw new Error("Failed to delete userFacility");
  }
}
