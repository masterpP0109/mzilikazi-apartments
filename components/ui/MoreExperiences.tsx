import { Container, TextLink } from "./Editorial";
import Button from "./Button";
export default function MoreExperiences({detail=false}: {detail?: boolean}) {
  const href='/contact?'+new URLSearchParams({experience:'other',message:'Hi, I’d like to ask about another activity or experience during my stay at Mzilikazi. Please help me explore the options.'}).toString();
  return <section className="section experience-other"><Container><div className="experience-other-copy">
    <h2>There’s More to Victoria Falls</h2>
    <p>These seven popular experience guides are not an exhaustive list of everything available in Victoria Falls. They introduce some of the outings visitors commonly choose during their stay.</p>
    <p>If there is another activity you would like to try, tell us what you have in mind and we can help explore the available options.</p>
    <div className="actions"><Button href={href}>Explore More Experiences With Us</Button>{detail && <TextLink href="/experiences">Explore More Activities</TextLink>}</div>
  </div></Container></section>;
}
