import StayAudience from "@/components/ui/StayAudience";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Corporate stays in Victoria Falls",
  "Enquire about accommodation for your work, conference or longer visit to Victoria Falls.",
  "/corporate-stays-victoria-falls",
);
export default function Page() {
  return <StayAudience kind="work" />;
}
