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
  address: string;
  distanceKm: number;
  facilities: string[];
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
  address: "Boländerna 14, 753 23 Uppsala",
  distanceKm: 2.1,
  facilities: ["Hundgym", "Agility", "Vatten + dusch", "5 inhägnader"],
};

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
