import { PageIntro } from "@/components/ui/Editorial";
import TheStay from "@/components/home/TheStay";
import LocalTeam from "@/components/home/LocalTeam";
import Proof from "@/components/home/Proof";
import { propertyPhotos } from "@/lib/property";
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
        media={propertyPhotos.exteriorEntrance}
        mediaRatio="wide"
      >
        <p>
          Mzilikazi Apartments was created for travellers who want a practical,
          comfortable base in Victoria Falls, with enough space to rest, cook,
          and plan the days around the Falls at their own pace.
        </p>
        <p>
          The name reflects the local heritage of the region, while the stay itself
          is shaped around warm, easy hospitality, genuinely useful local knowledge,
          and a home-like rhythm that feels personal rather than formal.
        </p>
      </PageIntro>
      <TheStay />
      <LocalTeam />
      <Proof />
    </>
  );
}
