import axios from "axios";
import { cookies } from "next/headers";

export const axiosInstance = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getAuthHeaders() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("Access token is missing");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}
