"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreatePerk, Perk, UpdatePerk } from "../types/type";

export async function getPerks(): Promise<Perk[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/perk/all", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching perks:", error);
    throw new Error("Failed to fetch perks");
  }
}

export async function getPerk(id: number): Promise<Perk | null> {
  if (!id) {
    throw new Error("Perks id is required");
  }
  const headers = getAuthHeaders();

  try {
    const response = await axiosInstance.get(`/perk/${id}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching perk:", error);
  }
}
export const createPerk = async (data: CreatePerk): Promise<Perk> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.post("/perk", data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating perk:", error);
    throw new Error("Failed to create perk");
  }
};

export async function updatePerk(
  id: number,
  updatedData: UpdatePerk
): Promise<Perk> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.put(`/perk/${id}`, updatedData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating perk:", error);
    throw new Error("Failed to update perk");
  }
}

export async function deletePerk(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/perks/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting perk:", error);
    throw new Error("Failed to delete perk");
  }
}
