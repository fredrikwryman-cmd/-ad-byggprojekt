import { useEffect, useRef, useState } from 'react';

/* ============ 20+ ÄMNEN + fallback ============ */
const INTENTS = [
  {
    "key": "offert",
    "kw": [
      "offert",
      "förfrågan",
      "offra",
      "begära pris",
      "vill ha pris",
      "skicka förfrågan"
    ],
    "a": "Absolut — vi tar gärna fram en kostnadsfri offert. Berätta kort om ditt projekt nedan så återkommer Andreas så snart han kan.",
    "form": true
  },
  {
    "key": "pris",
    "kw": [
      "kostar",
      "kostnad",
      "pris",
      "dyr",
      "dyrt",
      "prislista",
      "timpris",
      "timme",
      "vad hamnar",
      "uppskattning",
      "budget",
      "billig"
    ],
    "a": "Vi jobbar i första hand med fasta priser och tydliga offerter, men kan även köra på à-prislista med mängdreglering eller löpande räkning när det passar bättre. Vill du ha en kostnadsfri uppskattning?",
    "chips": [
      "Begär offert"
    ]
  },
  {
    "key": "tjanster",
    "kw": [
      "vad gör ni",
      "tjänster",
      "erbjuder",
      "hjälper ni",
      "kan ni hjälpa",
      "vad kan ni",
      "sysslar"
    ],
    "a": "Vi är specialister på ledning av byggprojekt: byggledning, platsledning, projektledning och rådgivning — och tar vid behov även hand om själva bygget (nyproduktion och renovering).",
    "chips": [
      "Byggledning",
      "Platsledning",
      "Skolor",
      "CM-uppdrag"
    ]
  },
  {
    "key": "byggledning",
    "kw": [
      "byggledning",
      "byggledare",
      "beställarens",
      "byggherre"
    ],
    "a": "Byggledning gör vi oftast åt en beställare eller byggherre (t.ex. kommuner, fastighetsägare, SISAB eller HSB). Vi är er ansvariga person på plats som bevakar beställningen, leder byggmöten och följer upp tid, kvalitet, arbetsmiljö och ekonomi."
  },
  {
    "key": "platsledning",
    "kw": [
      "platsledning",
      "platschef"
    ],
    "a": "Platsledning gör vi åt entreprenörer, oftast vid total- eller generalentreprenad. Som platschef tar Andreas ansvar för den dagliga styrningen på arbetsplatsen — hela vägen fram till färdigt och besiktigat."
  },
  {
    "key": "projektledning",
    "kw": [
      "projektledning",
      "projektledare",
      "projektstyrning",
      "projektstöd",
      "styra projekt"
    ],
    "a": "Med strukturerad projektledning håller vi ihop hela projektet — upphandling, tidplan, ekonomi och arbetsmiljö — med tät uppföljning så du alltid har koll på status, kostnader och nästa steg."
  },
  {
    "key": "cm",
    "kw": [
      "cm",
      "construction management",
      "byggprojektgruppen",
      "bopg",
      "systerbolag"
    ],
    "a": "Construction Management (CM) hanteras av vårt systerbolag Bygg & Projektgruppen i Stockholm AB — en samlad byggpartner för hela kedjan. Du hittar dem via CM-uppdrag i menyn."
  },
  {
    "key": "sakerhet",
    "kw": [
      "säkerhet",
      "säkerhetsklass",
      "säkerhetsklassad",
      "skyddsobjekt",
      "sekretess",
      "säkerhetsprövning",
      "bakgrundskontroll",
      "registerkontroll",
      "känsligt objekt",
      "behörighet",
      "klassad",
      "säkerhetskrav"
    ],
    "a": "Andreas har en bakgrund inom Försvarsmakten — bl.a. som ammunitions- och drivmedelsansvarig i utlandstjänst — och är van vid miljöer med höga säkerhets- och sekretesskrav. Han har dessutom lett en rad skolprojekt i pågående verksamhet, där bakgrundskontroll, ordning och säkerhet kring barn och personal är en självklarhet. Har ni ett uppdrag med särskilda säkerhetskrav? Beskriv det så berättar vi hur vi möter dem.",
    "chips": [
      "Erfarenhet av skolor",
      "Begär offert"
    ]
  },
  {
    "key": "skola",
    "kw": [
      "skola",
      "skolor",
      "skolbygge",
      "skolrenovering",
      "sisab",
      "klassrum",
      "förskola",
      "elever",
      "utbildningslokal",
      "kyrkskolan",
      "klastorpsskolan",
      "wasaskolan"
    ],
    "a": "Skolor är en av Andreas starkaste erfarenheter. Han har varit platschef för bl.a. Kyrkskolan i Täby (Täby kommun), Klastorpsskolan på Kungsholmen (SISAB) och Wasaskolan i Södertälje — ofta om- och totalrenoveringar av skolor från tidigt 1900-tal, som generalentreprenad inom LOU och med verksamheten i full drift. Vi vet vad det innebär att bygga med elever och personal på plats.",
    "chips": [
      "Säkerhet & sekretess",
      "Arbete i pågående verksamhet"
    ]
  },
  {
    "key": "forsvarsmakten",
    "kw": [
      "försvarsmakten",
      "militär",
      "försvaret",
      "värnplikt",
      "utlandstjänst",
      "ammunition",
      "soldat",
      "gruppbefäl"
    ],
    "a": "Innan byggkarriären tog fart hade Andreas flera år inom Försvarsmakten — gruppbefäl under värnplikten samt utlandstjänst som maskinförare och som ammunitions- och drivmedelsansvarig. En bakgrund som gett ordning, ansvarskänsla och vana vid höga säkerhetskrav."
  },
  {
    "key": "trafikverket",
    "kw": [
      "trafikverket",
      "infrastruktur",
      "tunnel",
      "anläggning",
      "förbifart",
      "förbifarten",
      "väg",
      "bro",
      "hamn",
      "sätra",
      "bergmassor"
    ],
    "a": "Andreas är just nu platschef i flera uppdrag åt Trafikverket via Metrolit — bl.a. kopplat till Förbifarten Stockholm och arbeten i Sätra hamn (återställning, avluftstorn och rivning av betongbrygga). Erfarenhet av stora anläggnings- och infrastrukturprojekt med tydliga krav på säkerhet och dokumentation."
  },
  {
    "key": "offentlig",
    "kw": [
      "lou",
      "offentlig",
      "upphandling",
      "kommun",
      "ramavtal",
      "anbud",
      "offentlig beställare"
    ],
    "a": "Ja — Andreas har lett flera generalentreprenader inom LOU (offentlig upphandling), bl.a. skolrenoveringar åt Täby kommun och SISAB. Han är väl bekant med kraven som följer offentliga beställare: dokumentation, uppföljning och ordning från anbud till slutbesiktning."
  },
  {
    "key": "pagaende",
    "kw": [
      "pågående verksamhet",
      "i drift",
      "verksamhet igång",
      "störning",
      "etappvis",
      "etapp",
      "känslig miljö",
      "verksamhet på plats"
    ],
    "a": "En av Andreas styrkor är att bygga i lokaler som är i full drift — skolor med elever, kontor och fastigheter där verksamheten måste rulla på. Det kräver etappplanering, tydlig kommunikation och ordning, så att buller, damm och säkerhet hanteras rätt."
  },
  {
    "key": "nyproduktion",
    "kw": [
      "nyproduktion",
      "nybygg",
      "nybyggnation",
      "bostäder",
      "lägenheter",
      "bostadsrätt",
      "radhus",
      "flerbostadshus",
      "brf"
    ],
    "a": "Andreas har gedigen erfarenhet av nyproduktion av bostäder — bl.a. som platschef/arbetsledare för BRF Estrad i Vallentuna (27 lägenheter + radhus) och Kv Paraden i Barkarbystaden (215 lägenheter). Från stomme till inflyttningsklart."
  },
  {
    "key": "stomme",
    "kw": [
      "stomme",
      "stommontör",
      "stomledare",
      "betong",
      "prefab",
      "stomarbete",
      "stomresning"
    ],
    "a": "Andreas har en gedigen grund i själva byggandet — flera år som stommontör och stomledare i nyproduktion (bl.a. Veidekke). Det gör att han förstår bygget på djupet, inte bara på papperet, när han leder ett projekt."
  },
  {
    "key": "entreprenadform",
    "kw": [
      "entreprenadform",
      "generalentreprenad",
      "totalentreprenad",
      "samverkan",
      "utförandeentreprenad",
      "entreprenadformer",
      "general",
      "total"
    ],
    "a": "Andreas har jobbat i alla vanliga entreprenadformer — general-, total- och samverkans-/utförandeentreprenad — och kan både rådgöra om vilken form som passar ditt projekt och driva den i praktiken. Osäker på vad som passar er? Fråga på."
  },
  {
    "key": "arbetsmiljo",
    "kw": [
      "arbetsmiljö",
      "bas-p",
      "bas-u",
      "basp",
      "basu",
      "skyddsombud",
      "skyddsrond",
      "ohälsa",
      "olycka",
      "säkerhet på bygget",
      "ama"
    ],
    "a": "Arbetsmiljö är centralt i allt Andreas gör. Han är utbildad och uppdaterad som Bas-P och Bas-U (byggarbetsmiljösamordnare, 2024), har gått Arbetsmiljö för chefer och varit skyddsombud. På flera uppdrag är han just Bas-U med ansvar för säkerheten på arbetsplatsen."
  },
  {
    "key": "juridik",
    "kw": [
      "juridik",
      "entreprenadjuridik",
      "äta",
      "ändrings",
      "tilläggsarbete",
      "kontrakt",
      "avtal",
      "ab04",
      "abt06",
      "tvist"
    ],
    "a": "Andreas har flera kurser i entreprenadjuridik (grund och fördjupning) samt ÄTA-hantering, vilket gör honom trygg i kontrakt, ändrings- och tilläggsarbeten och uppföljning mot beställare. Praktisk juridik som skyddar både tid och ekonomi i projektet."
  },
  {
    "key": "stora_projekt",
    "kw": [
      "stora projekt",
      "hur stora",
      "största",
      "stort projekt",
      "omfattning",
      "miljoner",
      "mkr",
      "kapacitet"
    ],
    "a": "Andreas har lett projekt i hela storleksspannet — från mindre uppdrag på några miljoner upp till nyproduktion runt 270 miljoner kronor (Kv Paraden, 215 lägenheter). Han kliver in i både små och stora sammanhang och anpassar styrningen efter projektet."
  },
  {
    "key": "installationer",
    "kw": [
      "ventilation",
      "installation",
      "vvs",
      "rör",
      "värme",
      "fläkt",
      "ventilationsarbete",
      "installationssamordning"
    ],
    "a": "Andreas samordnar alla installationer i projekten — ventilation, el, VS och styr — t.ex. omfattande ventilationsarbeten i Stenhöga (Solna) och installationsdragningar i Gravyren (Södertälje). Installationssamordning är ofta avgörande för både tidplan och slutresultat."
  },
  {
    "key": "rivning_mark",
    "kw": [
      "rivning",
      "riva",
      "markarbete",
      "schakt",
      "grundläggning",
      "återställning",
      "sanering",
      "markyta"
    ],
    "a": "Ja — i uppdragen åt Trafikverket ingår bl.a. rivning av betongbrygga och återställning av stora markytor i Sätra hamn. Andreas hanterar rivning, mark och återställning som en naturlig del av entreprenaderna."
  },
  {
    "key": "ekonomi",
    "kw": [
      "ekonomi",
      "kalkyl",
      "löpande räkning",
      "fast pris",
      "kostnadskontroll",
      "à-pris",
      "a-pris",
      "mängdreglering"
    ],
    "a": "Andreas styr projektens ekonomi oavsett upplägg — fast pris, à-prislista med mängdreglering eller löpande räkning. Tät uppföljning av kostnader och ÄTA gör att du har koll på ekonomin hela vägen."
  },
  {
    "key": "kvalitet",
    "kw": [
      "kvalitet",
      "egenkontroll",
      "dokumentation",
      "kma",
      "slutdokumentation",
      "spårbar"
    ],
    "a": "Kvalitet och dokumentation följer med i allt: egenkontroller, ordnad KMA-dokumentation och uppföljning fram till slutbesiktning. Det ska vara rätt och spårbart — inget lämnas åt slumpen."
  },
  {
    "key": "utbildning",
    "kw": [
      "utbildning",
      "certifikat",
      "certifierad",
      "kurser",
      "kompetens",
      "behörigheter",
      "diplom",
      "meriter"
    ],
    "a": "Andreas håller kompetensen färsk — bl.a. Bas-P/Bas-U (uppdaterad 2024), byggledarutbildning, AMA Hus, entreprenadjuridik (grund + fördjupning) och Arbetsmiljö för chefer. Hela listan finns under CV på sajten."
  },
  {
    "key": "omrade",
    "kw": [
      "var jobbar",
      "område",
      "vilka orter",
      "vart",
      "kommer ni till",
      "stockholm",
      "täby",
      "åkersberga",
      "uppsala",
      "södertälje",
      "solna",
      "geografi",
      "vilka områden"
    ],
    "a": "Vi är baserade i Stockholm och jobbar i hela Stockholmsområdet med omnejd — bl.a. Täby, Solna, Södertälje, Kungsholmen och Uppsala. Osäker på om vi tar oss till just din ort? Fråga på, eller lämna en förfrågan."
  },
  {
    "key": "tid",
    "kw": [
      "hur lång tid",
      "tidsplan",
      "när kan ni",
      "börja",
      "starta",
      "ledtid",
      "hinner",
      "snabbt",
      "väntetid",
      "tidplan"
    ],
    "a": "Det beror helt på projektets omfattning. Generellt får vi bäst resultat när förfrågan kommer i god tid så vi kan planera ordentligt. Berätta om ditt projekt så ger vi dig en ärlig tidsbild."
  },
  {
    "key": "mote",
    "kw": [
      "möte",
      "platsbesök",
      "platsbesok",
      "träffas",
      "boka",
      "komma och titta",
      "hembesök"
    ],
    "a": "Absolut — ett platsbesök är ofta bästa starten. Lämna en förfrågan med var projektet finns och vad det gäller, så hör Andreas av sig för att boka en tid.",
    "chips": [
      "Begär offert"
    ]
  },
  {
    "key": "rot",
    "kw": [
      "rot",
      "rotavdrag",
      "avdrag",
      "skatteavdrag"
    ],
    "a": "Vid arbeten åt privatpersoner hjälper vi till med ROT-avdrag där det är tillämpligt, så att avdraget dras direkt på fakturan. Vill du veta om ditt projekt kvalificerar? Lämna en förfrågan."
  },
  {
    "key": "forsakring",
    "kw": [
      "försäkring",
      "f-skatt",
      "fskatt",
      "seriös",
      "trygg",
      "godkänd",
      "registrerad"
    ],
    "a": "Ja — bolaget är registrerat för F-skatt och vi arbetar enligt branschens regler med ordnad dokumentation och egenkontroll. Allt utförs av yrkesfolk och samordnade underentreprenörer."
  },
  {
    "key": "garanti",
    "kw": [
      "garanti",
      "garantitid",
      "efter jobbet",
      "reklamation",
      "besiktning",
      "slutbesiktning"
    ],
    "a": "Vi följer branschens garantier och avslutar alltid med relevant kvalitets- och miljödokumentation samt slutbesiktning där det är aktuellt — inget lämnas åt slumpen."
  },
  {
    "key": "referenser",
    "kw": [
      "referenser",
      "tidigare jobb",
      "exempel",
      "har ni gjort",
      "utvalda uppdrag",
      "case",
      "portfolio",
      "visa projekt"
    ],
    "a": "Absolut — kika under Projekt och CV på sajten. Där finns flera utvalda uppdrag: skolrenoveringar (Kyrkskolan, Klastorpsskolan), nyproduktion av bostäder (Kv Paraden, BRF Estrad) och anläggning åt Trafikverket. Vill du ha referenser för just din typ av projekt? Fråga på."
  },
  {
    "key": "andreas",
    "kw": [
      "vem är",
      "erfarenhet",
      "bakgrund",
      "om er",
      "om andreas",
      "vem ligger",
      "hur länge",
      "år i branschen",
      "kompetens"
    ],
    "a": "Bakom AD Byggprojekt står Andreas Dahlgren — med över 30 år i byggbranschen, från hantverkare och stomledare till arbetsledare, platschef och byggledare på projekt upp mot 270 miljoner kronor. Dessförinnan flera år inom Försvarsmakten."
  },
  {
    "key": "varfor_ad",
    "kw": [
      "varför",
      "varför välja",
      "vad skiljer",
      "fördel",
      "varför er",
      "varför ad",
      "vad är bra"
    ],
    "a": "Det du får med Andreas är en erfaren byggare som lett allt från skolrenoveringar och bostäder till stora anläggningsprojekt — med fötterna i både hantverket och styrningen. Personligt engagemang, raka besked och full koll på tid, kvalitet, arbetsmiljö och ekonomi."
  },
  {
    "key": "kund",
    "kw": [
      "privatperson",
      "privat",
      "företag",
      "bostadsrätt",
      "förening",
      "fastighetsägare",
      "företagskund",
      "åt vem"
    ],
    "a": "Vi jobbar åt både privatpersoner, bostadsrättsföreningar, företag, kommuner och fastighetsägare/beställare. Upplägget anpassas efter vem du är och vad projektet kräver."
  },
  {
    "key": "storlek",
    "kw": [
      "litet jobb",
      "smått",
      "för litet",
      "stort jobb",
      "liten",
      "minsta",
      "tar ni små",
      "litet projekt"
    ],
    "a": "Vi tar oss an både stora och små uppdrag. Är du osäker på om ditt projekt passar oss? Beskriv det så är vi raka med om vi är rätt för jobbet."
  },
  {
    "key": "arbete",
    "kw": [
      "renovering",
      "renovera",
      "ombyggnad",
      "tillbyggnad",
      "badrum",
      "kök",
      "våtrum",
      "tak",
      "fasad",
      "bygga om"
    ],
    "a": "Ja — vi tar oss an både nyproduktion och renovering, och samordnar yrkesarbetare och underentreprenörer. Berätta vad du vill ha gjort så säger vi hur vi kan hjälpa dig.",
    "chips": [
      "Begär offert"
    ]
  },
  {
    "key": "kontakt",
    "kw": [
      "kontakt",
      "ring",
      "telefon",
      "nummer",
      "mejl",
      "mail",
      "maila",
      "nå er",
      "kontakta",
      "hör av",
      "prata med"
    ],
    "a": "Du når oss enklast så här:\n📞 070-462 99 43\n✉️ andreas@adbyggprojekt.se\nVill du hellre att Andreas ringer upp dig? Lämna en förfrågan med ditt nummer.",
    "chips": [
      "Begär offert"
    ]
  },
  {
    "key": "sprak",
    "kw": [
      "språk",
      "engelska",
      "english",
      "talar ni",
      "language",
      "do you speak"
    ],
    "a": "Andreas talar och skriver flytande svenska och engelska. (For inquiries in English — just write and Andreas will reply in English.)"
  },
  {
    "key": "jobb",
    "kw": [
      "jobb",
      "anställning",
      "lediga",
      "rekrytering",
      "söka jobb",
      "jobba hos",
      "anställa"
    ],
    "a": "Vill du jobba med oss eller samarbeta? Skicka en rad till andreas@adbyggprojekt.se och berätta kort om dig själv, så hör vi av oss om det finns något som passar."
  },
  {
    "key": "faktura",
    "kw": [
      "faktura",
      "betalning",
      "betala",
      "fakturering",
      "betalningsvillkor",
      "betalplan"
    ],
    "a": "Fakturering sker enligt överenskommelse i avtalet — vanligtvis löpande mot utfört arbete eller enligt betalplan. För privatpersoner hanteras ROT-avdraget direkt på fakturan där det är tillämpligt."
  },
  {
    "key": "samarbete",
    "kw": [
      "underentreprenör",
      "samarbeta",
      "jobba åt er",
      "anlita er",
      "leverantör",
      "samarbetspartner"
    ],
    "a": "Vill du samarbeta med oss eller erbjuda dina tjänster? Hör gärna av dig till andreas@adbyggprojekt.se så tar vi det därifrån."
  },
  {
    "key": "halsning",
    "kw": [
      "hej",
      "hejsan",
      "tjena",
      "tja",
      "god morgon",
      "god dag",
      "hallå",
      "halloj",
      "yo"
    ],
    "a": "Hej och välkommen! 👋 Jag svarar på vanliga frågor om AD Byggprojekt — tjänster, skolprojekt, säkerhet, områden, pris med mera. Vad kan jag hjälpa dig med?",
    "chips": [
      "Erfarenhet av skolor",
      "Säkerhet & skyddsobjekt",
      "Vad kostar det?",
      "Begär offert"
    ]
  },
  {
    "key": "tack",
    "kw": [
      "tack",
      "tackar",
      "tusen tack",
      "toppen",
      "perfekt",
      "hej då",
      "vi hörs",
      "ha det"
    ],
    "a": "Varsågod! 🙌 Hör gärna av dig om du undrar något mer — eller lämna en förfrågan så återkommer Andreas."
  }
];
const FALLBACK = 'Den frågan kan jag inte svara säkert på här — men jag vill inte gissa. Vill du att Andreas hör av sig? Lämna en kort förfrågan så återkommer han.';
const WELCOME = INTENTS.find((i) => i.key === 'halsning');

