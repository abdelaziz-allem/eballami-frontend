import React from "react";
import ResetPassword from "./ResetPassoword";

interface Props {
  searchParams: { token: string };
}

const page = ({ searchParams }: Props) => {
  return <ResetPassword token={searchParams.token} />;
};

export default page;
