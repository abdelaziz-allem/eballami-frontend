import React from "react";
import { getPayments, getTodayPayment } from "@/lib/db/paymentCrud";
import SearchByDateRangePicker from "./SearchByDateRangePicker";
import GeneratePaymentsTable from "./GeneratePaymentsTable";

interface PatientsPageProps {
  searchParams: {
    from: string;
    to: string;
  };
}

const GeneratePaymentPage = async ({ searchParams }: PatientsPageProps) => {
  const { from, to } = searchParams;
  try {
    let payments: any = [];

    payments =
      from || to ? await getPayments(from, to) : await getTodayPayment();

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
