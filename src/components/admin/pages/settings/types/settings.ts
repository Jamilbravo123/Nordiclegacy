export interface AdminSettings {
  systemName: string;
  supportEmail: string;
  maintenanceMode: boolean;
  twoFactorRequired: boolean;
  strongPasswordPolicy: boolean;
  sessionTimeout: number;
  apiKey: string;
  webhookUrl: string;
}