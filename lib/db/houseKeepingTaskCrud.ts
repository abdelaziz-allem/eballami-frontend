"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import {
  CreateHousekeepingTask,
  HousekeepingTask,
  UpdateHousekeepingTask,
} from "../types/type";

export async function getHousekeepingTasks(): Promise<HousekeepingTask[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/housekeeping", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching housekeeping tasks:", error);
    throw new Error("Failed to fetch housekeeping tasks");
  }
}

export const createHousekeepingTask = async (
  taskData: CreateHousekeepingTask
): Promise<HousekeepingTask> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.post("/housekeeping", taskData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating housekeeping:", error);
    throw new Error("Failed to create housekeeping task");
  }
};

export async function updateHousekeepingTask(
  housekeepingTaskId: number,
  updatedData: UpdateHousekeepingTask
): Promise<HousekeepingTask> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.put(
      `/housekeeping/${housekeepingTaskId}`,
      updatedData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating housekeeping:", error);
    throw new Error("Failed to update housekeeping");
  }
}

export async function deleteHousekeepingTask(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/housekeeping/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting housekeeping:", error);
    throw new Error("Failed to delete housekeeping");
  }
}
