"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreateUser, User, UpdateUser } from "../types/type";

export async function getUsers(): Promise<User[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/user/all", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUserInSession(): Promise<User | null> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/user/me", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUser(
  id?: number,
  mobileNumber?: string
): Promise<User | null> {
  const headers = getAuthHeaders();

  try {
    if (id || mobileNumber) {
      const params = new URLSearchParams();
      if (id) params.append("id", id.toString());
      if (mobileNumber) params.append("mobileNumber", mobileNumber);

      const response = await axiosInstance.get(`/user/one`, {
        headers,
        params,
      });

      return response.data;
    } else {
      throw new Error("Either id or mobileNumber must be provided.");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}

export const createUser = async (userData: CreateUser): Promise<User> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.post("/auth/register", userData, {
      headers,
    });
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
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.put(`/user/${userId}`, updatedData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return Promise.reject(new Error("Failed to update user"));
  }
}

export async function deleteUser(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/user/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}
