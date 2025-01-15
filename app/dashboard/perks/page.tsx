import SkeletonDemo from "@/components/SkeletonDemo";
import { Perk } from "@/lib/types/type";
import { getPerks } from "@/lib/db/perkCrud";
import Perks from "./Perks";

const PerksPage = async () => {
  let perks: Perk[] | null = null;
  let error: string | null = null;

  try {
    perks = await getPerks();
  } catch (err) {
    console.error("Error fetching perks:", err);
    error = "Failed to load perks. Please try again later.";
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (perks === null) {
    return <SkeletonDemo />;
  }

  return (
    <div className="text-gray-900 dark:text-slate-50">
      <Perks perks={perks} />
    </div>
  );
};

export default PerksPage;
