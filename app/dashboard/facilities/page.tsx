import Facilities from "./Facilities";
import SkeletonDemo from "@/components/SkeletonDemo";
import { getFacilities } from "@/lib/db/facilityCrud";
import { Facility } from "@/lib/types/type";

const FaciltiesPage = async () => {
  let facilities: Facility[] | null = null;
  let error: string | null = null;

  try {
    facilities = await getFacilities();
  } catch (err) {
    console.error("Error fetching facilities:", err);
    error = "Failed to load facilities. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (facilities === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <Facilities facilities={facilities} />
    </div>
  );
};

export default FaciltiesPage;
