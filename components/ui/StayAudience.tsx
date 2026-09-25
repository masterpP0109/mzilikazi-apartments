import { PageIntro, Container, Eyebrow } from "./Editorial";
import EnquiryForm from "@/components/forms/EnquiryForm";
export default function StayAudience({ kind }: { kind: "family" | "work" }) {
  const family = kind === "family";
  return (
    <>
      <PageIntro
        eyebrow={family ? "Families & groups" : "Work & longer stays"}
        title={
          family
            ? "Good days, better together."
            : "A calmer base for a busy visit."
        }
      >
        <p>
          {family
            ? "Bring your people. Make time for Victoria Falls, and for each other."
            : "Make room for your visit, whether you are here for meetings, a conference or a longer stay."}
        </p>
      </PageIntro>
      <section className="section">
        <Container>
          <div className="contact-layout">
            <div>
              <Eyebrow>A stay that fits</Eyebrow>
              <h2>
                {family ? "Tell us who is coming." : "Tell us what you need."}
              </h2>
              <p style={{ marginTop: 24 }}>
                {family
                  ? "Share the number of adults and children, your preferred sleeping arrangements and any practical requirements. Ask for the available layouts and facilities for your dates."
                  : "Include your dates, number of guests and any workspace, connectivity or invoicing requirements. Ask for confirmation of the facilities and arrangements you need before booking."}
              </p>
            </div>
            <EnquiryForm
              defaultPreference={
                family ? "Family or group stay" : "Work or conference stay"
              }
            />
          </div>
        </Container>
      </section>
    </>
  );
}
