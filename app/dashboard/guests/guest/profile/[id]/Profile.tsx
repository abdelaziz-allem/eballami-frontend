"use client";
import CalcDailyCost from "@/app/dashboard/bookings/CalcDailyCost";
import { Booking, Room, userInSessionType } from "@/lib/types/type";

export default function Profile({
  booking,
  user,
  rooms,
}: {
  booking: Booking;
  user: userInSessionType;
  rooms: Room[];
}) {
  return (
    <div>
      <CalcDailyCost
        booking={booking}
        getDailyCosts={true}
        userInSession={user}
        rooms={rooms}
      />
    </div>
  );
}
