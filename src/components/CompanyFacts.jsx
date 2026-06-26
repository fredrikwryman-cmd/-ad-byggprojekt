// Återanvändbart BOLAGSFAKTA-kort i register-/faktastil (samma känsla som BOPG-sidans).
// Statiskt och presentationellt – renderas som ren HTML (ingen client-hydrering behövs).

const FACTS = [
  ['Juridiskt namn', 'AD Byggprojekt Stockholm AB'],
  ['Org.nr', '559131-8695'],
  ['Säte', 'Österåker, Stockholms län'],
  ['Grundat', '2017'],
  ['Bolagsform', 'Aktiebolag'],
  ['VD', 'Andreas Berndt Dahlgren'],
  ['SNI / Bransch', 'Teknisk konsultverksamhet inom bygg- & anläggning'],
  ['Registrerat för', 'F-skatt · Moms · Arb.avgift'],
];

export default function CompanyFacts() {
  return (
    <div className="cf">
      <style>{`
        .cf {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e6ebf2;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 14px 36px -16px rgba(2, 6, 23, 0.45);
        }
        .cf__head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #020617;
          padding: 0.85rem 1.2rem;
        }
        .cf__head b {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          font-weight: 700;
          font-size: 0.74rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #f1f5f9;
        }
        .cf__head span {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          font-size: 0.74rem;
          letter-spacing: 0.18em;
          color: #d3b06b;
        }
        .cf__row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          padding: 0.85rem 1.2rem;
          border-top: 1px solid #eef2f7;
        }
        .cf__row:first-of-type { border-top: none; }
        .cf__k {
          flex-shrink: 0;
          padding-top: 0.1rem;
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748b;
          white-space: nowrap;
        }
        .cf__v {
          flex: 1;
          min-width: 0;
          text-align: right;
          color: #020617;
          font-weight: 600;
          font-size: 0.94rem;
          line-height: 1.45;
        }
        @media (max-width: 600px) {
          .cf__row { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
          .cf__k { white-space: normal; }
          .cf__v { text-align: left; }
        }
      `}</style>

      <div className="cf__head">
        <b>Bolagsfakta</b>
        <span>/ AB</span>
      </div>

      {FACTS.map(([k, v]) => (
        <div className="cf__row" key={k}>
          <span className="cf__k">{k}</span>
          <span className="cf__v">{v}</span>
        </div>
      ))}
    </div>
  );
}
