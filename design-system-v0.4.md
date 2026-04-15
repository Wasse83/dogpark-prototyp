# Designsystem v0.4 — Dogpark medlemsapp

Uppdateringsdokument ovanpå v0.3. Täcker det som ändrats när vi gick från ofärdiga stubbar och blandade hero-storlekar till en genomgående Version C-metrik, kompletta sidor för hela nav-ytan, och SVG-baserad fotofallback.

Principer från v0.3 gäller fortfarande. Detta dokument beskriver vad som lagts till och vad som harmoniserats.

## Vad som är nytt i v0.4

### 1. Version C är default

Efter A/B-testet mellan Version A (28px redaktionell) och Version B (20px tät) valde vi Version C som kompromiss — 24px hero, 13px underrubrik, kompakta kort. Alla sidor ska följa den här metriken om det inte finns särskild anledning att sticka ut.

Härdmetrik för Version C:

- Hero `<h1>`: `font-display text-[24px] leading-[1.15]`
- Underrubrik: `text-[13px] text-text-muted mt-1`
- Sektions-kicker: `text-[11px] font-bold tracking-wider text-text-muted uppercase mb-2` eller `mb-3`
- Kort-padding: `p-3` som standard, `p-4` för signatur-kort (progress, medlemskap)
- Rund hörnradie på kort: `rounded-[16px]` för vanliga, `rounded-[20px]` för hero-kort
- Körtlinjeborders: `border border-charcoal-900/[0.04]` på bone-ytor

Onboarding steg 1+2 samt /bli-medlem är nedjusterade från 28-30px till 24px för att stämma med resten.

### 2. SVG-illustrationer som fotofallback

Eftersom prototypen inte har riktiga bilder använder vi stiliserade SVG-illustrationer i varumärkets palett. Dessa lever i `/public/photos/`:

- `dogs/dog-1.svg` — Luna, border collie framifrån
- `parks/{id}.svg` — en illustration per park (Uddevalla, Uppsala, Västerås)
- `sessions/{category}.svg` — en illustration per gruppass-kategori (nosework, lydnad, fys, social, hundgym, avslappning)

Per-session foto är inte värt besväret — en illustration per kategori räcker. `lib/mock-data.ts` mappar kategori till bild via en `categoryPhoto()`-helper.

Varje SVG:

- 200×200 viewBox, bakgrundsfärg från varumärkespaletten (sage, rose, bone, charcoal)
- `role="img"` + beskrivande `aria-label` på svg-taggen
- Minimalistiska former, tydliga siluetter, två till tre färger

`PhotoThumb`-komponenten blir bone-200 + sage-silhuett om ingen `src` finns — den faktiska fallbacken på produkt. SVG:erna är prototyp-ersättare.

### 3. /min-resa — programtidslinje

En ny mönstertyp: tidslinje som `<ol>` med absolut-positionerad vertikal linje (`<div className="absolute left-[14px] top-1 bottom-1 w-0.5 bg-bone-200"/>`) och statusbaserad dot per steg.

Statusar:

- `klar` — sage-100 bakgrund med sage-500 border, check-ikon
- `nu` — sage-500 fyllning, bone-50 text, sessionsnummer synligt
- `framtida` — bone-100 bakgrund, bone-200 border, muted text, sessionsnummer

Kortet bredvid dotten markeras `bg-sage-100 border border-sage-500/40` för `nu`, annars `bg-bg-surface border border-charcoal-900/[0.04]`.

Milstolpar under tidslinjen använder textetiketter i färgade pills (`Klarade` sage-100, `Milstolpe` rose-100, `Nivå` bone-200) — inte emojis.

### 4. Dead-link policy — tomt

Alla tidigare StubPage-rutter är nu riktiga sidor. `StubPage`-komponenten står kvar som beredskap för nya funktioner som inte är byggda än, men ingen produktionssida använder den längre.

### 5. Formulär-konvention

Formulärsidor (`/min-hund/redigera`) följer en ny mall:

- Fälten grupperas i namngivna sektioner (Identitet, Kropp, Vardag) med sektion-kicker
- Varje fält: 11px label i tracking-wider uppercase, 11h höjd, 12px border-radius, sage-focus-ring med `focus:ring-2 focus:ring-sage-500/20`
- Spara-knapp ändras till `bg-sage-100 text-sage-800` med check-ikon i 2 sekunder efter submit

### 6. Toggle-mönster

`/installningar` introducerar en radbaserad toggle med:

- `role="switch"` på den tryckbara ytan
- `aria-checked={checked}` + `aria-label` från fältets label
- Visuellt: `w-10 h-6 rounded-full` track, `w-5 h-5 rounded-full` thumb, sage-500 när på, bone-200 när av
- Grupperas i `bg-bg-surface rounded-[16px]` kort med `border-t` mellan rader

