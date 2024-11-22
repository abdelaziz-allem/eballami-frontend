import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const CheckOut = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function onSubmit() {
    try {
      setLoading(true);

      onClose();
      //   toast({
      //     variant: "destructive",
      //     title: "Insert a mobile number",
      //     description: "Please try again with a valid mobile number.",
      //   });
      router.refresh();
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={onSubmit}
      disabled={loading}
      className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
    >
      {loading ? <LoadingSpinner className="mr-2" /> : "CheckOut"}
    </Button>
  );
};
