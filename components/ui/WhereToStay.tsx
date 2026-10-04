import { Container, Eyebrow, ImageFrame, TextLink } from "./Editorial";
import Button from "./Button";
import { publishedAccommodations, propertyPhotos } from "@/lib/property";
export default function WhereToStay({showOptions = true}: {showOptions?: boolean}) {
  return <section className="section where-to-stay" aria-labelledby="where-to-stay-title">
    <Container>
      <div className="where-to-stay-layout">
        <ImageFrame media={propertyPhotos.living} ratio="landscape" sizes="(max-width: 767px) 100vw, 45vw" />
        <div className="where-to-stay-copy"><Eyebrow>Where to stay</Eyebrow><h2 id="where-to-stay-title">A base that fits the way you travel.</h2>
          <p>Mzilikazi offers suite and apartment accommodation in Victoria Falls. Start with the room layout and the space you want between outings.</p>
          <p>The property photographs show bedrooms, living and dining areas, kitchens and outdoor spaces. Ask which facilities belong to your selected suite; these photographs are a glimpse of Mzilikazi rather than a room-by-room promise.</p>
          <h3>What matters for your stay?</h3>
          <p>If you want two bedrooms and a shared lounge, start with the Family Suite. If outdoor space matters, look at the Batoka Suite. Compare the details with your group’s sleeping preferences before choosing.</p>
          <p>Confirm beds and guest capacity, kitchen equipment, Wi-Fi, parking and any accessibility needs for the room you choose. Ask about current rates and booking terms.</p>
          <h3>Plan the practical parts</h3><p>Ask for the property’s exact location and the pickup point for your activities. Confirm transport to the Falls, town and airport, including return arrangements and costs.</p>
          <div className="actions"><Button href="/apartments">Explore the Stay</Button><TextLink href="/contact">Ask about accommodation</TextLink></div>
        </div>
      </div>
      {showOptions && <div className="stay-option-guide">{publishedAccommodations.map(a=><article key={a.slug}><h3>{a.name}</h3><p>{a.description}</p><TextLink href={"/apartments/"+a.slug}>Explore This Apartment</TextLink></article>)}</div>}
      <div className="stay-experience-connection"><h3>Plan your stay around the experiences you want.</h3><p>Leave time for travel, activities and a pause back at your accommodation. Experiences are chosen and confirmed separately from a room booking.</p><TextLink href="/experiences">Explore experiences</TextLink></div>
    </Container>
  </section>;
}
