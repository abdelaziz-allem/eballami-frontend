import SkeletonDemo from "@/components/SkeletonDemo";
import { getRooms } from "@/lib/db/roomCrud";
import { Booking, BookingStatus, Room } from "@/lib/types/type";
import Bookings from "./Booking";
import { getBookings } from "@/lib/db/bookingCrud";

const BookingPage = async () => {
  let rooms: Room[] | null = null;
  let bookings: Booking[] | null = null;
  let error: string | null = null;

  try {
    rooms = await getRooms();
    bookings = await getBookings(BookingStatus.CHECKED_IN);
  } catch (err) {
    console.error("Error fetching roomTypes:", err);
    error = "Failed to load roomTypes. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (rooms === null || bookings === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <Bookings rooms={rooms} bookings={bookings} />
    </div>
  );
};

export default BookingPage;
