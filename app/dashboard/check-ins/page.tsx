import CheckInTable from "./CheckInTable";
import SkeletonDemo from "@/components/SkeletonDemo";
import { getBookings } from "@/lib/db/bookingCrud";
import { Booking, BookingStatus, Guest } from "@/lib/types/type";

const CheckInPage = async () => {
  let checkInGuests: Booking[] | null = null;
  let error: string | null = null;

  try {
    checkInGuests = await getBookings(BookingStatus.CHECKED_IN);
  } catch (err) {
    console.error("Error fetching guests:", err);
    error = "Failed to load guests. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (checkInGuests === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <CheckInTable bookings={checkInGuests} />
    </div>
  );
};

export default CheckInPage;
