/**
 * Mock-data för prototypen.
 * När backend kopplas in byts dessa mot Supabase-anrop, men signaturerna behålls.
 *
 * Mönster:
 *   export async function getDog() {
 *     await fakeDelay();
 *     return mockDog;
 *   }
 *
 * När vi går live byts bara innehållet i funktionen, inte UI-koden som anropar dem.
 */

const fakeDelay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export type Dog = {
  id: string;
  name: string;
  breed: string;
  age: string;
  weight: string;
  note?: string;
  memberSince: string;
};

export type Owner = {
  id: string;
  name: string;
};

export type Instructor = {
  id: string;
  name: string;
  initial: string;
  specialties: string[];
  yearsAtDogpark: number;
  rating: number;
  totalSessions: number;
  bio: string;
};

export type Park = {
  id: string;
  name: string;
  city: string;
  address: string;
  distanceKm: number;
  sizeSqm: number;
  openedYear: number;
  zones: string[];
  instructors: number;
  tagline: string;
  facilities: string[];
};

export type MembershipTier = {
  id: "bas" | "plus" | "premium";
  name: string;
  tagline: string;
  pricePerMonth: number; // månadsvis plan
  pricePerMonthAnnual: number; // årsplan delat på 12
  features: string[];
  highlight?: boolean;
};

export type Program = {
  id: string;
  name: string;
  description: string;
  totalSessions: number;
  priceSEK: number;
  whyForYou?: string;
};

export type Session = {
  id: string;
  programId: string;
  programName: string;
  level: number;
  sessionNumber: number;
  totalInProgram: number;
  instructorId: string;
  instructorName: string;
  parkId: string;
  parkName: string;
  startsAt: string; // ISO
  durationMin: number;
  spotsLeft: number;
  priceSEK: number;
};

export type JourneyState = {
  dogId: string;
  programName: string;
  level: number;
  totalLevels: number;
  currentSession: number;
  totalSessions: number;
  progressPct: number;
};

export type Milestone = {
  id: string;
  title: string;
  daysAgo: number;
  type: "achievement" | "love" | "level";
};

// ---------- Mock-data ----------

export const mockOwner: Owner = {
  id: "owner-1",
  name: "Wasim",
};

export const mockDog: Dog = {
  id: "dog-1",
  name: "Luna",
  breed: "Border collie",
  age: "2 år",
  weight: "17 kg",
  note: "Lite osäker med stora hundar",
  memberSince: "mars 2025",
};

export const mockInstructor: Instructor = {
  id: "instr-1",
  name: "Anna Lindgren",
  initial: "A",
  specialties: ["Nosework", "Bondbyggande", "Valpträning"],
  yearsAtDogpark: 3,
  rating: 4.9,
  totalSessions: 412,
  bio: "Jag tror på små vinster, varje vecka. Lite bättre kontakt, lite roligare lek. Hundar mår bra av rutin men blomstrar av variation.",
};

export const mockPark: Park = {
  id: "park-uppsala",
  name: "Dogpark Uppsala",
  city: "Uppsala",
  address: "Årsta, Uppsala",
  distanceKm: 2.1,
  sizeSqm: 6000,
  openedYear: 2024,
  zones: ["Stora hundparken", "Parken Greta", "Hundgymmet", "Parken Zenna"],
  instructors: 3,
  tagline: "Modern park i Årsta, nära centrum",
  facilities: ["Hundgym", "Privatpark bokningsbar", "Vardagsrum", "Lillevilla shop"],
};

