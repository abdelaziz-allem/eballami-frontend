"use client";
import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={`mt-4 text-gray-700`}>{children}</div>;
};

export default Container;
