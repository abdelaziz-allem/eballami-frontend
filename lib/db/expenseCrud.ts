"use server";

import { axiosInstance, getAuthHeaders } from "./axiosInstance";
import {
  CreateExpense,
  Expense,
  MonthlyExpenses,
  UpdateExpense,
} from "../types/type";

export async function getExpenses(
  from?: string,
  to?: string
): Promise<Expense[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get("/expense", {
      headers,
      params: {
        ...(from && { from }),
        ...(to && { to }),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw new Error("Failed to fetch expenses");
  }
}

export async function getExpensesByMonth(): Promise<MonthlyExpenses[]> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.get(`/expense/monthly`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw new Error("Failed to fetch payments");
  }
}

export const createExpense = async (
  expenseData: CreateExpense
): Promise<Expense> => {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.post("/expense", expenseData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating expense:", error);
    throw new Error("Failed to create expense");
  }
};

export async function updateExpense(
  expenseId: number,
  updatedData: UpdateExpense
): Promise<Expense> {
  const headers = getAuthHeaders();
  try {
    const response = await axiosInstance.put(
      `/expense/${expenseId}`,
      updatedData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw new Error("Failed to update expense");
  }
}

export async function deleteExpense(id: number): Promise<void> {
  const headers = getAuthHeaders();
  try {
    await axiosInstance.delete(`/expense/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw new Error("Failed to delete expense");
  }
}
