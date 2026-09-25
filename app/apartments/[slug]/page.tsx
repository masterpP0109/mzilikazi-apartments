import { notFound } from "next/navigation";
import { accommodations } from "@/lib/property";
import { Container, PageIntro, TextLink } from "@/components/ui/Editorial";
import { AccommodationFacts } from "@/components/ui/AccommodationCard";
import ApartmentGallery from "@/components/ui/ApartmentGallery";
import AvailabilityPanel from "@/components/forms/AvailabilityPanel";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/constants";
const find = (slug: string) =>
  accommodations.find((a) => a.slug === slug || a.aliases.includes(slug));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = find(slug);
  return a
    ? {
        ...pageMetadata(
          a.confirmed && a.name ? a.name : "Accommodation enquiry",
          a.confirmed && a.description
            ? a.description
            : "Ask about accommodation options and current availability for your Victoria Falls stay.",
          `/apartments/${a.slug}`,
        ),
        ...(!a.confirmed ? { robots: { index: false, follow: true } } : {}),
      }
    : { title: "Accommodation not found" };
}
function DetailList({ title, items }: { title: string; items: string[] }) {
  return items.length ? (
    <section>
      <h2>{title}</h2>
      <ul className="amenity-grid">
        {items.map((s) => (
          <li key={s}>
            <span aria-hidden="true">—</span>
            {s}
          </li>
        ))}
      </ul>
    </section>
  ) : null;
}
export default async function ApartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = find(slug);
  if (!a) notFound();
  const whatsapp = whatsappUrl();
  const publicName = a.confirmed ? a.name : null;
  return (
    <>
      <PageIntro
        eyebrow="Your space in Victoria Falls"
        title={publicName ?? "Let’s find your space."}
      >
        {a.confirmed && a.description ? (
          <p>{a.description}</p>
        ) : (
          <p>
            Share your dates and preferences to request the accommodation
            options for your visit.
          </p>
        )}
      </PageIntro>
      <section className="section">
        <Container>
          {a.confirmed && <ApartmentGallery images={a.gallery} />}
          <div className="detail-layout">
            <div className="detail-content">
              <AccommodationFacts apartment={a} />
              {a.confirmed && (
                <>
                  {a.about && (
                    <section>
                      <h2>About the apartment</h2>
                      <p>{a.about}</p>
                    </section>
                  )}
                  <DetailList
                    title="Sleeping arrangements"
                    items={a.sleeping}
                  />
                  <DetailList title="Amenities" items={a.amenities} />
                  <DetailList title="Kitchen facilities" items={a.kitchen} />
                  <DetailList title="Ideal for" items={a.idealFor} />
                </>
              )}
              <section>
                <h2>Make it your stay.</h2>
                <p>
                  {a.confirmed && a.rate
                    ? a.rate
                    : "Request current rates for your dates and guest count."}
                </p>
                <p className="form-note">
                  An enquiry is the beginning of a conversation. Your stay is
                  confirmed separately.
                </p>
              </section>
              {a.confirmed && a.policies.length > 0 && (
                <section>
                  <h2>Good to know</h2>
                  <dl>
                    {a.policies.map((p) => (
                      <div className="policy-row" key={p.label}>
                        <dt>{p.label}</dt>
                        <dd>{p.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
              <TextLink href="/apartments">Explore accommodation</TextLink>
              {whatsapp && (
                <div>
                  <a className="text-link" href={whatsapp}>
                    Ask on WhatsApp →
                  </a>
                </div>
              )}
            </div>
            <aside className="detail-sidebar" aria-label="Check availability">
              <AvailabilityPanel preference={publicName ?? undefined} />
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
