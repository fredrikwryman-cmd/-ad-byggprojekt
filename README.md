# AD Byggprojekt Stockholm AB — webbplats

Företagswebbplats för AD Byggprojekt Stockholm AB (byggledning, platsledning och
projektledning i Stockholm med omnejd).

Sajten är **helt statisk**. Det finns ingen databas, ingen backend och ingen
serverkod i det här repot. Bygget producerar rena HTML-, CSS- och JS-filer som
publiceras på GitHub Pages. Formulärutskick sköts av en extern tjänst
(Web3Forms), se avsnittet [Formulär](#formulär).

Publicerad adress i dag: `https://ad.aimstudios.se/`
Kundens tänkta skarpa adress: `https://adbyggprojekt.se`

---

## MÅSTE GÖRAS VID DRIFTSÄTTNING

**Läs det här avsnittet först.** Sajten ligger i dag på en tillfällig subdomän
som ett arbetsprov, och är därför medvetet inställd så att den **inte kan
hittas i Google**. Två saker är avstängda och måste slås på när sajten flyttas
till kundens egen domän. Görs det inte kommer sajten aldrig att indexeras.

### 1. Noindex måste tas bort

Varje sida på sajten levereras i dag med `<meta name="robots" content="noindex,
nofollow">`. Det är satt som **standardvärde** för alla sidor:

```astro
// src/layouts/Layout.astro, rad 20
robots = 'noindex, nofollow',
```

**Vid driftsättning:** ändra standardvärdet till `'index, follow'`.

```astro
robots = 'index, follow',
```

Två saker att veta:

- `src/pages/404.astro` sätter `robots="noindex, nofollow"` explicit som prop.
  **Den raden ska stå kvar** — en 404-sida ska aldrig indexeras. Det är bara
  standardvärdet i `Layout.astro` som ska ändras.
- `public/robots.txt` innehåller `Allow: /` och spärrar alltså ingenting. Det är
  avsiktligt: sajten måste få crawlas för att Google ska hinna läsa
  noindex-taggen. En adress som spärras i robots.txt kan annars hamna i indexet
  ändå, via en extern länk, som en tom träff utan beskrivning. **Rör inte
  robots.txt** i samband med noindex-ändringen.

Kontrollera efter driftsättning att `index, follow` faktiskt ligger i den byggda
HTML-koden:

```sh
npm run build
grep -o 'name="robots" content="[^"]*"' dist/index.html
```

### 2. Sitemapen är borttagen och ska återställas

`public/sitemap.xml` fanns tidigare men är **borttagen ur repot**, eftersom en
sitemap för en noindexad arbetsprovssajt bara är en uppmaning till Google att
crawla något som ändå inte får visas. `Sitemap:`-raden i `public/robots.txt` är
borttagen av samma skäl.

**Vid driftsättning:** återställ sitemapen. Det rekommenderade sättet är att
inte skriva den för hand igen, utan att låta bygget generera den:

```sh
npx astro add sitemap
```

Det lägger in `@astrojs/sitemap` i `astro.config.mjs`. Integrationen läser
`site` och `base` och tar automatiskt med alla genererade sidor, inklusive alla
projektsidor. Då slipper man underhålla en handskriven fil vid varje nytt
projekt och vid varje domänbyte — vilket var den vanligaste felkällan tidigare.

Lägg därefter till raden i `public/robots.txt`:

```text
Sitemap: https://adbyggprojekt.se/sitemap-index.xml
```

Anmäl sitemapen i Google Search Console när domänen är verifierad.

### Checklista vid driftsättning

1. Byt domän enligt [Vid domänbytet till adbyggprojekt.se](#vid-domänbytet-till-adbyggprojektse).
2. Ändra `robots`-standardvärdet i `src/layouts/Layout.astro` till `'index, follow'`.
3. Återställ sitemapen (`npx astro add sitemap`) och lägg tillbaka
   `Sitemap:`-raden i `public/robots.txt`.
4. Web3Forms access key är redan kundens egen och behöver inte bytas, se
   [Formulär](#formulär).
5. Kontrollera att QR-koden och vCard-filen pekar rätt, se
   [Digitalt visitkort](#digitalt-visitkort-andreas).
6. Bygg, deploya och verifiera `robots`-taggen och sitemapen i den **byggda**
   koden, inte bara i källkoden.
7. Verifiera domänen i Google Search Console och skicka in sitemapen.

---

## Innehåll

- [MÅSTE GÖRAS VID DRIFTSÄTTNING](#måste-göras-vid-driftsättning)
- [Teknisk stack](#teknisk-stack)
- [Komma igång](#komma-igång)
- [Kommandon](#kommandon)
- [Projektstruktur](#projektstruktur)
- [Bassökväg (base) och domänbyte](#bassökväg-base-och-domänbyte)
- [Digitalt visitkort (/andreas)](#digitalt-visitkort-andreas)
- [Innehållsdata: lägga till eller ändra ett projekt](#innehållsdata-lägga-till-eller-ändra-ett-projekt)
- [FAQ-data](#faq-data)
- [Bilder och media i public/](#bilder-och-media-i-public)
- [Formulär](#formulär)
- [GPS-kartan på /kontakt och CSP för iframes](#gps-kartan-på-kontakt-och-csp-för-iframes)
- [Design och CSS](#design-och-css)
- [Besöksstatistik (analytics)](#besöksstatistik-analytics)
- [Deploy](#deploy)
- [SEO, strukturerad data och säkerhetspolicy](#seo-strukturerad-data-och-säkerhetspolicy)
- [Tillgänglighet](#tillgänglighet)
- [Vilande komponenter och hur de aktiveras](#vilande-komponenter-och-hur-de-aktiveras)
- [Kända underhållspunkter](#kända-underhållspunkter)

---

## Teknisk stack

| Del | Val | Kommentar |
| :-- | :-- | :-- |
| Ramverk | Astro 6 | Statisk generering (SSG). Ingen adapter, ingen SSR. |
| UI-öar | React 19 via `@astrojs/react` | Endast för interaktiva komponenter, laddas med `client:idle`. |
| CSS | Tailwind CSS v4 via `@tailwindcss/vite` | Konfiguration ligger i CSS (`@theme`), inte i en `tailwind.config.js`. |
| Animation | framer-motion | Respekterar `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`. |
| Typsnitt | `@fontsource/inter` (400–700) och `@fontsource/bebas-neue` (400) | Self-hostade. Inga anrop till Google Fonts eller andra externa CDN. |
| Ikoner | `src/components/icons.jsx` | Ett trettiotal handrullade SVG-komponenter. Inget ikonbibliotek används. |
| Karta | OpenStreetMap via `<iframe>` | Ingen API-nyckel, inget konto. Se [GPS-kartan](#gps-kartan-på-kontakt-och-csp-för-iframes). |
| Hosting | GitHub Pages via GitHub Actions | Se [Deploy](#deploy). |

Bygget kräver **Node 22 eller senare** (`package.json` anger `"node": ">=22.12.0"`).

---

## Komma igång

```sh
npm install
npm run dev
```

Dev-servern startar normalt på `http://localhost:4321`. Sajten ligger i roten
(`base: '/'`), så adressen är just `http://localhost:4321/`.

## Kommandon

| Kommando | Vad det gör |
| :-- | :-- |
| `npm install` | Installerar beroenden. |
| `npm run dev` | Startar utvecklingsserver med hot reload. |
| `npm run build` | Bygger produktionssajten till `dist/`. Ger i dag **25 HTML-sidor**. |
| `npm run preview` | Serverar den byggda sajten lokalt för kontroll före deploy. |
| `npm run astro` | Genomsläpp till Astros CLI (`npm run astro -- check` med mera). |

`dist/` och `.astro/` är genererade kataloger och ignoreras av Git.

---

## Projektstruktur

```text
.github/workflows/deploy.yml   Bygg- och deployflöde till GitHub Pages
.gitattributes                 Skyddar radsluten i .vcf-filen, se Digitalt visitkort
astro.config.mjs               Bassökväg, site-URL, integrationer
public/                        Statiska filer, kopieras rakt av till dist/
  projekt/                     Projektbilder (hero + galleri)
  andreas/andreas.vcf          Kontaktkort för visitkortssidan (CRLF-känslig)
  andreas-qr.png               QR-kod till visitkortet (tryckt på fordon/kläder)
  robots.txt                   Sitemap-raden är borttagen, se Driftsättning
scripts/generate-cv-pdf.py     Genererar CV-PDF:en ur src/data/cv-data.json (Python, reportlab)
src/
  data/
    projects.js                All projektdata
    faqs.js                    All FAQ-data
    cv-data.json               CV-innehåll (används av både webbsidan och PDF-scriptet)
  layouts/Layout.astro         Gemensam sidmall: head, meta, Open Graph, JSON-LD, CSP
  pages/                       Astro-routing, en fil = en sida
    projekt/[slug].astro       Genererar alla projektsidor dynamiskt
    andreas/index.astro        Digitalt visitkort
  components/                  Grupperade per område
    home/ about/ projects/ services/ contact/ layout/ pages/ chat/
    icons.jsx                  Egna SVG-ikoner
  styles/global.css            Designsystem, CSS-variabler, egendefinierade klasser
```

> `public/sitemap.xml` finns **inte** längre i repot. Den ska återställas vid
> driftsättning, se [MÅSTE GÖRAS VID DRIFTSÄTTNING](#måste-göras-vid-driftsättning).

### Routing

Astro använder filbaserad routing. Varje fil i `src/pages/` blir en sida:

| Fil | URL (relativt bassökvägen) |
| :-- | :-- |
| `index.astro` | `/` |
| `tjanster.astro` | `/tjanster` |
| `projekt.astro` | `/projekt` |
| `projekt/[slug].astro` | `/projekt/<slug>` — en sida per projekt |
| `om-oss.astro` | `/om-oss` |
| `cv.astro` | `/cv` |
| `kontakt.astro` | `/kontakt` |
| `offert.astro` | `/offert` |
| `andreas/index.astro` | `/andreas` — digitalt visitkort |
| `integritetspolicy.astro` | `/integritetspolicy` |
| `404.astro` | `/404` (satt till `noindex, nofollow` explicit — ska förbli det) |

`src/pages/projekt/[slug].astro` läser `allProjects` ur `src/data/projects.js` i
`getStaticPaths()` och bygger en statisk sida per projekt. Lägger man till ett
projekt i datafilen skapas alltså projektsidan automatiskt vid nästa bygge.

### Komponenter

React-komponenter monteras som öar med `client:idle`, det vill säga JavaScript
laddas först när webbläsaren är ledig. Rena presentationsdelar (till exempel
`StopMotionBanner.astro` och `Footer`) körs utan klient-JS där det går.

---

## Bassökväg (base) och domänbyte

Sajten ligger i **domänroten** på `https://ad.aimstudios.se`, inte i en
underkatalog. Därför är bassökvägen `/`:

```js
// astro.config.mjs
base: '/',
site: 'https://ad.aimstudios.se',
```

Custom-domänen hålls kvar av `public/CNAME` (en rad: `ad.aimstudios.se`). Astro
kopierar `public/` rakt in i `dist/`, så filen följer med i varje deploy — **ta
inte bort den**, annars kan nästa Actions-deploy nolla domäninställningen i
GitHub Pages.

Alla interna länkar och tillgångar i koden byggs mot `import.meta.env.BASE_URL`:

```jsx
href={import.meta.env.BASE_URL + 'projekt'}
src={import.meta.env.BASE_URL + 'projekt/paraden.jpg'}
```

**`BASE_URL` innehåller ett avslutande snedstreck.** Konkatenera därför aldrig
med ett inledande snedstreck — `BASE_URL + '/projekt'` ger dubbla snedstreck och
en trasig länk. Skriv heller aldrig hårdkodade absoluta sökvägar som
`href="/projekt"`; de fungerar i domänroten men bryts om sajten någon gång
flyttas till en underkatalog.

### Vid domänbytet till adbyggprojekt.se

Repot har historik från tiden då sajten låg på `github.io` under bassökvägen
`/-ad-byggprojekt/`. Den bassökvägen är **redan avvecklad** — `base` är `/` i
dag och ska förbli det, eftersom kundens sajt ska ligga i domänroten.

Så här går bytet till:

1. **`astro.config.mjs`** — låt `base` stå kvar som `'/'`. Ändra `site`:
   ```js
   base: '/',
   site: 'https://adbyggprojekt.se',
   ```
2. **`public/CNAME`** — ersätt innehållet med en enda rad:
   ```text
   adbyggprojekt.se
   ```
3. **DNS** — peka domänen mot GitHub Pages och sätt Pages-inställningen i repot
   till den nya custom-domänen. Vänta in certifikatet (`Enforce HTTPS`).
4. **Noindex och sitemap** — se
   [MÅSTE GÖRAS VID DRIFTSÄTTNING](#måste-göras-vid-driftsättning).
5. **Web3Forms** — access key är redan kundens egen, inget behöver göras. Ska
   mottagaradressen ändras görs det i Web3Forms-kontot, inte i koden, se
   [Formulär](#formulär).
6. Bygg om och deploya.

**Vad `site` styr.** Ingen annan kod behöver ändras, eftersom allt internt går
via `BASE_URL`. Men `site` används för att bygga **absoluta** URL:er, och de
ändras alla samtidigt när `site` ändras:

| Var | Vad som påverkas |
| :-- | :-- |
| `Layout.astro` | `<link rel="canonical">` på varje sida |
| `Layout.astro` | `og:url` och Twitter Card-URL:er |
| `Layout.astro` | JSON-LD `ProfessionalService` (`url`, `logo`) |
| `projekt/[slug].astro` | JSON-LD `CreativeWork` (`url`, `image`) och `BreadcrumbList` |
| Open Graph-bilder | `og-hero.jpg` och `og-visitkort.jpg` refereras absolut |

Kontrollera efter bytet att inga gamla domäner ligger kvar i bygget:

```sh
npm run build
grep -r "ad\.aimstudios\.se" dist/ | head
```

**Undantag: visitkortets tillgångar ska inte röras.** QR-koden och vCard-filen
pekar redan på `https://adbyggprojekt.se` och ska stå kvar oförändrade även
innan bytet. Se nästa avsnitt.

---

## Digitalt visitkort (/andreas)

En fristående visitkortssida avsedd att öppnas från en **tryckt QR-kod** på
fordon och arbetskläder. Besökaren landar på sidan, ser kontaktuppgifterna och
kan spara dem direkt i telefonens adressbok med ett tryck.

### Filer

| Fil | Roll |
| :-- | :-- |
| `src/pages/andreas/index.astro` | Själva sidan. Fristående layout, inte samma som övriga sidor. |
| `public/andreas/andreas.vcf` | Kontaktkortet som laddas ner vid "Spara kontakt". **CRLF-känslig, se nedan.** |
| `public/andreas-qr.png` | QR-koden. Kodar `https://adbyggprojekt.se/andreas`. |
| `public/og-visitkort.jpg` | Egen Open Graph-bild för sidan, så delningar ser rätt ut. |
| `public/andreas-portratt-400.jpg` / `.webp` | Porträtt på sidan. |

### `.gitattributes` — rör inte

vCard-standarden (RFC 6350) kräver **CRLF** som radslut. Normaliserar Git raden
till LF vid checkin eller checkout slutar filen att importeras korrekt i vissa
telefoner — iOS är särskilt känsligt. Därför finns:

```text
# .gitattributes
*.vcf -text
```

`-text` gör att Git behandlar filen som binär och aldrig rör radsluten. **Ta
inte bort raden**, och öppna inte `.vcf`-filen i en editor som tyst konverterar
radslut. Kontrollera vid behov att radsluten är intakta:

```sh
file public/andreas/andreas.vcf        # ska nämna CRLF
```

### URL:erna pekar på kundens domän — avsiktligt

Både QR-koden och `URL`-fältet i vCard-filen pekar på
**`https://adbyggprojekt.se`**, alltså kundens tänkta skarpa domän — inte på
arbetsprovets nuvarande adress. Det är medvetet, eftersom QR-koden är tänkt att
tryckas på fordon och kläder och inte kan ändras i efterhand.

> **Verifiera före tryck.** Innan något trycks ska det bekräftas att
> `https://adbyggprojekt.se/andreas` verkligen svarar och visar visitkortet.
> Fram till att domänen är driftsatt leder QR-koden ingenstans. Regenerera inte
> QR-koden för att peka på den tillfälliga adressen — då blir det tryckta
> materialet fel så fort sajten flyttar.

Kontrollpunkter vid driftsättning:

1. `https://adbyggprojekt.se/andreas` laddar sidan.
2. "Spara kontakt" laddar ner `andreas.vcf` och den importeras utan fel i både
   iOS och Android.
3. QR-koden, skannad med telefonens kamera, hamnar på rätt sida.
4. Delning i Messenger/LinkedIn visar `og-visitkort.jpg`.

---

## Innehållsdata: lägga till eller ändra ett projekt

All projektdata ligger i **`src/data/projects.js`**. Filen exporterar:

| Export | Innehåll |
| :-- | :-- |
| `featuredProjects` | Array med de större, bildsatta projekten. |
| `moreProjects` | Array med övriga projekt. |
| `allProjects` | `[...featuredProjects, ...moreProjects]` — används av projektsidorna. |
| `slugByTitle` | Uppslag från titel till slug. |

Överst i filen finns:

```js
const BASE = import.meta.env.BASE_URL;
```

Den konstanten ska användas när bildsökvägar byggs.

### Fält i ett projektobjekt

| Fält | Typ | Beskrivning |
| :-- | :-- | :-- |
| `slug` | sträng | URL-segment, blir `/projekt/<slug>`. Måste vara unikt, gemener, bindestreck, inga å/ä/ö (translitterera: `ö`→`o`, `ä`→`a`, `å`→`a`). |
| `title` | sträng | Projektets namn. Visas som rubrik och används av `slugByTitle`. |
| `location` | sträng | Ort. Används i kortet och i `locationCreated` i strukturerad data. |
| `client` | sträng | Beställare. Blir `sourceOrganization` i strukturerad data. |
| `category` | sträng | Används för kategorifiltret på `/projekt`. Befintliga värden: `Bostäder`, `Renovering`, `Anläggning`, `Lokalanpassning`, `Kommersiellt`. |
| `year` | sträng | Till exempel `'2020–2022'` eller `'2024–pågår'`. |
| `image` | sträng eller `null` | Hero-bild, byggs som `BASE + 'projekt/filnamn.jpg'`. Sätt `null` om projektet saknar bild. |
| `hasImage` | boolean | `true` ger ett bildkort, `false` ger ett textkort utan bild. Ska följa `image`. |
| `featured` | boolean | `true` visar projektet bland de utvalda på startsidan. |
| `description` | sträng | Kort text, en till två meningar. Används i kortet och som meta description på projektsidan. |
| `longDescription` | sträng | Brödtext på projektsidan. |
| `facts` | array av `{ label, value }` | Faktaruta på projektsidan (entreprenadsumma, yta, roll, entreprenadform, beställare). |
| `stats` | objekt `{ area, time, value }` | Kompakt nyckeltalsrad. Används av de bildsatta projekten. |
| `gallery` | array av strängar | Extra bilder, byggs som `BASE + 'projekt/filnamn.jpg'`. **Tom array = ingen galleri-sektion visas.** Helt separat från `image`. |

Vissa poster i `moreProjects` använder i stället de enklare fälten `value` och
`role` som platta strängar där `stats` inte passar. Följ mönstret i det närmast
liknande befintliga projektet.

### Exempel: nytt projekt med bild och galleri

```js
{
  slug: 'nytt-projekt-taby',
  title: 'Nytt Projekt, Täby',
  location: 'Täby',
  client: 'Beställarens namn',
  category: 'Renovering',
  year: '2025–2026',
  image: BASE + 'projekt/nyttprojekt.jpg',
  hasImage: true,
  featured: false,
  description: 'Kort sammanfattning i en till två meningar.',
  stats: { area: '1 200 kvm', time: '14 månader', value: '30 mkr' },
  longDescription: 'Längre beskrivning som visas på projektsidan.',
  gallery: [
    BASE + 'projekt/nyttprojekt-g1.jpg',
    BASE + 'projekt/nyttprojekt-g2.jpg',
  ],
  facts: [
    { label: 'Entreprenadsumma', value: '30 mkr' },
    { label: 'Yta', value: '1 200 kvm' },
    { label: 'Roll', value: 'Platschef' },
    { label: 'Beställare', value: 'Beställarens namn' },
  ],
},
```

### Exempel: projekt utan bild

```js
{
  slug: 'projekt-utan-bild',
  title: 'Projekt utan bild',
  location: 'Stockholm',
  client: 'Privatperson',
  category: 'Renovering',
  year: '2025',
  image: null,
  hasImage: false,
  featured: false,
  description: 'Kort sammanfattning.',
  value: '5 mkr',
  role: 'Byggledare',
  longDescription: 'Längre beskrivning.',
  gallery: [],
  facts: [
    { label: 'Entreprenadsumma', value: '5 mkr' },
    { label: 'Roll', value: 'Byggledare' },
  ],
},
```

### Checklista när ett projekt läggs till

1. Lägg in objektet i `featuredProjects` eller `moreProjects` i
   `src/data/projects.js`.
2. Lägg bilderna i `public/projekt/` enligt namn- och formatkonventionen nedan.
3. **Uppdatera även listkorten i `src/components/pages/ProjectsPage.jsx`** —
   se varningen direkt nedan.
4. Kör `npm run build` och kontrollera att sidan genereras och att bilderna syns
   i `npm run preview`.
5. När sitemapen är återställd med `@astrojs/sitemap` sköts den automatiskt.
   Skrivs den någon gång för hand måste den nya URL:en läggas till manuellt.

> **Viktigt — dubbelt underhåll på projektsidan.**
> `src/components/projects/ProjectsSection.jsx` (startsidan) läser korrekt ur
> `src/data/projects.js` och filtrerar på `featured`. Listsidan
> `src/components/pages/ProjectsPage.jsx` har däremot **egna, duplicerade
> arrayer** (`projects` och `moreProjects` i samma fil) och importerar bara
> `slugByTitle` från datafilen för att bygga länkarna:
> ```jsx
> // src/components/pages/ProjectsPage.jsx, rad 157 och 227
> href={import.meta.env.BASE_URL + 'projekt/' + slugByTitle[title]}
> ```
> Ett projekt som bara läggs till i `src/data/projects.js` får en fungerande
> projektsida men syns **inte** i listan på `/projekt`. Och eftersom länken slås
> upp på `title` måste titeln vara **exakt identisk** i båda filerna, annars blir
> `slugByTitle[title]` odefinierad och länken pekar på `/projekt/undefined`.
> Detta gäller även vid **namnbyten** på befintliga projekt: ändras titeln på ett
> ställe måste den ändras på båda. En rimlig förbättring är att låta
> `ProjectsPage.jsx` importera ur `src/data/projects.js` och radera dubbletterna.

---

## FAQ-data

`src/data/faqs.js` är enda källan för FAQ:n. Varje post är `{ q, a }`. Datan
används på två ställen samtidigt:

- `src/components/home/FaqSection.jsx` renderar den synliga FAQ:n.
- `src/pages/index.astro` genererar `FAQPage`-strukturerad data ur exakt samma
  array.

Det gör att strukturerad data alltid matchar synligt innehåll, vilket Google
kräver för FAQ-resultat. Ändra frågor och svar **endast** i `src/data/faqs.js`.

---

## Bilder och media i `public/`

Allt i `public/` kopieras oförändrat till `dist/` och nås via
`import.meta.env.BASE_URL + 'filnamn'`. Bilder här optimeras **inte** av bygget —
de måste beskäras och komprimeras innan de checkas in.

### Konvention för projektbilder (`public/projekt/`)

| Typ | Format | Mått | Filstorlek | Namn |
| :-- | :-- | :-- | :-- | :-- |
| Hero-bild | Progressiv JPEG | 1376 × 768 px | ca 130–240 kB | `<stam>.jpg`, till exempel `kyrkskolan.jpg` |
| Galleribild | JPEG | ca 1400 px på längsta sidan (liggande eller stående) | så låg som möjligt | `<hero-stam>-g1.jpg`, `-g2.jpg`, `-g3.jpg` … |

Galleribildernas filnamn ska utgå från hero-bildens stam. Har hero-bilden namnet
`kyrkskolan.jpg` heter galleribilderna `kyrkskolan-g1.jpg`, `kyrkskolan-g2.jpg`
och så vidare. Sökvägarna listas sedan explicit i projektets `gallery`-array —
namngivningen är en ordningskonvention, inte något som läses in automatiskt.

Håll galleribilderna nedåt i storlek. Flera befintliga galleribilder ligger på
300–550 kB styck, vilket är i tyngsta laget för webb.

### Videobanners och poster-bilder

Fyra MP4-filer används som dämpade bakgrundsloopar via
`src/components/home/StopMotionBanner.astro`. Varje film har en poster-bild
(`<namn>-poster.jpg`, 1280 × 720, progressiv JPEG).

**Poster-bilden ska vara filmens första bildruta (t = 0).** Är den tagen någon
annanstans ifrån ser besökaren en bild som inte hör ihop med det uppspelningen
börjar med, och den hinner blinka förbi innan filmen startar. `andreas-resa.mp4`
tonar dessutom in från svart, så dess poster är avsiktligt en mörk ruta —
intoningen är en del av filmens uttryck och ska inte kringgås genom att flytta
videons startpunkt.

> **Känd avvägning:** eftersom `prefers-reduced-motion`-fallbacken visar
> poster-bilden i stället för en spelande video blir CV-sidans bård en tom mörk
> ruta för de användarna. Se [Kända underhållspunkter](#kända-underhållspunkter).

### Övriga filer i `public/`

Loggor, favikoner, Open Graph-bilder (`og-hero.jpg` och `og-visitkort.jpg`,
1200 × 630), porträtt, blueprint-bakgrunder, CV-PDF, QR-kod, vCard och
`robots.txt`.

---

## Formulär

Offertformuläret på `/offert` skickas till **Web3Forms**
(`https://api.web3forms.com/submit`). Det finns ingen serverkod i repot som tar
emot inskick.

### Access key

Nyckeln i koden tillhör **kundens eget Web3Forms-konto**, registrerat på
`andreas@adbyggprojekt.se`. Kontot ingår i överlämningen, så offertförfrågningar
landar hos kunden och inget behöver bytas för att formuläret ska fungera.

Om kontot någon gång byts — nytt konto, ny mottagaradress eller ny nyckel —
görs så här:

1. Skapa eller öppna kontot på [web3forms.com](https://web3forms.com) och ange
   mottagaradressen.
2. Kopiera access key:n.
3. Ersätt nyckeln på **alla tre ställena**:

| Fil | Rad | Sammanhang |
| :-- | :-- | :-- |
| `src/components/pages/OffertPage.jsx` | 25 | I JSON-kroppen i `handleSubmit` (den väg som normalt används). |
| `src/components/pages/OffertPage.jsx` | 74 | I `<input type="hidden" name="access_key">`, fallback om JavaScript är av. |
| `src/components/chat/AndreasChat.jsx` | 720 | Chattens offertinskick. Komponenten är vilande, se nedan, men nyckeln ska ändå bytas så den inte glöms om chatten aktiveras. |

Sök efter nyckeln för att säkerställa att inget ställe missas:

```sh
grep -rn "access_key" src/
```

4. Bygg, deploya och **skicka ett skarpt testinskick** för att bekräfta att det
   landar hos rätt mottagare.

### Övrigt om formuläret

- **Web3Forms access key är en publik nyckel.** Den är konstruerad för att ligga
  i klientkod och kan inte användas för att läsa ut inskickade meddelanden.
  Att den syns i den byggda HTML- och JS-koden är förväntat och utgör ingen
  säkerhetsrisk. Den ska alltså inte flyttas till en miljövariabel — det skulle
  inte dölja något, eftersom sajten är statisk.
- **Mottagande e-postadress styrs i Web3Forms-kontot**, inte i koden. Ska
  mottagaren ändras görs det i tjänstens kontrollpanel.
- Kontaktsidan `/kontakt` (`src/components/pages/ContactPage.jsx`) och
  kontaktsektionen på startsidan
  (`src/components/contact/ContactSection.jsx`) innehåller **inget formulär** —
  bara kontaktuppgifter med `mailto:`- och `tel:`-länkar. Allt formulärinskick
  går via `/offert`.
- Content-Security-Policyn i `Layout.astro` tillåter uttryckligen
  `connect-src` och `form-action` mot `https://api.web3forms.com`. Byts
  formulärtjänst måste CSP:n uppdateras, annars blockeras inskicket tyst.

---

## GPS-kartan på /kontakt och CSP för iframes

Kontaktsidan visar en karta över besöksadressen. Den är en **OpenStreetMap-
iframe**, inte Google Maps — det kräver varken API-nyckel, konto eller
faktureringsuppgifter, och sätter inga cookies hos besökaren.

Kartan ligger i `src/components/pages/ContactPage.jsx`:

```jsx
src="https://www.openstreetmap.org/export/embed.html?bbox=...&layer=mapnik&marker=..."
```

### Så fungerar `bbox` och `marker`

- `marker=<lat>,<lon>` sätter nålen.
- `bbox=<minlon>,<minlat>,<maxlon>,<maxlat>` styr utsnittet. OpenStreetMap
  väljer den **största heltalszoom vars visade yta rymmer hela bbox**, och
  centrerar på bbox mittpunkt.

Ska adressen ändras räcker det alltså inte att flytta `marker` — `bbox` måste
räknas om så att dess mittpunkt hamnar på den nya punkten, annars hamnar nålen
utanför eller i kanten av utsnittet. Nuvarande bbox är satt så att kartan låser
sig till samma zoomnivå på både desktop och mobil trots att kartrutan har olika
proportioner där.

> Koordinaterna ska hämtas från en geokodningstjänst, inte gissas. Notera att
> husnummer ofta saknas i OpenStreetMap — då får punkten interpoleras längs
> gatans geometri. Kontrollera alltid resultatet visuellt: en punkt som ser
> rimlig ut på kartan kan ligga på fel gata.

### ⚠️ CSP måste kompletteras för varje ny iframe

Content-Security-Policyn i `src/layouts/Layout.astro` innehåller:

```text
frame-src https://www.openstreetmap.org;
```

`frame-src` listar **exakt** vilka domäner som får bäddas in. Läggs en ny
iframe till — YouTube, Vimeo, Google Maps, en bokningswidget, ett formulär från
tredje part — måste dess domän läggas till i `frame-src`, annars **blockeras
den tyst**.

Det är värt att understryka: blockeringen syns inte nödvändigtvis som ett
felmeddelande i konsolen på alla webbläsare. Ramen blir bara tom. Är en
inbäddning oförklarligt blank är CSP:n det första stället att titta på.

Exempel om YouTube läggs till:

```text
frame-src https://www.openstreetmap.org https://www.youtube-nocookie.com;
```

---

## Design och CSS

`src/styles/global.css` (drygt 1 360 rader) innehåller hela designsystemet och
importeras globalt från `Layout.astro`.

- Tailwind v4 konfigureras i CSS via `@theme` — varumärkesfärger
  (`--color-brand: #0078D4` med flera), mörkt och ljust tema, samt funktionella
  färger. Det finns ingen `tailwind.config.js`.
- Filen är indelad i kommenterade sektioner: typsnitt, grund, gradienter,
  knappar, formulär, hjälpklasser, designsystem, statistikrad, sektionsrubriker,
  tjänsterutnät, projektkort, om oss, kontakt, sidfot, tillgänglighet,
  blueprint-bakgrunder och sektionsskarvar.
- Egendefinierade klasser (till exempel `.px-safe`, `.bp-dark`, `.skip-link`,
  `.form-container`) används genomgående i komponenterna. Ta inte bort en klass
  från `global.css` utan att söka igenom `src/` först.
- `postcss.config.js` finns för verktyg som förväntar sig en PostCSS-konfiguration;
  själva bygget använder Vite-pluginen `@tailwindcss/vite`.

### Kontaktsidans rutnät — varför `grid-auto-rows` och `height: 100%` behövs

Kontaktuppgifterna på `/kontakt` ligger i ett rutnät där rutorna ska vara lika
höga oavsett hur många rader texten tar. Det kräver två regler som lätt ser
överflödiga ut men inte är det:

```css
/* src/styles/global.css */
@media (min-width: 640px) {
  .contact-info-grid { grid-auto-rows: 1fr; }
  .contact-info-grid > * { height: 100%; }
}

.contact-info-grid .info-card { height: 100%; }
```

**Varför:** varje kort ligger inuti en wrapper — ett `<a>` för de klickbara
(telefon, e-post, besöksadress) och ett `<div>` för de övriga. Rutnätet sträcker
**wrappern** till radens höjd, men `.info-card` inuti wrappern har ingen egen
höjd och krymper därför till sitt innehåll. Stretch-kedjan bryts av mellanledet.
Resultatet blir att ett kort med kortare text — typiskt telefonrutan, där numret
ryms på en rad — blir synligt lägre än de andra i samma rad.

`grid-auto-rows: 1fr` gör raderna lika höga, och `height: 100%` på både wrappern
och `.info-card` återkopplar kedjan hela vägen ner. **Tas någon av dem bort
återkommer felet**, och det syns bara när innehållet råkar ha olika många rader.

Reglerna är scopade till `.contact-info-grid` med flit, så att
`ContactSection.jsx` på startsidan inte påverkas — där ligger korten i en
vertikal stack och behöver ingen utjämning. Lika höjd gäller dessutom först från
640 px, alltså där rutnätet faktiskt har två kolumner; i en kolumn skulle regeln
bara tvinga upp alla kort till den mest radbrytande rutans höjd.

---

## Besöksstatistik (analytics)

**Sajten har i dag ingen besöksstatistik alls.** Det finns inget analysskript,
ingen mätkod och inga cookies från tredje part. Vill kunden se besöksdata måste
det läggas till aktivt. Ingen kod för detta ligger i repot.

### Var skriptet ska in

I `src/layouts/Layout.astro`, i `<head>`. Där finns redan en kommenterad
platshållare som markerar platsen. Eftersom `Layout.astro` används av samtliga
sidor räcker det att lägga in skriptet där för att mäta hela sajten.

### ⚠️ CSP måste kompletteras, annars blockeras skriptet tyst

Content-Security-Policyn i samma fil styr vilka domäner som får köra skript och
öppna nätverksanrop. Ett analysskript från en domän som inte står i policyn
**laddas inte och skickar ingen data** — och det kan ske utan tydligt
felmeddelande. Symptomet blir bara att statistiken förblir tom.

Två direktiv behöver leverantörens domän:

- `script-src` — för att skriptfilen ska få laddas och köras.
- `connect-src` — för att mätanropen ska få skickas.

Policyn är i dag redan förberedd för Google Analytics
(`googletagmanager.com` och `*.google-analytics.com` finns i båda direktiven).
**Andra leverantörer måste läggas till manuellt.** Exempel för Plausible:

```text
script-src 'self' 'unsafe-inline' https://plausible.io;
connect-src 'self' https://api.web3forms.com https://plausible.io;
```

Kontrollera efter driftsättning i webbläsarens nätverksflik att anropen faktiskt
går iväg — inte bara att skripttaggen finns i HTML-koden.

### GDPR: valet av leverantör avgör om samtyckesbanner krävs

Det här är inte en teknisk detalj utan en juridisk skillnad, och den bör
stämmas av med kunden innan något väljs.

| Typ | Exempel | Cookiebanner | Kommentar |
| :-- | :-- | :-- | :-- |
| **Cookiebaserad** | Google Analytics 4, Meta Pixel | **Ja, krävs** | Sätter cookies och behandlar personuppgifter. Kräver aktivt samtycke **innan** skriptet laddas, samt att besökaren kan säga nej lika enkelt som ja. Överföring till USA måste hanteras i integritetspolicyn. |
| **Cookiefri** | Plausible, Cloudflare Web Analytics, Fathom | **Nej** | Sätter inga cookies och lagrar ingen personidentifierande data. Kräver ingen banner. Data lagras inom EU hos Plausible. |

**Rekommendation:** en cookiefri lösning. Det ger besöksstatistik utan
samtyckesbanner, utan att integritetspolicyn behöver skrivas om i grunden, och
utan att en banner försämrar upplevelsen på en sajt som i övrigt inte spårar
någon. Cloudflare Web Analytics är kostnadsfri; Plausible är en betaltjänst med
EU-lagring.

Väljs ändå en cookiebaserad lösning måste tre saker på plats samtidigt:
samtyckesbanner som blockerar skriptet före samtycke, uppdaterad
`/integritetspolicy`, och kompletterad CSP.

---

## Deploy

Det finns **en** workflow-fil: `.github/workflows/deploy.yml`.

Den körs vid push till `main` eller `master`, samt manuellt via
`workflow_dispatch`. Flödet består av två jobb:

1. **build** — checkar ut koden (`actions/checkout@v4`), sätter upp Node 22 med
   npm-cache (`actions/setup-node@v4`), kör `npm ci` och `npm run build`, och
   laddar upp `dist/` som Pages-artefakt (`actions/upload-pages-artifact@v3`).
2. **deploy** — publicerar artefakten till GitHub Pages
   (`actions/deploy-pages@v4`) i miljön `github-pages`.

Behörigheter: `contents: read`, `pages: write`, `id-token: write`.
Concurrency-gruppen `pages` har `cancel-in-progress: false`, så pågående
deployer avbryts inte.

Ingen manuell publicering behövs. Förutsättningen är att repots
Pages-inställning står på **GitHub Actions** som källa.

---

## SEO, strukturerad data och säkerhetspolicy

`src/layouts/Layout.astro` sätter gemensam metadata för alla sidor:

- `<title>`, `<meta name="description">` och `robots` per sida via props.
  **`robots` defaultar i dag till `noindex, nofollow`** — se
  [MÅSTE GÖRAS VID DRIFTSÄTTNING](#måste-göras-vid-driftsättning).
- Canonical-URL beräknad ur `Astro.url.pathname` och `site`.
- Open Graph och Twitter Card, med `og-hero.jpg` (1200 × 630) som standardbild.
- JSON-LD av typen `ProfessionalService` med adress, telefon, e-post,
  organisationsnummer, öppettider och `areaServed`.

Sidspecifik strukturerad data:

| Sida | Schema |
| :-- | :-- |
| `index.astro` | `FAQPage`, genererad ur `src/data/faqs.js` |
| `tjanster.astro` | `ItemList` med `Service`-poster |
| `projekt/[slug].astro` | `CreativeWork` per projekt samt `BreadcrumbList` |

### Content-Security-Policy

GitHub Pages tillåter inte egna HTTP-headers, därför ligger CSP:n som en
`<meta http-equiv="Content-Security-Policy">` i `Layout.astro`. Policyn tillåter:

| Direktiv | Tillåter |
| :-- | :-- |
| `default-src` | `'self'` |
| `script-src` | `'self'`, `'unsafe-inline'`, googletagmanager, google-analytics |
| `style-src` | `'self'`, `'unsafe-inline'` |
| `img-src` | `'self'`, `data:`, google-analytics |
| `font-src`, `media-src` | `'self'` |
| `frame-src` | `https://www.openstreetmap.org` — **kartan**, se [GPS-kartan](#gps-kartan-på-kontakt-och-csp-för-iframes) |
| `connect-src` | `'self'`, `https://api.web3forms.com`, googletagmanager, google-analytics |
| `form-action` | `'self'`, `https://api.web3forms.com` |
| `object-src` | `'none'` |

**Tre saker som tyst går sönder om policyn inte hålls uppdaterad:** nya iframes
(`frame-src`), nytt analysverktyg (`script-src` + `connect-src`) och byte av
formulärtjänst (`connect-src` + `form-action`). I samtliga fall uteblir
funktionen utan att något syns i gränssnittet.

`style-src` innehåller `'unsafe-inline'`. **Det ska inte "städas bort".** Astro,
Tailwind och framer-motion genererar inline-`<style>` och Astros
`define:vars`-mekanism kräver det. Tas direktivet bort slutar delar av
layouten att renderas korrekt. Vill man skärpa policyn krävs nonce- eller
hash-baserad CSP, vilket inte går att leverera från statiska filer utan headers.

---

## Tillgänglighet

- Skip-länk (`Hoppa till innehåll`) först i `<body>`, med `#main` på varje sidas
  `<main>`.
- Tydlig fokusmarkering vid tangentbordsnavigering (`:focus-visible` i
  `global.css`).
- `prefers-reduced-motion` respekteras både i CSS (`global.css`) och i JS —
  komponenter använder `MotionConfig reducedMotion="user"` eller läser
  mediafrågan direkt (`HeroSection.jsx`, `Navbar.jsx`, `ServicesPage.jsx`,
  `StopMotionBanner.astro`, `projekt/[slug].astro`, `AndreasChat.jsx`).
- Dekorativa SVG-ikoner är märkta `aria-hidden="true"` och `focusable="false"`.
- Videobanners har poster-bilder, spelas utan ljud och har en paus/spela-knapp
  (WCAG 2.2.2).

Behåll dessa mönster vid vidareutveckling.

---

## Vilande komponenter och hur de aktiveras

Två färdiga komponenter ligger i repot men renderas inte. Båda är medvetet
avstängda och koden ska inte raderas.

### 1. Chattassistenten "Fråga Heidi"

Fil: `src/components/chat/AndreasChat.jsx`

Aktivera så här:

1. I `src/layouts/Layout.astro`: **lägg till importen**, som saknas i dag. Den
   ska in i frontmatter-blocket överst i filen:
   ```astro
   import AndreasChat from '../components/chat/AndreasChat.jsx';
   ```
2. I samma fil, avkommentera renderingen sist i `<body>`:
   ```astro
   {/* <AndreasChat client:idle /> */}
   ```
3. I `src/components/layout/Navbar.jsx`: avkommentera **båda** knapparna märkta
   "Fråga Heidi" — en i desktopmenyn och en i mobilmenyn. Knapparna öppnar
   chatten genom att skicka ett `open-andreas-chat`-event på `window`.

Kontrollera samtidigt att access key i `AndreasChat.jsx` är kundens egen,
eftersom chatten skickar offertförfrågningar via Web3Forms.

### 2. Kundomdömen

Fil: `src/components/home/TestimonialsSection.jsx`

Sektionen är avstängd i väntan på äkta kundcitat. **Komponenten innehåller
platshållardata som inte får publiceras.** Byt ut innehållet i `testimonials`-
arrayen mot verkliga omdömen först.

Aktivera så här, i `src/pages/index.astro`:

1. Avkommentera importen:
   ```js
   // import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
   ```
2. Avkommentera renderingen:
   ```jsx
   {/* <TestimonialsSection client:idle /> */}
   ```

Motsvarande CSS ligger kvar i `global.css` under rubriken `OMDÖMESSEKTION`.

---

## Kända underhållspunkter

| Punkt | Beskrivning | Förslag |
| :-- | :-- | :-- |
| **Noindex och saknad sitemap** | Sajten är noindexad i sin helhet och sitemapen är borttagen, eftersom den i dag är ett arbetsprov på en tillfällig subdomän. | **Måste åtgärdas vid driftsättning**, se [avsnittet högst upp](#måste-göras-vid-driftsättning). Detta är den enskilt viktigaste punkten i hela dokumentet. |
| Duplicerad projektdata | `src/components/pages/ProjectsPage.jsx` har egna kopior av projektlistorna och kopplas till `src/data/projects.js` enbart via `slugByTitle[title]`. Titlar måste matcha exakt mellan filerna, även vid namnbyten. | Låt `ProjectsPage.jsx` importera `featuredProjects`/`moreProjects` ur datafilen och ta bort dubbletterna. |
| Reduced-motion visar mörk ruta på `/cv` | Fallbacken vid `prefers-reduced-motion` visar poster-bilden i stället för filmen. Eftersom `andreas-resa.mp4` tonar in från svart är dess poster en mörk ruta, och bården blir därmed tom för de användarna. | Lägg en separat stillbild (en ljus bildruta ur filmen) på `img.sm-poster`-fallbacken och låt `video[poster]` behålla den mörka rutan. De är redan skilda element i `StopMotionBanner.astro`. |
| Två vilande komponenter | `AndreasChat.jsx` (chatten "Fråga Heidi") och `TestimonialsSection.jsx` (kundomdömen med platshållardata) renderas inte. Kod och CSS ligger kvar. | Se [Vilande komponenter](#vilande-komponenter-och-hur-de-aktiveras). Omdömena kräver äkta citat innan publicering. |
| Stora videofiler i `public/` | Fyra MP4-filer om totalt cirka 12,2 MB: `andreas-resa.mp4` 6,6 MB, `byggplats-stopmotion.mp4` 2,0 MB, `blueprint-reveal.mp4` 1,8 MB, `projektledning-stopmotion.mp4` 1,8 MB. De ligger i Git och laddas av besökare. | Komprimera om, överväg WebM/AV1 som komplement, och kontrollera att filerna verkligen behövs i sin nuvarande längd och upplösning. Filerna laddas redan lat (`preload="none"` + IntersectionObserver), så de påverkar inte första vyn. |
| Tunga galleribilder | Flera bilder i `public/projekt/` ligger på 300–550 kB. | Komprimera om enligt konventionen ovan, eller komplettera med WebP. |
| Ingen besöksstatistik | Sajten mäter ingenting i dag. | Se [Besöksstatistik](#besöksstatistik-analytics). Välj leverantör med GDPR-frågan i åtanke innan något installeras. |
