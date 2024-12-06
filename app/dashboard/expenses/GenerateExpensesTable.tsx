"use client";
import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { Expense, PaymentMethod, userInSessionType } from "@/lib/types/type";
import { formatDate, getRoleColor } from "@/lib/utils";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// import ReactToPrint from "react-to-print";

interface GenerateExpensesTableProps {
  fetchedExpenses: Expense[];
  userInSession: userInSessionType;
}

const paymentMethodOptions = Object.values(PaymentMethod);

const GenerateExpensesTable = ({
  fetchedExpenses,
  userInSession,
}: GenerateExpensesTableProps) => {
  const [search, setSearch] = useState("");
  const componentRef = useRef<HTMLTableElement | null>(null);
  let totalPaidAmount = 0;

  const expenses = fetchedExpenses.filter((expense) => {
    if (search === "all") {
      return expense;
    }
    return search === "" || expense.method.includes(search);
  });

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <div className="flex justify-between">
          <Select required onValueChange={(value) => setSearch(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                {paymentMethodOptions.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <AddExpense userInSession={userInSession} />
          {/* <ReactToPrint
          trigger={() => (
            <Button variant={"outline"}>
              <PrinterIcon className="text-sky-600" />
            </Button>
          )}
          content={() => componentRef.current}
        /> */}
        </div>

        <Table className="mt-4" ref={componentRef}>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Paid date</TableHead>
              <TableHead>Made by</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {expenses.map((expense) => {
              totalPaidAmount += parseFloat(expense.amount);
              return (
                <TableRow key={expense.id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{formatDate(expense.createdAt)}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(expense.user.role)}>
                      {expense.user.name}
                    </Badge>
                  </TableCell>
                  <TableCell>{expense.method}</TableCell>
                  <TableCell>$ {expense.amount}</TableCell>
                  <TableCell>
                    <EditExpense
                      userInSession={userInSession}
                      expense={expense}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-lg font-bold">
                Total
              </TableCell>
              <TableCell className="text-right text-lg font-bold">
                ${totalPaidAmount.toFixed(1)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GenerateExpensesTable;
