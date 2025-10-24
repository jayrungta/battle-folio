# Retro Pokémon-Style Battle Portfolio Website

A retro, Pokémon‑style portfolio you can actually fork and make your own. The UI is driven by JSON files, so swapping my details for yours is mostly editing data and dropping in your assets.

## What you get

- **Data-Driven Architecture**: All content is controlled through JSON configuration files
- **Dynamic Routing**: Routes are automatically generated from configuration
- **Retro Game Boy Aesthetic**: Pixel-perfect styling inspired by classic Pokémon games
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Component-Based**: Reusable components for different content types

## Quick start

Prereqs:
- Node 18+
- Angular CLI (`npm i -g @angular/cli`)

Run it locally:
```bash
npm install
npm start
# open http://localhost:4200
```

Build for production:
```bash
npm run build
# output in dist/
```

## Make it yours (5–10 mins)

1) Update the main config
- Edit `src/assets/data/site-config.json`
  - `pageTitle`: Your site's title
  - `trainerName`: Your name in the battle screen
  - `battleOptions`: Menu items and their routes
  - `emailConfig`: Your EmailJS IDs (or switch the contact page to a static dialog, see below)

2) Replace content per view
- Edit the JSON files in `src/assets/data/views/`
  - `work-view.json`: jobs/experience for the Pokémon‑style grid
  - `projects-view.json`: projects for the item‑bag list
  - `links-view.json`: social links or anything else
  - `contact-view.json`: copy for the contact page (used by the contact form)

3) Drop in your assets
- Images live in `src/assets/images/`
  - `trainers/trainer-sprite.png`: your trainer sprite
  - `companies/*.png`: logos used in work items
  - `items/backpack.png`: bag icon (optional)
- Sounds: `src/assets/sounds/battle.mp3` (replace if you want)
- Font: `src/assets/fonts/pokemon-font.ttf`

Update your JSON to point at the new assets, e.g. `assets/images/companies/my-logo.png`.

4) Contact form (EmailJS or static)
- The contact form reads `emailConfig` from `site-config.json`:
  ```json
  {
    "emailConfig": {
      "serviceId": "...",
      "templateId": "...",
      "publicKey": "..."
    }
  }
  ```
- Set up EmailJS and paste your IDs, or swap the contact menu item to a static dialog:
  - In `site-config.json`, change the contact option to:
    ```json
    {
      "id": "contact",
      "label": "CONTACT",
      "route": "/contact",
      "component": "dialog-box",
      "configFile": "views/links-view.json"
    }
    ```
  - Then put your email/links in `links-view.json`.

## How it works

- `site-config.json` defines the top‑level menu. Each option maps to a component and a view config file.
- Supported components out of the box:
  - `pokemon-picker` (grid) — great for work/skills
  - `item-bag` (list) — great for projects/tools
  - `dialog-box` (text + items) — great for about/links
  - `contact-form` — EmailJS‑powered contact form
- Routes are generated from your `battleOptions`. Add a new option and it appears in the menu and router automatically.

## Project layout (what you’ll touch most)

```
src/
├── assets/
│   ├── data/
│   │   ├── site-config.json
│   │   └── views/
│   │       ├── work-view.json
│   │       ├── projects-view.json
│   │       ├── links-view.json
│   │       └── contact-view.json
│   ├── images/
│   │   ├── trainers/trainer-sprite.png
│   │   ├── companies/*.png
│   │   └── items/backpack.png
│   ├── fonts/pokemon-font.ttf
│   └── sounds/battle.mp3
└── app/
    ├── features/battle/               # main screen
    └── features/dynamic-view/         # renders views from JSON
```

## Deployment

- Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
- Build with `npm run build`. Or let something like Vercel take care of it automatically!

## License

MIT — use it for your own portfolio, have fun, and share it forward.
