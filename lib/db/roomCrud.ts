"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreateRoom, Room, RoomStatus, UpdateRoom } from "../types/type";

export async function getRooms(status?: RoomStatus): Promise<Room[]> {
  const headers = getAuthHeaders();
  try {
    if (status) {
      const response = await axiosInstance.get(`/room?status=${status}`, {
        headers,
      });
      return response.data;
    }
    const response = await axiosInstance.get(`/room`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms");
  }
}

export const createRoom = async (roomData: CreateRoom): Promise<Room> => {
  const headers = getAuthHeaders();
  try {
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
  const headers = getAuthHeaders();
  try {
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
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/room/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting room:", error);
    throw new Error("Failed to delete room");
  }
}
