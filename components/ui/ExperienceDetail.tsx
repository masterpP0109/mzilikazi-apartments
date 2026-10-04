import { AddToTrip } from "@/components/trip/TripProvider";
import { experiences, experienceEnquiryHref, experienceEnquiryMessage, experiencePriceLabel, type Experience } from "@/lib/experience-content";
import { whatsappUrl } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Container, ImageFrame, TextLink, Eyebrow } from "./Editorial";
import Button from "./Button";
import ExperiencePrice from "./ExperiencePrice";
import ExperienceGallery from "./ExperienceGallery";
import ExperienceCard from "./ExperienceCard";
import MoreExperiences from "./MoreExperiences";

function GuideList({ title, items, note }: { title: string; items: string[]; note?: string }) {
  if (!items.length) return null;
  return <section><h2>{title}</h2>{note && <p className="form-note">{note}</p>}<ul>{items.map(item => <li key={item}>{item}</li>)}</ul></section>;
}

function ExperienceQuickFacts({ experience: e }: { experience: Experience }) {
  const facts = [
    ['Duration', e.duration ?? 'Timing is agreed for the host-led visit'],
    ['Typical operating times', e.guide?.operatingTimes ?? e.bestTime],
    ['Location', e.location], ['Starting price', experiencePriceLabel(e)],
  ];
  return <section id="experience-facts"><h2>Experience at a glance</h2><dl className="experience-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="experience-pickup"><h3>Pickup / meeting point</h3><p>{e.guide?.pickupInformation ?? e.plan}</p></div>
  </section>;
}

function ExperienceBookingCTA({ experience: e }: { experience: Experience }) {
  const whatsapp = whatsappUrl(experienceEnquiryMessage(e.title));
  return <section id="experience-booking" className="experience-enquiry">
    <Eyebrow>Make it part of your stay</Eyebrow><h2>Interested in this experience?</h2>
    <p>Staying at Mzilikazi? We can help you include this experience in your Victoria Falls stay and confirm current availability, pricing and pickup arrangements.</p>
    <h3>What happens after your request?</h3>
    <ol className="experience-booking-steps">{e.bookingNotes.map(note => <li key={note}>{note}</li>)}</ol>
    <div className="actions"><Button href={experienceEnquiryHref(e)}>Check Experience Availability</Button><AddToTrip kind="experience" id={e.slug}/></div>
    <div className="actions">{whatsapp && <a className="text-link" href={whatsapp}>Ask Mzilikazi on WhatsApp</a>}<TextLink href="/apartments">Explore the accommodation</TextLink></div>
  </section>;
}

export default function ExperienceDetail({ slug }: { slug: string }) {
  const e = experiences.find(x => x.slug === slug && x.enabled);
  if (!e) notFound();
  const related = e.relatedExperienceSlugs.map(slug => experiences.find(x => x.slug === slug && x.enabled)).filter((x): x is Experience => Boolean(x));
  return <>
    <section className="section experience-hero"><Container>
      <TextLink href="/experiences">All Victoria Falls experiences</TextLink>
      <div className="experience-hero-layout">
        <div className="experience-hero-copy"><Eyebrow>Beyond your Mzilikazi stay · {e.category}</Eyebrow><h1>{e.title}</h1><p className="experience-hero-description">{e.description}</p>
          <ExperiencePrice experience={e}/><nav className="actions" aria-label="Experience guide"><TextLink href="#experience-facts">Practical information</TextLink><TextLink href="#experience-gallery">View gallery</TextLink><TextLink href="#experience-booking">Booking assistance</TextLink></nav>
        </div>
        {e.media && <ImageFrame media={e.media} priority ratio="landscape" sizes="(max-width: 1023px) 90vw, 45vw"/>}
      </div>
    </Container></section>
    <section className="section experience-detail"><Container>
      <div className="experience-detail-layout">
        <div className="experience-detail-copy">
          <ExperienceQuickFacts experience={e}/>
          <section><h2>Overview</h2><p>{e.detail}</p>{e.guide?.overview.map(p => <p key={p}>{p}</p>)}</section>
          <GuideList title="Highlights" items={e.highlights}/>
          <section><h2>What to Expect</h2>{e.guide ? <><p className="form-note">A typical journey; the sequence and timings can change with your selected package.</p><ol className="experience-timeline">{e.guide.whatToExpect.map(step => <li key={step}>{step}</li>)}</ol></> : e.expect.map(p => <p key={p}>{p}</p>)}</section>
          <GuideList title="Usually Included" items={e.inclusions} note="Packages commonly include the following. Your selected package’s written inclusions are confirmed before payment."/>
          <GuideList title="Possible Additional Costs" items={e.exclusions} note="These may be separate or included in a package. Compare the full payable total, rather than the activity price alone."/>
          <GuideList title="Good For" items={e.guide?.goodFor ?? [e.enjoy]}/>
          <GuideList title="Before You Go" items={e.guide?.beforeYouGo ?? e.check}/>
          {!e.guide && <section><h2>Useful questions</h2><div className="faq-list">{e.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>}
          <div id="experience-gallery" tabIndex={-1}><ExperienceGallery key={e.slug} images={e.gallery} title={e.title}/></div>
          {e.guide && <details className="experience-source-note"><summary>About this guide</summary><p>General destination guidance, checked on 3 October 2026. Typical arrangements draw on published operator examples; they do not promise the same inclusions for every booking. Prices retain the project’s Outbound Holiday references.</p><ul>{e.sources.map((source, i) => <li key={source}><a className="text-link" href={source}>Published {e.slug === 'boma-dinner' ? 'venue' : 'operator'} information{e.sources.length > 1 ? ` ${i + 1}` : ''}</a></li>)}</ul></details>}
          <ExperienceBookingCTA experience={e}/>
        </div>
        <aside className="experience-planning-note"><Eyebrow>Your Victoria Falls base</Eyebrow><h2>A day out. Your own space to return to.</h2>
          <p>Start with the apartment that suits your group, then leave room for the experiences you enjoy. Mzilikazi is your accommodation base; activities are arranged separately.</p>
          <TextLink href="/apartments">Explore the stay</TextLink><TextLink href="/experiences">Compare experiences</TextLink>
        </aside>
      </div>
    </Container></section>
    {related.length > 0 && <section className="section experience-related" aria-labelledby="related-experiences-title"><Container><Eyebrow>Keep exploring</Eyebrow><h2 id="related-experiences-title">You may also enjoy</h2><div className="experience-grid">{related.map(e => <ExperienceCard key={e.slug} experience={e} heading="h3"/>)}</div></Container></section>}
    <MoreExperiences detail/>
  </>;
}
