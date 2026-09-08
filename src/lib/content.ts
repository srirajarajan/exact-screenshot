import catWedding from "@/assets/cat-wedding.jpg";
import catBirthday from "@/assets/cat-birthday.jpg";
import catEngagement from "@/assets/cat-engagement.jpg";
import catBabyShower from "@/assets/cat-babyshower.jpg";
import catCorporate from "@/assets/cat-corporate.jpg";
import catAnniversary from "@/assets/cat-anniversary.jpg";

export const CATEGORY_IMAGES = {
  wedding: catWedding,
  birthday: catBirthday,
  engagement: catEngagement,
  "baby-shower": catBabyShower,
  corporate: catCorporate,
  anniversary: catAnniversary,
} as const;

export type Category = {
  slug: string;
  name: string;
  line: string;
  image: string;
  studioType: string;
};

export const CATEGORIES: Category[] = [
  { slug: "wedding", name: "Wedding", line: "Ceremony, sangeet, reception", image: catWedding, studioType: "wedding" },
  { slug: "birthday", name: "Birthday", line: "From first years to sixtieths", image: catBirthday, studioType: "birthday" },
  { slug: "engagement", name: "Engagement", line: "Where the story is announced", image: catEngagement, studioType: "engagement" },
  { slug: "baby-shower", name: "Baby Shower", line: "Soft, warm, unhurried", image: catBabyShower, studioType: "baby-shower" },
  { slug: "anniversary", name: "Anniversary", line: "Years worth marking", image: catAnniversary, studioType: "anniversary" },
  { slug: "corporate", name: "Corporate", line: "Brand experiences at scale", image: catCorporate, studioType: "corporate" },
  { slug: "graduation", name: "Graduation", line: "A chapter, properly closed", image: catBirthday, studioType: "graduation" },
  { slug: "housewarming", name: "Housewarming", line: "New walls, first memories", image: catBabyShower, studioType: "housewarming" },
  { slug: "private-celebration", name: "Private Celebration", line: "Intimate and entirely yours", image: catAnniversary, studioType: "other" },
  { slug: "custom-event", name: "Custom Event", line: "Tell us what you're imagining", image: catCorporate, studioType: "other" },
];

export type CaseStudy = {
  slug: string;
  title: string;
  couple: string;
  location: string;
  guests: string;
  duration: string;
  concept: string;
  inspiration: string;
  palette: string[];
  stage: string;
  floral: string;
  lighting: string;
  decor: string;
  guestExperience: string;
  photography: string;
  journey: string[];
  image: string;
  quote: string;
  preset: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "arjun-priya",
    title: "Arjun × Priya",
    couple: "Arjun × Priya",
    location: "Chennai",
    guests: "450 Guests",
    duration: "3 Days",
    concept: "A contemporary celebration inspired by South Indian heritage.",
    inspiration:
      "Temple architecture reduced to its essential geometry — carved silhouettes, warm stone, and a restrained palette that let the rituals lead.",
    palette: ["#141312", "#efe7d8", "#c9a86a", "#8b8175"],
    stage: "Circular dais with a champagne rim and a fluted stone backdrop.",
    floral: "Layered floral wall in ivory rose, jasmine and tuberose.",
    lighting: "Grand ballroom wash with warm pin-spots on the dais.",
    decor: "Three crystal chandeliers, candle installation along the aisle.",
    guestExperience:
      "A courtyard welcome with filter coffee and jasmine, then a slow procession into the hall as the lighting shifted from daylight to gold.",
    photography: "Documentary coverage across three days, two film units.",
    journey: [
      "Nine months of planning across three cities",
      "Two full design reviews in the Event Studio",
      "Four-day build, 180-person production crew",
      "Three ceremonies, one reception, zero overruns",
    ],
    image: catWedding,
    quote: "They turned our imagination into something more beautiful than we imagined.",
    preset: "royal",
  },
  {
    slug: "aarav-turns-ten",
    title: "Aarav Turns 10",
    couple: "The Menon Family",
    location: "Bangalore",
    guests: "120 Guests",
    duration: "1 Day",
    concept: "Enchanted Garden — a birthday built like a small theatre production.",
    inspiration:
      "A garden at dusk: moss, lanterns, oversized blooms and a sky that slowly turns from green to indigo across the evening.",
    palette: ["#1a1f17", "#efe7d8", "#c9a86a", "#3f4d3a"],
    stage: "Low ivory plinth with a hand-built balloon and foliage installation.",
    floral: "Hanging floral installation over the cake table.",
    lighting: "Romantic glow shifting to contemporary for the party hour.",
    decor: "LED backdrop, photo booth, candle path, entrance archway.",
    guestExperience:
      "A garden trail with hidden games, a live illustrator, and a cake reveal timed to the lighting change.",
    photography: "Half-day candid coverage plus a short film.",
    journey: [
      "Concept in the Event Studio with the birthday boy",
      "Six-week build with a custom foliage rig",
      "Same-day install, five-hour celebration",
    ],
    image: catBirthday,
    quote: "He still talks about the moment the lights changed.",
    preset: "romantic",
  },
  {
    slug: "meridian-summit",
    title: "Meridian Summit",
    couple: "Meridian Technologies",
    location: "Hyderabad",
    guests: "900 Guests",
    duration: "2 Days",
    concept: "A corporate gala with the discipline of a product launch.",
    inspiration:
      "Architectural light: hard edges, seamless LED, and an audience journey choreographed to the minute.",
    palette: ["#0f1216", "#e9edf2", "#c9a86a", "#3f7fa5"],
    stage: "Reflective runway with a seamless LED backdrop.",
    floral: "Minimal contemporary florals at the perimeter only.",
    lighting: "Cinematic — teal shadow against a warm key.",
    decor: "Side LED panels, welcome monolith, decorative wings.",
    guestExperience:
      "Timed entry, a keynote in the round, and a late lounge with a nine-piece band.",
    photography: "Multi-camera live capture with same-night edit.",
    journey: [
      "Brand workshop and content design",
      "Full technical rehearsal 48 hours ahead",
      "Two-day run with live broadcast",
    ],
    image: catCorporate,
    quote: "It ran like a broadcast and felt like a party.",
    preset: "contemporary",
  },
];

