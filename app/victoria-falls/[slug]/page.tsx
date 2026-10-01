import { notFound } from "next/navigation";
import { guideArticles } from "@/lib/planning";
import { PageIntro, Container, TextLink } from "@/components/ui/Editorial";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return guideArticles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = guideArticles.find((a) => a.slug === slug);
  return a
    ? pageMetadata(a.title, a.summary, "/victoria-falls/" + slug)
    : { title: "Guide not found" };
}
export default async function GuideArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = guideArticles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <>
      <PageIntro
        eyebrow={"Victoria Falls Guide · " + a.category}
        title={a.title}
      >
        <p>{a.summary}</p>
      </PageIntro>
      <section className="section">
        <Container>
          <article className="guide-article">
            {a.sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
            {a.sources?.length && (
              <section>
                <h2>Useful sources</h2>
                <ul>
                  {a.sources.map((s) => (
                    <li key={s.href}>
                      <a className="text-link" href={s.href}>
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="actions">
              <TextLink href="/plan">Make this part of your trip</TextLink>
              <TextLink href="/victoria-falls#guide">
                Back to the guide
              </TextLink>
            </div>
          </article>
          <section className="guide-category">
            <h3>Keep planning</h3>
            <div className="guide-links">
              {guideArticles
                .filter((g) => g.slug !== slug && g.category === a.category)
                .slice(0, 3)
                .map((g) => (
                  <TextLink href={"/victoria-falls/" + g.slug} key={g.slug}>
                    {g.title}
                  </TextLink>
                ))}
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}
