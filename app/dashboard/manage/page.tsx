import SkeletonDemo from "@/components/SkeletonDemo";
import { UserFacility } from "@/lib/types/type";
import Facilities from "./Facilities";
import { getUserFacilities } from "@/lib/db/userfacilityCrud";

const FacilitiesPage = async () => {
  let userFacilities: UserFacility[] | null = null;
  let error: string | null = null;

  try {
    userFacilities = await getUserFacilities();
  } catch (err) {
    console.error("Error fetching bookings:", err);
    error = "Failed to load bookings. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (userFacilities === null) {
    return <SkeletonDemo />;
  }
  return (
    <div className="text-gray-900 dark:text-slate-50">
      <Facilities userFacilities={userFacilities} />
    </div>
  );
};

export default FacilitiesPage;
