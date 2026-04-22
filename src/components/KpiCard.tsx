interface KpiCardProps {
  title: string;
  value: string;
  active: boolean;
  onClick: () => void;
}

export function KpiCard({ title, value, active, onClick }: KpiCardProps) {
  return (
    <button className={active ? 'kpi-card kpi-card--active' : 'kpi-card'} onClick={onClick}>
      <span className="kpi-card__title">{title}</span>
      <span className="kpi-card__value">{value}</span>
    </button>
  );
}
