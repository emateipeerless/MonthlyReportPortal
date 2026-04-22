import type { PieSlice } from '../types/report';

interface InteractivePieCardProps {
  title: string;
  subtitle: string;
  heroValue: string;
  slices: PieSlice[];
  activeSliceId?: string;
  onSliceClick: (sliceId: string) => void;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${x} ${y} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

export function InteractivePieCard({
  title,
  subtitle,
  heroValue,
  slices,
  activeSliceId,
  onSliceClick,
}: InteractivePieCardProps) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  let currentAngle = 0;

  return (
    <section className="pie-card">
      <div className="pie-card__heading">{title}</div>
      <div className="pie-card__legend">
        {slices.map((slice) => (
          <button
            key={slice.id}
            className={activeSliceId === slice.id ? 'legend-item legend-item--active' : 'legend-item'}
            onClick={() => onSliceClick(slice.id)}
          >
            <span className="legend-item__swatch" style={{ backgroundColor: slice.color }} />
            <span>{slice.label}</span>
          </button>
        ))}
      </div>

      <div className="pie-card__chart-wrap">
        <svg viewBox="0 0 220 220" className="pie-card__svg" aria-label={title}>
          {slices.map((slice) => {
            const startAngle = currentAngle;
            const segmentAngle = total === 0 ? 0 : (slice.value / total) * 360;
            const endAngle = currentAngle + segmentAngle;
            currentAngle = endAngle;

            if (segmentAngle === 0) {
              return null;
            }

            const isActive = activeSliceId === slice.id;
            return (
              <path
                key={slice.id}
                d={describeArc(110, 110, isActive ? 84 : 78, startAngle, endAngle)}
                fill={slice.color}
                className="pie-card__slice"
                onClick={() => onSliceClick(slice.id)}
              />
            );
          })}
          <circle cx="110" cy="110" r="36" fill="#ffffff" />
        </svg>
      </div>

      <div className="pie-card__hero">{heroValue}</div>
      <div className="pie-card__subtitle">{subtitle}</div>
    </section>
  );
}
