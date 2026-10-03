export type IndicatorId =
  | 'urgency_or_threats'
  | 'suspicious_links'
  | 'requests_for_otp_pin'
  | 'unexpected_payment_request'
  | 'unrealistic_returns'
  | 'impersonation'
  | 'remote_access_request'
  | 'unusual_payment_methods'
  | 'independent_verification'
  | 'safe_reporting_recovery';

export type IndicatorCategory = 'risk' | 'defense';
export type IndicatorSeverity = 'critical' | 'high' | 'medium';

export interface IndicatorDefinition {
  id: IndicatorId;
  nameKey: string;
  descriptionKey: string;
  category: IndicatorCategory;
  severity: IndicatorSeverity;
  iconName: string;
}
