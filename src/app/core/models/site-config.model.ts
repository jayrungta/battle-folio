export interface SiteConfig {
  trainerName: string;
  emailConfig: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
  battleOptions: BattleOption[];
}

export interface BattleOption {
  id: string;
  label: string;
  route: string;
  component: string;
  configFile: string;
}
