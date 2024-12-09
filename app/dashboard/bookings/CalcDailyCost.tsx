import { getAllBookingPayments } from "@/lib/db/paymentCrud";
import { getRatesOfBooking } from "@/lib/db/rateCrud";
import { Booking, Rate, Room, userInSessionType } from "@/lib/types/type";
import React, { useEffect, useState } from "react";
import { CheckOut } from "./CheckOut";
import Transfer from "./Transfer";
import ChangeRate from "./ChangeRate";
import Pay from "./Pay";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const calculateDailyCosts = (
  rates: Rate[]
): { date: string; cost: number }[] => {
  if (rates.length === 0) return [];

  const today = new Date();
  const startDate = new Date(rates[0].startDate);
  const endDate = new Date(
    rates.reduce((latest, rate) => {
      const effectiveEndDate = rate.endDate ? rate.endDate : today;
      return new Date(effectiveEndDate) > new Date(latest)
        ? effectiveEndDate
        : latest;
    }, rates[0].startDate)
  );

  const allDates = getDatesInRange(startDate, endDate);

  return allDates.map((date) => {
    const dailyCost = rates.reduce((total, rate) => {
      const rateStart = new Date(rate.startDate);
      const rateEnd = rate.endDate ? new Date(rate.endDate) : today;

      if (rateStart <= new Date(date) && rateEnd >= new Date(date)) {
        total += parseFloat(rate.amount);
      }
      return total;
    }, 0);

    return { date, cost: dailyCost };
  });
};

const CalcDailyCost = ({
  rooms,
  booking,
  getResults,
  getDailyCosts,
  userInSession,
}: {
  booking: Booking;
  rooms: Room[];
  getResults?: boolean;
  getDailyCosts?: boolean;
  userInSession: userInSessionType;
}) => {
  const [paidAmount, setPaidAmount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const [dailyCosts, setDailyCosts] = useState<
    { date: string; cost: number }[]
  >([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const result = await getRatesOfBooking(booking.id);
        if (!result) {
          throw new Error("Rates data is null or undefined.");
        }

        const bookingPayments = await getAllBookingPayments(booking.id);
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
      } catch (error) {
        console.error("Error fetching rates or processing data:", error);
      }
    };

    fetchRates();
  }, [booking.id]);

  return (
    <>
      {getResults && (
        <>
          <TableCell className="text-lg py-6">$ {totalCost}</TableCell>
          <TableCell className="text-lg py-6">$ {paidAmount}</TableCell>
          <TableCell
            className={`text-lg py-6 ${
              totalCost - paidAmount > 100 && "text-red-500"
            }`}
          >
            $ {totalCost - paidAmount}
          </TableCell>
          <TableCell className="py-6">
            <div className="flex items-center justify-end gap-6">
              <Transfer
                bookingId={booking.id}
                currentRoomId={booking.roomId}
                rooms={rooms}
              />
              <ChangeRate bookingId={booking.id} />
              <Pay bookingId={booking.id} userId={userInSession.id} />
              {totalCost - paidAmount === 0 && <CheckOut booking={booking} />}
            </div>
          </TableCell>
        </>
      )}

      {getDailyCosts && (
        <>
          <Card className="border-none shadow-none">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4 pb-8">
              <Image
                src="/user_profile.png"
                alt="User avatar"
                width={150}
                height={150}
              />
              <div className="text-center sm:text-left space-y-1">
                <CardTitle className="text-3xl font-bold">
                  {booking.guest.firstName} {booking.guest.lastName}
                </CardTitle>
                <CardDescription className="text-xl ">
                  {booking.guest.email}
                </CardDescription>
                <div className="flex gap-2 ">
                  <Transfer
                    bookingId={booking.id}
                    currentRoomId={booking.roomId}
                    rooms={rooms}
                  />
                  <ChangeRate bookingId={booking.id} />
                  <Pay bookingId={booking.id} userId={userInSession.id} />
                  {totalCost - paidAmount === 0 && (
                    <CheckOut booking={booking} />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-primary/5 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">$ {totalCost}</div>
                  <div className="text-sm text-muted-foreground">Amount</div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">$ {paidAmount}</div>
                  <div className="text-sm text-muted-foreground">Paid</div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold">
                    $ {totalCost - paidAmount}
                  </div>
                  <div className="text-sm text-muted-foreground">Balance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyCosts.map(({ date, cost }) => (
                <TableRow key={date}>
                  <TableCell>{formatDate(date)}</TableCell>
                  <TableCell>${cost.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};

export default CalcDailyCost;
