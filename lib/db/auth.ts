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
  } catch (error) {
    console.error("Error authenticating user:" + error);
    throw new Error("Failed to authenticate user");
  }
};
