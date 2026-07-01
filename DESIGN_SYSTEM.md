# YO MAP - DESIGN SYSTEM

## Overview
Design system berbasis Figma untuk konsistensi UI di seluruh aplikasi YO MAP.
Semua values diambil 100% dari Figma Design File (JLTvAhZ2mJHiFSitGoLy3c, Page 2).

## File Structure
Semua tokens tersimpan di folder `lib/tokens/`:
- `colors.ts` - Color palette
- `typography.ts` - Font styles
- `spacing.ts` - Spacing scale
- `components.ts` - Component-specific tokens

## Color Palette

- **Primary Colors**: Main #003D76, Light #235591, dll.
- **Grays/Neutrals**: #F8F9FF, #F1F5F9, #E2E8F0, #C2C6D1, #737781, #6B7280, #5E656C, #424750, #151C22
- **Status Colors**: Success #1BC700, Warning #FFB86B, Danger #BA1A1A, Info #BFDBFE
- **Backgrounds**: #FFFFFF (Default), #F8F9FF (Secondary)

Contoh usage:
```typescript
import { colors } from '@/lib/tokens/colors'

// TypeScript
const buttonColor = colors.primary[500]

// Tailwind CSS
<div className="bg-primary-500 text-text-inverse">Hello</div>
```

## Typography

- **Font Family**: Plus Jakarta Sans, sans-serif
- **Base Sizes**: 10px (xs), 12px (sm), 14px (base), 16px (lg), 18px (xl), 24px (2xl), 32px (3xl), 48px (4xl)
- **Weights**: Light (300) to Black (900)

Contoh usage:
```typescript
import { typography } from '@/lib/tokens/typography'

// TypeScript
const h1Style = typography.styles.h1

// React component
<h1 className="text-3xl font-bold">Title</h1>
```

## Spacing

- **Base Padding/Gap**: 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 64px
- **Container Padding**: 16px (Mobile), 24px (Tablet), 32px (Desktop)

## Components

- **Button**: 
  - sm: 6px 12px, text 12px
  - md: 8px 16px, text 14px
  - lg: 12px 24px, text 16px
  - Border radius: 8px
- **Input**: Height 40px, Padding 8px 16px, Radius 8px
- **Card**: Padding 24px, Radius 12px, Shadow 0px 4px 15px 0px rgba(0,0,0,0.05)
- **Modal**: Max Width 512px, Padding 24px, Radius 16px
- **Border Radius**: 0px (none), 4px (sm), 8px (base), 12px (md), 16px (lg), 9999px (full)
- **Shadows**: sm, base, md, lg (based on Figma effects)

## Responsive Breakpoints

- **Mobile**: ~375px (auto layout behavior)
- **Tablet**: ~768px (auto layout behavior)
- **Desktop**: 1280px+ (Main container standard width)

## Usage Examples

### Using Colors
```tsx
<button className="bg-primary-500 hover:bg-primary-600 text-white">
  Button
</button>
```

### Using Typography
```tsx
<h1 className="text-3xl font-bold text-gray-900">Title</h1>
<p className="text-base text-gray-600">Description</p>
```

### Using Spacing
```tsx
<div className="flex gap-4 p-6">
  <div className="p-4 bg-gray-50 rounded-base">Item 1</div>
  <div className="p-4 bg-gray-50 rounded-base">Item 2</div>
</div>
```

## Design System Principles

1. **Consistency** - Semua styling harus gunakan design tokens
2. **Maintainability** - Update design di satu tempat, effect everywhere
3. **Scalability** - Easy to add new tokens kalau design berkembang
4. **Accessibility** - Semua colors tested untuk contrast ratio

## Updating Design System

Kalau design berubah di Figma:
1. Update value di file `lib/tokens/`
2. Tailwind config otomatis akan menggunakan value baru
3. Semua components yang pakai token akan update automatically

---

Generated from: FIGMA_DESIGN_AUDIT.md
Last updated: 2026-07-01
