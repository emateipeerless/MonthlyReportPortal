import {
  derivedAnalyticsCatalog,
  dieselAlarmCatalog,
  electricAlarmCatalog,
} from '../data/availableData';

function DataChip({ label }: { label: string }) {
  return <span className="data-chip">{label}</span>;
}

export function AvailableDataBoard() {
  return (
    <section className="available-data-layout">

      <div className="available-data-grid available-data-grid--catalogs">
        <section className="panel data-catalog-panel">
          <div className="panel__header">
            <div>
              <div className="panel__eyebrow">Diesel controller alarms</div>
              <h3>Diesel-readable states and alarms</h3>
            </div>
            <div className="panel__count">{dieselAlarmCatalog.length} points</div>
          </div>
          <div className="data-chip-wrap">
            {dieselAlarmCatalog.map((item) => (
              <DataChip key={item} label={item} />
            ))}
          </div>
        </section>

        <section className="panel data-catalog-panel">
          <div className="panel__header">
            <div>
              <div className="panel__eyebrow">Electric controller alarms</div>
              <h3>Electric-readable states and alarms</h3>
            </div>
            <div className="panel__count">{electricAlarmCatalog.length} points</div>
          </div>
          <div className="data-chip-wrap">
            {electricAlarmCatalog.map((item) => (
              <DataChip key={item} label={item} />
            ))}
          </div>
        </section>
      </div>

      <section className="panel derived-panel">
        <div className="panel__header">
          <div>
            <div className="panel__eyebrow">Derived analysis</div>
            <h3>Customer-facing KPIs and service insights</h3>
          </div>
          <div className="panel__count">{derivedAnalyticsCatalog.length} analytics</div>
        </div>

        <div className="derived-grid">
          {derivedAnalyticsCatalog.map((item, index) => (
            <article className="derived-card" key={item}>
              <div className="derived-card__index">{String(index + 1).padStart(2, '0')}</div>
              <div className="derived-card__text">{item}</div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