export type Destination = {
  slug: string;
  name: string;
  line: string;
  styles: string[];
  venues: string[];
  note: string;
  image: string;
};

export const DESTINATIONS: Destination[] = [
  { slug: "chennai", name: "Chennai", line: "Heritage halls and coastal light", styles: ["Traditional", "Grand"], venues: ["Heritage kalyana mandapam", "Beachfront resort lawns", "Colonial club ballrooms"], note: "Our home city, and the one we know down to the loading dock.", image: catWedding },
  { slug: "bangalore", name: "Bangalore", line: "Garden venues and cool evenings", styles: ["Contemporary", "Romantic"], venues: ["Palace grounds", "Garden estates", "Rooftop skylines"], note: "Best for open-air design between October and February.", image: catBirthday },
  { slug: "hyderabad", name: "Hyderabad", line: "Palatial scale and Nizami detail", styles: ["Royal", "Grand"], venues: ["Palace courtyards", "Convention halls", "Farmhouse estates"], note: "Where our largest productions tend to live.", image: catCorporate },
  { slug: "goa", name: "Goa", line: "Sea, sand and slow celebration", styles: ["Minimal", "Romantic"], venues: ["Beach resorts", "Portuguese villas", "Clifftop decks"], note: "Wind-rated structures and a monsoon-aware calendar.", image: catAnniversary },
  { slug: "udaipur", name: "Udaipur", line: "Lake palaces and golden hour", styles: ["Royal", "Traditional"], venues: ["Lake palaces", "Havelis", "Hilltop forts"], note: "Boat logistics and permits handled end to end.", image: catEngagement },
  { slug: "jaipur", name: "Jaipur", line: "Pink stone and courtyard drama", styles: ["Royal", "Grand"], venues: ["Fort courtyards", "Palace lawns", "Heritage hotels"], note: "Ideal for multi-day celebrations with distinct venues.", image: catWedding },
  { slug: "kerala", name: "Kerala", line: "Backwaters and green quiet", styles: ["Minimal", "Traditional"], venues: ["Backwater resorts", "Tea estates", "Beach houses"], note: "Intimate guest counts, extraordinary settings.", image: catBabyShower },
  { slug: "other-destinations", name: "Other Destinations", line: "Wherever the story takes you", styles: ["Custom"], venues: ["International venues", "Private estates", "Chartered spaces"], note: "We have produced events across six countries.", image: catCorporate },
];

export const SERVICES = [
  { name: "Event Concept & Design", text: "The idea first: a narrative, a palette, a set of moments we build everything around.", image: catWedding },
  { name: "Venue Styling", text: "Every sightline considered, from the entrance threshold to the last table.", image: catAnniversary },
  { name: "Stage & Floral Design", text: "Our workshop builds the stage; our florists dress it. Nothing is outsourced blind.", image: catBabyShower },
  { name: "Lighting & Production", text: "Rigging, power, audio and light designed as one system.", image: catCorporate },
  { name: "Entertainment", text: "Bands, DJs, classical ensembles and performance acts, curated to the room.", image: catBirthday },
  { name: "Catering Coordination", text: "Menu design and service choreography with chefs we trust.", image: catEngagement },
  { name: "Guest Experience", text: "Arrival, seating, hospitality and the small surprises in between.", image: catWedding },
  { name: "Hospitality", text: "Travel, stays and on-ground care for out-of-town guests.", image: catBabyShower },
  { name: "Photography & Film", text: "Documentary teams briefed on the moments that matter to you.", image: catAnniversary },
  { name: "Destination Planning", text: "Permits, logistics and local crews across India and abroad.", image: catEngagement },
  { name: "Event Management", text: "One production plan, one point of contact, on the day.", image: catCorporate },
];

export const CRAFT = [
  "Venue",
  "Design",
  "Floral",
  "Culinary",
  "Entertainment",
  "Hospitality",
  "Production",
  "Guest Experience",
];

