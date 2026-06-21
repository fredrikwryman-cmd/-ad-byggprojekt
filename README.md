# AD Byggprojekt Stockholm AB — webbplats

Företagswebbplats för AD Byggprojekt Stockholm AB. Byggd med Astro och React,
deployad till GitHub Pages via GitHub Actions.

**Live:** https://fredrikwryman-cmd.github.io/-ad-byggprojekt/

## Teknik

- **Astro** (sidor och rendering)
- **React** (interaktiva komponenter)
- **Tailwind CSS v4** (styling, via Vite-plugin)
- **Framer Motion** (animationer)
- **GitHub Actions → GitHub Pages** (deploy)

## Komma igång lokalt

```sh
npm install
npm run dev
```

Dev-servern startar på `http://localhost:4321`.

## Kommandon

| Kommando          | Vad det gör                                  |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installerar beroenden                         |
| `npm run dev`     | Startar lokal dev-server (localhost:4321)     |
| `npm run build`   | Bygger produktionssajten till `./dist/`       |
| `npm run preview` | Förhandsgranskar bygget lokalt före deploy    |

## Projektstruktur

```text
public/                 Statiska filer (bilder, CV-pdf, favicon)
src/
├── components/         React-komponenter, grupperade per område
│   ├── about/          Om oss-sektion
│   ├── contact/        Kontaktsektion (startsidan)
│   ├── home/           Hero, statistik, marquee, omdömen
│   ├── layout/         Navbar, Footer, Logo
│   ├── pages/          Helsidor (CV, Projekt, Tjänster, Kontakt)
│   ├── projects/       Projektsektion (startsidan)
│   └── services/       Tjänstesektion (startsidan)
├── layouts/            Astro-huvudlayout
├── pages/              Astro-rutter (en fil = en sida)
└── styles/             Global CSS och egna klasser
```

## Deploy

Push till `main` triggar `.github/workflows/deploy.yml`, som bygger sajten
och publicerar `dist/` till GitHub Pages. Ingen manuell hantering behövs.

## Konfiguration att känna till

- **Bas-sökväg:** sätts på ETT ställe i `astro.config.mjs` (`base`). Alla interna
  länkar utgår från `import.meta.env.BASE_URL`, så vid byte av repo-namn eller
  egen domän räcker det att ändra `base` (och ev. `site`) i `astro.config.mjs`.
- **Kontaktformulär:** skickas via [Web3Forms](https://web3forms.com). Access-nyckeln
  ligger i `ContactSection.jsx` och `ContactPage.jsx`. Förfrågningar mejlas till
  den adress nyckeln är registrerad på.
