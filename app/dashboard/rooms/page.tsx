import { getRooms } from "@/lib/db/roomCrud";
import RoomsTable from "./roomsTable";
import SkeletonDemo from "@/components/SkeletonDemo";
import { Room, RoomType } from "@/lib/types/type";
import { getRoomTypes } from "@/lib/db/roomTypesCrud";

const RoomsPage = async () => {
  let rooms: Room[] | null = null;
  let roomTypes: RoomType[] | null = null;
  let error: string | null = null;

  try {
    rooms = await getRooms();
    roomTypes = await getRoomTypes();
  } catch (err) {
    console.error("Error fetching rooms:", err);
    error = "Failed to load rooms. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (rooms === null || roomTypes === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <RoomsTable rooms={rooms} roomTypes={roomTypes} />
    </div>
  );
};

export default RoomsPage;
