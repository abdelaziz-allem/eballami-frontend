import { useTotalCostStore, useBookingBalanceStore } from "@/app/store";
import { getAllBookingPayments } from "@/lib/db/paymentCrud";
import { getRatesOfBooking } from "@/lib/db/rateCrud";
import { Rate } from "@/lib/types/type";
import React, { useEffect, useState } from "react";

// Helper function to get all dates between a start and end date
const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
  const dates: string[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Function to calculate daily costs based on rates
const calculateDailyCosts = (
  rates: Rate[]
): { date: string; cost: number }[] => {
  if (rates.length === 0) return [];

  const today = new Date(); // Current date

  // Get the earliest startDate and the latest endDate (using today if endDate is null)
  const startDate = new Date(rates[0].startDate.split("T")[0]); // First date
  const endDate = new Date(
    rates.reduce((latest, rate) => {
      // If endDate is null, treat it as today's date
      const effectiveEndDate = rate.endDate
        ? rate.endDate
        : today.toISOString();
      return new Date(effectiveEndDate) > new Date(latest)
        ? effectiveEndDate
        : latest;
    }, rates[0].startDate)
  );

  const allDates = getDatesInRange(startDate, endDate);

  return allDates.map((date) => {
    const dailyCost = rates.reduce((total, rate) => {
      const rateStart = new Date(rate.startDate.split("T")[0]);
      const rateEnd = rate.endDate
        ? new Date(rate.endDate.split("T")[0])
        : today; // Use current date if endDate is null

      // If the rate covers this date, add its cost
      if (rateStart <= new Date(date) && rateEnd >= new Date(date)) {
        total += parseFloat(rate.amount);
      }
      return total;
    }, 0);

    return { date, cost: dailyCost };
  });
};

const CalcDailyCost = ({ bookingId }: { bookingId: number }) => {
  const { totalCost, setTotalCost } = useTotalCostStore();
  const { setBookingBalance } = useBookingBalanceStore();
  const [paidAmount, setPaidAmount] = useState(0);

  const [dailyCosts, setDailyCosts] = useState<
    { date: string; cost: number }[]
  >([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const result = await getRatesOfBooking(bookingId);
        if (!result) {
          throw new Error("Rates data is null or undefined.");
        }

        const bookingPayments = await getAllBookingPayments(bookingId);
        if (!Array.isArray(bookingPayments)) {
          throw new Error("Invalid format for booking payments data.");
        }

        const paidBookingAmount = bookingPayments.reduce((sum, { amount }) => {
          const parsedAmount = parseFloat(amount);
          return sum + (isNaN(parsedAmount) ? 0 : parsedAmount);
        }, 0);
        setPaidAmount(paidBookingAmount);

        const costs = calculateDailyCosts(result);
        if (!Array.isArray(costs)) {
          throw new Error("Daily costs calculation did not return an array.");
        }
        setDailyCosts(costs);

        const total = costs.reduce((sum, { cost }) => {
          return sum + (typeof cost === "number" ? cost : 0);
        }, 0);
        setTotalCost(total);
        setBookingBalance(total - paidBookingAmount);
      } catch (error) {
        console.error("Error fetching rates or processing data:", error);
      }
    };

    fetchRates();
  }, [bookingId]);

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <div className="border  rounded-md overflow-hidden">
        <div className="grid grid-cols-2   font-semibold py-3 px-4">
          <span>Date</span>
          <span className="text-right">Cost</span>
        </div>
        <div className="h-32 overflow-y-scroll">
          {dailyCosts.map(({ date, cost }) => (
            <div key={date} className="grid grid-cols-2 py-3 px-4 border-t ">
              <span>{date}</span>
              <span className="text-right">${cost.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 py-3 px-4  font-semibold  border-t ">
          <span>Total</span>
          <span className="text-right">${totalCost.toFixed(2)}</span>
        </div>
        <div className="grid grid-cols-2 py-3 px-4  font-semibold  border-t ">
          <span>Paid Amount</span>
          <span className="text-right">${paidAmount.toFixed(2)}</span>
        </div>

        <div className="grid grid-cols-2 py-3 px-4  font-semibold  border-t ">
          <span>Balance</span>
          <span className="text-right"> ${totalCost - paidAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default CalcDailyCost;
