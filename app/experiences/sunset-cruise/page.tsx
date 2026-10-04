import ExperienceDetail from "@/components/ui/ExperienceDetail";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Sunset Cruise","Explore a relaxed Zambezi River outing and what to check before choosing a cruise.","/experiences/sunset-cruise");
export default function Page() { return <ExperienceDetail slug="sunset-cruise" />; }
