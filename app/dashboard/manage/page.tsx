import SkeletonDemo from "@/components/SkeletonDemo";
import { Facility } from "@/lib/types/type";
import { getFacility } from "@/lib/db/facilityCrud";
import { cookies } from "next/headers";
import ManageFacility from "./ManageFacility";

const FacilitiesPage = async () => {
  let facility: Facility | null = null;
  let error: string | null = null;
  const cookieStore = await cookies();
  const facilityId = cookieStore.get("facilityId")?.value;

  try {
    facility = await getFacility(+facilityId);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    error = "Failed to load bookings. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (facility === null) {
    return <SkeletonDemo />;
  }
  return (
    <div className="text-gray-900 dark:text-slate-50">
      <ManageFacility facility={facility} />
    </div>
  );
};

export default FacilitiesPage;
