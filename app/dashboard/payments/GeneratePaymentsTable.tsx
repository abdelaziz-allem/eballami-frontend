"use client";
import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
import { Payment, PaymentMethod } from "@/lib/types/type";
import { formatDate } from "@/lib/utils";
// import ReactToPrint from "react-to-print";

interface GeneratePaymentsTableProps {
  fetchedPayments: Payment[];
}

const paymentMethodOptions = Object.values(PaymentMethod);

const GeneratePaymentsTable = ({
  fetchedPayments,
}: GeneratePaymentsTableProps) => {
  const [search, setSearch] = useState("");
  const componentRef = useRef<HTMLTableElement | null>(null);
  let totalPaidAmount = 0;

  const payments = fetchedPayments.filter((payment) => {
    if (search === "all") {
      return payment;
    }
    return search === "" || payment.method.includes(search);
  });

  return (
    <div className="mx-6 rounded-lg border p-2">
      <div className="flex gap-3">
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
        <TableCaption className="text-bold mb-2 text-center">
          A list of guests payment.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Mobile no.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Paid date</TableHead>
            {/* <TableHead>Received by</TableHead> */}
            <TableHead>Method</TableHead>
            <TableHead>Paid amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments.map((payment) => {
            totalPaidAmount += parseFloat(payment.amount);
            return (
              <TableRow key={payment.id}>
                <TableCell>
                  {payment.booking.guest.firstName}{" "}
                  {payment.booking.guest.lastName}
                </TableCell>
                <TableCell>{payment.booking.guest.mobileNumber}</TableCell>
                <TableCell>{payment.booking.guest.email}</TableCell>
                <TableCell>{formatDate(payment.createdAt)}</TableCell>
                {/* <TableCell>{payment.received_by}</TableCell> */}
                <TableCell>{payment.method}</TableCell>
                <TableCell>$ {payment.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-lg font-bold">
              Total
            </TableCell>
            <TableCell className="text-right text-lg font-bold">
              ${totalPaidAmount.toFixed(1)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default GeneratePaymentsTable;
