# Quick Start Guide - Pokémon Portfolio

## 🚀 Running the Application

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   ng serve
   ```

3. **Open in browser:**
   Navigate to `http://localhost:4200`

## 📁 Project Overview

This is a **data-driven Angular portfolio** with a retro Pokémon Game Boy aesthetic. Everything is controlled through JSON configuration files - no code changes needed for content updates!

## 🎮 Key Features

### 1. Main Battle Screen (Home Page)
- Located at: `/`
- Component: `BattleComponent`
- Shows trainer sprite and menu with 4 options
- Menu is dynamically loaded from `site-config.json`

### 2. Dynamic Views
- Accessed via routes like `/work`, `/projects`, `/links`, `/contact`
- Component: `DynamicViewComponent`
- Automatically loads and renders the appropriate component based on configuration

### 3. Three Display Types

**Pokemon Picker** (Grid View)
- Used for: Work experience, skills, achievements
- Shows: Sprite, name, level, type
- Config: `work-view.json`

**Item Bag** (List View)
- Used for: Projects, tools, technologies
- Shows: Icon, name, description
- Config: `projects-view.json`

**Dialog Box** (Text View)
- Used for: Contact info, links, about
- Shows: Title, content, key-value pairs
- Configs: `links-view.json`, `contact-view.json`

## 🛠️ Customizing Content

### Step 1: Update Your Personal Info

**Edit contact-view.json:**
```json
{
  "viewType": "dialog-box",
  "title": "Get in touch!",
  "content": "Your introduction text here...",
  "items": [
    {
      "label": "Email",
      "value": "your.email@example.com"
    }
  ]
}
```

**Edit links-view.json:**
```json
{
  "viewType": "dialog-box",
  "title": "Connect with me!",
  "items": [
    {
      "label": "GitHub",
      "value": "github.com/yourusername"
    }
  ]
}
```

### Step 2: Add Your Work Experience

**Edit work-view.json:**
```json
{
  "viewType": "pokemon-picker",
  "title": "Choose a Company",
  "items": [
    {
      "id": "company1",
      "name": "Your Company Name",
      "sprite": "assets/sprites/company-logo.png",
      "level": "Your Position",
      "type": "Industry",
      "description": "What you did there",
      "stats": {
        "years": "2020-2023",
        "skills": ["Skill1", "Skill2", "Skill3"]
      }
    }
  ]
}
```

### Step 3: Add Your Projects

**Edit projects-view.json:**
```json
{
  "viewType": "item-bag",
  "title": "Projects Bag",
  "items": [
    {
      "id": "project1",
      "name": "Your Project Name",
      "icon": "assets/sprites/project-icon.png",
      "description": "Brief description of the project"
    }
  ]
}
```

## 🎨 Adding Custom Sprites

1. Create your sprite image (recommended: 64x64px for companies, 32x32px for projects)
2. Save it to `src/assets/sprites/`
3. Update the JSON config with the path: `assets/sprites/your-sprite.png`
4. The image will automatically use pixelated rendering for retro effect

## 🎭 Customizing Appearance

### Colors
Edit `src/styles.scss` and modify the color variables:
```scss
:root {
  --gb-dark: #0f380f;
  --gb-medium-dark: #306230;
  --pokemon-yellow: #ffde00;
  // ... customize these!
}
```

### Main Menu Options
Edit `src/assets/data/site-config.json`:
```json
{
  "battleOptions": [
    {
      "id": "work",
      "label": "WORK",           // Button text
      "route": "/work",          // URL path
      "component": "pokemon-picker",  // Display type
      "configFile": "views/work-view.json"  // Data source
    }
  ]
}
```

### Adding a New Menu Option

1. **Add to site-config.json:**
   ```json
   {
     "id": "skills",
     "label": "SKILLS",
     "route": "/skills",
     "component": "pokemon-picker",
     "configFile": "views/skills-view.json"
   }
   ```

2. **Create the view config file** (`views/skills-view.json`):
   ```json
   {
     "viewType": "pokemon-picker",
     "title": "Your Skills",
     "items": [
       {
         "id": "skill1",
         "name": "TypeScript",
         "sprite": "assets/sprites/ts-icon.png",
         "level": "Expert",
         "type": "Language"
       }
     ]
   }
   ```

3. **Done!** The route and button are automatically created.

## 🏗️ Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory - ready to deploy!

## 📦 Deployment Options

### Static Hosting (Netlify, Vercel, GitHub Pages)
1. Build: `npm run build`
2. Upload the `dist/` folder
3. Configure for SPA (single page app) routing

### Docker
```dockerfile
FROM nginx:alpine
COPY dist/pokemon-portfolio /usr/share/nginx/html
```

## 🐛 Troubleshooting

**Menu buttons not showing?**
- Check that `site-config.json` is valid JSON
- Make sure the file is in `src/assets/data/`

**Images not loading?**
- Verify the path starts with `assets/` (not `src/assets/`)
- Check that the image file exists
- Try using a relative path

**Route not working?**
- Ensure the route in `site-config.json` starts with `/`
- Check that the `configFile` path is correct
- Verify the view config JSON is valid

## 📚 Component Reference

### PokemonPickerComponent
- **Input:** `items[]`, `title`
- **Best for:** Work experience, achievements, team members
- **Layout:** Grid (responsive)

### ItemBagComponent
- **Input:** `items[]`, `title`
- **Best for:** Projects, tools, blog posts
- **Layout:** Vertical list

### DialogBoxComponent
- **Input:** `items[]`, `title`, `content`
- **Best for:** Contact info, about section, social links
- **Layout:** Text with optional key-value list

### BattleMenuComponent
- **Input:** `options[]`
- **Purpose:** Main navigation menu
- **Layout:** 2x2 grid (responsive)

## 🎯 Next Steps

1. Replace all placeholder content with your own
2. Add custom sprites/logos for companies and projects
3. Customize the color scheme to match your personal brand
4. Add sound effects (optional - files go in `assets/sounds/`)
5. Deploy to your hosting provider

## 💡 Tips

- Keep descriptions concise - this is a portfolio, not a resume
- Use high-contrast colors for readability
- Pixel art sprites work best (use tools like Piskel or Aseprite)
- Test on mobile devices - the layout is responsive
- Consider adding easter eggs for fun!

## 🤝 Need Help?

- Check the main README.md for detailed documentation
- Review the TypeScript interfaces in `src/app/core/models/`
- Look at existing JSON configs for examples

---

**Happy coding! May your portfolio be as legendary as a shiny Charizard! ✨**
