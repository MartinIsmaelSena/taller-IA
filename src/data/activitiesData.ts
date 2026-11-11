// Interactive activities data for all 5 classes

export interface SiteTypeScenario {
  id: string;
  scenario: string;
  options: ('Página estática' | 'Página dinámica' | 'Aplicación web' | 'CMS')[];
  correctAnswer: 'Página estática' | 'Página dinámica' | 'Aplicación web' | 'CMS';
  explanation: string;
}

export interface HtmlCssItem {
  id: string;
  action: string;
  correctCategory: 'HTML' | 'CSS';
  explanation: string;
}

export interface TagRecognitionItem {
  id: string;
  snippet: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LinkTypeItem {
  id: string;
  codeSnippet: string;
  purpose: string;
  correctType: 'Enlace interno (#id)' | 'Enlace externo (https://)' | 'Enlace de correo (mailto:)' | 'Enlace de WhatsApp';
  explanation: string;
}

export interface BrokenLinkItem {
  id: string;
  navLabel: string;
  hrefValue: string;
  targetSectionId: string;
  isBroken: boolean;
  issueDescription?: string;
  fixSuggestion?: string;
}

export interface ResponsiveIssueItem {
  id: string;
  name: string;
  description: string;
  isProblem: boolean;
  explanation: string;
}

export interface ProjectNeedsScenario {
  id: string;
  name: string;
  icon: string;
  description: string;
  hostingNeeded: string;
  domainNeeded: string;
  sslNeeded: string;
  databaseNeeded: string;
  approximateCost: string;
  recommendedPlatform: string;
}

// ------------------- CLASE 1 DATA -------------------

export const CLASE1_SITE_TYPES: SiteTypeScenario[] = [
  {
    id: 'st-1',
    scenario: 'La cafetería "El Molino" tiene una página donde muestra su carta con fotos de tostadas, precios y horarios. Los dueños no necesitan actualizarla todos los días ni los clientes crean cuentas.',
    options: ['Página estática', 'Página dinámica', 'Aplicación web', 'CMS'],
    correctAnswer: 'Página estática',
    explanation: '¡Correcto! Como el contenido no varía según el usuario ni procesa datos complejos, una página estática (HTML/CSS) es la solución más rápida, económica y segura.',
  },
  {
    id: 'st-2',
    scenario: 'Un portal de noticias deportivas como Olé o Clarín donde cada 5 minutos aparecen nuevos artículos redactados por diferentes periodistas desde un panel administrativo.',
    options: ['Página estática', 'Página dinámica', 'Aplicación web', 'CMS'],
    correctAnswer: 'CMS',
    explanation: '¡Excelente! Los portales de noticias usan un CMS (como WordPress) o un gestor de contenidos para que redactores publiquen noticias sin tener que escribir código.',
  },
  {
    id: 'st-3',
    scenario: 'Spotify Web Player o Google Drive, donde los usuarios inician sesión, crean listas de reproducción, suben archivos y colaboran en tiempo real.',
    options: ['Página estática', 'Página dinámica', 'Aplicación web', 'CMS'],
    correctAnswer: 'Aplicación web',
    explanation: '¡Exacto! Es una aplicación web completa con lógica de negocio, autenticación, base de datos e interactividad avanzada.',
  },
  {
    id: 'st-4',
    scenario: 'Una página del clima que muestra la temperatura exacta y el pronóstico de tu ciudad en este mismo instante.',
    options: ['Página estática', 'Página dinámica', 'Aplicación web', 'CMS'],
    correctAnswer: 'Página dinámica',
    explanation: '¡Muy bien! Es una página dinámica porque su contenido cambia en tiempo real consultando los datos de una API meteorológica.',
  },
];

// ------------------- CLASE 2 DATA -------------------

export const CLASE2_HTML_CSS_ITEMS: HtmlCssItem[] = [
  {
    id: 'hc-1',
    action: 'Agregar un título principal de bienvenida al inicio de la página.',
    correctCategory: 'HTML',
    explanation: 'HTML define la presencia del elemento mediante la etiqueta <h1>.',
  },
  {
    id: 'hc-2',
    action: 'Cambiar el color de fondo de la página a un azul oscuro (#0f172a).',
    correctCategory: 'CSS',
    explanation: 'CSS se encarga de la estética y los colores usando la propiedad background-color.',
  },
  {
    id: 'hc-3',
    action: 'Crear un párrafo con la historia de la escuela técnica.',
    correctCategory: 'HTML',
    explanation: 'HTML crea el bloque de texto utilizando la etiqueta de párrafo <p>.',
  },
  {
    id: 'hc-4',
    action: 'Hacer que las esquinas de un botón sean redondeadas.',
    correctCategory: 'CSS',
    explanation: 'CSS aplica el redondeado de bordes con la propiedad border-radius: 8px.',
  },
  {
    id: 'hc-5',
    action: 'Añadir una sección temática de "Proyectos Destacados".',
    correctCategory: 'HTML',
    explanation: 'HTML organiza la estructura semántica de contenidos con <section>.',
  },
  {
    id: 'hc-6',
    action: 'Separar los elementos dejando un margen exterior de 24 píxeles.',
    correctCategory: 'CSS',
    explanation: 'CSS controla el espaciado y márgenes exteriores con la propiedad margin.',
  },
];

export const CLASE2_TAG_ITEMS: TagRecognitionItem[] = [
  {
    id: 'tr-1',
    snippet: '<header>\n  <h1>Taller de Electrónica</h1>\n  <nav>...</nav>\n</header>',
    question: '¿Qué función cumple la etiqueta <header>?',
    options: [
      'Representa el encabezado o cabecera principal con el logotipo, título y menú.',
      'Crea una ventana emergente de publicidad.',
      'Define el pie de página con derechos reservados.',
      'Sirve únicamente para guardar contraseñas.',
    ],
    correctAnswer: 0,
    explanation: '¡Exacto! <header> es la etiqueta semántica para el encabezado superior de una página o sección.',
  },
  {
    id: 'tr-2',
    snippet: '<section id="nosotros">\n  <h2>¿Quiénes somos?</h2>\n  <p>Estudiantes de 6° año orientación Informática.</p>\n</section>',
    question: '¿Para qué se utiliza la etiqueta <section>?',
    options: [
      'Para reiniciar la computadora.',
      'Para agrupar un bloque temático independiente de contenido con su propio encabezado.',
      'Para escribir código secreto que nadie puede ver.',
      'Para obligar al usuario a ver un video.',
    ],
    correctAnswer: 1,
    explanation: '¡Correcto! <section> organiza el documento en capítulos o áreas lógicas de contenido.',
  },
  {
    id: 'tr-3',
    snippet: '<footer>\n  <p>&copy; 2026 Escuela Técnica N° 5 - Todos los derechos reservados.</p>\n</footer>',
    question: '¿Qué contiene convencionalmente la etiqueta <footer>?',
    options: [
      'El título gigante del principio.',
      'El pie de página con datos de contacto, autoría, derechos legales y redes sociales.',
      'La lista de productos del supermercado.',
      'Un juego online.',
    ],
    correctAnswer: 1,
    explanation: '¡Excelente! <footer> se ubica al final de la página para cerrar con información institucional y legal.',
  },
];

// ------------------- CLASE 3 DATA -------------------

export const CLASE3_LINK_ITEMS: LinkTypeItem[] = [
  {
    id: 'li-1',
    codeSnippet: '<a href="#contacto">Escribinos un mensaje</a>',
    purpose: 'Llevar al usuario hasta el formulario de contacto que está más abajo en la misma página.',
    correctType: 'Enlace interno (#id)',
    explanation: 'Usa el símbolo almohadilla (#) seguido del id de la sección ("contacto") para saltar dentro del mismo documento.',
  },
  {
    id: 'li-2',
    codeSnippet: '<a href="https://developer.mozilla.org/es/" target="_blank" rel="noopener noreferrer">Guía MDN</a>',
    purpose: 'Abrir la documentación oficial de Mozilla en una pestaña nueva.',
    correctType: 'Enlace externo (https://)',
    explanation: 'Comienza con protocolo https:// hacia un servidor externo a nuestro sitio web.',
  },
  {
    id: 'li-3',
    codeSnippet: '<a href="mailto:taller@tecnica5.edu.ar">Enviar consulta por mail</a>',
    purpose: 'Abrir el cliente de correo predeterminado del usuario para escribir a la escuela.',
    correctType: 'Enlace de correo (mailto:)',
    explanation: 'El prefijo mailto: le indica al sistema operativo que abra Thunderbird, Outlook o la app de correo.',
  },
  {
    id: 'li-4',
    codeSnippet: '<a href="https://wa.me/5491198765432?text=Hola,%20tengo%20una%20consulta">WhatsApp del Taller</a>',
    purpose: 'Abrir WhatsApp con un chat directo y mensaje predefinido.',
    correctType: 'Enlace de WhatsApp',
    explanation: 'Usa la API oficial wa.me para conectar directamente con un número telefónico.',
  },
];

export const CLASE3_BROKEN_LINKS: BrokenLinkItem[] = [
  {
    id: 'bl-1',
    navLabel: 'Inicio',
    hrefValue: '#inicio',
    targetSectionId: 'inicio',
    isBroken: false,
    issueDescription: 'El href coincide con el id="inicio". Funciona perfecto.',
  },
  {
    id: 'bl-2',
    navLabel: 'Proyectos',
    hrefValue: '#proyecto',
    targetSectionId: 'proyectos',
    isBroken: true,
    issueDescription: 'El enlace apunta a "#proyecto" (singular), pero la sección tiene id="proyectos" (plural). El navegador no encuentra el elemento y no se mueve.',
    fixSuggestion: 'Cambiar el enlace a href="#proyectos" o el id de la sección a id="proyecto".',
  },
  {
    id: 'bl-3',
    navLabel: 'Contacto',
    hrefValue: 'contacto',
    targetSectionId: 'contacto',
    isBroken: true,
    issueDescription: 'Falta el símbolo "#". Sin la almohadilla, el navegador intentará abrir un archivo nuevo llamado "contacto.html" en lugar de desplazarse por la misma página.',
    fixSuggestion: 'Agregar el "#": href="#contacto".',
  },
  {
    id: 'bl-4',
    navLabel: 'Docentes',
    hrefValue: '#equipo',
    targetSectionId: 'equipo',
    isBroken: false,
    issueDescription: 'El href="#equipo" coincide con id="equipo". Funciona correctamente.',
  },
];

// ------------------- CLASE 4 DATA -------------------

export const CLASE4_RESPONSIVE_ISSUES: ResponsiveIssueItem[] = [
  {
    id: 'ri-1',
    name: 'Desplazamiento horizontal indeseado (Scroll lateral)',
    description: 'La página se mueve de izquierda a derecha porque una imagen o contenedor tiene un ancho fijo en píxeles (ej: width: 900px).',
    isProblem: true,
    explanation: '¡Gran ojo! El scroll lateral es un problema grave en celulares. Se resuelve con max-width: 100% y anchos fluidos.',
  },
  {
    id: 'ri-2',
    name: 'Menú de navegación apilado en columna vertical',
    description: 'En el celular, los 4 enlaces del menú se ordenan uno debajo de otro para que sean fáciles de tocar.',
    isProblem: false,
    explanation: '¡Correcto! Esto NO es un error, sino una buena práctica de diseño adaptable (flex-direction: column).',
  },
  {
    id: 'ri-3',
    name: 'Botón de llamada a la acción con tamaño de 18 píxeles',
    description: 'El botón de "Inscribite" es tan diminuto que el usuario aprieta accidentalmente los textos que están al lado.',
    isProblem: true,
    explanation: '¡Excelente! Los botones móviles deben tener al menos 44 a 48 píxeles de altura para el dedo humano.',
  },
  {
    id: 'ri-4',
    name: 'Texto de párrafos con tamaño de 11 píxeles',
    description: 'La tipografía es tan chica que el estudiante debe hacer zoom con los dos dedos para poder leer el contenido.',
    isProblem: true,
    explanation: '¡Correcto! En móviles, la tipografía base debe ser de al menos 16 píxeles para garantizar lectura cómoda.',
  },
];

// ------------------- CLASE 5 DATA -------------------

export const CLASE5_MATCHING_PAIRS: { id: string; concept: string; definition: string }[] = [
  {
    id: 'mp-1',
    concept: 'Nombre de Dominio',
    definition: 'La dirección web legible (ej. www.miinstituto.edu.ar) que la gente escribe en el navegador.',
  },
  {
    id: 'mp-2',
    concept: 'Servicio de Hosting',
    definition: 'La computadora servidora conectada a Internet las 24 horas donde se alojan los archivos de la página.',
  },
  {
    id: 'mp-3',
    concept: 'Certificado HTTPS / SSL',
    definition: 'Protocolo de seguridad que cifra los datos entre usuario y servidor (el candado en la barra de direcciones).',
  },
  {
    id: 'mp-4',
    concept: 'Mantenimiento Web',
    definition: 'Tareas de actualización de contenidos, revisión de enlaces caídos y copias de seguridad.',
  },
];

export const CLASE5_PROJECT_SCENARIOS: ProjectNeedsScenario[] = [
  {
    id: 'sc-1',
    name: 'Página Informativa Escolar / Portfolio',
    icon: 'School',
    description: 'Sitio estático para mostrar las materias técnicas, fotos de talleres y horarios de cursada.',
    hostingNeeded: 'Hosting estático gratuito (GitHub Pages o Netlify)',
    domainNeeded: 'Subdominio gratuito (.github.io) o dominio escolar institucional',
    sslNeeded: 'Incluido de forma automática y gratuita en la plataforma',
    databaseNeeded: 'No requiere base de datos',
    approximateCost: '$0 (Completamente gratuito)',
    recommendedPlatform: 'GitHub Pages',
  },
  {
    id: 'sc-2',
    name: 'Tienda Online con Carrito y Pagos',
    icon: 'ShoppingBag',
    description: 'E-commerce para vender impresiones 3D con cobro por Mercado Pago, stock y cuentas de clientes.',
    hostingNeeded: 'Hosting dinámico con soporte de base de datos o plataforma SaaS (ej. Tiendanube o Shopify)',
    domainNeeded: 'Dominio propio obligatorio (.com o .com.ar)',
    sslNeeded: 'Certificado SSL de alta seguridad para pasarelas bancarias',
    databaseNeeded: 'Base de datos para clientes, productos y órdenes de compra',
    approximateCost: 'Desde $15 a $40 USD mensuales + comisión por venta',
    recommendedPlatform: 'Shopify / Tiendanube / Hosting Cloud',
  },
  {
    id: 'sc-3',
    name: 'Blog de Noticias Comunitario',
    icon: 'Newspaper',
    description: 'Portal del barrio donde 5 redactores publican novedades semanales y los vecinos comentan.',
    hostingNeeded: 'Hosting con PHP/MySQL o CMS headless',
    domainNeeded: 'Dominio propio (.com.ar)',
    sslNeeded: 'SSL gratuito (Let\'s Encrypt)',
    databaseNeeded: 'Base de datos relacional para artículos y comentarios',
    approximateCost: 'Aproximadamente $5 a $10 USD mensuales de hosting',
    recommendedPlatform: 'WordPress alojado o CMS moderno',
  },
];
