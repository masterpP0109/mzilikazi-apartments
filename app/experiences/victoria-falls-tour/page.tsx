import ExperienceDetail from "@/components/ui/ExperienceDetail";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Victoria Falls tour",
  "Explore ideas for your Victoria Falls visit and ask about current options.",
  "/experiences/victoria-falls-tour",
);
export default function Page() {
  return <ExperienceDetail slug="victoria-falls-tour" />;
}
