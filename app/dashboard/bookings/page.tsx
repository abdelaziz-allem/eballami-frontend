import SkeletonDemo from "@/components/SkeletonDemo";
import { Booking } from "@/lib/types/type";
import Bookings from "./BookingTable";
import { getAvailableTimeByDate, getBookings } from "@/lib/db/bookingCrud";
import { cookies } from "next/headers";

const BookingPage = async () => {
  const cookieStore = await cookies();
  const facilityId = cookieStore.get("facilityId")?.value;
  let availableTimes: { id: number; dateTime: string }[] | null;
  let bookings: Booking[] | null = null;
  let error: string | null = null;

  try {
    bookings = await getBookings(+facilityId);
    availableTimes = await getAvailableTimeByDate(
      +facilityId,
      new Date().toLocaleDateString()
    );
  } catch (err) {
    console.error("Error fetching bookings:", err);
    error = "Failed to load bookings. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (bookings === null || availableTimes === null) {
    return <SkeletonDemo />;
  }
  return (
    <div className="text-gray-900 dark:text-slate-50">
      <Bookings bookings={bookings} availableTimes={availableTimes} />
    </div>
  );
};

export default BookingPage;
