# Contexto y Reglas para el Agente de IA (AI_CONTEXT.md)

Este documento contiene las reglas, directrices y preferencias del usuario para el desarrollo y mantenimiento del **Portfolio de Technical Artist**.

## 📌 1. Reglas Generales de Contenido
- **Orden de los Proyectos:** Siempre que se agregue una **NUEVA CARD** de proyecto en `src/data/projects.json`, esta debe insertarse **al principio del array (índice 0)**. De esta forma, los proyectos más recientes aparecerán de primeros en la interfaz.
- **Rutas de Archivos:** Las imágenes de los proyectos se deben colocar en `public/assets/img/` y los documentos (como currículums o presentaciones) en `public/assets/pdf/`.

## 🎨 2. Directrices de Diseño y Estilo
- **Concepto Principal:** El portfolio debe **"gritar Technical Artist"**. Esto significa que el diseño debe sentirse premium, técnico, y sofisticado.
- **Dualidad de Perfiles:** El sitio maneja dos modos principales: **Artista** y **Técnico**. 
  - Esto se controla inyectando clases en el `<body>` (`.mode-artist` y `.mode-technical`).
  - La UI responde ocultando o mostrando textos descriptivos distintos para cada perfil (`.artist-desc` vs `.technical-desc`).
  - **Color primario:** Naranja para Artista, Cian Neón para Técnico.
- **CSS:** El proyecto utiliza **Vanilla CSS** con variables (`Custom Properties`). NO se debe utilizar TailwindCSS ni otras librerías de estilos a menos que el usuario lo solicite explícitamente.
- **Animaciones y Microinteracciones:** Utilizar transiciones fluidas, hover effects, flip 3D en isotipos, y cualquier detalle interactivo que aporte una sensación de software de alta calidad o game engine.

## ⚙️ 3. Arquitectura del Proyecto
- **Framework:** Astro (Deployado como Static Site).
- **Control de Modos:** La lógica de cambio de tema/perfil vive en los scripts dentro de `src/js/modules/` y se inicializan en un `script` islado para evitar destellos (FOUC) en el modo oscuro.
- **Vimeo / Medios:** Los embeds de videos se deben asegurar de tener clases responsivas (ej. `vimeo-embed-responsive` manteniendo aspect-ratio).
