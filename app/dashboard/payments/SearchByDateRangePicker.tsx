"use client";
import React, { useState } from "react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const SearchByDateRangePicker = () => {
  const router = useRouter();
  const [date, setDate] = useState<any | undefined>();

  async function onSubmit() {
    if (!date) {
      toast({
        variant: "destructive",
        title: "Choose date!",
        description: "make sure you choose date",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    if (!date.to) {
      toast({
        variant: "destructive",
        title: "Choose To date!",
        description: "make sure you choose To date",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    router.push(`/dashboard/payments?from=${date.from}&to=${date.to}`);
  }

  return (
    <div>
      <div className="mb-5 flex justify-center gap-5">
        <DateRangePicker date={date} setDate={setDate} />
        <Button
          type="submit"
          className="rounded bg-blue-500 px-4 text-white hover:bg-blue-600"
          onClick={onSubmit}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchByDateRangePicker;