export const mockParks: Park[] = [
  {
    id: "park-uddevalla",
    name: "Dogpark Uddevalla",
    city: "Uddevalla",
    address: "Helenedalsvägen, Uddevalla",
    distanceKm: 312,
    sizeSqm: 10000,
    openedYear: 2021,
    zones: [
      "Stora hundparken",
      "Parken Greta",
      "Hundgymmet",
      "Parken Zenna",
      "Vardagsrum",
    ],
    instructors: 4,
    tagline: "Flaggskeppet, 10 000 kvm vid Bjursjön",
    facilities: ["Stora tältet", "Hundgym", "Privatpark", "Shop", "Lånehörna"],
  },
  {
    id: "park-uppsala",
    name: "Dogpark Uppsala",
    city: "Uppsala",
    address: "Årsta, Uppsala",
    distanceKm: 2.1,
    sizeSqm: 6000,
    openedYear: 2024,
    zones: ["Stora hundparken", "Parken Greta", "Hundgymmet", "Parken Zenna"],
    instructors: 3,
    tagline: "Modern park i Årsta, nära centrum",
    facilities: [
      "Hundgym",
      "Privatpark",
      "Gratis tandvård för PREMIUM",
      "Vardagsrum",
    ],
  },
  {
    id: "park-vasteras",
    name: "Dogpark Västerås",
    city: "Västerås",
    address: "Västerås",
    distanceKm: 95,
    sizeSqm: 5500,
    openedYear: 2025,
    zones: ["Stora hundparken", "Parken Greta", "Hundgymmet"],
    instructors: 2,
    tagline: "Nyöppnad, bygger upp gruppträningsschema",
    facilities: ["Hundgym", "Vardagsrum", "Shop"],
  },
];

