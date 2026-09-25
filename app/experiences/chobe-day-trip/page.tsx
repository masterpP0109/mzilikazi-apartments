import ExperienceDetail from "@/components/ui/ExperienceDetail";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Chobe day trip",
  "Explore ideas for your Victoria Falls visit and ask about current options.",
  "/experiences/chobe-day-trip",
);
export default function Page() {
  return <ExperienceDetail slug="chobe-day-trip" />;
}
