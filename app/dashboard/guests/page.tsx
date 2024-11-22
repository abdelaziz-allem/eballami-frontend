import GuestsTable from "./guestsTable";
import SkeletonDemo from "@/components/SkeletonDemo";
import { getGuests } from "@/lib/db/guestCrud";
import { Guest } from "@/lib/types/type";

const GuestsPage = async () => {
  let guests: Guest[] | null = null;
  let error: string | null = null;

  try {
    const fetchedData = await getGuests();

    guests = fetchedData;
  } catch (err) {
    console.error("Error fetching guests:", err);
    error = "Failed to load guests. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (guests === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <GuestsTable guests={guests} />
    </div>
  );
};

export default GuestsPage;
