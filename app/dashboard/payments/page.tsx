import React from "react";
import { getPayments } from "@/lib/db/paymentCrud";
import SearchByDateRangePicker from "@/components/SearchByDateRangePicker";
import GeneratePaymentsTable from "./GeneratePaymentsTable";
import { Payment } from "@/lib/types/type";

interface PatientsPageProps {
  searchParams: {
    from: string;
    to: string;
  };
}

const GeneratePaymentPage = async ({ searchParams }: PatientsPageProps) => {
  const { from, to } = searchParams;

  const earlyToday = new Date(new Date().setUTCHours(0, 0, 0, 0)).toString();
  const laterToday = new Date(
    new Date().setUTCHours(23, 59, 59, 999)
  ).toString();

  try {
    let payments: Payment[] = [];

    payments =
      from || to
        ? await getPayments(from, to)
        : await getPayments(earlyToday, laterToday);

    return (
      <div className="text-gray-900 dark:text-slate-50">
        <SearchByDateRangePicker />
        <GeneratePaymentsTable fetchedPayments={payments} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <h1>error</h1>;
  }
};

export default GeneratePaymentPage;
