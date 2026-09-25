import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";
import { PageIntro } from "@/components/ui/Editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Frequently asked questions",
  "Practical answers about enquiries, rates and planning your Victoria Falls stay.",
  "/faq",
);
export default function FAQPage() {
  return (
    <>
      <PageIntro eyebrow="Good to know" title="A few questions, answered." />
      <FAQ />
      <FinalCTA />
    </>
  );
}
