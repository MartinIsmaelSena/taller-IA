import type { LessonSummary } from '../types/lesson';

export const LESSONS_SUMMARY: LessonSummary[] = [
  {
    id: 1,
    slug: 'clase-1',
    number: 1,
    title: 'Fundamentos de la Web y Planificación con IA',
    subtitle: 'Comprendé la estructura web, definí tu audiencia y diseñá el mapa de tu sitio con asistencia de IA.',
    shortDescription: 'Tipos de páginas, anatomía visual (Header, Hero, Sections, Footer), objetivos, CTA y creación del sitemap.',
    duration: '45-60 min',
    iconName: 'Compass',
    accentColor: '#06b6d4', // cyan
    gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
  },
  {
    id: 2,
    slug: 'clase-2',
    number: 2,
    title: 'Primera Versión de la Web: HTML, CSS e IA',
    subtitle: 'Creá tu primera maqueta con generadores de IA y dominá las etiquetas HTML y estilos CSS esenciales.',
    shortDescription: 'Constructores con IA (Mixo, Hocoos), etiquetas HTML fundamentales, propiedades CSS y auditoría crítica.',
    duration: '50-65 min',
    iconName: 'Code2',
    accentColor: '#8b5cf6', // violet
    gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
  },
  {
    id: 3,
    slug: 'clase-3',
    number: 3,
    title: 'Identidad Visual, Multimedia y Navegación',
    subtitle: 'Dale vida y coherencia a tu sitio con paletas cromáticas, imágenes optimizadas, videos y enlaces que funcionan.',
    shortDescription: 'Branding, generación de imágenes con IA, formatos JPG/PNG/WebP, compresión y enlaces internos/externos.',
    duration: '50-60 min',
    iconName: 'Palette',
    accentColor: '#ec4899', // pink
    gradient: 'from-pink-500/20 via-pink-500/5 to-transparent',
  },
  {
    id: 4,
    slug: 'clase-4',
    number: 4,
    title: 'Diseño Adaptable (Responsive) y Ajustes con IA',
    subtitle: 'Asegurá que tu página se vea impecable en celulares, tablets y computadoras usando Media Queries y Flexbox.',
    shortDescription: 'Viewport, emulador DevTools, problemas móviles habituales, @media queries y cómo pedirle soluciones a la IA.',
    duration: '55-70 min',
    iconName: 'Smartphone',
    accentColor: '#10b981', // emerald
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
  },
  {
    id: 5,
    slug: 'clase-5',
    number: 5,
    title: 'Publicación, Muestra de Proyectos y Análisis de Costos',
    subtitle: 'Llevá tu web a Internet en servidores gratuitos, calculá costos reales y presentá tu proyecto con impacto.',
    shortDescription: 'Dominio, Hosting, HTTPS, GitHub Pages, Netlify, Vercel, costos reales y presentación final tipo pitch.',
    duration: '45-60 min',
    iconName: 'Rocket',
    accentColor: '#f59e0b', // amber
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
  },
];
