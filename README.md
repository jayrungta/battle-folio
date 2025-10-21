# Retro Pokémon-Style Portfolio Website

A data-driven, configuration-based Angular portfolio website with a retro Pokémon aesthetic.

## Features

- **Data-Driven Architecture**: All content is controlled through JSON configuration files
- **Dynamic Routing**: Routes are automatically generated from configuration
- **Retro Game Boy Aesthetic**: Pixel-perfect styling inspired by classic Pokémon games
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Component-Based**: Reusable components for different content types

## Project Structure

```
src/
├── assets/
│   ├── sprites/          # Custom sprites (trainer, UI elements, company logos)
│   ├── sounds/           # Audio files
│   ├── fonts/            # Custom fonts
│   └── data/
│       ├── site-config.json           # Master configuration
│       └── views/
│           ├── work-view.json         # Work experience configuration
│           ├── projects-view.json     # Projects configuration
│           ├── links-view.json        # Social links configuration
│           └── contact-view.json      # Contact information configuration
├── app/
│   ├── core/
│   │   ├── models/                    # TypeScript interfaces
│   │   └── services/
│   │       └── config.service.ts      # Configuration loading service
│   ├── shared/
│   │   └── components/
│   │       ├── pokemon-picker/        # Grid picker component
│   │       ├── item-bag/              # Bag-style list component
│   │       ├── dialog-box/            # Text dialog component
│   │       └── battle-menu/           # Menu component
│   └── features/
│       ├── battle/                    # Main battle screen (home page)
│       └── dynamic-view/              # Dynamic view renderer
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Navigate to the project directory:
   ```bash
   cd pokemon-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Configuration

### Master Configuration (`site-config.json`)

The master configuration file defines the main menu options and their corresponding routes:

```json
{
  "battleOptions": [
    {
      "id": "work",
      "label": "WORK",
      "route": "/work",
      "component": "pokemon-picker",
      "configFile": "views/work-view.json"
    }
  ]
}
```

### View Configurations

Each view has its own configuration file that defines the content and layout:

**work-view.json** (Pokemon Picker style):
```json
{
  "viewType": "pokemon-picker",
  "title": "Choose a Company",
  "items": [
    {
      "id": "company1",
      "name": "Company Name",
      "sprite": "assets/sprites/company-icon.png",
      "level": "Senior Engineer",
      "type": "Tech",
      "description": "Job description"
    }
  ]
}
```

**projects-view.json** (Item Bag style):
```json
{
  "viewType": "item-bag",
  "title": "Projects Bag",
  "items": [
    {
      "id": "project1",
      "name": "Project Name",
      "icon": "assets/sprites/project-icon.png",
      "description": "Project description"
    }
  ]
}
```

**contact-view.json** (Dialog Box style):
```json
{
  "viewType": "dialog-box",
  "title": "Get in touch!",
  "content": "Introduction text...",
  "items": [
    {
      "label": "Email",
      "value": "your.email@example.com"
    }
  ]
}
```

## Customization

### Adding New Sprites

1. Add your sprite images to `src/assets/sprites/`
2. Update the corresponding JSON configuration file with the sprite path
3. For best results, use pixelated images (64x64 or 32x32)

### Adding New Menu Options

1. Add a new entry to `battleOptions` in `site-config.json`
2. Create a corresponding view configuration file in `src/assets/data/views/`
3. The route will be automatically generated

### Styling

- Global styles: `src/styles.scss`
- Component-specific styles: Each component has its own `.scss` file
- Color palette can be customized in `styles.scss` under `:root`

## Available Components

### PokemonPickerComponent
- Grid layout for displaying items (work experience, skills, etc.)
- Shows sprite, name, level, and type
- Perfect for portfolio items that need visual representation

### ItemBagComponent
- List layout similar to Pokémon item bag
- Shows icon and description
- Ideal for projects, achievements, or tools

### DialogBoxComponent
- Text-based display with optional items
- Classic Pokémon dialog box aesthetic
- Great for contact info, about sections, or links

### BattleMenuComponent
- Main menu with options
- Automatically generated from configuration
- Handles navigation to different views

## Building for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Development

### Running Tests

```bash
ng test
```

### Code Scaffolding

Generate new components:
```bash
ng generate component component-name
```

### Linting

```bash
ng lint
```

## Architecture Highlights

- **Single Responsibility**: Each component has a single, well-defined purpose
- **Configuration Over Code**: Content changes don't require code modifications
- **Type Safety**: Full TypeScript support with strict mode enabled
- **Standalone Components**: Uses Angular's standalone component architecture
- **HTTP Client**: Asynchronous configuration loading with RxJS
- **Router Integration**: Dynamic routing based on configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Inspired by classic Pokémon Game Boy games and retro gaming aesthetics.
