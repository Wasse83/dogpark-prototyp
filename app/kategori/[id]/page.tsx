import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import {
  getCategoryDetail,
  getUpcomingSessionsByCategory,
  getDog,
  type CategoryDetail,
  type GroupSession,
} from "@/lib/mock-data";
import {
  CATEGORY_IDS,
  gradientByCategory,
  isCategoryId,
} from "@/lib/categories";

/**
 * /kategori/[id] — kategori-detaljsida.
 *
 * Mönstret: upplärande först, bokande direkt (se
 * `skisser/kategori-nosework-mockup.html` för referensbeslutet).
 * Sidan förklarar vad kategorin är, vilka hundar den passar, hur ett
 * pass går till, och listar sedan bokningsbara pass i samma vy.
 *
 * Server component. Dynamic route med static export kräver
 * generateStaticParams.
 */

export async function generateStaticParams() {
  return CATEGORY_IDS.map((id) => ({ id }));
}

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isCategoryId(id)) notFound();

  const [detail, sessions, dog] = await Promise.all([
    getCategoryDetail(id),
    getUpcomingSessionsByCategory(id, 4),
    getDog(),
  ]);

  return (
    <div className="min-h-screen bg-bone-100 py-8 px-4 flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-wider text-text-muted uppercase">
          Dogpark medlemsapp
        </p>
        <p className="text-sm text-text-muted mt-1">
          Kategori · {detail.label}
        </p>
      </div>

      <PhoneFrame>
        <div className="h-full overflow-y-auto pb-24">
          <Topbar label={detail.label} />

          <CategoryHero detail={detail} />

          <section className="px-5 mb-6">
            <AboutParagraph text={detail.about} />
          </section>

          <section className="px-5 mb-6">
            <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2">
              Passar hundar som
            </p>
            <div className="flex flex-wrap gap-1.5">
              {detail.goodFor.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-pill bg-sage-100 text-sage-800 text-[12px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="px-5 mb-6">
            <h2 className="font-display text-[18px] leading-tight mb-3">
              Så går ett <em className="text-sage-600 italic">pass till</em>
            </h2>
            <ol className="flex flex-col gap-2.5">
              {detail.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-3 items-start"
                >
                  <div
                    aria-hidden="true"
                    className="w-6 h-6 rounded-full bg-sage-500 text-bone-50 grid place-items-center text-[12px] font-bold flex-shrink-0 mt-0.5"
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold leading-snug">
                      {step.title}
                    </p>
                    <p className="text-[12px] text-text-muted leading-snug mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="px-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="font-display text-[18px] leading-tight">
                <em className="text-sage-600 italic">Nästa</em> pass
              </h2>
              <p className="text-[11px] text-text-muted">
                {sessions.length} lediga
              </p>
            </div>

            {sessions.length === 0 ? (
              <EmptySessions
                dogName={dog.name}
                category={detail.label.toLowerCase()}
              />
            ) : (
              <div className="flex flex-col gap-2">
                {sessions.map((s) => (
                  <SessionCard key={s.id} session={s} />
                ))}
              </div>
            )}
          </section>

          {sessions.length > 0 && (
            <div className="px-5 mt-4">
              <Link
                href={`/sok?kategori=${detail.id}`}
                className="block text-center py-3 rounded-[14px] bg-sage-500 text-bone-50 text-[14px] font-semibold transition-transform duration-150 active:scale-[0.98]"
              >
                Se alla {detail.label.toLowerCase()}-pass
              </Link>
            </div>
          )}
        </div>

        <BottomNav />
      </PhoneFrame>

      <p className="text-[11px] text-text-muted max-w-[340px] text-center">
        v0.5 · kategori-sida. Samma sida fungerar från hemskärmens
        kategorikarusell och från framtida delningar.
      </p>
    </div>
  );
}

// ---------- Sub-komponenter ----------

function Topbar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-5 pt-4 pb-3">
      <Link
        href="/"
        aria-label="Tillbaka hem"
        className="w-9 h-9 rounded-full bg-bone-100 flex items-center justify-center hover:bg-bone-200 transition-colors"
      >
        <Icon.ArrowLeft size={18} />
      </Link>
      <p className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
        Kategori · {label}
      </p>
    </div>
  );
}

