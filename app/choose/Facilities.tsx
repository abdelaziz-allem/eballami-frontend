"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { UserFacility } from "@/lib/types/type";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import nookies from "nookies";
import { useRouter } from "next/navigation";

export function Facilities({
  userFacilities,
}: {
  userFacilities: UserFacility[];
}) {
  const [selectedFacility, setSelectedFacility] = useState<number | null>(null);
  const router = useRouter();

  const handleSelect = (userFacilityId: number) => {
    setSelectedFacility(userFacilityId);
  };

  const handleSubmit = () => {
    nookies.set(undefined, "facilityId", selectedFacility.toString(), {
      path: "/",
    });
    router.push("/dashboard");
    console.log("Submitted Facility ID:", selectedFacility);
  };

  return (
    <div className="h-screen  flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center mb-8">Choose a Facility</h1>
      <div className="grid grid-cols-2 gap-6">
        {userFacilities.map((userFacility) => (
          <Card
            key={userFacility.id}
            className={`transition-all duration-300 w-96 shadow-md hover:shadow-lg rounded-xl cursor-pointer ${
              selectedFacility === userFacility.id
                ? "ring-2 ring-primary_color-500 bg-primary/5"
                : "hover:bg-muted/10"
            }`}
            onClick={() => handleSelect(userFacility.id)}
          >
            <CardContent className="flex flex-col items-center text-center p-6 relative">
              {selectedFacility === userFacility.id && (
                <div className="bg-primary_color-500 absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
              <div className="w-24 h-24 mb-4 relative">
                {userFacility.facility.logo ? (
                  <Image
                    src={userFacility.facility.logo || "/placeholder.svg"}
                    alt={`${userFacility.facility.name} logo`}
                    width={96}
                    height={96}
                    className="rounded-full border border-muted object-cover"
                  />
                ) : (
                  <div className="rounded-full border border-muted w-24 h-24 flex items-center justify-center bg-muted text-2xl font-semibold">
                    {userFacility.facility.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {userFacility.facility.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-1">
                {userFacility.facility.address}
              </p>
              <p className="text-xs text-muted-foreground">
                {userFacility.facility.type}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Button
          onClick={handleSubmit}
          disabled={selectedFacility === null}
          className="min-w-[200px] h-12 text-lg bg-primary_color-500"
        >
          Choose
        </Button>
      </div>
    </div>
  );
}