### 7. Notiser — oläst-indikator

`/notiser` introducerar:

- Sektioner "Nya" och "Äldre"
- Olästa notiser får en 2×2 sage-500 dot till vänster (`absolute top-3.5 left-[-4px]`)
- Typchip med text istället för ikon: Påminnelse, Nytt pass, Milstolpe, Meddelande

### 8. Share sheet — /dela

- 4-kolumn ikongrid med avatarliknande cirklar i varumärkespaletten
- Kopiera-länk är primär CTA, visas som en pill-formad input med truncerad URL
- Kopierat-state: sage-100 bakgrund + check-ikon, återgår efter 1.8s

### 9. Veckans övning — videoplaceholder

Aspect-ratio 4:3 mörkt gradient-kort (sage-700 → charcoal-900) med centrerad play-knapp (w-16 bone-50 + Play-ikon i charcoal-900). Badges längst ner med längd och nivå.

Stegvis guide som `<ol>` med numrerade sage-100-cirklar (11px bold).

### 10. A11y-svep

- `role="radiogroup"` + `role="radio"` + `aria-checked` på onboarding-knappgrupper (ålder, erfarenhet)
- `role="switch"` + `aria-checked` på alla toggles
- Skip-link stöd i `globals.css` (`.skip-link`-klassen)
- Alla ikoniga knappar har `aria-label`
- Focus-ring finns globalt via `:focus-visible { outline: 2px solid var(--color-border-focus); }`

### 11. Voice — fortsatt

Ingen ändring från v0.3:

- "Boka in oss", inte "Boka"
- "Era val", inte "Dina inställningar"
- Hundens namn alltid när det går
- Inga emojis, inga "Vänligen"

## Sidor och deras hero-text

För enhetlig ton listar vi den exakta hero-texten per sida:

- `/` — "God morgon, {namn}" eller "Du har {X} pass framöver"
- `/boka` — "Era *nästa pass*"
- `/mina-bokningar` — "Era *inbokade stunder*"
- `/min-resa` — "Er *resa* genom {programName}"
- `/veckans-ovning` — "90 sekunder *hemmaläxa*"
- `/min-hund` — Lunas profilkort
- `/min-hund/redigera` — "Redigera *{namn}s* profil"
- `/min-hund/medlemskap` — "Ert *medlemskap*"
- `/min-hund/vaccinationsintyg` — "Lunas *vaccinationer*"
- `/installningar` — "Era *val*"
- `/notiser` — "Era *notiser*"
- `/dela` — "Skicka *passet* vidare"
- `/logga-ut` — "Vill ni *logga ut*?"
- `/bli-medlem` — "Välj medlemskap för *Luna*"
- `/valj-park` — "Vilken park blir er *hemma*?"
- `/onboarding` — "Välkommen till Dogpark."
- `/onboarding/om-din-hund` — "Berätta om *Luna*"
- `/onboarding/rekommendation` — "Vi tror Luna skulle gilla *detta*"

Genomgående: kursiv-accent på det affektiva ordet. **Färgval följer sage-vs-rose-regeln från v0.3:**

- **sage-600** när ordet uttrycker en handling, ett innehåll eller ett system-begrepp ("veckans pass", "resa", "medlemskap", "val", "vaccinationer", "hemmaläxa", "rätt pass", "logga ut", "notiser", "detta", "Luna" i onboarding där hunden är objektet vi konfigurerar).
- **rose-700** när ordet är mänskligt eller tidsmässigt — egen ägd tid, hemkänsla, förväntan på ett möte. Används idag på tre ställen: `/mina-bokningar` ("inbokade stunder"), `/valj-park` ("hemma"), och bokningsbekräftelsen `/boka/[pass]` ("vi ses {dayLabel}").

Regeln är inte mekanisk — är det tveksamt, välj sage. Rose reserveras för när vi vill att läsaren ska känna varmt, inte bara förstå.

## Nya mock-data-typer

- `JourneyStep` + `mockJourneySteps` + `getJourneySteps()` — tidslinjen för /min-resa
- `WeeklyExercise` + `mockWeeklyExercise` + `getWeeklyExercise()` — hemmaläxan
- `NotificationItem` + `mockNotifications` + `getNotifications()` — notiscentralen
- `VaccinationRecord` + `mockVaccinations` + `getVaccinations()` — vaccinationsintyg

Alla följer samma async-delay-mönster som v0.3.

## Migration från v0.3

Ingen. v0.4 är additiv på UI-sidan och svagt ersättande där stubbar fanns. Befintliga komponenter är oförändrade.

Det enda att tänka på är att `mockGroupSessions` numera är en `map()`-variant av `rawGroupSessions` som berikar varje pass med `photoUrl` från kategorin. Om man vill åsidosätta fotot per pass ligger det kvar som valfritt fält.
