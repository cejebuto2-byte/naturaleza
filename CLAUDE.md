# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LA NATURALEZA** is a demo web platform for managing solidarity contributions and climate alerts for disaster-affected areas. This is a **contest prototype** - all data is stored in memory (no real database), with focus on visual experience and concept demonstration rather than production-ready implementation.

**Core Purpose**: Demonstrate a platform concept for the Defensoría del Pueblo that manages solidarity contributions, georeferenced needs mapping, real-time tracking, community communication, educational content for children, early warning alerts, and system interoperability.

## Key Architecture Decisions

### Technology Stack
- **Backend**: NestJS with Express
- **Views**: Handlebars (express-handlebars) with Server-Side Rendering
- **Styling**: Tailwind CSS (compiled via CLI)
- **Data Storage**: In-memory arrays/objects (NO DATABASE)
- **Maps**: Leaflet.js (planned)
- **Charts**: Chart.js (planned)
- **PDF Generation**: jsPDF (planned)

### Handlebars Configuration
The application uses express-handlebars with a custom configuration in `src/main.ts`:
- Default layout: `main.hbs` (located in `views/layouts/`)
- Partials directory: `views/partials/`
- Custom helper: `eq` for equality comparisons
- Views use `.hbs` extension

Controllers use the `@Render('viewname')` decorator to render Handlebars templates and pass data as returned objects.

### Development Workflow
**Critical**: During development, you need TWO processes running simultaneously:
1. NestJS server with hot reload: `npm run start:dev`
2. Tailwind CSS watcher: `npm run build:css:watch`

The CSS is compiled from `src/styles.css` to `public/styles.css`. Changes to Tailwind classes require the CSS watcher to be running.

**Port conflicts**: The project includes a `prekill` script that runs `npx kill-port 3000` before starting dev server to avoid EADDRINUSE errors.

## Development Commands

```bash
# Install dependencies
npm install

# Development (run in separate terminals)
npm run start:dev              # Start NestJS with hot reload
npm run build:css:watch        # Watch and compile Tailwind CSS

# Build
npm run build:css              # Compile Tailwind CSS once
npm run build                  # Build entire project

# Production
npm run start:prod             # Run production build

# Testing
npm run test                   # Run unit tests
npm run test:e2e              # Run e2e tests
npm run test:cov              # Run tests with coverage

# Utilities
npm run format                # Format code with Prettier
npm run lint                  # Lint code with ESLint
npm run prekill               # Kill process on port 3000
```

## Module Structure Pattern

The application follows a modular NestJS architecture. Each module should follow this structure:

```
src/modules/[module-name]/
├── [module-name].controller.ts  # Routes and view rendering
├── [module-name].service.ts     # Business logic and data management
└── [module-name].module.ts      # Module definition
```

**Data Layer**: Mock data is stored in `src/data/[entity].data.ts` files and imported into services. Services maintain state in memory using arrays/objects.

**View Layer**: Each module has corresponding views in `views/[module-name]/` that are rendered server-side using Handlebars.

## Planned Module Architecture

The project documentation defines 8 core modules to implement:

1. **Dashboard** - Main control panel with real-time indicators
2. **Aportes** - Solidarity contributions (monetary, in-kind, volunteer time)
3. **Georreferenciacion** - Interactive map with affected zones
4. **Seguimiento** - Real-time tracking with charts and reports
5. **Comunicacion** - Community communication channel and reports
6. **Kids** - Educational module for children (LA NATURALEZA KIDS)
7. **Alertas** - Climate alerts and early warning system
8. **Interoperabilidad** - Integration dashboard (simulated)

**Important**: Most modules are NOT yet implemented. Only basic landing and dashboard views exist currently.

## Project Documentation

Comprehensive documentation exists in `Documentation/`:
- **PLAN_DE_TRABAJO.md** - Complete project plan with 11 implementation phases
- **DATOS_SIMULADOS.md** - Mock data catalog with realistic examples
- **ESTRUCTURA_MODULOS.md** - Technical architecture, routes, and component definitions
- **GUIA_INICIO_RAPIDO.md** - Quick start guide with code templates and week-by-week development order
- **README.md** - Documentation index and executive summary

**Refer to these documents** when implementing new features to maintain consistency with the planned architecture.

