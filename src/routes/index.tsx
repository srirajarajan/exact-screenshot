import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/home/Hero";
import { StudioPreview } from "@/components/home/StudioPreview";
import { EventConcierge } from "@/components/home/EventConcierge";
import {
  BehindTheMagic,
  CategoriesSection,
  ChooseYourStory,
  ClientStories,
  DestinationExplorer,
  FinalCta,
  JourneySection,
  OurCraft,
  SignatureCelebrations,
} from "@/components/home/HomeSections";

const TITLE = "Maison Orchestra — Luxury Event Planning & Design Studio";
const DESC =
  "We design weddings, birthdays and corporate celebrations — and let you visualise your stage in 3D before anything is built.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <SignatureCelebrations />
      <StudioPreview />
      <ChooseYourStory />
      <OurCraft />
      <DestinationExplorer />
      <JourneySection />
      <BehindTheMagic />
      <ClientStories />
      <EventConcierge />
      <FinalCta />
    </>
  );
}
