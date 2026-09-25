import { FAQ_ITEMS } from "@/lib/constants";
import { Container } from "@/components/ui/Editorial";
export default function FAQ() {
  return (
    <section className="section">
      <Container>
        <div className="faq-list">
          {FAQ_ITEMS.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
