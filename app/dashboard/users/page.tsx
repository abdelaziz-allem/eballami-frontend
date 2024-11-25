import { getUsers } from "@/lib/db/userCrud";
import UsersTable from "./UsersTable";
import SkeletonDemo from "@/components/SkeletonDemo";
import { User } from "@/lib/types/type";

const UsersPage = async () => {
  let users: User[] | null = null;
  let error: string | null = null;

  try {
    users = await getUsers();
  } catch (err) {
    console.error("Error fetching users:", err);
    error = "Failed to load users. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (users === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <UsersTable users={users} />
    </div>
  );
};

export default UsersPage;