## View Rendering Pattern

Controllers use the `@Render()` decorator:

```typescript
@Get('route')
@Render('module/view')
methodName() {
  return { data: someData, title: 'Page Title' };
}
```

The returned object is passed to the Handlebars template as context.

## Handlebars Helpers

Currently registered helper:
- `eq(a, b)` - Equality comparison for conditionals

Additional helpers planned (see `Documentation/GUIA_INICIO_RAPIDO.md`):
- `formatNumber` - Format numbers with locale
- `formatCurrency` - Format as Colombian pesos
- `formatDate` - Format dates
- `json` - Convert objects to JSON
- `colorNecesidad` - Map need types to colors

## Static Assets

- **Public directory**: `public/`
- **Compiled CSS**: `public/styles.css` (generated from `src/styles.css`)
- **JS files**: `public/js/` (planned: main.js, mapa.js, charts.js, kids.js)
- **Images**: `public/images/`
- **Icons**: `public/icons/`

## Color System

Tailwind configuration uses custom colors (defined in documentation):
- Primary: Blue (`#1e40af`) - Institutional
- Secondary: Green (`#059669`) - Solidarity
- Accent: Orange (`#f59e0b`) - Alerts
- Kids module: Pink/Purple theme for child-friendly interface

Color mapping by need type (agua: blue, alimentos: orange, salud: red, vivienda: purple, educacion: green, psicosocial: pink).

## Data Management Approach

**NO DATABASE**: All data is stored in memory and resets on server restart. This is intentional for the demo.

**Pattern**:
1. Define mock data in `src/data/[entity].data.ts`
2. Import and clone data in service constructor
3. Services provide CRUD methods that mutate in-memory arrays
4. Data persists only during application runtime

Example structure from documentation:
```typescript
// src/data/aportes.data.ts
export const aportesData = [ /* mock data */ ];

// src/modules/aportes/aportes.service.ts
private aportes = [...aportesData]; // Clone initial data
```

## Git Workflow

Current branch: `master`

Modified files (as of session start):
- `public/styles.css` - Compiled Tailwind output
- `views/landing.hbs` - Landing page
- `views/layouts/main.hbs` - Main layout

Commit message convention (from documentation):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Formatting/styling
- `refactor:` - Code refactoring

## Development Priorities

This is a **contest demo** with specific priorities:
1. **Visual experience** over technical complexity
2. **Realistic mock data** over database integration
3. **UI/UX clarity** over advanced features
4. **Concept demonstration** over production readiness

Time estimate: 20-25 days of development across 11 phases (see PLAN_DE_TRABAJO.md).

## External Libraries Integration

Planned integrations (not yet implemented):
- **Leaflet.js** - Interactive maps with custom markers and clustering
- **Chart.js** - Statistical charts for tracking dashboard
- **jsPDF** - Certificate generation for contributions

Installation instructions and usage patterns documented in `Documentation/GUIA_INICIO_RAPIDO.md`.

## Responsive Design Strategy

Mobile-first approach using Tailwind breakpoints:
- Base: Mobile (<640px)
- `md:` - Tablet (768px+)
- `lg:` - Desktop (1024px+)

Pattern: Start with single-column mobile layouts, add complexity for larger screens.

## Important Constraints

- **NO authentication** - Use simulated user data
- **NO external API calls** - Simulate all integrations
- **NO persistent storage** - Data in memory only
- **NO real file uploads** - Simulate file attachment functionality
- **DO focus on visual design** - UI/UX is critical for demo success
- **DO use realistic data** - Names, numbers, and scenarios should be credible

## Route Planning

Currently implemented:
- `/` - Landing page
- `/dashboard` - Dashboard view

Planned routes (see ESTRUCTURA_MODULOS.md for full mapping):
- `/aportes/*` - Contribution forms and lists
- `/mapa` - Georeferenced zones map
- `/seguimiento` - Tracking dashboard
- `/comunicacion/*` - Community reports
- `/kids/*` - Educational module
- `/alertas/*` - Alert system
- `/interoperabilidad` - System integration view

## Windows Development Notes

This project is developed on Windows. Commands are compatible with both Windows CMD and Git Bash. The `kill-port` package is used for cross-platform port management.
