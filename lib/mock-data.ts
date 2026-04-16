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
  photoUrl?: string; // /public/photos/dogs/{id}.jpg när foto finns
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
  photoUrl?: string; // /public/photos/instructors/{id}.jpg
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
  photoUrl?: string; // /public/photos/parks/{id}.jpg, 16:9
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
  photoUrl: "/photos/dogs/dog-1.svg",
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
    photoUrl: "/photos/parks/uddevalla.svg",
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
    photoUrl: "/photos/parks/uppsala.svg",
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
    photoUrl: "/photos/parks/vasteras.svg",
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

export const mockAlternativePrograms: Program[] = [
  mockRecommendedProgram,
  {
    id: "prog-fokuslab",
    name: "Fokuslabbet",
    description:
      "Lugna, koncentrerade pass där hunden tränar impulskontroll. 6 pass över 6 veckor.",
    totalSessions: 6,
    priceSEK: 995,
    whyForYou:
      "Perfekt om Luna behöver landa lite innan hon sätter tänderna i något större.",
  },
  {
    id: "prog-stadsrutan",
    name: "Stadsrutan",
    description:
      "Att träffa hundar, cyklar och barnvagnar utan att tappa fokus. 5 pass över 5 veckor.",
    totalSessions: 5,
    priceSEK: 795,
    whyForYou:
      "Bra om ni bor centralt och vill att Luna ska trivas i folkvimlet.",
  },
];

export const mockMilestones: Milestone[] = [
  { id: "m1", title: "Klarade SnifferQuest säsong 1", daysAgo: 2, type: "achievement" },
  { id: "m2", title: "10 pass tillsammans", daysAgo: 21, type: "love" },
];

// /min-resa — detaljerad programstruktur för aktuellt program (SnifferQuest).
export type JourneyStep = {
  id: string;
  sessionNumber: number;
  title: string;
  description: string;
  dateLabel: string; // t.ex. "22 apr"
  status: "klar" | "nu" | "framtida";
};

export const mockJourneySteps: JourneyStep[] = [
  {
    id: "js-1",
    sessionNumber: 1,
    title: "Första nosträffen",
    description: "Luna lär sig markera doftburken. Anna leder, stilla tempo.",
    dateLabel: "25 mar",
    status: "klar",
  },
  {
    id: "js-2",
    sessionNumber: 2,
    title: "Flera burkar, en doft",
    description: "Väljer rätt bland fem, med belöning direkt på plats.",
    dateLabel: "1 apr",
    status: "klar",
  },
  {
    id: "js-3",
    sessionNumber: 3,
    title: "Dold burk",
    description: "Första dolda sökningen. Luna tog det lugnt, det var imponerande.",
    dateLabel: "8 apr",
    status: "klar",
  },
  {
    id: "js-4",
    sessionNumber: 4,
    title: "Två rum, en doft",
    description: "Sök mellan rum, distraktioner från andra hundar.",
    dateLabel: "15 apr",
    status: "klar",
  },
  {
    id: "js-5",
    sessionNumber: 5,
    title: "Tidspress",
    description: "90 sekunder att markera. Luna är redo för det här.",
    dateLabel: "22 apr",
    status: "nu",
  },
  {
    id: "js-6",
    sessionNumber: 6,
    title: "Flera dofter",
    description: "Skilja två dofter åt. Nytt moment, vi tar det i små steg.",
    dateLabel: "29 apr",
    status: "framtida",
  },
  {
    id: "js-7",
    sessionNumber: 7,
    title: "Utomhusmiljö",
    description: "Första söket utanför. Vind, andra dofter, ny verklighet.",
    dateLabel: "6 maj",
    status: "framtida",
  },
  {
    id: "js-8",
    sessionNumber: 8,
    title: "Uppflyttning",
    description: "Hela säsongen summeras. Nivå 3 väntar efter det här.",
    dateLabel: "13 maj",
    status: "framtida",
  },
];

export async function getJourneySteps(): Promise<JourneyStep[]> {
  await fakeDelay();
  return mockJourneySteps;
}

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

