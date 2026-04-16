import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/Icon";
import { BottomNav } from "@/components/BottomNav";
import { HeroPhoto } from "@/components/home/HeroPhoto";
import { WeekRhythm } from "@/components/home/WeekRhythm";
import { MilestoneCard } from "@/components/home/MilestoneCard";
import { BadgeStrip } from "@/components/home/BadgeStrip";
import { InstructorTip } from "@/components/home/InstructorTip";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { CommunityStrip } from "@/components/home/CommunityStrip";
import {
  getDog,
  getOwner,
  getNextSession,
  getDogProfile,
  getWeekRhythm,
  getBadges,
  getInstructorTip,
  getCategoryCards,
  getParkActivity,
} from "@/lib/mock-data";

/**
 * Hemskärm v0.5 — bildled, åtta sektioner.
 * Alla data-anrop parallellt. När Supabase kopplas in byts innehållet i
 * getters'arna, inte UI-koden.
 *
 * v0.5-sektioner:
 *  1. Topbar (avatar + hälsning + bell)
 *  2. HeroPhoto — 4:5 foto-kort med ken-burns och CTA
 *  3. WeekRhythm — sju dagar Mån-Sön
 *  4. MilestoneCard — nästa milstolpe, mörkt signatur-kort
 *  5. BadgeStrip — mästarbevis, horisontell scroll
 *  6. InstructorTip — veckans 90-sek-läxa från instruktören
 *  7. CategoryCarousel — passkategorier med bild
 *  8. CommunityStrip — mjuk social proof
 */

// Prototyp-placeholder för Luna. På riktigt ersätts detta av användarens
// egen uppladdning (Supabase Storage). Unsplash direct-URL tills dess.
const LUNA_HERO_PHOTO =
  "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80&auto=format";

