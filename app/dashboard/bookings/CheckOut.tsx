import { useBookingBalanceStore } from "@/app/store";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { toast } from "@/hooks/use-toast";
import { updateBooking } from "@/lib/db/bookingCrud";
import { getLatestRateOfBooking, updateRate } from "@/lib/db/rateCrud";
import { updateRoom } from "@/lib/db/roomCrud";
import { Booking, BookingStatus, RoomStatus } from "@/lib/types/type";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const CheckOut = ({
  onClose,
  booking,
}: {
  onClose: () => void;
  booking: Booking;
}) => {
  const [loading, setLoading] = useState(false);
  const { bookingBalance } = useBookingBalanceStore();

  const router = useRouter();
  async function onSubmit() {
    try {
      setLoading(true);

      toast({
        title: `Guest ${booking.guest.firstName} ${booking.guest.lastName} has checked out`,
        className: "bg-emerald-700",
      });

      const latest = await getLatestRateOfBooking(booking.id);

      await updateBooking(booking.id, {
        status: BookingStatus.CHECKED_OUT,
      });

      await updateRate(latest.id, {
        endDate: new Date(),
      });

      await updateRoom(booking.roomId, { status: RoomStatus.MAINTENANCE });

      toast({
        title: `Booking ${booking.guest.firstName} ${booking.guest.lastName} has been checked out`,
        className: "bg-emerald-700",
      });
      onClose();
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={onSubmit}
      disabled={loading || bookingBalance > 0}
      className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      {loading ? <LoadingSpinner className="mr-2" /> : "CheckOut"}
    </Button>
  );
};