function norm(s) { return (s || '').toLowerCase().replace(/[.,!?;:()"']/g, ' ').replace(/\s+/g, ' ').trim(); }
function match(text) {
  const t = norm(text);
  if (!t) return null;
  let best = null, bestScore = 0;
  for (const it of INTENTS) {
    let score = 0;
    for (const k of it.kw) { if (t.includes(k)) score += k.split(' ').length; }
    if (score > bestScore) { bestScore = score; best = it; }
  }
  return bestScore > 0 ? best : null;
}

const CSS = `
.andc-launcher{position:fixed;right:24px;bottom:24px;z-index:9998;width:62px;height:62px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,#0078D4,#4a9eff);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(0,120,212,.45);animation:andcGlow 2.4s ease-in-out infinite;transition:transform .25s}
.andc-launcher:hover{transform:scale(1.06)}
.andc-launcher svg{width:26px;height:26px}
.andc-launcher .andc-dot{position:absolute;top:6px;right:8px;width:10px;height:10px;border-radius:50%;background:#22c55e;border:2px solid #fff}
@keyframes andcGlow{0%,100%{box-shadow:0 10px 30px rgba(0,120,212,.40),0 0 0 0 rgba(0,120,212,.55)}50%{box-shadow:0 10px 34px rgba(0,120,212,.65),0 0 0 14px rgba(0,120,212,0)}}
@media(prefers-reduced-motion:reduce){.andc-launcher{animation:none}}
.andc-panel{position:fixed;right:24px;bottom:24px;z-index:9999;width:374px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 90px);background:#fff;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 30px 70px -20px rgba(15,23,42,.55);border:1px solid #e5e9f0;font-family:'Segoe UI',system-ui,Arial,sans-serif}
.andc-head{background:linear-gradient(135deg,#0f172a,#16335c);color:#fff;padding:1rem 1.1rem;display:flex;align-items:center;gap:.7rem}
.andc-av{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#0078D4,#4a9eff);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1rem;flex:none;overflow:hidden}
.andc-av img{width:100%;height:100%;object-fit:cover;display:block}
.andc-who{flex:1;min-width:0}
.andc-who b{display:block;font-size:.98rem;line-height:1.1}
.andc-who span{font-size:.72rem;color:rgba(255,255,255,.7);display:flex;align-items:center;gap:.35rem}
.andc-who span::before{content:'';width:7px;height:7px;border-radius:50%;background:#22c55e}
.andc-x{background:rgba(255,255,255,.12);border:none;color:#fff;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:1.1rem;line-height:1;flex:none}
.andc-x:hover{background:rgba(255,255,255,.22)}
.andc-body{flex:1;overflow-y:auto;padding:1.1rem;background:#f3f5f8;display:flex;flex-direction:column;gap:.7rem}
.andc-msg{max-width:84%;padding:.7rem .9rem;border-radius:14px;font-size:.9rem;line-height:1.5;white-space:pre-wrap}
.andc-bot{align-self:flex-start;background:#fff;border:1px solid #e5e9f0;border-bottom-left-radius:4px;color:#1f2937}
.andc-user{align-self:flex-end;background:#0078D4;color:#fff;border-bottom-right-radius:4px}
.andc-chips{display:flex;flex-wrap:wrap;gap:.4rem}
.andc-chip{background:#fff;border:1px solid #0078D4;color:#0078D4;font-size:.78rem;font-weight:600;padding:.4rem .7rem;border-radius:20px;cursor:pointer;transition:all .2s}
.andc-chip:hover{background:#0078D4;color:#fff}
.andc-foot{border-top:1px solid #e5e9f0;background:#fff;padding:.7rem;display:flex;gap:.5rem;align-items:center}
.andc-foot input{flex:1;border:1px solid #e5e9f0;border-radius:22px;padding:.6rem .9rem;font-size:.9rem;outline:none;font-family:inherit}
.andc-foot input:focus{border-color:#0078D4;box-shadow:0 0 0 3px rgba(0,120,212,.12)}
.andc-send{background:#0078D4;border:none;color:#fff;width:40px;height:40px;border-radius:50%;cursor:pointer;flex:none;display:flex;align-items:center;justify-content:center}
.andc-send:hover{background:#0066bb}
.andc-send svg{width:18px;height:18px}
.andc-offer{background:#fff;border:1px solid #e5e9f0;border-radius:14px;padding:.9rem;display:flex;flex-direction:column;gap:.5rem;align-self:stretch}
.andc-offer h4{font-size:.88rem;color:#0f172a;margin:0}
.andc-offer input,.andc-offer textarea{border:1px solid #e5e9f0;border-radius:8px;padding:.55rem .7rem;font-size:.85rem;font-family:inherit;outline:none;width:100%}
.andc-offer input:focus,.andc-offer textarea:focus{border-color:#0078D4}
.andc-offer textarea{resize:vertical;min-height:54px}
.andc-offer .andc-osend{background:#0078D4;color:#fff;border:none;border-radius:8px;padding:.6rem;font-weight:700;cursor:pointer;font-size:.85rem}
.andc-offer .andc-osend:disabled{opacity:.6;cursor:default}
.andc-err{color:#b91c1c;font-size:.78rem}
.andc-disc{font-size:.68rem;color:#6b7280;text-align:center;padding:.2rem .8rem .5rem;background:#fff}
`;

function OfferForm() {
  const [f, setF] = useState({ name: '', kontakt: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const botcheckRef = useRef(null); // honeypot – samma spam-skydd som offertformuläret
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async () => {
    if (!f.name.trim() || !f.kontakt.trim()) { setStatus('error'); return; }
    // Honeypot: fylld av bottar men aldrig av människor → släpp tyst.
    if (botcheckRef.current && botcheckRef.current.checked) { setStatus('done'); return; }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'ef4a060a-38a9-4591-add1-5a39a8ef7148',
          subject: 'Ny offertförfrågan via chatten (Fråga Heidi)',
          from_name: 'AD Byggprojekt — chatt',
          botcheck: botcheckRef.current ? botcheckRef.current.checked : false,
          name: f.name,
          kontakt: f.kontakt,
          message: f.message,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'done' : 'error');
    } catch (e) {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="andc-offer">
        <h4>Tack! ✅</h4>
        <div style={{ fontSize: '.85rem', color: '#475569' }}>
          Din förfrågan är skickad. Andreas återkommer så snart han kan.
        </div>
      </div>
    );
  }

  return (
    <div className="andc-offer">
      <h4>Begär offert</h4>
      <input ref={botcheckRef} type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} />
      <input aria-label="Namn" placeholder="Namn" value={f.name} onChange={set('name')} />
      <input aria-label="Telefon eller e-post" placeholder="Telefon eller e-post" value={f.kontakt} onChange={set('kontakt')} />
      <textarea aria-label="Beskriv kort ditt projekt" placeholder="Beskriv kort ditt projekt…" value={f.message} onChange={set('message')} />
      {status === 'error' && <div className="andc-err">Fyll i namn och kontaktuppgift, och försök igen.</div>}
      <button className="andc-osend" onClick={submit} disabled={status === 'sending'}>
        {status === 'sending' ? 'Skickar…' : 'Skicka förfrågan'}
      </button>
    </div>
  );
}

export default function AndreasChat() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const startedRef = useRef(false);
  const panelRef = useRef(null);
  const launcherRef = useRef(null);
  const prevOpen = useRef(false);

  const push = (item) => setItems((prev) => [...prev, item]);

  const openChat = () => {
    setOpen(true);
    if (!startedRef.current) {
      startedRef.current = true;
      push({ kind: 'msg', who: 'bot', text: WELCOME.a });
      push({ kind: 'chips', list: WELCOME.chips });
    }
  };
  const closeChat = () => setOpen(false);

  useEffect(() => {
    const handler = () => openChat();
    window.addEventListener('open-andreas-chat', handler);
    return () => window.removeEventListener('open-andreas-chat', handler);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [items, open]);

  // Fokushantering: flytta in fokus i dialogen när den öppnas, fånga Tab/Shift+Tab
  // inuti panelen, stäng på Escape, och återlämna fokus till launchern vid stängning.
  useEffect(() => {
    if (open) {
      const panel = panelRef.current;
      if (!panel) return;
      const getFocusable = () =>
        Array.from(
          panel.querySelectorAll(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.disabled && el.offsetParent !== null);

      const initial = panel.querySelector('.andc-foot input') || getFocusable()[0];
      if (initial) initial.focus();

      const onKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeChat();
          return;
        }
        if (e.key !== 'Tab') return;
        const f = getFocusable();
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      panel.addEventListener('keydown', onKeyDown);
      prevOpen.current = true;
      return () => panel.removeEventListener('keydown', onKeyDown);
    }

    // Stängdes precis → ge fokus tillbaka till launcher-knappen.
    if (prevOpen.current && launcherRef.current) launcherRef.current.focus();
    prevOpen.current = false;
  }, [open]);

  const ask = (text) => {
    push({ kind: 'msg', who: 'user', text });
    setInput('');
    const it = match(text);
    const answer = it ? it.a : FALLBACK;
    setTimeout(() => {
      push({ kind: 'msg', who: 'bot', text: answer });
      if (it && it.chips) push({ kind: 'chips', list: it.chips });
      if ((it && it.form) || !it) push({ kind: 'offer' });
    }, 350);
  };

  const onChip = (label) => {
    if (label.toLowerCase().includes('offert')) ask('Jag vill begära en offert');
    else ask(label);
  };

  const send = () => { const v = input.trim(); if (v) ask(v); };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {!open && (
        <button ref={launcherRef} className="andc-launcher" onClick={openChat} aria-label="Öppna chatten Fråga Heidi">
          <span className="andc-dot" />
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
          </svg>
        </button>
      )}

      {open && (
        <div ref={panelRef} className="andc-panel" role="dialog" aria-modal="true" aria-label="Fråga Heidi">
          <div className="andc-head">
            <div className="andc-av"><img src={import.meta.env.BASE_URL + 'heidi.jpg'} alt="Heidi" width="40" height="40" /></div>
            <div className="andc-who"><b>Fråga Heidi</b><span>Assistent, AD Byggprojekt</span></div>
            <button className="andc-x" onClick={closeChat} aria-label="Stäng">&times;</button>
          </div>

          <div className="andc-body" ref={bodyRef} aria-live="polite" aria-atomic="false">
            {items.map((it, i) => {
              if (it.kind === 'msg') return <div key={i} className={'andc-msg ' + (it.who === 'user' ? 'andc-user' : 'andc-bot')}>{it.text}</div>;
              if (it.kind === 'chips' && it.list) return (
                <div key={i} className="andc-chips">
                  {it.list.map((label, j) => <button key={j} className="andc-chip" onClick={() => onChip(label)}>{label}</button>)}
                </div>
              );
              if (it.kind === 'offer') return <OfferForm key={i} />;
              return null;
            })}
          </div>

          <div className="andc-foot">
            <input
              aria-label="Skriv din fråga"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              placeholder="Skriv din fråga…"
              autoComplete="off"
            />
            <button className="andc-send" onClick={send} aria-label="Skicka">
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </div>
          <div className="andc-disc">Automatiskt svar · för exakta uppgifter, lämna en förfrågan så hör Andreas av sig.</div>
        </div>
      )}
    </>
  );
}
