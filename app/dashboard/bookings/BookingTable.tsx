"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Booking, Facility, UserFacility } from "@/lib/types/type";
import { formatDate, getStatusColor } from "@/lib/utils";
import { Calendar, Search, User, Phone, Mail, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getBookings } from "@/lib/db/bookingCrud";

interface BookingTableProps {
  userFacilities: UserFacility[];
}

const BookingTable = ({ userFacilities }: BookingTableProps) => {
  const [search, setSearch] = useState("");
  const [selectedFacility, setSelectedFacility] = useState<UserFacility | null>(
    userFacilities[0] || null
  );
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (selectedFacility) {
      (async () => {
        try {
          const fetchedBookings = await getBookings(
            selectedFacility.facilityId
          );
          setBookings(fetchedBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      })();
    }
  }, [selectedFacility]);

  const filterBookings = bookings.filter((booking) =>
    booking.user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        {userFacilities.length > 0 ? (
          <Tabs
            defaultValue={userFacilities[0]?.facility.id.toString()}
            onValueChange={(facilityId) => {
              const facility = userFacilities.find(
                (uf) => uf.facility.id === +facilityId
              );
              setSelectedFacility(facility || null);
            }}
          >
            <TabsList className="mb-4">
              {userFacilities.map((userFacility) => (
                <TabsTrigger
                  key={userFacility.id}
                  value={userFacility.facility.id.toString()}
                >
                  {userFacility.facility.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative w-full sm:w-96 mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-10 pr-4"
                placeholder="Search email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <TabsContent value={selectedFacility?.facility.id.toString() || ""}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterBookings.map((booking) => (
                    <TableRow
                      key={booking.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-5 w-5 mr-3 text-primary_color-400" />
                          <span>
                            <Link
                              className="text-lg font-medium hover:text-primary transition-colors underline underline-offset-4 hover:underline-offset-1"
                              href={`/#`}
                            >
                              {booking.user.name}
                            </Link>
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 mr-3 text-primary_color-400" />
                          <span>{booking.user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-3 text-primary_color-400" />
                          {formatDate(booking.bookedAt)}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {bookings.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No bookings found
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No facilities available.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingTable;
