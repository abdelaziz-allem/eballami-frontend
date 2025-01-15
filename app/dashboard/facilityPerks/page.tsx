import SkeletonDemo from "@/components/SkeletonDemo";
import { Facility, User, FacilityPerk, Perk } from "@/lib/types/type";
import { getFacilities } from "@/lib/db/facilityCrud";
import { getFacilityPerks } from "@/lib/db/facilityPerkCrud";
import { getPerks } from "@/lib/db/perkCrud";
import FacilityPerks from "./FacilityPerks";

const FacilityPerksPage = async () => {
  let facilityPerks: FacilityPerk[] | null = null;
  let perks: Perk[] | null = null;
  let facilities: Facility[] | null = null;
  let error: string | null = null;

  try {
    facilityPerks = await getFacilityPerks();
    perks = await getPerks();
    facilities = await getFacilities();
  } catch (err) {
    console.error("Error fetching facilityPerk:", err);
    error = "Failed to load facilityPerk. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (facilityPerks === null || perks === null || facilities === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <FacilityPerks
        facilityPerks={facilityPerks}
        perks={perks}
        facilities={facilities}
      />
    </div>
  );
};

export default FacilityPerksPage;