export async function getProgramAlternatives(): Promise<Program[]> {
  await fakeDelay();
  return mockAlternativePrograms;
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
  photoUrl?: string; // /public/photos/sessions/{id}.jpg, 72×72 thumb
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

// Kategori-illustration per pass. Alla gruppass mappar sin kategori
// till en bild i /public/photos/sessions/{category}.svg.
function categoryPhoto(category: GroupSession["category"]): string {
  return `/photos/sessions/${category}.svg`;
}

const rawGroupSessions: GroupSession[] = [
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

// Berika varje pass med photoUrl baserat på kategori.
export const mockGroupSessions: GroupSession[] = rawGroupSessions.map((s) => ({
  ...s,
  photoUrl: s.photoUrl ?? categoryPhoto(s.category),
}));

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

// ---------- Bokningar ----------

export type Booking = {
  id: string;
  sessionId: string;
  bookedAt: string; // ISO när bokningen gjordes
  status: "kommande" | "genomfört" | "avbokad";
};

// Genererar datum relativt idag för historiska bokningar.
function isoDaysAgo(days: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const mockBookings: Booking[] = [
  // Kommande: refererar till befintliga gruppass
  {
    id: "bk-1",
    sessionId: "gs-1", // Hundyoga om 1 dag
    bookedAt: isoDaysAgo(2, 9, 15),
    status: "kommande",
  },
  {
    id: "bk-2",
    sessionId: "gs-2", // Nosework grund om 2 dagar
    bookedAt: isoDaysAgo(5, 20, 0),
    status: "kommande",
  },
  {
    id: "bk-3",
    sessionId: "gs-5", // Inkallning om 4 dagar
    bookedAt: isoDaysAgo(1, 7, 45),
    status: "kommande",
  },
];

// Historiska pass, inte direkt kopplade till gs-listan ovan (den är framåt i tid).
export type PastBooking = {
  id: string;
  title: string;
  instructorName: string;
  parkName: string;
  endedAt: string; // ISO
  durationMin: number;
  note?: string;
};

export const mockPastBookings: PastBooking[] = [
  {
    id: "pb-1",
    title: "Nosework, grund",
    instructorName: "Anna Lindgren",
    parkName: "Dogpark Uppsala",
    endedAt: isoDaysAgo(3, 17, 30),
    durationMin: 60,
    note: "Luna hittade alla tre göm, kontakten satt",
  },
  {
    id: "pb-2",
    title: "Hundyoga",
    instructorName: "Mira Bacova",
    parkName: "Dogpark Uppsala",
    endedAt: isoDaysAgo(10, 18, 0),
    durationMin: 45,
  },
  {
    id: "pb-3",
    title: "Fredagsfys",
    instructorName: "Maria Olsson",
    parkName: "Dogpark Uppsala",
    endedAt: isoDaysAgo(17, 16, 30),
    durationMin: 45,
    note: "Första gången på balansboll, nyfiken hund",
  },
  {
    id: "pb-4",
    title: "Passivitetsträning",
    instructorName: "Mira Bacova",
    parkName: "Dogpark Uppsala",
    endedAt: isoDaysAgo(24, 14, 0),
    durationMin: 50,
  },
];

export async function getUpcomingBookings(): Promise<
  Array<Booking & { session: GroupSession }>
> {
  await fakeDelay();
  const bySession = new Map(mockGroupSessions.map((s) => [s.id, s]));
  return mockBookings
    .filter((b) => b.status === "kommande")
    .map((b) => ({ ...b, session: bySession.get(b.sessionId)! }))
    .filter((b) => b.session) // skydd mot saknad referens
    .sort(
      (a, b) =>
        new Date(a.session.startsAt).getTime() -
        new Date(b.session.startsAt).getTime(),
    );
}

export async function getPastBookings(): Promise<PastBooking[]> {
  await fakeDelay();
  return mockPastBookings;
}

// ---------- Min hund ----------

export type DogProfile = {
  dog: Dog;
  owner: Owner;
  membership: {
    tierId: "bas" | "plus" | "premium";
    tierName: string;
    renewsAt: string; // ISO
    pricePerMonth: number;
    parkName: string;
  };
  stats: {
    sessionsCompleted: number;
    hoursTrained: number;
    levelsUnlocked: number;
    streakWeeks: number;
  };
  nextMilestone: {
    title: string;
    description: string;
    progress: number; // 0-100
  };
};

export const mockDogProfile: DogProfile = {
  dog: mockDog,
  owner: mockOwner,
  membership: {
    tierId: "premium",
    tierName: "PREMIUM",
    renewsAt: isoInDays(18, 0, 0),
    pricePerMonth: 849,
    parkName: "Dogpark Uppsala",
  },
  stats: {
    sessionsCompleted: 23,
    hoursTrained: 19,
    levelsUnlocked: 2,
    streakWeeks: 6,
  },
  nextMilestone: {
    title: "Nivå 3 låses upp",
    description: "Två pass kvar i Lugn vardag innan nästa nivå öppnar.",
    progress: 75,
  },
};

export async function getDogProfile(): Promise<DogProfile> {
  await fakeDelay();
  return mockDogProfile;
}

// ---------- Veckans övning ----------

export type WeeklyExercise = {
  id: string;
  title: string;
  videoLengthSec: number;
  difficulty: "lätt" | "medel" | "utmanande";
  targetSkill: string;
  weekLabel: string; // t.ex. "Vecka 16"
  buildsOn: string; // "Söket i rörelse, pass 4"
  steps: string[];
  whyItMatters: string;
  doneThisWeek: boolean;
};

export const mockWeeklyExercise: WeeklyExercise = {
  id: "we-16",
  title: "Söket i rörelse",
  videoLengthSec: 92,
  difficulty: "medel",
  targetSkill: "Nosework · fokus i rörelse",
  weekLabel: "Vecka 16",
  buildsOn: "Pass 4 · Två rum, en doft",
  steps: [
    "Placera tre burkar i rad, en meter emellan.",
    "Gå långsamt förbi. Luna söker utan att ni stannar.",
    "Markera med ett mjukt ja i samma sekund hon träffar rätt.",
    "Tre omgångar, sedan paus. Klart på 90 sekunder.",
  ],
  whyItMatters:
    "Nästa pass har tidspress. Det här är förberedelsen. Luna lär sig att tankearbete kan ske i rörelse, inte bara när ni står still.",
  doneThisWeek: false,
};

export async function getWeeklyExercise(): Promise<WeeklyExercise> {
  await fakeDelay();
  return mockWeeklyExercise;
}

// ---------- Notiser ----------

export type NotificationItem = {
  id: string;
  type: "påminnelse" | "nytt-pass" | "milstolpe" | "meddelande";
  title: string;
  body: string;
  ago: string; // "2 min", "3 tim", "igår"
  read: boolean;
  href?: string;
};

export const mockNotifications: NotificationItem[] = [
  {
    id: "n-1",
    type: "påminnelse",
    title: "Imorgon 18:00 · Tidspress",
    body: "Pass 5 av 8 i SnifferQuest. Anna har förberett något nytt.",
    ago: "10 min",
    read: false,
    href: "/mina-bokningar",
  },
  {
    id: "n-2",
    type: "milstolpe",
    title: "Luna klarade pass 4",
    body: "Två rum, en doft. Ni har 4 av 8 pass avklarade i säsongen.",
    ago: "2 tim",
    read: false,
    href: "/min-resa",
  },
  {
    id: "n-3",
    type: "nytt-pass",
    title: "Nytt pass: Hoopers i Uppsala",
    body: "Camilla lägger till ett skonsamt agilitypass på fredag.",
    ago: "igår",
    read: true,
    href: "/boka",
  },
  {
    id: "n-4",
    type: "meddelande",
    title: "Anna har skickat en hälsning",
    body: "Bra jobbat igår. Tog med mig en ny idé till nästa pass.",
    ago: "2 dagar",
    read: true,
  },
  {
    id: "n-5",
    type: "påminnelse",
    title: "Veckans övning ligger uppe",
    body: "90 sekunder hemmaläxa. Ni gör den när ni vill under veckan.",
    ago: "3 dagar",
    read: true,
    href: "/veckans-ovning",
  },
];

export async function getNotifications(): Promise<NotificationItem[]> {
  await fakeDelay();
  return mockNotifications;
}

// ---------- Vaccinationsintyg ----------

export type VaccinationRecord = {
  id: string;
  name: string; // "Valpsjuka, hepatit, parvo (DHP)"
  short: string; // "DHP"
  lastGiven: string; // ISO
  validUntil: string; // ISO
  status: "gäller" | "förnyelse-snart" | "utgången";
};

export const mockVaccinations: VaccinationRecord[] = [
  {
    id: "v-1",
    name: "Valpsjuka, hepatit, parvovirus",
    short: "DHP",
    lastGiven: "2024-03-15T00:00:00",
    validUntil: "2027-03-15T00:00:00",
    status: "gäller",
  },
  {
    id: "v-2",
    name: "Kennelhosta",
    short: "Bb + Pi",
    lastGiven: "2025-03-20T00:00:00",
    validUntil: "2026-05-20T00:00:00",
    status: "förnyelse-snart",
  },
  {
    id: "v-3",
    name: "Rabies",
    short: "Rabies",
    lastGiven: "2024-06-02T00:00:00",
    validUntil: "2027-06-02T00:00:00",
    status: "gäller",
  },
];

export async function getVaccinations(): Promise<VaccinationRecord[]> {
  await fakeDelay();
  return mockVaccinations;
}

// ---------- Hemskärm v0.5: veckans rytm ----------
// Sju dagar, måndag först. Ingen hård streak-räkning — viloprick istället.

export type WeekDay = {
  weekdayShort: string; // "Mån" ... "Sön"
  dateLabel: string; // "14" (dagen i månaden)
  status: "klar" | "idag" | "bokad" | "vila";
  sessionNumber?: number; // används för "idag" och "bokad"
};

// Genereras mot en fast "idag" så demon är deterministisk över dygnsgränser.
// currentSession/totalSessions matchar mockJourney för konsistens.
function buildWeekRhythm(): WeekDay[] {
  // Måndag index 0, söndag index 6. Idag = onsdag (index 2) i demon.
  return [
    { weekdayShort: "Mån", dateLabel: "14", status: "klar" },
    { weekdayShort: "Tis", dateLabel: "15", status: "vila" },
    { weekdayShort: "Ons", dateLabel: "16", status: "idag", sessionNumber: 5 },
    { weekdayShort: "Tor", dateLabel: "17", status: "vila" },
    { weekdayShort: "Fre", dateLabel: "18", status: "bokad", sessionNumber: 6 },
    { weekdayShort: "Lör", dateLabel: "19", status: "vila" },
    { weekdayShort: "Sön", dateLabel: "20", status: "vila" },
  ];
}

export const mockWeekRhythm: WeekDay[] = buildWeekRhythm();

export async function getWeekRhythm(): Promise<WeekDay[]> {
  await fakeDelay();
  return mockWeekRhythm;
}

// ---------- Hemskärm v0.5: mästarbevis (achievement badges) ----------

export type Badge = {
  id: string;
  title: string;
  subtitle: string; // datum eller "N pass kvar" / "Låst"
  status: "earned" | "next" | "locked";
  icon: "star" | "level" | "heart" | "paw" | "lock" | "compass";
};

export const mockBadges: Badge[] = [
  {
    id: "b-first",
    title: "Första passet",
    subtitle: "12 mars",
    status: "earned",
    icon: "star",
  },
  {
    id: "b-level-1",
    title: "Nivå 1 klar",
    subtitle: "28 mars",
    status: "earned",
    icon: "level",
  },
  {
    id: "b-5-rad",
    title: "5 pass i rad",
    subtitle: "2 april",
    status: "earned",
    icon: "heart",
  },
  {
    id: "b-nose-master",
    title: "Nosework-mästare",
    subtitle: "3 pass kvar",
    status: "next",
    icon: "paw",
  },
  {
    id: "b-level-3",
    title: "Nivå 3",
    subtitle: "Låst",
    status: "locked",
    icon: "lock",
  },
  {
    id: "b-explorer",
    title: "Parkutforskare",
    subtitle: "Besök alla 3",
    status: "locked",
    icon: "compass",
  },
];

export async function getBadges(): Promise<Badge[]> {
  await fakeDelay();
  return mockBadges;
}

// ---------- Hemskärm v0.5: instruktörstips ----------

export type InstructorTip = {
  id: string;
  instructorId: string;
  instructorName: string;
  instructorPhotoUrl?: string;
  kicker: string; // "90 sek hemmaläxa"
  title: string; // "Så hjälper du Luna att landa efter passet"
  description: string;
  href: string; // oftast /veckans-ovning
};

export const mockInstructorTip: InstructorTip = {
  id: "tip-16",
  instructorId: "instr-2",
  instructorName: "Mira",
  kicker: "90 sek hemmaläxa",
  title: "Så hjälper du Luna att landa efter passet",
  description: "Mira visar en kort lugn-övning för hallen hemma.",
  href: "/veckans-ovning",
};

export async function getInstructorTip(): Promise<InstructorTip> {
  await fakeDelay();
  return mockInstructorTip;
}

// ---------- Hemskärm v0.5: kategori-carousel ----------

export type CategoryCard = {
  id: GroupSession["category"];
  label: string;
  sessionsThisWeek: number;
  href: string;
};

export const mockCategoryCards: CategoryCard[] = [
  { id: "nosework", label: "Nosework", sessionsThisWeek: 4, href: "/kategori/nosework" },
  { id: "lydnad", label: "Lydnad", sessionsThisWeek: 7, href: "/kategori/lydnad" },
  { id: "hundgym", label: "Hundgym", sessionsThisWeek: 3, href: "/kategori/hundgym" },
  { id: "fys", label: "Fys", sessionsThisWeek: 5, href: "/kategori/fys" },
  { id: "social", label: "Social", sessionsThisWeek: 2, href: "/kategori/social" },
  { id: "avslappning", label: "Avslappning", sessionsThisWeek: 3, href: "/kategori/avslappning" },
];

export async function getCategoryCards(): Promise<CategoryCard[]> {
  await fakeDelay();
  return mockCategoryCards;
}

// ---------- Hemskärm v0.5: community-strip ----------
// Mjuk social proof — ingen leaderboard, bara antal hundar i hemmaparken denna vecka.

export type ParkActivity = {
  parkName: string;
  dogsThisWeek: number;
  note: string; // "Ni är en av dem"
};

export const mockParkActivity: ParkActivity = {
  parkName: "Uppsala",
  dogsThisWeek: 12,
  note: "Ni är en av dem",
};

export async function getParkActivity(): Promise<ParkActivity> {
  await fakeDelay();
  return mockParkActivity;
}

// ---------- Kategori-detaljsida (v0.5.1) ----------
// En sida per kategori på /kategori/[id]. Mönstret: kontextualisera först
// (vad är det, bra för vem, hur går det till) och visa bokningsbara pass
// direkt. Les Mills nya-användare-mönstret — appens användare är närmare
// det än de vana frekventa användarna.

export type CategoryStep = {
  title: string;
  description: string;
};

export type CategoryDetail = {
  id: GroupSession["category"];
  label: string;
  // Hero-text. Lead-raden är statisk text, accenten blir italic beige på
  // mörk hero-yta (undantaget från sage/rose-regeln, se design-system v0.5).
  heroLead: string;
  heroAccent: string;
  subtitle: string;
  // Huvudbeskrivning. Ett ord kan markeras med {em}...{em} för sage-accent
  // på ljus yta (här återgår vi till v0.3-regeln).
  about: string;
  // Korta påståenden om vilka hundar som passar. Visas som sage-chips.
  goodFor: string[];
  // Tre numrerade steg om hur ett pass går till.
  steps: CategoryStep[];
};

export const mockCategoryDetails: Record<
  GroupSession["category"],
  CategoryDetail
> = {
  nosework: {
    id: "nosework",
    label: "Nosework",
    heroLead: "Bygg hundens",
    heroAccent: "lukt-självförtroende",
    subtitle: "Nosework · för nyfikna näsor i alla åldrar",
    about:
      "Nosework handlar om att låta hunden använda sitt starkaste sinne — {em}lukten{em} — för att hitta gömda saker. Det tröttar ut hunden mer än en lång promenad och bygger självförtroende hos osäkra hundar.",
    goodFor: [
      "Blir lätt uttråkad",
      "Är lite osäker",
      "Älskar att söka",
      "Äldre hundar",
    ],
    steps: [
      {
        title: "Uppvärmning, 5 min",
        description: "Lekfull introduktion, ni hälsar på de andra hundarna.",
      },
      {
        title: "Söka-moment, 35 min",
        description:
          "Instruktören gömmer dofter, hunden söker på sin egen nivå.",
      },
      {
        title: "Lugnt avslut, 5 min",
        description: "Hunden varvar ner. Ni går hem trötta och nöjda.",
      },
    ],
  },

  lydnad: {
    id: "lydnad",
    label: "Lydnad",
    heroLead: "Bygg er",
    heroAccent: "dagliga kontakt",
    subtitle: "Lydnad · kontakt mer än kommando",
    about:
      "Lydnad är inte om att hunden ska lyda på order — det handlar om att bygga {em}kontakt{em} så att hunden vill följa er när det räknas.",
    goodFor: [
      "Unga hundar",
      "Drar i kopplet",
      "Svårt vid distraktion",
      "Nya hem",
    ],
    steps: [
      {
        title: "Kontakt-övningar, 10 min",
        description: "Enkla övningar som belönar uppmärksamhet.",
      },
      {
        title: "Momentträning, 30 min",
        description:
          "Sitt, ligg, gå fot — med distraktioner i olika lager.",
      },
      {
        title: "Reflektion, 5 min",
        description:
          "Instruktören går igenom vad ni kan träna vidare på hemma.",
      },
    ],
  },

  hundgym: {
    id: "hundgym",
    label: "Hundgym",
    heroLead: "Stärk hunden",
    heroAccent: "från kärnan och ut",
    subtitle: "Hundgym · fys för friska leder och stabila muskler",
    about:
      "Hundgym är som en PT-session för hunden. Balansbollar, trampoliner, uppstickare — {em}rörelser{em} som stärker kärnmuskler och leder.",
    goodFor: [
      "Äldre hundar",
      "Under återhämtning",
      "Tävlingshundar",
      "Lite stel eller vinglig",
    ],
    steps: [
      {
        title: "Uppvärmning, 5 min",
        description: "Lugn ledrörlighet så kroppen är redo.",
      },
      {
        title: "Stationer, 35 min",
        description:
          "Tre stationer med olika redskap, instruktören byter var tionde minut.",
      },
      {
        title: "Avslut, 5 min",
        description: "Stretch och ro. Kroppen får landa.",
      },
    ],
  },

  fys: {
    id: "fys",
    label: "Fys",
    heroLead: "Håll",
    heroAccent: "kroppen stark",
    subtitle: "Fys · kondition och rörlighet",
    about:
      "Pass där hunden får röra sig ordentligt — {em}tröttskön{em} träning. Bra för hundar med mycket energi och för att bygga grundkondition.",
    goodFor: [
      "Mycket energi",
      "Unga hundar",
      "Aktiva raser",
      "Vill bygga kondition",
    ],
    steps: [
      {
        title: "Uppvärmning, 5 min",
        description: "Kortare aktivering på plats innan vi drar igång.",
      },
      {
        title: "Aktiviteter, 35 min",
        description:
          "Löpteknik, riktningsövningar och hindergång i varierande takt.",
      },
      {
        title: "Nedvarvning, 5 min",
        description: "Lugn avrundning med vatten och en stund ro.",
      },
    ],
  },

  social: {
    id: "social",
    label: "Social",
    heroLead: "Låt hunden",
    heroAccent: "hälsa tryggt",
    subtitle: "Social · möten på hundens villkor",
    about:
      "Ett {em}lugnt{em} tillfälle för hunden att möta andra hundar med en instruktör som håller koll. Bra för både valpar och osäkra hundar.",
    goodFor: [
      "Osäker med andra",
      "Valp som behöver lära sig",
      "Reaktiv på koppel",
      "Bytt hem nyligen",
    ],
    steps: [
      {
        title: "Eget utrymme, 5 min",
        description: "Varje hund får landa i miljön innan möten börjar.",
      },
      {
        title: "Möten, 30 min",
        description:
          "Små grupper, instruktören läser hundarnas signaler kontinuerligt.",
      },
      {
        title: "Lugnt avslut, 10 min",
        description: "Ni pratar igenom vad ni såg och hur hunden reagerade.",
      },
    ],
  },

  avslappning: {
    id: "avslappning",
    label: "Avslappning",
    heroLead: "Ge hunden",
    heroAccent: "lugn och närvaro",
    subtitle: "Avslappning · passivitet och återhämtning",
    about:
      "Passivitetsträning, hundyoga och massage. Övningar som lär hunden att {em}vila{em} i sällskap — en underskattad förmåga.",
    goodFor: [
      "Stressad hund",
      "Svårt att varva ner",
      "Reagerar på ljud",
      "Ni vill lära er massage",
    ],
    steps: [
      {
        title: "Landa, 10 min",
        description: "Hunden får en egen matta och varva ner.",
      },
      {
        title: "Övningar, 30 min",
        description:
          "Passivitet, lätt massage och enkla yogapositioner för ägaren.",
      },
      {
        title: "Vila, 5 min",
        description: "Hela rummet blir tyst en stund innan vi går hem.",
      },
    ],
  },
};

export async function getCategoryDetail(
  id: GroupSession["category"],
): Promise<CategoryDetail> {
  await fakeDelay();
  return mockCategoryDetails[id];
}

// Hämtar kommande bokningsbara pass för en viss kategori, sorterade
// efter starttid. Används på /kategori/[id] för "Nästa pass"-listan.
export async function getUpcomingSessionsByCategory(
  categoryId: GroupSession["category"],
  limit = 5,
): Promise<GroupSession[]> {
  await fakeDelay();
  const now = Date.now();
  return mockGroupSessions
    .filter(
      (s) =>
        s.category === categoryId &&
        new Date(s.startsAt).getTime() > now &&
        s.spotsLeft > 0,
    )
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    )
    .slice(0, limit);
}
