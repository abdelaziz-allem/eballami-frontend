"use server";
import { getUserInSession } from "@/lib/userInSession";
import Profile from "./Profile";
import { getBooking } from "@/lib/db/bookingCrud";
import { getRooms } from "@/lib/db/roomCrud";

interface ProfileProps {
  params: {
    id: string;
  };
}

const ProfilePage = async ({ params }: ProfileProps) => {
  if (!params.id) {
    return;
  }
  const booking = await getBooking(Number(params.id));
  const user = getUserInSession();
  const rooms = await getRooms();

  if (!booking || !user || !rooms) {
    return;
  }

  return (
    <div>
      <Profile booking={booking} user={user} rooms={rooms} />
    </div>
  );
};

export default ProfilePage;