export const mockMembershipTiers: MembershipTier[] = [
  {
    id: "bas",
    name: "BAS",
    tagline: "För er som mest vill springa av er",
    pricePerMonth: 349,
    pricePerMonthAnnual: 319,
    features: [
      "Tillgång till parken dygnet runt, året om",
      "Digital nyckel i appen",
      "Stora hundparken och Parken Greta",
      "Vardagsrum vid entré",
      "Lånehörnan för leksaker",
    ],
  },
  {
    id: "plus",
    name: "PLUS",
    tagline: "För er som vill träna också",
    pricePerMonth: 549,
    pricePerMonthAnnual: 499,
    features: [
      "Allt i BAS",
      "Tillgång till Hundgymmet",
      "Bokning av Parken Zenna (privat)",
      "Rabatt på hundkurser",
      "10 kr tandvård (gäller Uppsala)",
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    tagline: "Hela Dogpark, utan bromsklossar",
    pricePerMonth: 849,
    pricePerMonthAnnual: 769,
    features: [
      "Allt i PLUS",
      "Alla gruppträningar ingår",
      "Gratis tandvård (Uppsala)",
      "Förtur till bokningar",
      "Extra rabatt på kurser och shop",
    ],
    highlight: true,
  },
];

export const mockJourney: JourneyState = {
  dogId: "dog-1",
  programName: "SnifferQuest",
  level: 2,
  totalLevels: 4,
  currentSession: 5,
  totalSessions: 8,
  progressPct: 62,
};

export const mockNextSession: Session = {
  id: "session-1",
  programId: "prog-snifferquest",
  programName: "Nosework med Anna",
  level: 2,
  sessionNumber: 5,
  totalInProgram: 8,
  instructorId: "instr-1",
  instructorName: "Anna Lindgren",
  parkId: "park-uppsala",
  parkName: "Dogpark Uppsala",
  startsAt: "2026-04-22T18:00:00",
  durationMin: 60,
  spotsLeft: 1,
  priceSEK: 195,
};

export const mockRecommendedProgram: Program = {
  id: "prog-snifferquest",
  name: "SnifferQuest, säsong 1",
  description: "Nosework för aktiva hundar som vill utmanas. 8 pass över 8 veckor.",
  totalSessions: 8,
  priceSEK: 1295,
  whyForYou:
    "Border collies älskar att tänka, och Luna har grunderna. Nosework ger henne ett jobb att lösa varje vecka.",
};

export const mockMilestones: Milestone[] = [
  { id: "m1", title: "Klarade SnifferQuest säsong 1", daysAgo: 2, type: "achievement" },
  { id: "m2", title: "10 pass tillsammans", daysAgo: 21, type: "love" },
];

// ---------- Mock-funktioner ----------

export async function getDog(): Promise<Dog> {
  await fakeDelay();
  return mockDog;
}

export async function getOwner(): Promise<Owner> {
  await fakeDelay();
  return mockOwner;
}

export async function getJourney(): Promise<JourneyState> {
  await fakeDelay();
  return mockJourney;
}

export async function getNextSession(): Promise<Session> {
  await fakeDelay();
  return mockNextSession;
}

export async function getRecommendedProgram(): Promise<Program> {
  await fakeDelay();
  return mockRecommendedProgram;
}

export async function getMilestones(): Promise<Milestone[]> {
  await fakeDelay();
  return mockMilestones;
}

export async function getParks(): Promise<Park[]> {
  await fakeDelay();
  return mockParks;
}

export async function getMembershipTiers(): Promise<MembershipTier[]> {
  await fakeDelay();
  return mockMembershipTiers;
}

// ---------- Gruppträningar (bokningsbara pass) ----------

export type GroupSession = {
  id: string;
  title: string;
  category:
    | "nosework"
    | "lydnad"
    | "fys"
    | "social"
    | "hundgym"
    | "avslappning";
  description: string;
  instructorId: string;
  instructorName: string;
  parkId: string;
  parkName: string;
  startsAt: string; // ISO
  durationMin: number;
  spotsLeft: number;
  spotsTotal: number;
  priceSEK: number; // 0 = ingår i PREMIUM
  level: "valp" | "grund" | "medel" | "alla";
  tags: string[];
};

export const mockInstructors: Instructor[] = [
  {
    id: "instr-1",
    name: "Anna Lindgren",
    initial: "A",
    specialties: ["Nosework", "Bondbyggande", "Valpträning"],
    yearsAtDogpark: 3,
    rating: 4.9,
    totalSessions: 412,
    bio: "Jag tror på små vinster, varje vecka. Lite bättre kontakt, lite roligare lek.",
  },
  {
    id: "instr-2",
    name: "Mira Bacova",
    initial: "M",
    specialties: ["Hundpsykologi", "Rallylydnad", "Passivitetsträning"],
    yearsAtDogpark: 4,
    rating: 4.8,
    totalSessions: 520,
    bio: "Certifierad hundpsykolog. Jobbar med osäkra hundar, stressade ägare och bitjobb i samspel.",
  },
  {
    id: "instr-3",
    name: "Camilla A. Berg",
    initial: "C",
    specialties: ["Assistanshund", "Beteende", "Inkallning"],
    yearsAtDogpark: 2,
    rating: 4.9,
    totalSessions: 287,
    bio: "Fil.kand i psykologi. Gillar att förklara varför hunden gör som den gör, så att du kan förstå i realtid.",
  },
  {
    id: "instr-4",
    name: "Maria Olsson",
    initial: "M",
    specialties: ["Canineopati", "Balans", "Friskvård"],
    yearsAtDogpark: 5,
    rating: 4.9,
    totalSessions: 645,
    bio: "Certifierad Canineopat. Min grej är kroppsmedvetenhet. En hund som rör sig rätt mår rätt.",
  },
];

// Genererar datum relativt idag för att hålla mocken färsk.
function isoInDays(days: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const mockGroupSessions: GroupSession[] = [
  {
    id: "gs-1",
    title: "Hundyoga",
    category: "avslappning",
    description:
      "Lugn stund på matta, både för hund och människa. Passar även stressade hundar.",
    instructorId: "instr-2",
    instructorName: "Mira Bacova",
    parkId: "park-uppsala",
    parkName: "Dogpark Uppsala",
    startsAt: isoInDays(1, 18, 0),
    durationMin: 45,
    spotsLeft: 3,
    spotsTotal: 8,
    priceSEK: 0,
    level: "alla",
    tags: ["Inomhus", "Lugn"],
  },
  {
    id: "gs-2",
    title: "Nosework, grund",
    category: "nosework",
    description:
      "Introduktion till nosework. Korta sök, tydliga markeringar, mycket beröm.",
    instructorId: "instr-1",
    instructorName: "Anna Lindgren",
    parkId: "park-uppsala",
    parkName: "Dogpark Uppsala",
    startsAt: isoInDays(2, 17, 30),
    durationMin: 60,
    spotsLeft: 1,
    spotsTotal: 6,
    priceSEK: 0,
    level: "grund",
    tags: ["Mental"],
  },
  {
    id: "gs-3",
    title: "Rallylydnad",
    category: "lydnad",
    description:
      "Går en bana av skyltar tillsammans, varje skylt en liten övning. Härlig rytm.",
    instructorId: "instr-2",
    instructorName: "Mira Bacova",
    parkId: "park-uppsala",
    parkName: "Dogpark Uppsala",
    startsAt: isoInDays(3, 10, 0),
    durationMin: 50,
    spotsLeft: 5,
    spotsTotal: 8,
    priceSEK: 195,
    level: "medel",
    tags: ["Kontaktövning"],
  },
  {
    id: "gs-4",
    title: "Cirkelträning i Hundgymmet",
    category: "hundgym",
    description:
      "Sju stationer för styrka, balans och koncentration. Går varvet tre gånger.",
    instructorId: "instr-4",
    instructorName: "Maria Olsson",
    parkId: "park-uppsala",
    parkName: "Dogpark Uppsala",
    startsAt: isoInDays(3, 19, 0),
    durationMin: 45,
    spotsLeft: 0,
    spotsTotal: 6,
    priceSEK: 0,
    level: "alla",
    tags: ["Styrka", "Fullt"],
  },
  {
    id: "gs-5",
    title: "Inkallning på riktigt",
    category: "lydnad",
    description:
      "Vi jobbar med den där inkallningen som funkar i hagen men inte i skogen.",
    instructorId: "instr-3",
    instructorName: "Camilla A. Berg",
    parkId: "park-uppsala",
    parkName: "Dogpark Uppsala",
    startsAt: isoInDays(4, 11, 0),
    durationMin: 60,
    spotsLeft: 4,
    spotsTotal: 6,
    priceSEK: 195,
    level: "grund",
    tags: ["Utomhus"],
  },
  {
    id: "gs-6",
    title: "Fredagsfys",
    category: "fys",
    description:
      "Energi-utlopp inför helgen. Balansbollar, hinder, lek i varv.",
    instructorId: "instr-4",
    instructorName: "Maria Olsson",
    parkId: "park-uppsala",
    parkName: "Dogpark Uppsala",
    startsAt: isoInDays(5, 16, 30),
    durationMin: 45,
    spotsLeft: 2,
    spotsTotal: 8,
    priceSEK: 0,
    level: "alla",
    tags: ["Energi"],
  },
  {
    id: "gs-7",
    title: "Passivitetsträning",
    category: "avslappning",
    description:
      "Lära hunden att vara av, inte bara på. Viktig grund för allt annat.",
    instructorId: "instr-2",
    instructorName: "Mira Bacova",
    parkId: "park-uppsala",
    parkName: "Dogpark Uppsala",
    startsAt: isoInDays(6, 14, 0),
    durationMin: 50,
    spotsLeft: 6,
    spotsTotal: 8,
    priceSEK: 0,
    level: "alla",
    tags: ["Lugn"],
  },
  {
    id: "gs-8",
    title: "Hoopers",
    category: "fys",
    description:
      "Skonsam agility med bågar och tunnel. Passar äldre hundar och små raser.",
    instructorId: "instr-3",
    instructorName: "Camilla A. Berg",
    parkId: "park-uppsala",
    parkName: "Dogpark Uppsala",
    startsAt: isoInDays(7, 18, 0),
    durationMin: 45,
    spotsLeft: 4,
    spotsTotal: 6,
    priceSEK: 0,
    level: "alla",
    tags: ["Låg belastning"],
  },
];

export async function getGroupSessions(): Promise<GroupSession[]> {
  await fakeDelay();
  return mockGroupSessions;
}

export async function getGroupSession(id: string): Promise<GroupSession | null> {
  await fakeDelay();
  return mockGroupSessions.find((s) => s.id === id) ?? null;
}

export async function getInstructor(id: string): Promise<Instructor | null> {
  await fakeDelay();
  return mockInstructors.find((i) => i.id === id) ?? null;
}
