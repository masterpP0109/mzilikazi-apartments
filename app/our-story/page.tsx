import { PageIntro } from "@/components/ui/Editorial";
import TheStay from "@/components/home/TheStay";
import LocalTeam from "@/components/home/LocalTeam";
import Proof from "@/components/home/Proof";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Our story",
  "A Victoria Falls home base, with space to settle in and a conversation to help you plan.",
  "/our-story",
);
export default function OurStory() {
  return (
    <>
      <PageIntro
        eyebrow="Mzilikazi · Victoria Falls"
        title="A place to come back to."
      >
        <p>
          Spend the day exploring, then slow down somewhere you can make
          yourself at home.
        </p>
      </PageIntro>
      <TheStay />
      <LocalTeam />
      <Proof />
    </>
  );
}
