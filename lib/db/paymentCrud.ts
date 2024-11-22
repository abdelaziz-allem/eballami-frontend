"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import { CreatePayment, Payment, UpdatePayment } from "../types/type";

export async function getPayments(): Promise<Payment[]> {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.get("/payment", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw new Error("Failed to fetch payments");
  }
}

export const createPayment = async (
  paymentData: CreatePayment
): Promise<Payment> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.post("/payment", paymentData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw new Error("Failed to create payment");
  }
};

export async function updatePayment(
  paymentId: number,
  updatedData: UpdatePayment
): Promise<Payment> {
  try {
    const headers = await getAuthHeaders();
    const response = await axiosInstance.put(
      `/payment/${paymentId}`,
      updatedData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw new Error("Failed to update payment");
  }
}

export async function deletePayment(id: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await axiosInstance.delete(`/payment/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw new Error("Failed to delete payment");
  }
}
