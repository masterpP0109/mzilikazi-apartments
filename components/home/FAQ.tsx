import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import { FAQ_ITEMS } from "@/lib/constants";
import { practicalAnswers } from "@/lib/planning";
export default function FAQ({ compact = false }: { compact?: boolean }) {
  return (
    <section id="before-you-arrive" className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Container>
        <Eyebrow>Before you arrive</Eyebrow>
        <h2>A few practical things, settled.</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
          {!compact &&
            practicalAnswers.map((f) => (
              <details key={f.category}>
                <summary>{f.question}</summary>
                <p>
                  {f.answer ??
                    "Ask us for the current details for your stay. Confirm these arrangements before booking."}
                </p>
                {!f.answer && (
                  <TextLink
                    href={
                      "/contact?message=" +
                      encodeURIComponent(
                        "Please confirm " +
                          f.category.toLowerCase() +
                          " arrangements for my stay.",
                      )
                    }
                  >
                    Ask about {f.category.toLowerCase()}
                  </TextLink>
                )}
              </details>
            ))}
        </div>
        {compact && (
          <div className="actions">
            <TextLink href="/faq">All the practical questions</TextLink>
          </div>
        )}
      </Container>
    </section>
  );
}
