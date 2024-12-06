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
import { Payment, PaymentMethod } from "@/lib/types/type";
import { formatDate, getRoleColor } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <Card className="w-full border-none shadow-none">
      <CardContent>
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
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Mobile no.</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Paid date</TableHead>
              <TableHead>Received by</TableHead>
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
                  <TableCell>
                    <Badge className="text-white bg-emerald-500 hover:bg-emerald-600">
                      {payment.user.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getRoleColor(
                        payment.user.role
                      )} text-white`}
                    >
                      {payment.method}
                    </Badge>
                  </TableCell>
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
      </CardContent>
    </Card>
  );
};

export default GeneratePaymentsTable;
