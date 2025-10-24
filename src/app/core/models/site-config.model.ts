import { BattleOption } from './battle-option.model';

export interface SiteConfig {
  pageTitle: string;
  trainerName: string;
  emailConfig: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
  battleOptions: BattleOption[];
}
