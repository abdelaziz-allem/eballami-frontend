import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { toast } from "@/hooks/use-toast";
import { updateBooking } from "@/lib/db/bookingCrud";
import { getLatestRateOfBooking, updateRate } from "@/lib/db/rateCrud";
import { updateRoom } from "@/lib/db/roomCrud";
import { Booking, BookingStatus, RoomStatus } from "@/lib/types/type";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CheckOut = ({ booking }: { booking: Booking }) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();
  async function onSubmit() {
    try {
      setLoading(true);

      const latest = await getLatestRateOfBooking(booking.id);

      await updateBooking(booking.id, {
        status: BookingStatus.CHECKED_OUT,
      });

      await updateRate(latest.id, {
        endDate: new Date(),
      });

      await updateRoom(booking.roomId, { status: RoomStatus.MAINTENANCE });

      toast({
        title: `${booking.guest.firstName} ${booking.guest.lastName} has checked out`,
        className: "bg-primary_color-500 text-white",
      });

      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <LogOut
                  className="transform transition-transform hover:scale-110 text-red-500 cursor-pointer"
                  size={30}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Check out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to check out this user?
          </DialogTitle>
          <DialogDescription>This action can not be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onSubmit}>
            {loading ? <LoadingSpinner /> : "Check out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
