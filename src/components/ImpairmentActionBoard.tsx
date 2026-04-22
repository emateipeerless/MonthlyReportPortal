import type { SiteRecord } from '../types/report';
import { buildProgress, stagePercent } from '../utils/reportMath';

interface ImpairmentActionBoardProps {
  records: SiteRecord[];
}

export function ImpairmentActionBoard({ records }: ImpairmentActionBoardProps) {
  return (
    <section className="action-layout">
      <div className="panel action-panel">
        <div className="panel__header">
          <div>
            <div className="panel__eyebrow">Detected Impairments</div>
            <h3>Action queue</h3>
          </div>
          <div className="panel__count">{records.length} active items</div>
        </div>

        <div className="action-cards">
          {records.map((record) => {
            const stage = record.workOrderStage ?? 'Not Started';
            const steps = buildProgress(stage);
            const percent = stagePercent(stage);

            return (
              <article className="action-card" key={record.id}>
                <div className="action-card__left">
                  <div className="action-card__meta">
                    <span className="status-pill status-pill--outline">Site #{record.siteNumber}</span>
                    <span className="action-card__small">{record.region}</span>
                    <span className="action-card__small">{record.assetId}</span>
                  </div>
                  <h4>{record.impairmentType}</h4>
                  <p className="action-card__subtext">
                    {record.location} • {record.driverType} • {record.controller}
                  </p>
                </div>

                <div className="action-card__middle">
                  <div className="action-card__label">Proposed fix</div>
                  <p>{record.proposedFix}</p>
                </div>

                <div className="action-card__right">
                  <div className="action-card__label">Progress</div>
                  <div className="progress-track">
                    <div className="progress-track__fill" style={{ width: `${percent}%` }} />
                  </div>
                  <div className="progress-step-row">
                    {steps.map((step) => (
                      <div className="progress-step" key={step.label}>
                        <div className={step.completed ? 'progress-step__dot progress-step__dot--done' : 'progress-step__dot'} />
                        <span>{step.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="action-card__stage">{stage}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
