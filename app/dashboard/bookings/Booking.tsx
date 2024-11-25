"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  CalendarRange,
  Mail,
  User,
  Bed,
  DollarSign,
  PenTool,
} from "lucide-react";
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
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Booking, Room, RoomStatus } from "@/lib/types/type";
import { formatDate, getRoomStatusColor } from "@/lib/utils";
import AddBooking from "./AddBooking";
import ChangeRate from "./ChangeRate";
import CalcDailyCost from "./CalcDailyCost";
import Pay from "./Pay";
import Transfer from "./Transfer";
import { CheckOut } from "./CheckOut";

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

  const getRoomStatusIcon = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.OCCUPIED:
        return <User className="h-5 w-5 text-green-500" />;
      case RoomStatus.MAINTENANCE:
        return <PenTool className="h-5 w-5 text-red-500" />;
      default:
        return <Bed className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Room Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {rooms.map((room) => (
          <Card
            key={room.id}
            onClick={() => handleRoomClick(room)}
            className={`cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden ${getRoomStatusColor(
              room.status
            )}`}
          >
            <div className="relative h-40">
              <Image
                src={`/room-dark.png`}
                alt={`Room ${room.number}`}
                layout="fill"
                objectFit="cover"
                priority
              />
              <Badge className="absolute top-2 right-2" variant={"default"}>
                {room.status}
              </Badge>
            </div>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Room {room.number}</CardTitle>
                {getRoomStatusIcon(room.status)}
              </div>
              <CardDescription className="flex items-center mt-2 text-white">
                $ {room.type.pricePerNight}/night
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Room {selectedRoom?.number} Details</DialogTitle>
          </DialogHeader>
          <Tabs
            defaultValue={bookingDetails ? "details" : "booking"}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details" disabled={!bookingDetails}>
                Booking Details
              </TabsTrigger>
              <TabsTrigger value="booking">
                {bookingDetails ? "Manage Booking" : "New Booking"}
              </TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[60vh] mt-4 ">
              <TabsContent value="details">
                {bookingDetails && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="text-blue-500" />
                          <span>
                            {bookingDetails.guest.firstName}{" "}
                            {bookingDetails.guest.lastName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="text-yellow-500" />
                          <span>{bookingDetails.guest.email}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CalendarRange className="text-emerald-500" />
                          <span>{formatDate(bookingDetails.checkInDate)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="text-orange-500" />
                          <span>
                            {new Date(bookingDetails.checkOutDate) < new Date()
                              ? formatDate(new Date().toString())
                              : formatDate(bookingDetails.checkOutDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CalcDailyCost bookingId={bookingDetails.id} />
                  </div>
                )}
              </TabsContent>
              <TabsContent value="booking">
                {bookingDetails ? (
                  <div className="space-y-4">
                    <Pay
                      bookingId={bookingDetails.id}
                      onClose={() => setSelectedRoom(null)}
                    />
                    <div className="flex gap-4 justify-between">
                      <CheckOut
                        onClose={() => setSelectedRoom(null)}
                        booking={bookingDetails}
                      />
                      <ChangeRate
                        bookingId={bookingDetails.id}
                        onClose={() => setSelectedRoom(null)}
                      />
                      <Transfer
                        bookingId={bookingDetails.id}
                        currentRoomId={bookingDetails.roomId}
                        onClose={() => setSelectedRoom(null)}
                        rooms={rooms}
                      />
                    </div>
                  </div>
                ) : selectedRoom?.status === RoomStatus.MAINTENANCE ? (
                  <div className="text-center space-y-4">
                    <Image
                      src={`/maintenance.png`}
                      alt={`Room under maintenance`}
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                    <h2 className="text-xl font-semibold">Under Maintenance</h2>
                    <p>
                      This room is currently unavailable due to maintenance
                      work.
                    </p>
                  </div>
                ) : (
                  <AddBooking
                    roomId={selectedRoom?.id}
                    roomPrice={selectedRoom?.type.pricePerNight}
                    onClose={() => setSelectedRoom(null)}
                  />
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
