# 🌐 PortfolioTechArt - Facundo Villarreal

Portfolio web personal desarrollado con **Astro**, diseñado para representar de forma equilibrada mi perfil como **Technical Artist**. El proyecto combina **arte visual** (cinemáticas, shaders, composiciones) con **fundamentos técnicos** (automatización, lógica, herramientas).

![Vista Previa del Portfolio](assets/img/screenshot-portfolio.jpg)
---

## 🎯 Objetivo del Proyecto

Mi propósito fue crear un espacio digital que represente de forma equilibrada **mi perfil técnico y artístico**, inspirado en los valores del rol de **Technical Artist**. Esto se traduce en una plataforma que permita visualizar:

- 🎨 *Cinemáticas, composiciones, shaders interactivos y recursos visuales*
- 🧠 *Automatización, lógica en Blueprints, snippets de código y herramientas técnicas*

Para ello, implementé un sistema de **switch de perfil (Artístico / Técnico)**, además del tradicional **modo claro / oscuro**, permitiendo al observador cambiar el enfoque del portfolio en tiempo real.

---

## 🚀 Características Clave

- ✨ **Perfil Técnico/Artístico**: Switch que modifica contenido y estilo según el enfoque seleccionado
- 🌒 **Tema claro/oscuro/sistema** con SVGs dinámicos, accesibilidad y persistencia en `localStorage`
- 🎞️ **Slider de imágenes interactivo** por proyecto
- 🧠 **Timeline dinámico** renderizado desde JSON (educación, experiencia, objetivos)
- 📹 **Video de cabecera embebido desde Vimeo** con reproducción automática
- 🌐 **Botones sociales** inyectados desde JSON con SVGs accesibles y responsive
- 💬 **Formulario de contacto** funcional via Formspree
- 📱 **Diseño responsive** para mobile, tablet, 16:9, y 2K/4K
- ⚙️ **Performance optimizada** con Astro y pipeline de imágenes:
  - Desktop: `Performance 100`, `SEO 100`, `Accesibilidad >95`
  - Mobile: `Performance >73`

---

## 🏗️ Arquitectura (Architecture Audit — 2026)

El proyecto fue auditado y refactorizado en **4 dominios técnicos**:

### 1. CSS Variable Integrity
- **Problema**: 9 variables CSS referenciadas pero no definidas en `:root`
- **Solución**: Alineación de nombres y definición explícita en `base.css`
- **Estado**: ✅ Completado

### 2. CSS Split (Modularización)
- **Problema**: `style.css` monolítico difícil de mantener
- **Solución**: Split en 3 archivos especializados:
  - `base.css` — Variables CSS y reset
  - `layout.css` — Estructuras padre, header, hero, grid
  - `components.css` — Botones, cards, modales, timeline, utilitarios
- **Estado**: ✅ Completado (style.css eliminado)

### 3. Image Pipeline
- **Problema**: 34 imágenes en `public/assets/` sin optimización (45.36 MB total)
- **Solución**: Migración a `astro:assets` con:
  - Componente `OptimizedImage.astro` reutilizable
  - Generación automática de AVIF + WebP + fallback
  - Reducción de peso ~80% con lazy loading
- **Estado**: ✅ Completado (PR #8)

### 4. Dead Code Removal
- **Problema**: Módulos JS sin usar o con lógica duplicada
- **Solución**: 
  - Eliminación de `updateFooterYear.js` (año del footer ahora en Astro)
  - Eliminación de `contactForm.js` (formulario migrado a Formspree)
  - Consolidación de lógica en `main.js`
- **Estado**: ✅ Completado

---

## 🧠 Metodología de Aprendizaje

Este proyecto forma parte de mi **Zettelkasten personal**, un sistema de gestión del conocimiento donde documento cada decisión, problema y solución aplicada.

### Log de aprendizaje:

- `18/04/2025`: Comienzo de la cursada en Front End (Tecnicatura en Desarrollo de Software)
- `28/05/2025`: Primer prototipo HTML/CSS. Estructura semántica. Sliders con LLMs.
- `31/05/2025`: Toggles de tema. Experimentación con SVGs. UX/UI para modos.
- `06/07/2025`: Sistema modular completo. Carga dinámica de proyectos y timeline.
- `09/07/2025`: Optimización PageSpeed, contraste, accesibilidad, performance móvil.
- `18-22/06/2026`: **Architecture Audit** con SDD — Migración a Astro, CSS split, image pipeline, dead code removal.

---

## 🧪 Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Astro** | Framework principal, SSR, optimización de assets |
| HTML5 / CSS3 / JS | Base semántica y lógica del sitio |
| JSON | Contenido externo desacoplado (proyectos, timeline, social) |
| Formspree | Envío de formularios sin backend |
| Vimeo | Hosting de video embebido |
| Lighthouse | Medición de performance y accesibilidad |
| GitHub Pages | Hosting gratuito con CI/CD |

---

## 📂 Estructura del Proyecto

```
src/
├── assets/           # Imágenes optimizadas con astro:assets
├── components/       # Componentes Astro (OptimizedImage, Footer, etc.)
├── layouts/          # Layouts base
├── styles/           # CSS modular (base, layout, components)
└── js/               # Lógica JavaScript (main.js, módulos)
public/
├── assets/           # Assets estáticos (favicon, etc.)
└── data/             # JSON de contenido (projects, timeline, social)
```

---

## 📎 Enlaces útiles

- 🔗 [Portfolio Online](https://facu041294.github.io/PortfolioTechArt/)
- 💻 [Repositorio en GitHub](https://github.com/facu041294/PortfolioTechArt)
- 🧑‍🎨 [ArtStation](https://www.artstation.com/facu041294)
- 👔 [LinkedIn](https://www.linkedin.com/in/facundovillarreal)

---

## 📩 Contacto

Si te interesa mi perfil técnico y artístico, podés contactarme desde el formulario en la sección "Conectemos", o vía [LinkedIn](https://www.linkedin.com/in/facundovillarreal).

---

## ⚖️ Licencia

Este proyecto es de uso personal con fines educativos y profesionales. Todos los assets y contenido pertenecen a Facundo Villarreal. El código puede consultarse para fines de aprendizaje.

---

> _"Del plano al píxel: un viaje técnico y artístico."_  
> — Facundo Villarreal