function CategoryHero({ detail }: { detail: CategoryDetail }) {
  return (
    <section
      className="mx-5 mb-5 rounded-[20px] overflow-hidden relative"
      style={{
        background: gradientByCategory[detail.id],
        aspectRatio: "4 / 3.2",
      }}
    >
      {/* SVG-illustration — samma fil som kategori-kortet på hemskärmen */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/photos/sessions/${detail.id}.svg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />

      {/* Mjuk mörkning underifrån för textläsbarhet */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 35%, rgba(26,23,20,0.7) 100%)",
        }}
      />

      <div className="relative z-[2] h-full p-5 flex flex-col justify-between">
        <span className="self-start px-3 py-1 rounded-pill bg-bone-50/20 backdrop-blur-sm text-bone-50 text-[11px] font-bold tracking-wider uppercase">
          {detail.subtitle.split(" · ")[0]}
        </span>

        <div>
          <h1 className="font-display text-[26px] leading-[1.1] text-bone-50">
            {detail.heroLead}
            <br />
            <em
              className="italic"
              style={{ color: "#E8D2B0" }}
            >
              {detail.heroAccent}
            </em>
          </h1>
          <p className="text-[12px] text-bone-50/80 mt-1.5">
            {detail.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Renderar about-texten och växlar `{em}...{em}` mot en sage-italic.
 * Håller mock-datan ren text utan JSX.
 */
function AboutParagraph({ text }: { text: string }) {
  const parts = text.split(/\{em\}(.*?)\{em\}/g);
  return (
    <p className="text-[13px] leading-[1.6]">
      {parts.map((chunk, i) =>
        i % 2 === 1 ? (
          <em key={i} className="text-sage-600 italic">
            {chunk}
          </em>
        ) : (
          <span key={i}>{chunk}</span>
        ),
      )}
    </p>
  );
}

function SessionCard({ session }: { session: GroupSession }) {
  const start = new Date(session.startsAt);
  const weekday = start
    .toLocaleDateString("sv-SE", { weekday: "short" })
    .slice(0, 3)
    .toUpperCase();
  const day = start.getDate();
  const time = start.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const spotsLabel =
    session.spotsLeft === 1
      ? "1 plats kvar"
      : `${session.spotsLeft} platser kvar`;

  return (
    <Link
      href={`/boka/${session.id}`}
      className="bg-bg-surface rounded-[16px] p-3 border border-charcoal-900/[0.04] flex items-start gap-3 transition-transform duration-150 active:scale-[0.99]"
    >
      <div className="w-14 h-14 rounded-2xl bg-sage-100 flex flex-col items-center justify-center flex-shrink-0">
        <span className="text-[10px] text-sage-800 font-bold tracking-wider">
          {weekday}
        </span>
        <span className="font-display text-[22px] leading-none text-sage-800">
          {day}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[14px] leading-tight">
          {session.title}
        </h3>
        <p className="text-[12px] text-text-muted mt-0.5">
          kl {time} · {session.instructorName}
        </p>
        <p className="text-[11px] text-text-muted">
          {session.parkName} · {session.durationMin} min
        </p>
        <p className="text-[10px] text-sage-600 font-bold tracking-wider uppercase mt-1">
          {spotsLabel}
        </p>
      </div>
    </Link>
  );
}

function EmptySessions({
  dogName,
  category,
}: {
  dogName: string;
  category: string;
}) {
  return (
    <div className="py-6 text-center bg-bg-surface rounded-[20px] border border-charcoal-900/[0.04]">
      <p className="text-[13px] text-text-muted px-5 leading-relaxed">
        Inga {category}-pass är öppna just nu. Vi lägger upp nya pass varje
        söndag — titta förbi då så hittar ni något till {dogName}.
      </p>
    </div>
  );
}
