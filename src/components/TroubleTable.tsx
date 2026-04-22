import type { SiteRecord } from '../types/report';
import { formatFuelLevel } from '../utils/reportMath';

interface TroubleTableProps {
  title: string;
  records: SiteRecord[];
}

export function TroubleTable({ title, records }: TroubleTableProps) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <div className="panel__eyebrow">Trouble Sites</div>
          <h3>{title}</h3>
        </div>
        <div className="panel__count">{records.length} rows</div>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Site #</th>
              <th>Location</th>
              <th>Driver Type</th>
              <th>Pump Tests</th>
              <th>Impairment Hours</th>
              <th>Fuel Level</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.siteNumber}</td>
                <td>{record.location}</td>
                <td>{record.driverType}</td>
                <td>
                  <span
                    className={
                      record.pumpTest === 'Tested' ? 'status-pill status-pill--green' : 'status-pill status-pill--red'
                    }
                  >
                    {record.pumpTest}
                  </span>
                </td>
                <td>{record.impairmentHours}</td>
                <td>{formatFuelLevel(record.fuelLevelPercent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
