import { create } from "zustand";

type TotalCostState = {
  totalCost: number;
  setTotalCost: (cost: number) => void;
  resetTotalCost: () => void;
};

type BookingBalanceState = {
  bookingBalance: number;
  setBookingBalance: (cost: number) => void;
};

const useBookingBalanceStore = create<BookingBalanceState>((set) => ({
  bookingBalance: 0,
  setBookingBalance: (cost) => set({ bookingBalance: cost }),
}));

const useTotalCostStore = create<TotalCostState>((set) => ({
  totalCost: 0,
  setTotalCost: (cost) => set({ totalCost: cost }),
  resetTotalCost: () => set({ totalCost: 0 }),
}));

export { useTotalCostStore, useBookingBalanceStore };
