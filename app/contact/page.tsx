import Contact from "@/components/home/Contact";
import { PageIntro } from "@/components/ui/Editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Check availability",
  "Enquire about dates, accommodation and current rates for your Victoria Falls stay.",
  "/contact",
);
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const value = (k: string) =>
    typeof params[k] === "string"
      ? (params[k] as string).slice(0, 5000)
      : undefined;
  const guests = Number(value("guests"));
  return (
    <>
      <PageIntro
        eyebrow="Let’s make a plan"
        title="Your Victoria Falls stay starts here."
      >
        <p>
          Share your dates. Ask your questions. Find a place to come home to.
        </p>
      </PageIntro>
      <Contact
        initialValues={{
          arrivalDate: value("arrival"),
          departureDate: value("departure"),
          guests:
            Number.isInteger(guests) && guests > 0 && guests <= 20 ? guests : 2,
          apartmentPreference: value("preference") ?? value("service"),
          message: value("message"),
        }}
      />
    </>
  );
}
