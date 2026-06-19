# Code Review Rules

## JavaScript
- Use const/let, never var
- No unused imports or dead code
- Prefer named exports

## TypeScript
- Strict mode enabled
- No any types
- Prefer interfaces for object shapes

## CSS
- Use CSS custom properties (variables) for colors, spacing, and transitions
- Follow BEM-like naming: `.block__element--modifier`
- Mobile-first media queries

## Astro
- Use frontmatter for data and imports
- Scoped styles by default (`<style>`)
- Use `:global()` sparingly and intentionally

## General
- Prefer composition over duplication
- Keep functions small and focused
- Spanish comments when extending existing Spanish comments
