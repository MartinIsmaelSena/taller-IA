# Desarrollo Web desde Cero con Inteligencia Artificial
### Plataforma Educativa e Interactiva para Educación Secundaria Técnica (Informática)

Plataforma didáctica web interactiva, moderna y responsive desarrollada para estudiantes de nivel secundario técnico (orientación Informática, ~17 años), basada en la secuencia didáctica:
**«Desarrollo de páginas web desde cero con ayuda de Inteligencia Artificial».**

---

## 🚀 Características Principales

- **Recorrido Completo de 5 Clases:**
  - **Clase 1:** Fundamentos de la web, ideación grupal y organización de la información con IA.
  - **Clase 2:** Construcción de la primera versión de la página web con ayuda de IA (HTML & CSS).
  - **Clase 3:** Identidad visual, recursos multimedia y navegación.
  - **Clase 4:** Diseño adaptable (Responsive), revisión y ajustes de código con IA.
  - **Clase 5:** Publicación de la página web, muestra de proyectos y análisis de costos.
- **Estructura Pedagógica de 9 Pasos por Clase:**
  1. Presentación de la clase y contexto.
  2. ¿Qué vamos a aprender? (Objetivos formativos).
  3. Explicación conceptual en bloques visuales y ejemplos de prompts para IA.
  4. Ejemplos visuales y demostraciones.
  5. Actividades interactivas funcionales (corrección y feedback explicativo inmediato).
  6. Desafío práctico con cuaderno de notas persistente.
  7. Recursos externos oficiales («Seguí aprendiendo»: MDN, W3Schools, web.dev, Canva).
  8. Autoevaluación (Cuestionarios de opción múltiple y ¿Verdadero o Falso?).
  9. Resumen de lo aprendido (Ideas clave).
- **Herramientas y Actividades Interactivas Incluidas:**
  - Clasificador de tipos de sitios web (estática, dinámica, web app, CMS).
  - Inspector visual de la anatomía web (Header, Navbar, Hero, Sections, Footer).
  - Creador jerárquico de Mapa de Sitio (Sitemap interactivo).
  - Clasificador HTML vs CSS.
  - Reconocimiento de etiquetas semánticas.
  - Mini editor visual en tiempo real (Live Preview) con generación de código HTML/CSS instantáneo.
  - Selector de identidad visual (paletas 60-30-10 y tipografías en vivo).
  - Evaluador de idoneidad y optimización de imágenes (WebP, JPG, PNG).
  - Clasificador de hipervínculos y reparador de navegación rota (IDs y anclas).
  - Simulador de visualización en 3 dispositivos (Desktop, Tablet y Smartphone).
  - Detector de errores móviles y laboratorio interactivo de Media Queries CSS.
  - Actividad de emparejar conceptos (Dominio, Hosting, HTTPS, Mantenimiento).
  - Diagnosticador y calculadora de costos y necesidades según tipo de proyecto.
  - Lista de verificación (Checklist) para el Demo Day.
- **Proyecto Integrador «Nuestra Primera Página Web»:**
  - Ficha técnica interactiva editable del estudiante.
  - Rúbrica de autoevaluación.
  - Botón de exportación/copiado para entregar al docente e impresión limpia.
- **Persistencia sin Servidor:**
  - Guarda el progreso, puntajes de actividades y proyectos en `localStorage` del navegador sin requerir cuentas ni datos personales.
- **Totalmente Gratuito:**
  - Sin servicios pagos ni claves API comerciales requeridas.
  - Listo para desplegar en GitHub Pages o Netlify con costo $0.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Estilos:** Tailwind CSS
- **Iconografía:** Lucide React
- **Celebraciones:** Canvas Confetti

---

## 💻 Ejecución Local

Para ejecutar el proyecto en tu computadora:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

Abrí tu navegador en `http://localhost:5173/`.

---

## 🌐 Publicación Gratuita en GitHub Pages

El proyecto ya está preconfigurado con rutas relativas (`base: './'` en `vite.config.ts`) para compilar y publicarse en GitHub Pages:

```bash
# Compilar para producción
npm run build
```

La carpeta `dist/` resultante contiene todos los archivos estáticos listos para subir a la rama `gh-pages` o vincular directamente con GitHub Actions.
