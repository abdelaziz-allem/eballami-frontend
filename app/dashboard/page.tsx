import { getUserInSession } from "@/lib/db/userCrud";
import { get } from "http";
import Image from "next/image";
import React from "react";

const DashboardHome = async () => {
  const userInSession = await getUserInSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <div className="  p-8 w-full max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold  mb-4">
          Welcome, {userInSession?.name}!
        </h1>
        <p className=" text-lg mb-6">
          Together, we make every guest experience exceptional. Let&apos;s make
          productive and rewarding!
        </p>
        <Image
          src="/dashboard_welcome.svg"
          alt="Welcome to the Hotel"
          width={800}
          height={800}
          className="mx-auto mb-6"
        />
      </div>
    </div>
  );
};

export default DashboardHome;
