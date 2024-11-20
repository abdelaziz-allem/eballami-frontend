import RoomTypesTable from "./roomTypesTable";
import SkeletonDemo from "@/components/SkeletonDemo";
import { getRoomTypes } from "@/lib/db/roomTypesCrud";
import { RoomType } from "@/lib/types/type";

const RoomTypesPage = async () => {
  let roomTypes: RoomType[] | null = null;
  let error: string | null = null;

  try {
    const fetchedData = await getRoomTypes();

    roomTypes = fetchedData;
  } catch (err) {
    console.error("Error fetching roomTypes:", err);
    error = "Failed to load roomTypes. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (roomTypes === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <RoomTypesTable roomTypes={roomTypes} />
    </div>
  );
};

export default RoomTypesPage;
