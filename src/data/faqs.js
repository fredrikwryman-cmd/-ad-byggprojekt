// ENDA källa för FAQ:n. Används BÅDE av den synliga FAQ-sektionen
// (FaqSection.jsx) och av FAQPage-JSON-LD:n (index.astro), så att
// strukturerad data alltid matchar det som visas 100% – ett krav för
// Googles FAQ rich result. Ändra frågor/svar här och bara här.
export const faqs = [
  {
    q: 'Vilka områden arbetar ni i?',
    a: 'Vi är verksamma i Stockholm med omnejd – hela Storstockholm samt Uppsala. Hör av dig om du är osäker på om vi täcker just din ort.',
  },
  {
    q: 'Är det första mötet kostnadsfritt?',
    a: 'Ja. Vi börjar alltid med ett förutsättningslöst möte där vi lyssnar på dina idéer och gör en första bedömning – helt utan kostnad eller förpliktelse.',
  },
  {
    q: 'Hur lång tid tar ett projekt?',
    a: 'Det beror helt på omfattningen. Du får alltid en realistisk tidsplan i offerten, och vi håller dig uppdaterad om status genom hela projektet.',
  },
  {
    q: 'Kan jag använda ROT-avdrag?',
    a: 'För privatpersoner kan ROT-avdrag oftast användas vid renovering och ombyggnad, och vi hjälper dig att hantera avdraget direkt på fakturan. Hör av dig så går vi igenom vad som gäller för just ditt projekt.',
  },
  {
    q: 'Har ni F-skatt och försäkring?',
    a: 'Ja, vi är godkända för F-skatt och har ansvarsförsäkring. Du arbetar alltid med en seriös och trygg motpart.',
  },
  {
    q: 'Lämnar ni fast pris?',
    a: 'I de allra flesta fall lämnar vi fast pris efter att vi planerat projektet tillsammans. Då vet du exakt vad som ingår – inga överraskningar längre fram.',
  },
  {
    q: 'Vilken garanti gäller?',
    a: 'Vi lämnar garanti enligt branschens regler och dokumenterar arbetet vid överlämningen. Du får tydliga avtal och vet alltid vad som gäller.',
  },
];
