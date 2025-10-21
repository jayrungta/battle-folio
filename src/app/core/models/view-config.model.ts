export interface ViewConfig {
  viewType: string;
  title: string;
  items: any[];
  [key: string]: any;
}

export interface WorkItem {
  id: string;
  name: string;
  sprite: string;
  level: string;
  type: string;
  description: string;
  stats: {
    years: string;
    skills: string[];
  };
}
