"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import EditFacility from "./EditFacility";
import { Phone, Mail } from "lucide-react";
import Gallery from "./Gallery";
import { Facility } from "@/lib/types/type";

const ManageFacility = ({ facility }: { facility: Facility }) => {
  return (
    <Card className="border-none shadow-none">
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
            <p className="text-muted-foreground">{facility.description}</p>
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
    </Card>
  );
};

export default ManageFacility;
