import ExperienceDetail from "@/components/ui/ExperienceDetail";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("The Boma Dinner","Learn about dinner, dance and drumming and plan your evening at The Boma.","/experiences/boma-dinner");
export default function Page() { return <ExperienceDetail slug="boma-dinner" />; }
