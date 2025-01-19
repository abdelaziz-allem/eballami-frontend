"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading";
import { toast } from "@/hooks/use-toast";
import { deleteFacilityPerk } from "@/lib/db/facilityPerkCrud";
import { Plus, Trash2 } from "lucide-react";

const DeleteFacilityPerk = ({ facilityPerkId }: { facilityPerkId: number }) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  async function onSubmit() {
    try {
      setLoading(true);

      await deleteFacilityPerk(facilityPerkId);

      toast({
        title: "Deleted successfully",
        className: "bg-primary_color-500 ",
      });

      setLoading(false);
      setDialogOpen(false);
      router.refresh();
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Deletion Failed",
      });
    }
    setLoading(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Trash2
          size={18}
          className="text-red-600 cursor-pointer transform transition-transform hover:scale-110"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link User to Facility</DialogTitle>
        </DialogHeader>

        <p>Are you sure you want to delete this perk?</p>

        <DialogFooter>
          <Button
            onClick={onSubmit}
            disabled={loading}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            {loading ? <LoadingSpinner className="mr-2" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFacilityPerk;
