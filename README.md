# Dogpark medlemsapp

Klickbar prototyp v0.4 av Dogparks medlemsapp. Byggd med Next.js 15, React 19, Tailwind 3.4 och fejkdata.

## Vad finns med i v0.4

- **Hela nav-ytan** är byggd. Ingen StubPage är längre i bruk (komponenten står kvar för framtida funktioner).
- **Version C är default** — 24px hero, 13px underrubrik, kompakta kort. Onboarding steg 1+2 och /bli-medlem är harmoniserade till samma metrik.
- **/min-resa** — programtidslinje med milstolpar, status per pass (klar/nu/framtida).
- **/veckans-ovning** — videoplaceholder + stegvis guide + logga-gjord-knapp.
- **/installningar** — toggles med `role="switch"` och grupperade sektioner.
- **/notiser** — oläst/läst-grupper, typchip, djuplänkar.
- **/dela** — share sheet med kopiera-länk och 4 delningsikoner.
- **/min-hund/redigera, medlemskap, vaccinationsintyg, logga-ut** — alla fullt byggda.
- **SVG-illustrationer** som fotofallback i varumärkespaletten. En per hund, park, och gruppass-kategori.
- **A11y-svep** — radiogroup-roller på onboarding-knappgrupper, switch-roller på toggles, skip-link-stöd, genomgående aria-label på ikoniga knappar.

## Tidigare versioner

- **v0.1** — hemskärm, onboarding (3 steg), designsystem-baseline.
- **v0.2** — bokning, mina bokningar, parklista.
- **v0.3** — Version A/B/C-testning, /min-hund som scrapbook, Stripe-placeholder, dead-link-policy via StubPage.
- **v0.4** — hela nav-ytan byggd, Version C som default, SVG-illustrationer, a11y-svep. Se `design-system-v0.4.md`.

## Vad väntar till v0.5 och senare

- Riktig backend (Supabase + auth + Stripe).
- Riktig foto-uppladdning (kopplad mot CDN eller Supabase Storage).
- Vaccinationsintyg mot veterinärsystem.
- Pausa/avsluta-flöden för medlemskap.
- Instruktörsläge och feedback-loopen.
- Video-content för hemmaövningar (kräver content-produktion).

## Köra projektet

```bash
npm install
npm run dev
```

Öppna http://localhost:3000

Hemskärmen ligger på `/`, onboarding börjar på `/onboarding`.

## Projektstruktur

```
dogpark-app/
├── app/
│   ├── globals.css           # CSS-variabler för designsystemet
│   ├── layout.tsx            # Root layout, laddar Fraunces + Manrope
│   ├── page.tsx              # Hemskärmen
│   └── onboarding/
│       ├── layout.tsx        # Wrappar alla onboarding-steg i PhoneFrame
│       ├── page.tsx          # Steg 1: välkommen
│       ├── om-din-hund/      # Steg 2: berätta om hunden
│       └── rekommendation/   # Steg 3: första rekommendationen
├── components/
│   ├── PhoneFrame.tsx        # Mobil-look-alike för desktop-preview
│   ├── Button.tsx            # Knapp med varianter och storlekar
│   ├── ProgressBar.tsx       # För onboarding-progress
│   └── Icon.tsx              # Inline-SVG ikoner i Phosphor-stil
├── lib/
│   └── mock-data.ts          # Fejkdata för Luna, Anna, pass, etc
├── tailwind.config.ts        # Designsystem-tokens
└── README.md
```

## Hur designsystemet är implementerat

Tokens finns på två ställen:
1. `tailwind.config.ts` för utility classes (`bg-action-primary`, `text-text-muted`, etc).
2. `app/globals.css` som CSS-variabler (`var(--color-action-primary)`) för fall där vi vill nå tokens från CSS direkt.

Båda speglar samma värden från designsystem-dokumentet v2. Ändras en token måste den ändras båda ställena. På sikt vill vi generera båda från en gemensam källa (Style Dictionary), men för en solo-prototyp är det overhead utan upside.

## Mock-data och hur den ersätts senare

Allt i `lib/mock-data.ts` följer ett async-pattern:

```ts
export async function getDog(): Promise<Dog> {
  await fakeDelay();
  return mockDog;
}
```

När backend kopplas in byts bara innehållet i funktionen mot ett Supabase-anrop. UI-koden som anropar `getDog()` behöver inte ändras. Det är så vi minimerar refaktor när vi går från mockad till riktig data.

## Designval värda att förstå

**Färgroller:** Sage är "färgen som gör saker" (boka, bekräfta, primär CTA). Rose är "färgen som är mänsklig" (avatar, datum, instruktör). Charcoal är för mörka hero-skärmar. Bone är varm bakgrund.

**Typografi:** Fraunces för rubriker (varm serif), Manrope för body (geometrisk men vänlig sans). Två fonts, max två vikter per skärm.

**Animationer:** Stagger-fade på sid-load (80ms mellan barn), breathe på avatar (3.2s loop), progress-fill när "Din resa" laddas. Easing default `cubic-bezier(0.22, 1, 0.36, 1)`.

**Voice:** "Boka in oss" inte "Boka". "Snart är hela nivån klar, bra jobbat" inte "62% complete". Hundens namn alltid när det går.

## Felsökning

**Fonts laddar inte i utveckling:** Kontrollera nätverksåtkomst till `fonts.googleapis.com`. Om problemet kvarstår, ladda ner Fraunces och Manrope lokalt och peka om i `app/layout.tsx`.

**Tailwind classes funkar inte:** Säkerställ att filen ligger inom `content`-globben i `tailwind.config.ts`.

**Hot reload fungerar inte i mock-data:** Server components behöver omladdning för att hämta uppdaterad mock. Klientkomponenter ska reloada automatiskt.
