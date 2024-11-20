"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreateUser, User, UpdateUser } from "../types/type";

export async function getUsers(): Promise<User[]> {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.get("/user", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export const createUser = async (userData: CreateUser): Promise<User> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.post("/user", userData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export async function updateUser(
  userId: number,
  updatedData: UpdateUser
): Promise<User> {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.put(`/user/${userId}`, updatedData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await axiosInstance.delete(`/user/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}
