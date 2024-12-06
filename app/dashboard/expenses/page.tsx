import React from "react";
import { getExpenses } from "@/lib/db/expenseCrud";
import SearchByDateRangePicker from "@/components/SearchByDateRangePicker";
import GenerateExpensesTable from "./GenerateExpensesTable";
import { Expense, userInSessionType } from "@/lib/types/type";
import { getUserInSession } from "@/lib/userInSession";

interface PatientsPageProps {
  searchParams: {
    from: string;
    to: string;
  };
}

const GenerateExpensePage = async ({ searchParams }: PatientsPageProps) => {
  let expenses: Expense[] = [];
  let userInSession: userInSessionType | null = null;
  const { from, to } = searchParams;

  const earlyToday = new Date(new Date().setUTCHours(0, 0, 0, 0)).toString();
  const laterToday = new Date(
    new Date().setUTCHours(23, 59, 59, 999)
  ).toString();

  try {
    userInSession = getUserInSession();

    expenses =
      from || to
        ? await getExpenses(from, to)
        : await getExpenses(earlyToday, laterToday);

    if (!userInSession) {
      return <h1>error</h1>;
    }

    return (
      <div className="text-gray-900 dark:text-slate-50">
        <SearchByDateRangePicker />
        <GenerateExpensesTable
          fetchedExpenses={expenses}
          userInSession={userInSession}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <h1>error</h1>;
  }
};

export default GenerateExpensePage;
