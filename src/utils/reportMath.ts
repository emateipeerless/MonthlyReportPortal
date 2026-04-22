import type { FilterToken, PieSlice, ProgressStep, SiteRecord, WorkOrderStage } from '../types/report';

export function countWhere(records: SiteRecord[], predicate: (record: SiteRecord) => boolean): number {
  return records.filter(predicate).length;
}

export function percentage(value: number, total: number): number {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export function formatFuelLevel(value?: number): string {
  return typeof value === 'number' ? `${value}%` : '—';
}

export function getPumpTestSlices(records: SiteRecord[]): PieSlice[] {
  return [
    {
      id: 'electric_tested',
      label: 'Elec Tested',
      value: countWhere(records, (r) => r.driverType === 'Electric' && r.pumpTest === 'Tested'),
      color: '#21d228',
    },
    {
      id: 'diesel_tested',
      label: 'Diesel Tested',
      value: countWhere(records, (r) => r.driverType === 'Diesel' && r.pumpTest === 'Tested'),
      color: '#0f5c11',
    },
    {
      id: 'electric_not_tested',
      label: 'E Not Tested',
      value: countWhere(records, (r) => r.driverType === 'Electric' && r.pumpTest === 'Not Tested'),
      color: '#f05341',
    },
    {
      id: 'diesel_not_tested',
      label: 'D Not Tested',
      value: countWhere(records, (r) => r.driverType === 'Diesel' && r.pumpTest === 'Not Tested'),
      color: '#8b3229',
    },
  ];
}

export function getImpairmentSlices(records: SiteRecord[]): PieSlice[] {
  return [
    {
      id: 'in_service',
      label: 'In Service',
      value: countWhere(records, (r) => r.impairmentStatus === 'In Service'),
      color: '#21d228',
    },
    {
      id: 'out_service',
      label: 'Out >10h',
      value: countWhere(records, (r) => r.impairmentStatus === 'Out >10h'),
      color: '#f05341',
    },
  ];
}

export function getFuelSlices(records: SiteRecord[]): PieSlice[] {
  const dieselRecords = records.filter((r) => r.driverType === 'Diesel');
  return [
    {
      id: 'fuel_ok',
      label: '> 67%',
      value: countWhere(dieselRecords, (r) => (r.fuelLevelPercent ?? 0) >= 67),
      color: '#21d228',
    },
    {
      id: 'fuel_low',
      label: '< 67%',
      value: countWhere(dieselRecords, (r) => (r.fuelLevelPercent ?? 0) < 67),
      color: '#f05341',
    },
  ];
}

export function applyFilter(records: SiteRecord[], filter: FilterToken): SiteRecord[] {
  switch (filter) {
    case 'ALL':
      return records;
    case 'tested_any':
      return records.filter((r) => r.pumpTest === 'Tested');
    case 'not_tested_any':
      return records.filter((r) => r.pumpTest === 'Not Tested');
    case 'electric_tested':
      return records.filter((r) => r.driverType === 'Electric' && r.pumpTest === 'Tested');
    case 'diesel_tested':
      return records.filter((r) => r.driverType === 'Diesel' && r.pumpTest === 'Tested');
    case 'electric_not_tested':
      return records.filter((r) => r.driverType === 'Electric' && r.pumpTest === 'Not Tested');
    case 'diesel_not_tested':
      return records.filter((r) => r.driverType === 'Diesel' && r.pumpTest === 'Not Tested');
    case 'in_service':
      return records.filter((r) => r.impairmentStatus === 'In Service');
    case 'out_service':
      return records.filter((r) => r.impairmentStatus === 'Out >10h');
    case 'fuel_ok':
      return records.filter((r) => r.driverType === 'Diesel' && (r.fuelLevelPercent ?? 0) >= 67);
    case 'fuel_low':
      return records.filter((r) => r.driverType === 'Diesel' && (r.fuelLevelPercent ?? 0) < 67);
    default:
      return records;
  }
}

export function buildProgress(stage: WorkOrderStage): ProgressStep[] {
  const order: WorkOrderStage[] = ['Not Started', 'Work Order Created', 'Field Tech Deployed', 'Resolved'];
  const stageIndex = order.indexOf(stage);

  return [
    { label: 'WO', completed: stageIndex >= 1 },
    { label: 'Dispatch', completed: stageIndex >= 2 },
    { label: 'Resolved', completed: stageIndex >= 3 },
  ];
}

export function stagePercent(stage: WorkOrderStage): number {
  const map: Record<WorkOrderStage, number> = {
    'Not Started': 12,
    'Work Order Created': 45,
    'Field Tech Deployed': 75,
    Resolved: 100,
  };

  return map[stage];
}

export function activeFilterLabel(filter: FilterToken): string {
  const labels: Record<FilterToken, string> = {
    ALL: 'All trouble sites',
    tested_any: 'All tested pumps',
    not_tested_any: 'All not tested pumps',
    electric_tested: 'Electric tested',
    diesel_tested: 'Diesel tested',
    electric_not_tested: 'Electric not tested',
    diesel_not_tested: 'Diesel not tested',
    in_service: 'In service',
    out_service: 'Impairments > 10 hours',
    fuel_ok: 'Diesel fuel > 67%',
    fuel_low: 'Diesel fuel < 67%',
  };

  return labels[filter];
}
