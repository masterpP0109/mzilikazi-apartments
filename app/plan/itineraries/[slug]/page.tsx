import { notFound } from "next/navigation";
import { itineraries } from "@/lib/planning";
import { PageIntro, Container, TextLink } from "@/components/ui/Editorial";
import { AddToTrip } from "@/components/trip/TripProvider";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return itineraries.map((i) => ({ slug: i.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = itineraries.find((i) => i.id === slug);
  return i
    ? pageMetadata(i.title, i.description, "/plan/itineraries/" + slug)
    : { title: "Itinerary not found" };
}
export default async function ItineraryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = itineraries.find((i) => i.id === slug);
  if (!i) notFound();
  return (
    <>
      <PageIntro
        eyebrow={i.nights + " nights · A suggested outline"}
        title={i.title}
      >
        <p>{i.description}</p>
      </PageIntro>
      <section className="section">
        <Container>
          <ol className="itinerary-detail">
            {i.days.map((d, n) => (
              <li key={d.title}>
                <p className="eyebrow">Day {n + 1}</p>
                <h2>{d.title}</h2>
                <p>{d.copy}</p>
              </li>
            ))}
          </ol>
          <p className="form-note">
            Change the days to suit your journey. Activity suitability,
            availability, travel arrangements and prices need confirming.
          </p>
          <div className="actions">
            <AddToTrip kind="itinerary" id={i.id} />
            <TextLink href="/plan">Make this your trip</TextLink>
          </div>
          <h3 className="related-heading">Ideas in this outline</h3>
          {i.experienceIds.map((id) => (
            <TextLink key={id} href={"/experiences/" + id}>
              {id.split("-").join(" ")}
            </TextLink>
          ))}
        </Container>
      </section>
    </>
  );
}
