"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { createImage } from "@/lib/db/GalleryCrud";
import { Facility } from "@/lib/types/type";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Gallery = ({ facility }: { facility: Facility }) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append(
      "UPLOADCARE_PUB_KEY",
      process.env.NEXT_PUBLIC_UPLOADCARE_API_KEY!
    );
    formData.append("file", file);

    try {
      const response = await fetch("https://upload.uploadcare.com/base/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image to Uploadcare");
      }

      const data = await response.json();
      const imageUrl = data.file;

      onImageUpload(`https://ucarecdn.com/${imageUrl}/
-/preview/1000x750/`);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsUploading(false);
    }
  }

  function onImageUpload(imageUrl: string) {
    createImage({
      imageUrl,
      facilityId: facility.id,
    });

    toast({
      title: "Facility image uploaded successfully",
      description: "You can see it in your facility page.",
      className: "bg-primary text-primary-foreground",
    });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label
          htmlFor="image-upload"
          className="flex items-center cursor-pointer space-x-2 p-2 rounded-md border bg-gray-100 hover:bg-gray-200"
        >
          <ImagePlus className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">
            {isUploading ? "Uploading..." : "Upload Image"}
          </span>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <ScrollArea className="rounded-md border p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {facility.gallery.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-md border"
            >
              <img
                src={image.imageUrl}
                alt={`Facility Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Gallery;
