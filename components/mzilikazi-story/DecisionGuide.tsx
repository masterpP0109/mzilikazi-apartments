import Link from "next/link";
import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import { storyContent } from "./content";
import { StoryQuote } from "./StoryText";

export default function DecisionGuide() {
  return (
    <section className="education-decision section stone" aria-labelledby="education-decision-title">
      <Container>
        <header className="education-heading">
          <Eyebrow>Before you choose</Eyebrow>
          <h3 id="education-decision-title">{storyContent.decisionHeading}</h3>
        </header>
        <ol className="education-decision-list">
          {storyContent.decisions.map(decision => <li key={decision.number}>
            <span className="education-number" aria-hidden="true">{decision.number}</span>
            <div><h4>{decision.heading}</h4><p>{decision.copy}</p></div>
          </li>)}
        </ol>
        <div className="education-reading education-decision-close">
          <p>Keep those questions with you as you explore the rest of the site.</p>
          <p>We&apos;ve designed the next sections to help you answer them.</p>
          <StoryQuote text="You don't have to decide yet." />
        </div>
        <div className="actions education-actions">
          <Link href="/apartments" className="button button-primary">Explore the Accommodation</Link>
          <Link href="/contact" className="button button-secondary">Check Availability</Link>
          <TextLink href="/plan">Help Me Plan My Stay</TextLink>
        </div>
      </Container>
    </section>
  );
}
