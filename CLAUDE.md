# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server (runs on port 28320 with Turbopack and pathpida watcher)
- `pnpm build` - Build for production (runs pathpida first, then Next.js build)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix

### Path Generation
This project uses pathpida for type-safe routing. The `pnpm dev` command automatically watches and regenerates paths.

## Architecture

### Project Overview
Shogi (Japanese chess) application built with Next.js 15, React 19, and TypeScript. 

**Current Phase**: Display game records (kifu) only
**Future Features**: AI evaluation and commentary, learning features, online multiplayer

### Key Technologies
- **Next.js 15** with App Router and Turbopack
- **React 19** with server components
- **TypeScript** for type safety
- **TailwindCSS v4** for styling
- **shadcn/ui** components (New York style, using Lucide icons)
- **pathpida** for type-safe routing
- **pnpm** for package management

### Directory Structure
```
src/
├── app/           # Next.js App Router pages
├── components/    # React components
│   ├── layout/   # Layout components (MainLayout, MainHeader, MainFooter)
│   ├── error/    # Error handling components
│   └── shadcn/   # shadcn/ui components
├── config/       # Configuration files
├── lib/          # Utilities and type-safe paths ($path.ts)
└── api/          # API routes
```

### Component Design Principles
- **Single Responsibility**: Each component handles one specific responsibility
- **shadcn/ui Base**: All components built on shadcn/ui foundation - add components as needed
- **Minimal Styling**: Keep decoration minimal during early development phase
- **Fine-Grained Components**: Break components into smaller, focused units
- Use MainLayout wrapper for consistent page structure
- Error boundaries implemented at root level
- Japanese language support (lang="ja")

### shadcn/ui Configuration
- Style: "new-york"
- Base color: neutral
- CSS variables enabled
- Icons: Lucide React
- Components path: `@/components/shadcn`

### Type-Safe Routing
- Uses pathpida for generated type-safe routes
- Import paths from `$path.ts`: `import { pagesPath } from '@/lib/$path'`
- Auto-regenerated during development

### Code Standards (DRY/SOLID Principles)

**DRY (Don't Repeat Yourself)**:
- Modularize any logic that appears in 2+ places
- Create shared components for repeated UI patterns
- Centralize constants and config values

**SOLID Principles**:
- **S**ingle Responsibility: One purpose per class/function with clear naming
- **O**pen/Closed: Extend without modifying existing code (Strategy pattern, DI)
- **L**iskov Substitution: Subtypes must be substitutable for base types
- **I**nterface Segregation: Split large interfaces into smaller, focused ones
- **D**ependency Inversion: depend on abstractions, not concretions

**Code Organization**:
- Define private functions/components below main component (abstract → concrete order for better readability)

## Documentation Reference

### Requirements and Implementation Guidelines
- **docs/requirements.md** - Project requirements and feature specifications
- **docs/design.md** - Component design principles and architecture guidelines
- **docs/codings.md** - Detailed coding standards (DRY/SOLID principles)

Always refer to these documentation files when implementing new features or making architectural decisions.