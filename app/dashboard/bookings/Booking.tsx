"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Booking, Room, Status } from "@/lib/types/type";
import AddBooking from "./AddBooking";
import clsx from "clsx";

export default function Bookings({
  rooms,
  bookings,
}: {
  rooms: Room[];
  bookings: Booking[];
}) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    const booking = bookings.find(
      (booking) => booking.room.number === room.number
    );
    setBookingDetails(booking ?? null);
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.OCCUPIED:
        return "bg-green-500 hover:bg-green-600";
      case Status.AVAILABLE:
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {rooms.map((room) => (
        <Card
          key={room.id}
          onClick={() => handleRoomClick(room)}
          className={clsx(
            getStatusColor(room.status),
            "cursor-pointer hover:shadow-md"
          )}
        >
          <CardHeader>
            <CardTitle>{room.number}</CardTitle>
            <CardDescription>${room.type.pricePerNight}/night</CardDescription>
          </CardHeader>
        </Card>
      ))}

      <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRoom?.number}</DialogTitle>
          </DialogHeader>
          <CardContent>
            {bookingDetails ? (
              <div>
                <p>
                  <strong>Guest Name:</strong> {bookingDetails.guest.firstName}-
                  {bookingDetails.guest.lastName}
                </p>
                <p>
                  <strong>Guest Email:</strong> {bookingDetails.guest.email}
                </p>
                <p>
                  <strong>Check-in:</strong> {bookingDetails.checkInDate}
                </p>
                <p>
                  <strong>Check-out:</strong> {bookingDetails.checkOutDate}
                </p>
              </div>
            ) : (
              <AddBooking
                roomId={selectedRoom?.id || 1}
                onClose={() => setSelectedRoom(null)}
              />
            )}
          </CardContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}
