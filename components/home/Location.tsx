import { Container, Eyebrow, TextLink } from "@/components/ui/Editorial";
import { propertyLocation } from "@/lib/property";
export default function Location() {
  const location = propertyLocation;
  const map =
    location.mapEmbedUrl &&
    location.mapEmbedUrl.startsWith("https://www.google.com/maps/embed")
      ? location.mapEmbedUrl
      : null;
  return (
    <section className="section">
      <Container>
        <div className="editorial-split">
          <div>
            <Eyebrow>Getting your bearings</Eyebrow>
            <h2>Know where you’re going.</h2>
            {location.address && <p>{location.address}</p>}
            {map && (
              <iframe
                className="location-map"
                src={map}
                title="Mzilikazi property location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
          <div>
            <p>
              Ask for the exact location, arrival directions and pickup
              arrangements before you travel.
            </p>
            <ul className="nearby-list">
              {location.nearby.map((place) => (
                <li key={place.name}>
                  <span>{place.name}</span>
                  <span>
                    {place.travelTime ?? "Ask about the journey"}
                    {place.note ? " · " + place.note : ""}
                  </span>
                </li>
              ))}
            </ul>
            <div className="actions">
              {location.mapUrl && (
                <a className="text-link" href={location.mapUrl}>
                  Open the property map →
                </a>
              )}
              <TextLink href="/victoria-falls/getting-around">
                Plan your transport
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
