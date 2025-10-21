export interface SiteConfig {
  battleOptions: BattleOption[];
}

export interface BattleOption {
  id: string;
  label: string;
  route: string;
  component: string;
  configFile: string;
}