export default async function HomePage() {
  const [
    dog,
    owner,
    nextSession,
    profile,
    week,
    badges,
    tip,
    categories,
    activity,
  ] = await Promise.all([
    getDog(),
    getOwner(),
    getNextSession(),
    getDogProfile(),
    getWeekRhythm(),
    getBadges(),
    getInstructorTip(),
    getCategoryCards(),
    getParkActivity(),
  ]);

  // Hero: datum/tid till läsbar svensk rad.
  const start = new Date(nextSession.startsAt);
  const weekday = start.toLocaleDateString("sv-SE", { weekday: "long" });
  const day = start.getDate();
  const month = start.toLocaleDateString("sv-SE", { month: "long" });
  const time = start.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const heroSubtitle = `${capitalize(weekday)} ${day} ${month} · ${time} · ${nextSession.parkName}`;

  // Hero-accent: lowercase programnamnet för kursiv-accent.
  const { titleLead, titleAccent } = splitProgramForHero(nextSession.programName);

  // Kicker: pass + nivå
  const kicker = `Pass ${nextSession.sessionNumber} av ${nextSession.totalInProgram} · Nivå ${nextSession.level}`;

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">
          Klickbar prototyp v0.5, fejkdata
        </p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto pb-24 stagger">
          {/* 1. Topbar */}
          <div className="flex items-center justify-between mb-4 px-5 pt-1">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full bg-rose-500 flex items-center justify-center text-bone-50 font-bold text-lg animate-breathe"
                aria-label={`Avatar för ${dog.name}`}
              >
                {dog.name[0]}
              </div>
              <div>
                <p className="text-xs text-text-muted">God morgon</p>
                <p className="font-semibold text-[15px]">
                  {dog.name} och {owner.name}
                </p>
              </div>
            </div>
            <Link
              href="/notiser"
              className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors relative"
              aria-label="Notiser"
            >
              <Icon.Bell size={16} />
              <span
                className="absolute top-2 right-2.5 w-[7px] h-[7px] rounded-full bg-rose-500 border-2 border-bone-50"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* 2. Hero photo */}
          <HeroPhoto
            photoUrl={LUNA_HERO_PHOTO}
            photoAlt={`Foto av ${dog.name}`}
            kicker={kicker}
            titleLead={titleLead}
            titleAccent={titleAccent}
            subtitle={heroSubtitle}
            ctaLabel="Se passet"
            ctaHref="/mina-bokningar"
          />

          {/* 3. Veckans rytm */}
          <section className="mt-7 px-5">
            <header className="flex items-baseline justify-between mb-3">
              <h2 className="font-display text-[18px] tracking-tight">
                Er <em className="italic text-sage-600">vecka</em>
              </h2>
              <Link
                href="/mina-bokningar"
                className="text-xs font-semibold text-sage-600"
              >
                Öppna kalender →
              </Link>
            </header>
            <WeekRhythm days={week} />
          </section>

          {/* 4. Nästa milstolpe */}
          <section className="mt-7 px-5">
            <header className="flex items-baseline justify-between mb-3">
              <h2 className="font-display text-[18px] tracking-tight">
                Nästa <em className="italic text-sage-600">milstolpe</em>
              </h2>
            </header>
            <MilestoneCard
              chip="Er resa"
              title={profile.nextMilestone.title}
              description={profile.nextMilestone.description}
              progressPct={profile.nextMilestone.progress}
              leftFoot={`Pass ${nextSession.sessionNumber} av ${nextSession.totalInProgram}`}
              rightFoot="Klart runt 6 maj"
              href="/min-resa"
            />
          </section>

          {/* 5. Mästarbevis */}
          <section className="mt-7">
            <header className="flex items-baseline justify-between mb-3 px-5">
              <h2 className="font-display text-[18px] tracking-tight">
                <em className="italic text-sage-600">Mästarbevis</em>
              </h2>
              <Link
                href="/min-hund"
                className="text-xs font-semibold text-sage-600"
              >
                Alla {badges.length} →
              </Link>
            </header>
            <div className="px-5">
              <BadgeStrip badges={badges} />
            </div>
          </section>

          {/* 6. Instruktörs-tips */}
          <section className="mt-7 px-5">
            <header className="flex items-baseline justify-between mb-3">
              <h2 className="font-display text-[18px] tracking-tight">
                Från <em className="italic text-rose-700">{tip.instructorName}</em>{" "}
                denna vecka
              </h2>
            </header>
            <InstructorTip tip={tip} />
          </section>

          {/* 7. Kategorier */}
          <section className="mt-7">
            <header className="flex items-baseline justify-between mb-3 px-5">
              <h2 className="font-display text-[18px] tracking-tight">
                Vad vill ni <em className="italic text-sage-600">prova</em>?
              </h2>
              <Link
                href="/boka"
                className="text-xs font-semibold text-sage-600"
              >
                Boka pass →
              </Link>
            </header>
            <div className="px-5">
              <CategoryCarousel cards={categories} />
            </div>
          </section>

          {/* 8. Community-strip */}
          <section className="mt-7 px-5">
            <header className="flex items-baseline justify-between mb-3">
              <h2 className="font-display text-[18px] tracking-tight">
                I er <em className="italic text-rose-700">hemmapark</em>
              </h2>
            </header>
            <CommunityStrip activity={activity} />
          </section>
        </div>

        <BottomNav />
      </PhoneFrame>

      {/* Demo-länkar utanför phone */}
      <div className="text-center text-sm text-text-muted max-w-[375px]">
        <p className="mb-3 font-semibold">Testa flödena:</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          <Link
            href="/onboarding"
            className="text-sage-600 font-semibold hover:underline"
          >
            Onboarding
          </Link>
          <Link
            href="/valj-park"
            className="text-sage-600 font-semibold hover:underline"
          >
            Välj park
          </Link>
          <Link
            href="/bli-medlem"
            className="text-sage-600 font-semibold hover:underline"
          >
            Bli medlem
          </Link>
          <Link
            href="/boka"
            className="text-sage-600 font-semibold hover:underline"
          >
            Boka pass
          </Link>
          <Link
            href="/mina-bokningar"
            className="text-sage-600 font-semibold hover:underline"
          >
            Mina bokningar
          </Link>
          <Link
            href="/min-hund"
            className="text-sage-600 font-semibold hover:underline"
          >
            Min hund
          </Link>
          <Link
            href="/denna-finns-inte"
            className="text-rose-700 font-semibold hover:underline"
          >
            Testa 404
          </Link>
        </div>
      </div>
    </div>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Splittrar programnamn till lead + accent för hero.
 * "Nosework med Anna" → { lead: "Dags för", accent: "nosework med anna" }
 * Enkel regel tills vi har dedikerade hero-fält per pass i datamodellen.
 */
function splitProgramForHero(programName: string): {
  titleLead: string;
  titleAccent: string;
} {
  return {
    titleLead: "Dags för",
    titleAccent: programName.toLowerCase(),
  };
}
