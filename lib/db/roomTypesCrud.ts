"use server";

import { CreateRoomType, RoomType, UpdateRoomType } from "../types/type";
import { axiosInstance, getAuthHeaders } from "./axiosInstance";

export async function getRoomTypes(): Promise<RoomType[]> {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.get("/room-type", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw new Error("Failed to fetch room types");
  }
}

export const createRoomType = async (
  roomTypeData: CreateRoomType
): Promise<RoomType> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.post("/room-type", roomTypeData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating room type:", error);
    throw new Error("Failed to create room type");
  }
};

export const updateRoomType = async (
  roomTypeId: number,
  roomTypeData: UpdateRoomType
): Promise<RoomType> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.put(
      `/room-type/${roomTypeId}`,
      roomTypeData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating room type:", error);
    throw new Error("Failed to update room type");
  }
};
