import StayAudience from "@/components/ui/StayAudience";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Family & group accommodation in Victoria Falls",
  "Plan a stay together. Ask about accommodation options for your family or group in Victoria Falls.",
  "/family-group-accommodation-victoria-falls",
);
export default function Page() {
  return <StayAudience kind="family" />;
}
