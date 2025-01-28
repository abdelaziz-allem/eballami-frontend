import SkeletonDemo from "@/components/SkeletonDemo";
import { UserFacility } from "@/lib/types/type";
import { getUserFacilities } from "@/lib/db/userfacilityCrud";
import { Facilities } from "./Facilities";

const ChoosePage = async () => {
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
    <div>
      <Facilities userFacilities={userFacilities} />
    </div>
  );
};

export default ChoosePage;
