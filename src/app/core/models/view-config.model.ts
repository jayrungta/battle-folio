// Base interface for all view configurations
export interface ViewConfig {
  viewType: string;
  title: string;
  [key: string]: any; // Allow any additional properties for flexibility
}

// Dialog box item interface
export interface DialogBoxItem {
  label: string;
  value: string;
  link?: string; // Optional link field for clickable items
}

// Pokemon picker item interface
export interface PokemonPickerItem {
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

// Item bag item interface
export interface ItemBagItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}
