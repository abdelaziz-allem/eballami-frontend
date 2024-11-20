"use server";

import { axiosInstance } from "./axiosInstance";
import { AuthType } from "../types/type";

interface AuthResponse {
  access_token: string;
}

export const getAccessToken = async (
  userData: AuthType
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error authenticating user:",
      error.response?.data || error.message
    );
    throw new Error("Failed to authenticate user");
  }
};
