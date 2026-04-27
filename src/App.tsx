import { useMemo, useState } from 'react';
import { BrandMark } from './components/BrandMark';
import { AvailableDataBoard } from './components/AvailableDataBoard';
import { ImpairmentActionBoard } from './components/ImpairmentActionBoard';
import { InteractivePieCard } from './components/InteractivePieCard';
import { KpiCard } from './components/KpiCard';
import { TabNav } from './components/TabNav';
import { TroubleTable } from './components/TroubleTable';
import { reportMeta, siteRecords } from './data/mockData';
import type { FilterToken } from './types/report';
import {
  activeFilterLabel,
  applyFilter,
  countWhere,
  getFuelSlices,
  getImpairmentSlices,
  getPumpTestSlices,
  percentage,
} from './utils/reportMath';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'actions' | 'avaldata'>('overview');
  const [activeFilter, setActiveFilter] = useState<FilterToken>('ALL');

  const testedCount = countWhere(siteRecords, (record) => record.pumpTest === 'Tested');
  const notTestedCount = countWhere(siteRecords, (record) => record.pumpTest === 'Not Tested');
  const inServiceCount = countWhere(siteRecords, (record) => record.impairmentStatus === 'In Service');
  const outServiceCount = countWhere(siteRecords, (record) => record.impairmentStatus === 'Out >10h');
  const dieselRecords = siteRecords.filter((record) => record.driverType === 'Diesel');
  const fuelOkCount = countWhere(dieselRecords, (record) => (record.fuelLevelPercent ?? 0) >= 67);
  const fuelLowCount = countWhere(dieselRecords, (record) => (record.fuelLevelPercent ?? 0) < 67);

  const filteredRecords = useMemo(() => applyFilter(siteRecords, activeFilter), [activeFilter]);
  const impairmentActionRecords = useMemo(
    () => siteRecords.filter((record) => record.impairmentType && record.proposedFix),
    [],
  );

  const pumpTestSlices = getPumpTestSlices(siteRecords);
  const impairmentSlices = getImpairmentSlices(siteRecords);
  const fuelSlices = getFuelSlices(siteRecords);

  const handleFilterChange = (nextFilter: FilterToken) => {
    setActiveFilter((currentFilter) => (currentFilter === nextFilter ? 'ALL' : nextFilter));
  };

  return (
    <div className="app-shell">
      <div className="background-glow background-glow--one" />
      <div className="background-glow background-glow--two" />

      <main className="report-frame">
        <section className="hero-card">
          <div className="hero-card__top">
            <div className="hero-card__brand-row">
              <BrandMark />
              <div>
                <h1>{reportMeta.title}</h1>
                <p>
                  {reportMeta.customerName} • {reportMeta.dateRange}
                </p>
              </div>
            </div>
            <div className="hero-card__count">
              # of Connected Fire Pumps <span>{reportMeta.connectedPumps}</span>
            </div>
          </div>

          <TabNav activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === 'overview' ? (
            <>
              <div className="kpi-grid">
                <KpiCard
                  title="Fire Pump Tests (Count)"
                  value={`${testedCount} tested • ${notTestedCount} not tested`}
                  active={activeFilter === 'tested_any' || activeFilter === 'not_tested_any'}
                  onClick={() => handleFilterChange(activeFilter === 'not_tested_any' ? 'tested_any' : 'not_tested_any')}
                />
                <KpiCard
                  title="Impairments (10hr+)"
                  value={`${inServiceCount} in service • ${outServiceCount} out`}
                  active={activeFilter === 'in_service' || activeFilter === 'out_service'}
                  onClick={() => handleFilterChange(activeFilter === 'out_service' ? 'in_service' : 'out_service')}
                />
                <KpiCard
                  title="Diesel Fuel Tanks"
                  value={`${fuelOkCount} over 67% • ${fuelLowCount} under 67%`}
                  active={activeFilter === 'fuel_ok' || activeFilter === 'fuel_low'}
                  onClick={() => handleFilterChange(activeFilter === 'fuel_low' ? 'fuel_ok' : 'fuel_low')}
                />
              </div>

              <div className="pie-grid">
                <InteractivePieCard
                  title="Fire Pump Tests"
                  slices={pumpTestSlices}
                  activeSliceId={
                    ['electric_tested', 'diesel_tested', 'electric_not_tested', 'diesel_not_tested'].includes(activeFilter)
                      ? activeFilter
                      : undefined
                  }
                  onSliceClick={(sliceId) => handleFilterChange(sliceId as FilterToken)}
                  heroValue={`${percentage(testedCount, siteRecords.length)}%`}
                  subtitle="of pumps tested this period"
                />
                <InteractivePieCard
                  title="Fire Pump Impairments"
                  slices={impairmentSlices}
                  activeSliceId={['in_service', 'out_service'].includes(activeFilter) ? activeFilter : undefined}
                  onSliceClick={(sliceId) => handleFilterChange(sliceId as FilterToken)}
                  heroValue={`${percentage(inServiceCount, siteRecords.length)}%`}
                  subtitle="in service"
                />
                <InteractivePieCard
                  title="Diesel Fuel Tanks"
                  slices={fuelSlices}
                  activeSliceId={['fuel_ok', 'fuel_low'].includes(activeFilter) ? activeFilter : undefined}
                  onSliceClick={(sliceId) => handleFilterChange(sliceId as FilterToken)}
                  heroValue={`${percentage(fuelOkCount, dieselRecords.length)}%`}
                  subtitle="with adequate fuel"
                />
              </div>

              <div className="toolbar-row">
                <div className="filter-chip filter-chip--active">{activeFilterLabel(activeFilter)}</div>
                {activeFilter !== 'ALL' ? (
                  <button className="filter-reset" onClick={() => setActiveFilter('ALL')}>
                    Clear filter
                  </button>
                ) : null}
              </div>

              <TroubleTable title={activeFilterLabel(activeFilter)} records={filteredRecords} />
            </>
          ) : activeTab === 'actions' ? (
            <ImpairmentActionBoard records={impairmentActionRecords} />
          ) : (
            <AvailableDataBoard />
          )}

          <footer className="report-footer">Generated {reportMeta.generatedAt}</footer>
        </section>
      </main>
    </div>
  );
}
