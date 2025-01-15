import SkeletonDemo from "@/components/SkeletonDemo";
import { Facility, User, UserFacility } from "@/lib/types/type";
import { getUserFacilities } from "@/lib/db/userfacilityCrud";
import UserFacilities from "./UserFacilities";
import { getUsers } from "@/lib/db/userCrud";
import { getFacilities } from "@/lib/db/facilityCrud";

const UserFacilitiesPage = async () => {
  let userFacilities: UserFacility[] | null = null;
  let users: User[] | null = null;
  let facilities: Facility[] | null = null;
  let error: string | null = null;

  try {
    userFacilities = await getUserFacilities();
    users = await getUsers();
    facilities = await getFacilities();
  } catch (err) {
    console.error("Error fetching userFacilities:", err);
    error = "Failed to load userFacilities. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (userFacilities === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <UserFacilities
        userFacilities={userFacilities}
        users={users}
        facilities={facilities}
      />
    </div>
  );
};

export default UserFacilitiesPage;
