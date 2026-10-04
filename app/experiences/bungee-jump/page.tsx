import ExperienceDetail from "@/components/ui/ExperienceDetail";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Bungee Jump","Learn about a Victoria Falls Bridge bungee experience and what to check before booking.","/experiences/bungee-jump");
export default function Page() { return <ExperienceDetail slug="bungee-jump" />; }
