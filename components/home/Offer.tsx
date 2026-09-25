import { confirmedServices } from "@/lib/property";
export default function Offer() {
  const services = confirmedServices.filter((s) => s.confirmed);
  if (!services.length) return null;
  return (
    <section className="section">
      <div className="container">
        <h2>For your stay.</h2>
        {services.map((s) => (
          <div key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
