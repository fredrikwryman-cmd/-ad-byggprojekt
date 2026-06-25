import { useEffect, useRef, useState } from 'react';

/* ============ 20+ ÄMNEN + fallback ============ */
const INTENTS = [
  { key: 'offert', kw: ['offert', 'förfrågan', 'offra', 'begära pris', 'vill ha pris', 'skicka förfrågan'],
    a: 'Absolut — vi tar gärna fram en kostnadsfri offert. Berätta kort om ditt projekt nedan så återkommer Andreas så snart han kan.', form: true },
  { key: 'pris', kw: ['kostar', 'kostnad', 'pris', 'dyr', 'dyrt', 'prislista', 'timpris', 'timme', 'vad hamnar', 'uppskattning', 'budget', 'billig'],
    a: 'Vi jobbar i första hand med fasta priser och tydliga offerter, men kan även köra på löpande räkning när det passar bättre. Vill du ha en kostnadsfri uppskattning?', chips: ['Begär offert'] },
  { key: 'tjanster', kw: ['vad gör ni', 'tjänster', 'erbjuder', 'hjälper ni', 'kan ni hjälpa', 'vad kan ni', 'sysslar'],
    a: 'Vi är specialister på ledning av byggprojekt: byggledning, platsledning, projektledning och rådgivning — och tar vid behov även hand om själva bygget (nyproduktion och renovering).', chips: ['Byggledning', 'Platsledning', 'Projektledning', 'CM-uppdrag'] },
  { key: 'byggledning', kw: ['byggledning', 'byggledare', 'beställarens', 'byggherre'],
    a: 'Byggledning gör vi oftast åt en beställare eller byggherre (t.ex. kommuner, fastighetsägare, SISAB eller HSB). Vi är er ansvariga person på plats som ser till att bygget rullar — bevakar beställningen, leder byggmöten och följer upp tid, kvalitet, arbetsmiljö och ekonomi.' },
  { key: 'platsledning', kw: ['platsledning', 'platschef'],
    a: 'Platsledning gör vi åt entreprenörer, oftast vid total- eller generalentreprenad. Som platschef tar vi ansvar för den dagliga styrningen på arbetsplatsen — hela vägen fram till färdigt och besiktigat.' },
  { key: 'projektledning', kw: ['projektledning', 'projektledare', 'projektstyrning', 'projektstöd'],
    a: 'Med strukturerad projektledning håller vi ihop hela projektet — upphandling, tidplan, ekonomi och arbetsmiljö — med tät uppföljning så du alltid har koll på status, kostnader och nästa steg.' },
  { key: 'cm', kw: ['cm', 'construction management', 'byggprojektgruppen', 'bopg', 'systerbolag'],
    a: 'Construction Management (CM) hanteras av vårt systerbolag Bygg & Projektgruppen i Stockholm AB — en samlad byggpartner för hela kedjan. Du hittar dem via CM-uppdrag i menyn.' },
  { key: 'omrade', kw: ['var jobbar', 'område', 'vilka orter', 'vart', 'kommer ni till', 'stockholm', 'täby', 'åkersberga', 'uppsala', 'söder', 'norr', 'geografi', 'vilka områden'],
    a: 'Vi är baserade i Stockholm och jobbar i hela Stockholmsområdet med omnejd. Är du osäker på om vi tar oss till just din ort? Fråga på, eller lämna en förfrågan så svarar Andreas.' },
  { key: 'tid', kw: ['hur lång tid', 'tidsplan', 'när kan ni', 'börja', 'starta', 'ledtid', 'hinner', 'när har ni', 'snabbt', 'väntetid', 'tidplan'],
    a: 'Det beror helt på projektets omfattning. Generellt får vi bäst resultat när förfrågan kommer i god tid så vi kan planera ordentligt. Berätta om ditt projekt så ger vi dig en ärlig tidsbild.' },
  { key: 'rot', kw: ['rot', 'rotavdrag', 'avdrag', 'skatteavdrag'],
    a: 'Vid arbeten åt privatpersoner hjälper vi till med ROT-avdrag där det är tillämpligt, så att avdraget dras direkt på fakturan. Vill du veta om ditt projekt kvalificerar? Lämna en förfrågan.' },
  { key: 'forsakring', kw: ['försäkring', 'f-skatt', 'fskatt', 'seriös', 'trygg', 'behörig', 'certifierad', 'godkänd', 'registrerad'],
    a: 'Ja — bolaget är registrerat för F-skatt och vi arbetar enligt branschens regler med ordnad dokumentation och egenkontroll. Allt utförs av yrkesfolk och samordnade underentreprenörer.' },
  { key: 'garanti', kw: ['garanti', 'garantitid', 'efter jobbet', 'reklamation', 'besiktning', 'slutbesiktning'],
    a: 'Vi följer branschens garantier och avslutar alltid med relevant kvalitets- och miljödokumentation samt slutbesiktning där det är aktuellt — inget lämnas åt slumpen.' },
  { key: 'referenser', kw: ['referenser', 'tidigare jobb', 'exempel', 'har ni gjort', 'utvalda uppdrag', 'case', 'portfolio', 'visa projekt'],
    a: 'Absolut — kika under Projekt och CV på sajten, där finns flera utvalda uppdrag (allt från skolrenoveringar till nyproduktion av bostäder). Vill du ha referenser för just din typ av projekt? Fråga på.' },
  { key: 'andreas', kw: ['vem är', 'erfarenhet', 'bakgrund', 'om er', 'om andreas', 'vem ligger', 'hur länge', 'år i branschen', 'kompetens'],
    a: 'Bakom AD Byggprojekt står Andreas Dahlgren — med över 30 år i byggbranschen, från hantverkare och stomledare till arbetsledare, platschef och byggledare på projekt upp mot 270 miljoner kronor.' },
  { key: 'kontakt', kw: ['kontakt', 'ring', 'telefon', 'nummer', 'mejl', 'mail', 'maila', 'nå er', 'kontakta', 'hör av', 'prata med'],
    a: 'Du når oss enklast så här:\n📞 070-462 99 43\n✉️ andreas@adbyggprojekt.se\nVill du hellre att Andreas ringer upp dig? Lämna en förfrågan med ditt nummer.', chips: ['Begär offert'] },
  { key: 'storlek', kw: ['litet jobb', 'smått', 'för litet', 'stort jobb', 'liten', 'minsta', 'tar ni små', 'bara en', 'litet projekt'],
    a: 'Vi tar oss an både stora och små uppdrag. Är du osäker på om ditt projekt passar oss? Beskriv det så är vi raka med om vi är rätt för jobbet.' },
  { key: 'kund', kw: ['privatperson', 'privat', 'företag', 'bostadsrätt', 'brf', 'förening', 'fastighetsägare', 'företagskund', 'åt vem'],
    a: 'Vi jobbar åt både privatpersoner, bostadsrättsföreningar, företag och fastighetsägare/beställare. Upplägget anpassas efter vem du är och vad projektet kräver.' },
  { key: 'arbete', kw: ['renovering', 'renovera', 'nybygg', 'nyproduktion', 'ombyggnad', 'tillbyggnad', 'badrum', 'kök', 'våtrum', 'tak', 'fasad', 'mark', 'stomme', 'bygga'],
    a: 'Ja — vi tar oss an både nyproduktion och renovering, och samordnar yrkesarbetare och underentreprenörer. Berätta vad du vill ha gjort så säger vi hur vi kan hjälpa dig.', chips: ['Begär offert'] },
  { key: 'samarbete', kw: ['underentreprenör', 'samarbeta', 'jobba åt er', 'anlita er', 'leverantör', 'samarbetspartner'],
    a: 'Vill du samarbeta med oss eller erbjuda dina tjänster? Hör gärna av dig till andreas@adbyggprojekt.se så tar vi det därifrån.' },
  { key: 'halsning', kw: ['hej', 'hejsan', 'tjena', 'tja', 'god morgon', 'god dag', 'hallå', 'halloj', 'yo'],
    a: 'Hej och välkommen! 👋 Jag svarar på vanliga frågor om AD Byggprojekt — pris, tjänster, områden, tidsplan med mera. Vad kan jag hjälpa dig med?', chips: ['Vad kostar det?', 'Vad gör ni?', 'Vilka områden?', 'Begär offert'] },
  { key: 'tack', kw: ['tack', 'tackar', 'tusen tack', 'bra', 'toppen', 'perfekt', 'hej då', 'vi hörs', 'ha det'],
    a: 'Varsågod! 🙌 Hör gärna av dig om du undrar något mer — eller lämna en förfrågan så återkommer Andreas.' },
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
.andc-av{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#0078D4,#4a9eff);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1rem;flex:none}
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
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async () => {
    if (!f.name.trim() || !f.kontakt.trim()) { setStatus('error'); return; }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'ef4a060a-38a9-4591-add1-5a39a8ef7148',
          subject: 'Ny offertförfrågan via chatten (Fråga Andreas)',
          from_name: 'AD Byggprojekt — chatt',
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
      <input placeholder="Namn" value={f.name} onChange={set('name')} />
      <input placeholder="Telefon eller e-post" value={f.kontakt} onChange={set('kontakt')} />
      <textarea placeholder="Beskriv kort ditt projekt…" value={f.message} onChange={set('message')} />
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
        <button className="andc-launcher" onClick={openChat} aria-label="Öppna chatten Fråga Andreas">
          <span className="andc-dot" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" />
          </svg>
        </button>
      )}

      {open && (
        <div className="andc-panel" role="dialog" aria-label="Fråga Andreas">
          <div className="andc-head">
            <div className="andc-av">A</div>
            <div className="andc-who"><b>Fråga Andreas</b><span>Svarar oftast direkt</span></div>
            <button className="andc-x" onClick={closeChat} aria-label="Stäng">&times;</button>
          </div>

          <div className="andc-body" ref={bodyRef}>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              placeholder="Skriv din fråga…"
              autoComplete="off"
            />
            <button className="andc-send" onClick={send} aria-label="Skicka">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </div>
          <div className="andc-disc">Automatiskt svar · för exakta uppgifter, lämna en förfrågan så hör Andreas av sig.</div>
        </div>
      )}
    </>
  );
}
