import Facilities from "./Facilities";
import SkeletonDemo from "@/components/SkeletonDemo";
import { getFacilities } from "@/lib/db/facilityCrud";
import { getPerks } from "@/lib/db/perkCrud";
import { getUsers } from "@/lib/db/userCrud";
import { Facility, Perk, User } from "@/lib/types/type";

const FaciltiesPage = async () => {
  let facilities: Facility[] | null = null;
  let perks: Perk[] | null = null;
  let users: User[] | null = null;
  let error: string | null = null;

  try {
    facilities = await getFacilities();
    perks = await getPerks();
    users = await getUsers();
  } catch (err) {
    console.error("Error fetching facilities:", err);
    error = "Failed to load facilities. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (facilities === null || perks === null || users === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <Facilities facilities={facilities} perks={perks} users={users} />
    </div>
  );
};

export default FaciltiesPage;
