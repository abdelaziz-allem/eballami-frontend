import { getUserInSession } from "@/lib/userInSession";
import React from "react";
import ChangePassword from "./ChangePassword";

const ChangePasswordPage = () => {
  const StaffInSession = getUserInSession();
  if (!StaffInSession) {
    return <div>Not logged in</div>;
  }

  return <ChangePassword userId={StaffInSession.id} />;
};

export default ChangePasswordPage;