export const JOURNEY = [
  { step: "Idea", text: "A conversation about what you are actually celebrating." },
  { step: "Consultation", text: "Scope, scale, budget and the shape of the day." },
  { step: "Concept", text: "A narrative and a visual direction, presented properly." },
  { step: "Design", text: "Stage, floral, lighting and decor drawn and costed." },
  { step: "Planning", text: "Vendors, timelines, permits, contingencies." },
  { step: "Production", text: "Build, rig, rehearse, refine." },
  { step: "Event Day", text: "We run it. You attend it." },
  { step: "Memory", text: "Film, photographs, and a debrief over coffee." },
];

export const BEHIND = [
  "Venue setup",
  "Florists at 4am",
  "Lighting installation",
  "Stage construction",
  "Rehearsals",
  "Catering preparation",
  "Guest arrival",
];

export const STORIES = [
  { name: "Arjun × Priya", place: "Chennai", quote: "They turned our imagination into something more beautiful than we imagined.", image: catWedding, slug: "arjun-priya" },
  { name: "The Menon Family", place: "Bangalore", quote: "He still talks about the moment the lights changed.", image: catBirthday, slug: "aarav-turns-ten" },
  { name: "Meridian Technologies", place: "Hyderabad", quote: "It ran like a broadcast and felt like a party.", image: catCorporate, slug: "meridian-summit" },
];

export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
  body: string[];
};

export const JOURNAL: JournalPost[] = [
  {
    slug: "stage-design-that-photographs-well",
    title: "Stage design that photographs well",
    category: "Stage Design",
    excerpt: "Why the most beautiful stage in the room is not always the one that survives the camera.",
    readTime: "6 min",
    image: catWedding,
    body: [
      "A stage is seen twice: once by the room, and once — for years afterwards — through photographs. The two audiences want different things.",
      "Depth matters more than density. A backdrop that sits two feet behind the seating reads flat on camera; push it back, layer light between the planes, and the same design gains dimension.",
      "Colour temperature is the quiet decision. A warm key against a neutral backdrop flatters skin; a cool wash on ivory florals turns them grey. We test every palette under the actual rig before build week.",
    ],
  },
  {
    slug: "planning-a-destination-wedding-in-udaipur",
    title: "Planning a destination wedding in Udaipur",
    category: "Destination Events",
    excerpt: "Permits, boats, heat and light — a practical guide to the lake city.",
    readTime: "9 min",
    image: catEngagement,
    body: [
      "Udaipur rewards planning that starts early. Palace venues release dates eighteen months ahead, and the good ones go in weeks.",
      "Boat logistics shape the timeline more than anything else. Guest movement across the lake sets your ceremony start, not the other way round.",
      "Build in a heat plan. Even in winter, afternoon courtyards run hot; shade structures and cooling should be designed, not improvised.",
    ],
  },
  {
    slug: "birthday-decoration-beyond-balloons",
    title: "Birthday decoration beyond balloons",
    category: "Birthday Ideas",
    excerpt: "How to give a birthday the production value of a wedding without the scale.",
    readTime: "5 min",
    image: catBirthday,
    body: [
      "Treat the evening as three acts: arrival, reveal, celebration. Each gets its own lighting state.",
      "Spend on one installation rather than five small ones. A single ceiling piece will do more than a room full of props.",
      "Give children something to do with their hands. A craft corner outperforms an entertainer at almost every age.",
    ],
  },
  {
    slug: "the-quiet-luxury-of-restraint",
    title: "The quiet luxury of restraint",
    category: "Event Trends",
    excerpt: "The most expensive-looking rooms of the last two years have been the emptiest.",
    readTime: "4 min",
    image: catAnniversary,
    body: [
      "Restraint is not cheapness. Fewer elements executed perfectly cost more than many elements executed adequately.",
      "Negative space is a material. It needs to be designed and defended against the instinct to fill it.",
      "One statement, one supporting move, and light. That is usually the whole recipe.",
    ],
  },
  {
    slug: "a-realistic-wedding-decor-budget",
    title: "A realistic wedding decor budget",
    category: "Planning Guides",
    excerpt: "What stage, floral, lighting and decor actually cost in India in 2026.",
    readTime: "8 min",
    image: catBabyShower,
    body: [
      "Decor typically lands between 18% and 30% of a total wedding budget, depending on venue and guest count.",
      "Floral is the most elastic line. The same visual weight can be achieved at half the cost with structure-led design.",
      "Use the Event Studio to see the shape of your spend before you speak to a single vendor.",
    ],
  },
  {
    slug: "designing-for-two-hundred-guests",
    title: "Designing for two hundred guests",
    category: "Decor Inspiration",
    excerpt: "The scale at which a room stops being intimate and starts needing architecture.",
    readTime: "6 min",
    image: catCorporate,
    body: [
      "Around two hundred guests, sightlines break. Anything below eye level disappears for two thirds of the room.",
      "Go vertical. Ceiling installations and tall florals carry the design to the back rows.",
      "Split the space into zones with light rather than walls; the room stays generous and still feels held.",
    ],
  },
];
