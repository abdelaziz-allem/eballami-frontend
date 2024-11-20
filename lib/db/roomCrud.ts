"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreateRoom, Room, UpdateRoom } from "../types/type";

export async function getRooms(): Promise<Room[]> {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.get("/room", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }
}

export const createRoom = async (roomData: CreateRoom): Promise<Room> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.post("/room", roomData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw new Error("Failed to create room");
  }
};

export async function updateRoom(
  roomId: number,
  updatedData: UpdateRoom
): Promise<Room> {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.put(`/room/${roomId}`, updatedData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating room:", error);
    throw new Error("Failed to update room");
  }
}

export async function deleteRoom(id: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await axiosInstance.delete(`/room/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting room:", error);
    throw new Error("Failed to delete room");
  }
}
