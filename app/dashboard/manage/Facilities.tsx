"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Facility, UserFacility } from "@/lib/types/type";
import EditFacility from "./EditFacility";
import { Phone, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Gallery from "./Gallery";
import { getFacility } from "@/lib/db/facilityCrud";
import SkeletonDemo from "@/components/SkeletonDemo";

const Facilities = ({ userFacilities }: { userFacilities: UserFacility[] }) => {
  const [selectedFacility, setSelectedFacility] = useState<UserFacility | null>(
    userFacilities[0] || null
  );
  const [facility, setFacility] = useState<Facility | null>(null);

  useEffect(() => {
    if (selectedFacility) {
      (async () => {
        try {
          const fetchedFacility = await getFacility(
            selectedFacility.facilityId
          );
          setFacility(fetchedFacility);
        } catch (error) {
          console.error("Error fetching facility:", error);
        }
      })();
    }
  }, [selectedFacility]);

  return (
    <Card className="border-none shadow-none">
      <Tabs
        defaultValue={userFacilities[0]?.facility.id.toString()}
        onValueChange={(facilityId) => {
          const facility = userFacilities.find(
            (uf) => uf.facility.id === +facilityId
          );
          setSelectedFacility(facility || null);
        }}
      >
        <TabsList className="mb-4">
          {userFacilities.map((userFacility) => (
            <TabsTrigger
              key={userFacility.id}
              value={userFacility.facility.id.toString()}
            >
              {userFacility.facility.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedFacility?.facility.id.toString() || ""}>
          {facility ? (
            <>
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={facility.logo || "/user_profile.png"}
                    alt="Facility logo"
                    width={150}
                    height={150}
                    className="rounded-full object-cover w-32 h-32 md:w-40 md:h-40"
                  />
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <div className="flex gap-4">
                      <CardTitle className="text-3xl font-bold">
                        {facility.name}
                      </CardTitle>
                      <EditFacility facility={facility} />
                    </div>
                    <p className="text-muted-foreground">
                      {facility.description}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                      {facility.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{facility.email}</span>
                        </div>
                      )}
                      {facility.mobileNumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary_color-600" />
                          <span>{facility.mobileNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <Gallery facility={facility} />
            </>
          ) : (
            <SkeletonDemo />
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default Facilities;
