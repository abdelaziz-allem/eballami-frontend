import SkeletonDemo from "@/components/SkeletonDemo";
import { getHousekeepingTasks } from "@/lib/db/houseKeepingTaskCrud";
import {
  HousekeepingTask,
  Room,
  User,
  userInSessionType,
} from "@/lib/types/type";
import HousekeepingTable from "./HouseKeepingTable";
import { getRooms } from "@/lib/db/roomCrud";
import { getUsers } from "@/lib/db/userCrud";
import { getUserInSession } from "@/lib/userInSession";

const UsersPage = async () => {
  let tasks: HousekeepingTask[] | null = null;
  let rooms: Room[] | null = null;
  let users: User[] | null = null;
  let userInSession: userInSessionType | null = null;
  let error: string | null = null;

  try {
    tasks = await getHousekeepingTasks();
    rooms = await getRooms();
    users = await getUsers();
    userInSession = getUserInSession();
  } catch (err) {
    console.error("Error fetching tasks:", err);
    error = "Failed to load tasks. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (
    tasks === null ||
    rooms === null ||
    users === null ||
    userInSession === null
  ) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <HousekeepingTable
        tasks={tasks}
        rooms={rooms}
        users={users}
        assignedBy={userInSession}
      />
    </div>
  );
};

export default UsersPage;
