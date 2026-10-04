import ExperienceDetail from "@/components/ui/ExperienceDetail";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Game Drive","Explore guided wildlife viewing and how to plan a game drive.","/experiences/game-drive");
export default function Page() { return <ExperienceDetail slug="game-drive" />; }
