import StoryIntro from "./StoryIntro";
import StoryChapter from "./StoryChapter";
import TravellerGuidance from "./TravellerGuidance";
import BrandPhilosophy from "./BrandPhilosophy";
import DecisionGuide from "./DecisionGuide";
import { storyContent } from "./content";

export default function MzilikaziStory() {
  const labels = ["The freedom of self-catering", "Finding the right fit", "Your first visit"];
  return (
    <section id="welcome-to-mzilikazi" className="mzilikazi-education" aria-labelledby="mzilikazi-education-title">
      <StoryIntro />
      {storyContent.chapters.map((chapter, index) => <StoryChapter key={chapter.id} chapter={chapter} index={index} label={labels[index]} />)}
      <TravellerGuidance />
      <BrandPhilosophy />
      <StoryChapter chapter={storyContent.trust} index={1} label="Choose with confidence" />
      <DecisionGuide />
    </section>
  );
}
