import ExperienceDetail from "@/components/ui/ExperienceDetail";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Local culture around Victoria Falls",
  "Explore ideas for your Victoria Falls visit and ask about current options.",
  "/experiences/village-cultural-visit",
);
export default function Page() {
  return <ExperienceDetail slug="village-cultural-visit" />;
}
