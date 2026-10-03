import { Scenario } from '../../types/scenarios';
import { scenario1_upi } from './scenario1_upi';
import { scenario2_kyc } from './scenario2_kyc';
import { scenario3_investment } from './scenario3_investment';
import { scenario4_support } from './scenario4_support';
import { scenario5_shopping } from './scenario5_shopping';

export const ALL_SCENARIOS: Scenario[] = [
  scenario1_upi,
  scenario2_kyc,
  scenario3_investment,
  scenario4_support,
  scenario5_shopping,
];

export const SCENARIOS_BY_ID: Record<string, Scenario> = ALL_SCENARIOS.reduce((acc, sc) => {
  acc[sc.id] = sc;
  return acc;
}, {} as Record<string, Scenario>);

export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS_BY_ID[id];
}
