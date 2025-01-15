"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreateGallery, Gallery, UpdateGallery } from "../types/type";

export async function getGallery(): Promise<Gallery[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/gallery", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching gallerys:", error);
    throw new Error("Failed to fetch gallerys");
  }
}

export async function getOneGallery(id: number): Promise<Gallery | null> {
  if (!id) {
    throw new Error("Gallerys id is required");
  }
  const headers = getAuthHeaders();

  try {
    const response = await axiosInstance.get(`/gallery/${id}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching gallery:", error);
  }
}
export const createImage = async (
  facilityImageData: CreateGallery
): Promise<Gallery> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.post("/gallery", facilityImageData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating gallery:", error);
    throw new Error("Failed to create gallery");
  }
};

export async function updateImage(
  facilityImageId: number,
  updatedData: UpdateGallery
): Promise<Gallery> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.put(
      `/gallery/${facilityImageId}`,
      updatedData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating gallery:", error);
    throw new Error("Failed to update gallery");
  }
}

export async function deleteGallery(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/gallerys/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    throw new Error("Failed to delete gallery");
  }
}
