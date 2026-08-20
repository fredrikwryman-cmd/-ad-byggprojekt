# AD Byggprojekt Stockholm AB — webbplats

Företagswebbplats för AD Byggprojekt Stockholm AB (byggledning, platsledning och
projektledning i Stockholm med omnejd).

Sajten är **helt statisk**. Det finns ingen databas, ingen backend och ingen
serverkod i det här repot. Bygget producerar rena HTML-, CSS- och JS-filer som
publiceras på GitHub Pages. Formulärutskick sköts av en extern tjänst
(Web3Forms), se avsnittet [Formulär](#formulär).

Publicerad adress i dag: `https://fredrikwryman-cmd.github.io/-ad-byggprojekt/`

---

## Innehåll

- [Teknisk stack](#teknisk-stack)
- [Komma igång](#komma-igång)
- [Kommandon](#kommandon)
- [Projektstruktur](#projektstruktur)
- [Bassökväg (base) — läs innan domänbyte](#bassökväg-base--läs-innan-domänbyte)
- [Innehållsdata: lägga till eller ändra ett projekt](#innehållsdata-lägga-till-eller-ändra-ett-projekt)
- [FAQ-data](#faq-data)
- [Bilder och media i public/](#bilder-och-media-i-public)
- [Formulär](#formulär)
- [Design och CSS](#design-och-css)
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
| Hosting | GitHub Pages via GitHub Actions | Se [Deploy](#deploy). |

Bygget kräver **Node 22 eller senare** (`package.json` anger `"node": ">=22.12.0"`).

---

## Komma igång

```sh
npm install
npm run dev
```

Dev-servern startar normalt på `http://localhost:4321`. Observera att sajten
serveras under bassökvägen, alltså `http://localhost:4321/-ad-byggprojekt/`.

## Kommandon

| Kommando | Vad det gör |
| :-- | :-- |
| `npm install` | Installerar beroenden. |
| `npm run dev` | Startar utvecklingsserver med hot reload. |
| `npm run build` | Bygger produktionssajten till `dist/`. Ger i dag 24 HTML-sidor. |
| `npm run preview` | Serverar den byggda sajten lokalt för kontroll före deploy. |
| `npm run astro` | Genomsläpp till Astros CLI (`npm run astro -- check` med mera). |

`dist/` och `.astro/` är genererade kataloger och ignoreras av Git.

---

## Projektstruktur

```text
.github/workflows/deploy.yml   Bygg- och deployflöde till GitHub Pages
astro.config.mjs               Bassökväg, site-URL, integrationer
public/                        Statiska filer, kopieras rakt av till dist/
  projekt/                     Projektbilder (hero + galleri)
  sitemap.xml                  HANDSKRIVEN, se Kända underhållspunkter
  robots.txt
scripts/generate-cv-pdf.py     Genererar CV-PDF:en ur src/data/cv-data.json (Python, reportlab)
src/
  data/
    projects.js                All projektdata
    faqs.js                    All FAQ-data
    cv-data.json               CV-innehåll (används av både webbsidan och PDF-scriptet)
  layouts/Layout.astro         Gemensam sidmall: head, meta, Open Graph, JSON-LD, CSP
  pages/                       Astro-routing, en fil = en sida
    projekt/[slug].astro       Genererar alla projektsidor dynamiskt
  components/                  Grupperade per område
    home/ about/ projects/ services/ contact/ layout/ pages/ chat/
    icons.jsx                  Egna SVG-ikoner
  styles/global.css            Designsystem, CSS-variabler, egendefinierade klasser
```

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
| `integritetspolicy.astro` | `/integritetspolicy` |
| `404.astro` | `/404` (satt till `noindex, follow`) |

`src/pages/projekt/[slug].astro` läser `allProjects` ur `src/data/projects.js` i
`getStaticPaths()` och bygger en statisk sida per projekt. Lägger man till ett
projekt i datafilen skapas alltså projektsidan automatiskt vid nästa bygge.

### Komponenter

React-komponenter monteras som öar med `client:idle`, det vill säga JavaScript
laddas först när webbläsaren är ledig. Rena presentationsdelar (till exempel
`StopMotionBanner.astro` och `Footer`) körs utan klient-JS där det går.

---

## Bassökväg (base) — läs innan domänbyte

Sajten ligger i dag i en **underkatalog** på GitHub Pages, inte i roten. Därför
sätter `astro.config.mjs` en bassökväg:

```js
// astro.config.mjs, rad 6
base: '/-ad-byggprojekt/',
// astro.config.mjs, rad 7
site: 'https://fredrikwryman-cmd.github.io',
```

Alla interna länkar och tillgångar i koden byggs mot `import.meta.env.BASE_URL`:

```jsx
href={import.meta.env.BASE_URL + 'projekt'}
src={import.meta.env.BASE_URL + 'projekt/paraden.jpg'}
```

**`BASE_URL` innehåller ett avslutande snedstreck.** Konkatenera därför aldrig
med ett inledande snedstreck — `BASE_URL + '/projekt'` ger en dubbel snedstreck
och en trasig länk. Skriv heller aldrig hårdkodade absoluta sökvägar som
`href="/projekt"`; de fungerar lokalt i roten men bryts på GitHub Pages.

### Vid flytt till egen domän

1. Ändra rad 6 i `astro.config.mjs` från `base: '/-ad-byggprojekt/'` till
   `base: '/'`.
2. Ändra rad 7, `site`, till den nya domänen (till exempel
   `https://adbyggprojekt.se`). `site` styr canonical-URL:er, Open Graph-URL:er
   och absoluta URL:er i den strukturerade datan.
3. Uppdatera `public/sitemap.xml` manuellt — filen innehåller hårdkodade
   absoluta URL:er (se [Kända underhållspunkter](#kända-underhållspunkter)).
4. Uppdatera `Sitemap:`-raden i `public/robots.txt`.
5. Kontrollera det digitala visitkortets tillgångar. QR-koden
   `public/andreas-qr.png` kodar `https://adbyggprojekt.se/andreas`, och
   `URL`-fältet i vCard-filen `public/andreas/andreas.vcf` pekar på
   `https://adbyggprojekt.se`. **Domänen är antagen** och måste stämmas av mot
   den slutgiltiga domänen vid driftsättning. Blir domänen en annan måste
   QR-koden genereras om och vCard-filens `URL`-fält uppdateras — annars leder
   den QR-kod som tryckts på fordon och kläder fel.
6. Bygg om och deploya.

Ingen annan kod behöver ändras, eftersom allt går via `BASE_URL`.

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
| `slug` | sträng | URL-segment, blir `/projekt/<slug>`. Måste vara unikt, gemener, bindestreck, inga å/ä/ö. |
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
4. Lägg till projektsidans URL i `public/sitemap.xml`.
5. Kör `npm run build` och kontrollera att sidan genereras och att bilderna syns
   i `npm run preview`.

> **Viktigt — dubbelt underhåll på projektsidan.**
> `src/components/projects/ProjectsSection.jsx` (startsidan) läser korrekt ur
> `src/data/projects.js` och filtrerar på `featured`. Listsidan
> `src/components/pages/ProjectsPage.jsx` har däremot **egna, duplicerade
> arrayer** (`projects` och `moreProjects` i samma fil) och importerar bara
> `slugByTitle` från datafilen för att bygga länkarna:
> ```jsx
> // src/components/pages/ProjectsPage.jsx, rad 150 och 220
> href={import.meta.env.BASE_URL + 'projekt/' + slugByTitle[title]}
> ```
> Ett projekt som bara läggs till i `src/data/projects.js` får en fungerande
> projektsida men syns **inte** i listan på `/projekt`. Och eftersom länken slås
> upp på `title` måste titeln vara **exakt identisk** i båda filerna, annars blir
> `slugByTitle[title]` odefinierad och länken trasig. En rimlig förbättring är
> att låta `ProjectsPage.jsx` importera ur `src/data/projects.js` och radera
> dubbletterna.

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
| Hero-bild | JPEG | 1376 × 768 px | ca 130–240 kB | `<stam>.jpg`, till exempel `kyrkskolan.jpg` |
| Galleribild | JPEG | ca 1400 px på längsta sidan (liggande eller stående) | så låg som möjligt | `<hero-stam>-g1.jpg`, `-g2.jpg`, `-g3.jpg` … |

Galleribildernas filnamn ska utgå från hero-bildens stam. Har hero-bilden namnet
`kyrkskolan.jpg` heter galleribilderna `kyrkskolan-g1.jpg`, `kyrkskolan-g2.jpg`
och så vidare. Sökvägarna listas sedan explicit i projektets `gallery`-array —
namngivningen är en ordningskonvention, inte något som läses in automatiskt.

Håll galleribilderna nedåt i storlek. Flera befintliga galleribilder ligger på
300–550 kB styck, vilket är i tyngsta laget för webb.

### Övriga filer i `public/`

Loggor, favikoner, Open Graph-bild (`og-hero.jpg`, 1200 × 630), porträtt,
blueprint-bakgrunder, CV-PDF, `robots.txt`, `sitemap.xml` samt fyra
MP4-videofiler med tillhörande poster-bilder. Om videostorleken, se
[Kända underhållspunkter](#kända-underhållspunkter).

---

## Formulär

Offertformuläret på `/offert` skickas till **Web3Forms**
(`https://api.web3forms.com/submit`). Det finns ingen serverkod i repot som tar
emot inskick.

Access key finns på följande ställen:

| Fil | Rad | Sammanhang |
| :-- | :-- | :-- |
| `src/components/pages/OffertPage.jsx` | 25 | I JSON-kroppen i `handleSubmit` (den väg som normalt används). |
| `src/components/pages/OffertPage.jsx` | 74 | I `<input type="hidden" name="access_key">`, fallback om JavaScript är av. |
| `src/components/chat/AndreasChat.jsx` | 720 | Chattens offertinskick. Komponenten är vilande, se nedan. |

Byts nyckeln måste **alla tre** ställena uppdateras.

Några saker som är värda att veta:

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

## Design och CSS

`src/styles/global.css` (drygt 1 300 rader) innehåller hela designsystemet och
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
`<meta http-equiv="Content-Security-Policy">` i `Layout.astro`.
Policyn tillåter `'self'` för script, style, bild, typsnitt och media, POST mot
`https://api.web3forms.com` samt googletagmanager/google-analytics så att GA4
kan aktiveras senare utan att policyn behöver skrivas om.

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
- Videobanners har poster-bilder och spelas utan ljud.

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

Kontrollera samtidigt att access key i `AndreasChat.jsx` är den aktuella,
eftersom chatten skickar offertförfrågningar via Web3Forms.

### 2. Kundomdömen

Fil: `src/components/home/TestimonialsSection.jsx`

Sektionen är avstängd i väntan på äkta kundcitat. **Komponenten innehåller
platshållardata som inte får publiceras.** Byt ut innehållet i `testimonials`-
arrayen mot verkliga omdömen först.

Aktivera så här, i `src/pages/index.astro`:

1. Avkommentera importen på rad 14:
   ```js
   // import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
   ```
2. Avkommentera renderingen på rad 54:
   ```jsx
   {/* <TestimonialsSection client:idle /> */}
   ```

Motsvarande CSS ligger kvar i `global.css` under rubriken `OMDÖMESSEKTION`.

---

## Kända underhållspunkter

| Punkt | Beskrivning | Förslag |
| :-- | :-- | :-- |
| Handskriven `public/sitemap.xml` | Filen innehåller 23 hårdkodade absoluta URL:er mot `https://fredrikwryman-cmd.github.io/-ad-byggprojekt/`. Den genereras **inte** av bygget. Den måste uppdateras manuellt både när projekt läggs till eller tas bort och vid domänbyte, annars pekar sitemapen fel. Samma gäller `Sitemap:`-raden i `public/robots.txt`. | Installera `@astrojs/sitemap`, lägg till integrationen i `astro.config.mjs` och radera den handskrivna filen. Då följer sitemapen automatiskt både `site`, `base` och antalet sidor. |
| Duplicerad projektdata | `src/components/pages/ProjectsPage.jsx` har egna kopior av projektlistorna och kopplas till `src/data/projects.js` enbart via `slugByTitle[title]`. Titlar måste matcha exakt mellan filerna. | Låt `ProjectsPage.jsx` importera `featuredProjects`/`moreProjects` ur datafilen och ta bort dubbletterna. |
| Två vilande komponenter | `AndreasChat.jsx` (chatten "Fråga Heidi") och `TestimonialsSection.jsx` (kundomdömen med platshållardata) renderas inte. Kod och CSS ligger kvar. | Se [Vilande komponenter](#vilande-komponenter-och-hur-de-aktiveras). Omdömena kräver äkta citat innan publicering. |
| Stora videofiler i `public/` | Fyra MP4-filer om totalt cirka 12,7 MB: `andreas-resa.mp4` 6,9 MB, `byggplats-stopmotion.mp4` 2,1 MB, `blueprint-reveal.mp4` 1,9 MB, `projektledning-stopmotion.mp4` 1,8 MB. De ligger i Git och laddas av besökare. | Komprimera om, överväg WebM/AV1 som komplement, och kontrollera att filerna verkligen behövs i sin nuvarande längd och upplösning. |
| Tunga galleribilder | Flera bilder i `public/projekt/` ligger på 300–550 kB. | Komprimera om enligt konventionen ovan, eller komplettera med WebP. |
| Analys ej aktiverad | `Layout.astro` har en kommenterad platshållare för webbanalys i `<head>`. CSP:n är redan förberedd för Google Analytics. | Aktiveras när egen domän är på plats. Notera GDPR-aspekten och `integritetspolicy`-sidans innehåll. |
