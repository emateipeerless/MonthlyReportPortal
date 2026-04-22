export type DriverType = 'Electric' | 'Diesel';
export type TestStatus = 'Tested' | 'Not Tested';
export type ImpairmentStatus = 'In Service' | 'Out >10h';
export type WorkOrderStage = 'Not Started' | 'Work Order Created' | 'Field Tech Deployed' | 'Resolved';

export interface SiteRecord {
  id: string;
  siteNumber: string;
  location: string;
  customer: string;
  region: string;
  driverType: DriverType;
  pumpTest: TestStatus;
  impairmentHours: number;
  impairmentStatus: ImpairmentStatus;
  fuelLevelPercent?: number;
  assetId: string;
  controller: string;
  impairmentType?: string;
  proposedFix?: string;
  workOrderStage?: WorkOrderStage;
}

export interface SummaryMetric {
  label: string;
  value: string;
  caption: string;
}

export interface PieSlice {
  id: string;
  label: string;
  value: number;
  color: string;
}

export type FilterToken =
  | 'ALL'
  | 'tested_any'
  | 'not_tested_any'
  | 'electric_tested'
  | 'diesel_tested'
  | 'electric_not_tested'
  | 'diesel_not_tested'
  | 'in_service'
  | 'out_service'
  | 'fuel_ok'
  | 'fuel_low';

export interface ProgressStep {
  label: string;
  completed: boolean;
}
