import type { QuizQuestion, TrueFalseQuestion, MatchingPair } from '../types/lesson';

export interface ConceptBlock {
  title: string;
  badge?: string;
  description: string;
  details?: string[];
  example?: {
    label: string;
    code?: string;
    explanation?: string;
  };
  promptExample?: {
    tool: string;
    prompt: string;
    tip: string;
  };
}

export interface LessonContent {
  id: number;
  number: number;
  title: string;
  tagline: string;
  duration: string;
  introText: string;
  learningGoals: string[];
  concepts: ConceptBlock[];
  activitiesIntro: string;
  challenge: {
    title: string;
    instructions: string[];
    guidingQuestions: string[];
    sampleAnswerPlaceholder: string;
  };
  quiz: QuizQuestion[];
  trueFalse: TrueFalseQuestion[];
  matchingPairs?: MatchingPair[];
  takeaways: string[];
}

export const LESSONS_DATA: Record<number, LessonContent> = {
  1: {
    id: 1,
    number: 1,
    title: 'Fundamentos de la Web, Ideación Grupal y Organización de la Información con IA',
    tagline: 'Comprendé cómo funciona Internet, descubrí las partes de una página web y aprendé a planificar tu proyecto usando Inteligencia Artificial.',
    duration: '45-60 min',
    introText: '¡Bienvenido a la primera clase! Antes de escribir código o usar generadores automáticos, todo buen desarrollador web necesita entender qué piezas forman una página, a quién va dirigida y cómo organizar su contenido. En esta clase vas a dominar los conceptos esenciales y usarás la IA como tu socia creativa para planificar un proyecto web real.',
    learningGoals: [
      'Diferenciar entre páginas estáticas, dinámicas, sitios web, aplicaciones web y CMS.',
      'Identificar la anatomía visual de una página: Header, Navbar, Hero, Sections y Footer.',
      'Definir el propósito, la audiencia y las llamadas a la acción (CTA) de un proyecto.',
      'Crear un mapa de sitio (sitemap) claro para estructurar la navegación.',
      'Utilizar herramientas de Inteligencia Artificial (ChatGPT, Perplexity, You.com) como asistentes de ideación y planificación, aplicando siempre un criterio crítico.',
    ],
    concepts: [
      {
        title: '1. ¿Qué es una página web y qué tipos existen?',
        badge: 'Arquitectura Web',
        description: 'Un documento digital accesible mediante un navegador que combina texto, imágenes, enlaces y código. Según cómo se genere su contenido, distinguimos:',
        details: [
          '📄 Página web estática: Sus archivos (HTML, CSS, imágenes) se muestran exactamente iguales a todos los visitantes. Es ultrarrápida, segura y económica. Ejemplo: El menú o la carta digital de una cafetería de barrio.',
          '🔄 Página web dinámica: Su contenido cambia en tiempo real según el usuario, la base de datos o la hora. Ejemplo: Un portal de noticias que se actualiza minuto a minuto.',
          '🌐 Sitio web: Conjunto de varias páginas web interconectadas bajo un mismo dominio (por ejemplo, www.miinstituto.edu.ar con Inicio, Carreras, Contacto).',
          '📱 Aplicación web (Web App): Va más allá de informar: permite al usuario crear datos, interactuar y trabajar. Ejemplos cotidianos: Google Docs, Spotify Web, WhatsApp Web o Trello.',
          '🧩 CMS (Sistema de Gestión de Contenidos): Software que permite crear y modificar contenidos sin programar desde cero. El más conocido es WordPress.',
        ],
        example: {
          label: 'Comparativa rápida en la vida cotidiana',
          explanation: 'Si solo querés mostrar el horario de clases de tu escuela técnica, una web estática es perfecta. Si necesitás que los alumnos inicien sesión y carguen tareas, estás ante una aplicación web.',
        },
      },
      {
        title: '2. Anatomía visual de una página web moderna',
        badge: 'Estructura Semántica',
        description: 'Casi todas las páginas profesionales siguen un patrón visual que ayuda a las personas a navegar intuitivamente sin perderse:',
        details: [
          '🏷️ Header (Encabezado superior): Contiene la identidad de la web (logotipo o nombre) y suele dar la bienvenida inicial.',
          '🧭 Navbar (Barra de navegación): Menú con enlaces que llevan a las distintas partes del sitio o a páginas externas.',
          '🚀 Hero Section (Sección Principal de Impacto): Lo primero que ves sin hacer scroll. Tiene un título llamativo, una imagen o fondo potente y un botón de acción principal.',
          '📦 Sections (Secciones de contenido): Bloques temáticos intermedios (sobre nosotros, características, servicios, testimonios, galería).',
          '🦶 Footer (Pie de página): Ubicado al final de todo. Incluye derechos de autor, enlaces legales, redes sociales y datos de contacto.',
        ],
      },
      {
        title: '3. ¿Para quién creamos la web? Audiencia y Llamada a la Acción (CTA)',
        badge: 'Estrategia UX',
        description: 'Antes de tocar una sola línea de código, hacete cuatro preguntas clave:',
        details: [
          '🎯 ¿Qué queremos comunicar?: El mensaje central en una sola frase.',
          '👥 ¿A quién está dirigida?: Estudiantes, familias de la zona, clientes jóvenes o docentes.',
          '💡 ¿Qué necesidad resuelve?: Ahorrar tiempo, informar sobre un evento o permitir encargar un producto.',
          '⚡ CTA (Call to Action / Llamada a la Acción): El botón o enlace que guía al usuario hacia lo más importante. Ejemplos: "¡Inscribite al taller!", "Contactanos por WhatsApp", "Descargar temario".',
        ],
      },
      {
        title: '4. Mapa del sitio (Sitemap): Organizar antes de construir',
        badge: 'Planificación',
        description: 'Un mapa del sitio es un diagrama visual o jerarquía que muestra cómo se conectan las secciones principales de tu web.',
        details: [
          'Nivel 1: Inicio (Home) - Punto de partida.',
          'Nivel 2: Secciones principales (por ejemplo: Quiénes somos, Proyectos, Novedades, Contacto).',
          'Evita sitios sobrecargados: para un proyecto inicial, entre 3 y 5 secciones bien definidas son ideales.',
        ],
      },
      {
        title: '5. La Inteligencia Artificial como aliada en la planificación',
        badge: 'Herramientas de IA',
        description: 'Herramientas como ChatGPT, Perplexity o You.com son excelentes compañeras para vencer la "hoja en blanco" y generar propuestas iniciales.',
        details: [
          '🧠 Lluvia de ideas: Proponer temáticas para tu proyecto escolar o comunitario.',
          '📑 Propuestas de sitemap: Pedirle qué secciones no deberían faltar para una web de tu rubro.',
          '✍️ Redacción de borradores: Sugerir títulos atractivos y textos para la sección Hero.',
          '⚠️ ¡Atención crítica!: La IA no conoce el contexto exacto de tu escuela ni de tu barrio. Nunca copies y pegues a ciegas; vos decidís qué sirve, qué descartar y qué adaptar.',
        ],
        promptExample: {
          tool: 'ChatGPT o Perplexity',
          prompt: 'Actuá como un diseñador web educativo. Estoy creando una página web para el club de robótica de mi escuela técnica (alumnos de 17 años). Sugerime un nombre llamativo, un eslogan breve, una llamada a la acción (CTA) y un mapa de sitio con 4 secciones clave.',
          tip: 'Cuanto más contexto le des al prompt (a quién va dirigido, qué edad tienen, qué objetivo buscan), más útiles serán las respuestas generadas.',
        },
      },
    ],
    activitiesIntro: 'Poné a prueba lo aprendido con estas actividades interactivas. Cada ejercicio tiene corrección inmediata y explicaciones claras.',
    challenge: {
      title: 'Desafío de Ideación: La Ficha de tu Proyecto',
      instructions: [
        'Imaginá que tenés que crear una página web para un emprendimiento escolar, un club barrial, una cooperativa o un proyecto de tu orientación técnica.',
        'Definí el Nombre del proyecto, su Objetivo central, la Audiencia a la que apunta y la Llamada a la Acción (CTA).',
        'Detallá hasta 4 secciones que formarán el mapa del sitio.',
        'Podés consultar a una IA con un prompt como el del ejemplo de arriba para inspirarte.',
      ],
      guidingQuestions: [
        '¿Cuál es el propósito principal de tu página web?',
        '¿Quiénes van a visitarla con mayor frecuencia?',
        '¿Qué querés que haga el visitante apenas llegue a la sección Hero?',
      ],
      sampleAnswerPlaceholder: 'Ejemplo: "Proyecto: EcoRobot Técnica 5. Objetivo: Mostrar los robots recicladores que armamos en el taller y captar nuevos integrantes. Audiencia: Alumnos de 1° a 6° año. CTA: ¡Sumate al equipo este viernes! Secciones: Inicio, Proyectos, Galería, Contacto."',
    },
    quiz: [
      {
        id: 'q1-1',
        question: '¿Cuál es la principal diferencia entre una página web estática y una aplicación web?',
        options: [
          'Las páginas estáticas no tienen colores y las aplicaciones web sí.',
          'Las páginas estáticas muestran el mismo contenido fijo a todos los usuarios, mientras que una aplicación web permite interactuar y procesar datos dinámicos (como Spotify o Google Docs).',
          'Las aplicaciones web no necesitan conexión a Internet.',
          'Las páginas estáticas solo pueden verse en celulares.',
        ],
        correctAnswer: 1,
        explanation: '¡Exacto! Las páginas estáticas entregan archivos HTML/CSS ya preparados sin cambiar según el usuario, mientras que las aplicaciones web procesan información y permiten una interacción profunda.',
      },
      {
        id: 'q1-2',
        question: '¿En qué parte de una página web se ubica habitualmente la llamada a la acción principal (CTA) junto al mensaje más importante?',
        options: [
          'En el Footer, escondida al final.',
          'En la Hero Section (sección principal de presentación).',
          'En una ventana emergente de error.',
          'Únicamente en el código de la etiqueta <head>.',
        ],
        correctAnswer: 1,
        explanation: '¡Muy bien! La Hero Section es la primera pantalla visible. Es el lugar estratégico donde se coloca el título de alto impacto y el botón de acción principal.',
      },
      {
        id: 'q1-3',
        question: 'Al usar Inteligencia Artificial para planificar un sitio web, ¿cuál es la mejor práctica?',
        options: [
          'Copiar y pegar toda la respuesta generada sin leerla, porque la IA nunca se equivoca.',
          'Usar la IA como asistente de ideas, pero revisando críticamente cada sugerencia para adaptarla a la realidad del proyecto.',
          'Pedirle a la IA que decida por nosotros sin darle ninguna indicación.',
          'Evitar usar IA porque está prohibida en el desarrollo web moderno.',
        ],
        correctAnswer: 1,
        explanation: '¡Excelente! La IA es una aceleradora de ideas fantástica, pero el criterio humano y el conocimiento del contexto son indispensables.',
      },
    ],
    trueFalse: [
      {
        id: 'tf1-1',
        statement: 'Un sitemap o mapa de sitio es una lista o diagrama que organiza las diferentes secciones de una página web.',
        isTrue: true,
        explanation: 'Verdadero. El sitemap ayuda a estructurar la información y jerarquía antes de comenzar el diseño o la programación.',
      },
      {
        id: 'tf1-2',
        statement: 'WordPress es un ejemplo típico de CMS (Sistema de Gestión de Contenidos).',
        isTrue: true,
        explanation: 'Verdadero. Permite administrar páginas y artículos mediante un panel gráfico sin tener que escribir código desde cero.',
      },
      {
        id: 'tf1-3',
        statement: 'Una llamada a la acción (CTA) debe ser lo más confusa posible para que el usuario explore toda la pantalla.',
        isTrue: false,
        explanation: 'Falso. Una buena CTA debe ser clara, visible y directa, por ejemplo: "Inscribirme", "Pedir presupuesto" o "Ver catálogo".',
      },
    ],
    takeaways: [
      'Una web puede ser estática (ideal para información fija), dinámica o una web app con alta interacción.',
      'La estructura habitual está compuesta por: Header, Navbar, Hero, Sections y Footer.',
      'Definir a quién va dirigida la web y qué llamada a la acción (CTA) deseamos es el primer paso antes de programar.',
      'El sitemap evita la desorganización y define las páginas necesarias.',
      'La IA acelera la lluvia de ideas y la redacción de borradores, pero siempre debe pasar por tu criterio.',
    ],
  },

  2: {
    id: 2,
    number: 2,
    title: 'Construcción de la Primera Versión de la Página Web con Ayuda de IA',
    tagline: 'Creá tu primera maqueta con constructores de IA y aprendé cómo se ensamblan las etiquetas HTML y los estilos CSS.',
    duration: '50-65 min',
    introText: 'En esta clase daremos el salto a la acción: descubriremos cómo la inteligencia artificial puede maquetar una primera versión de nuestra web en cuestión de segundos y, lo más importante, aprenderemos a leer y comprender el código HTML y CSS que hay por detrás para tener el control total de nuestra creación.',
    learningGoals: [
      'Reconocer las tres vías para crear una web: código manual, constructores visuales y generadores con IA.',
      'Conocer herramientas de generación asistida (Mixo, Hocoos, Pineapple Builder) y sus características.',
      'Comprender la función estructural de HTML y sus etiquetas esenciales (html, head, body, header, h1-h6, p, section, footer).',
      'Entender el rol de CSS para dar color, tipografía, márgenes, bordes y distribución visual.',
      'Aprender a auditar y corregir el código o las páginas producidas por la IA para evitar textos genéricos o diseños rotos.',
    ],
    concepts: [
      {
        title: '1. ¿Cómo podemos crear una página web hoy en día?',
        badge: 'Enfoques de Desarrollo',
        description: 'Existen tres caminos principales y un desarrollador moderno suele combinarlos según la necesidad del proyecto:',
        details: [
          '⌨️ Escribir código HTML y CSS a mano: Máximo control, optimización y flexibilidad. Requiere dominar la sintaxis.',
          '🖱️ Constructores visuales (No-Code): Arrastrar y soltar bloques (como Wix o Webflow). Rápidos pero con menor libertad técnica.',
          '🤖 Generadores de páginas con IA: Describís tu idea en lenguaje natural y la IA genera la estructura inicial, textos e imágenes de base.',
        ],
      },
      {
        title: '2. Herramientas de creación asistida por IA',
        badge: 'Herramientas',
        description: 'Plataformas que permiten obtener una primera maqueta a partir de un prompt descriptivo:',
        details: [
          '⚡ Mixo.io: Especializada en landing pages rápidas. Genera hero, testimonios y formulario con un solo prompt (cuenta con versión de prueba gratuita).',
          '🪄 Hocoos AI: Diseña sitios con asistente interactivo por preguntas paso a paso para definir rubro y paleta.',
          '🍍 Pineapple Builder: Orientado a blogs y webs de proyectos, permitiendo editar secciones con apoyo de IA.',
          '📌 Regla de oro: Las plataformas suelen cambiar sus planes y funciones con frecuencia. Siempre revisá las condiciones de sus niveles gratuitos y nunca introduzcas datos bancarios para tareas escolares.',
        ],
      },
      {
        title: '3. ¿Qué es HTML? El esqueleto de la web',
        badge: 'HTML Semántico',
        description: 'HTML (HyperText Markup Language) no es un lenguaje de programación, sino un lenguaje de marcado que define qué elementos hay en la página:',
        details: [
          '<html>: La etiqueta raíz que envuelve todo el documento.',
          '<head>: La zona invisible para el usuario donde van el título de la pestaña (<title>), metadatos y enlaces a estilos.',
          '<body>: Todo el contenido visible: textos, botones, imágenes.',
          '<header>: Encabezado de la página o de una sección.',
          '<h1> al <h6>: Jerarquía de títulos (el <h1> es el título principal; solo debe haber uno por página).',
          '<p>: Párrafos de texto.',
          '<section>: Secciones temáticas independientes.',
          '<footer>: Pie de página con información de cierre.',
        ],
        example: {
          label: 'Estructura mínima de un documento HTML',
          code: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Club de Robótica</title>
  </head>
  <body>
    <header>
      <h1>Club de Robótica Técnica 5</h1>
    </header>
    <section>
      <p>Aprendemos a programar y armar prototipos autónomos.</p>
    </section>
    <footer>
      <p>&copy; 2026 - Taller de Informática</p>
    </footer>
  </body>
</html>`,
        },
      },
      {
        title: '4. ¿Qué es CSS? El maquillaje y la estética',
        badge: 'CSS Styling',
        description: 'CSS (Cascading Style Sheets) se encarga de cómo se ve el contenido de HTML:',
        details: [
          '🎨 Colores de texto y fondo: color, background-color.',
          '🔤 Tipografías y tamaños: font-family, font-size, font-weight.',
          '📐 Espaciado: padding (espacio interior) y margin (separación exterior).',
          '🔲 Bordes y redondeado: border, border-radius.',
          '📏 Anchos y límites: width, max-width, height.',
        ],
        example: {
          label: 'Ejemplo de regla CSS',
          code: `/* Selecciona el botón de acción */
.btn-cta {
  background-color: #06b6d4; /* Color cian */
  color: #0f172a;            /* Texto oscuro */
  padding: 12px 24px;        /* Espacio interno */
  border-radius: 8px;        /* Esquinas suaves */
  font-weight: bold;
}`,
        },
      },
      {
        title: '5. La importancia de revisar el resultado de la IA',
        badge: 'Control de Calidad',
        description: 'Un sitio generado por IA es solo un primer borrador. Una página profesional requiere que revises 7 puntos clave:',
        details: [
          '1. Textos genéricos: Reemplazar el típico "Somos líderes en soluciones integrales" por tu mensaje real.',
          '2. Botones sin destino: Verificar que los botones lleven a una sección o enlace real.',
          '3. Imágenes descolgadas: Sustituir fotos de stock por imágenes de tu proyecto o escuela.',
          '4. Legibilidad: Asegurar buen contraste entre el color del texto y el fondo.',
          '5. Navegación: Comprobar que los enlaces del menú funcionen.',
          '6. Datos de contacto: Asegurar que los correos y teléfonos sean auténticos.',
          '7. Coherencia: Que el estilo represente la personalidad de tu grupo o institución.',
        ],
      },
    ],
    activitiesIntro: 'Practicá distinguiendo entre estructura (HTML) y diseño (CSS), descubrí la función de cada etiqueta y experimentá en vivo con un editor interactivo.',
    challenge: {
      title: 'Desafío de Auditoría: Reparando la Web Rota de la IA',
      instructions: [
        'A continuación vas a ver una página generada automáticamente por IA que tiene varios problemas clásicos.',
        'Identificá al menos tres errores (por ejemplo: título confuso, botón sin acción, texto de relleno o contraste ilegible).',
        'Escribí qué modificaciones harías en HTML o CSS para dejarla lista para su uso.',
      ],
      guidingQuestions: [
        '¿El título explica claramente de qué se trata el sitio?',
        '¿El botón de acción invita a una acción concreta?',
        '¿El texto parece escrito por una persona o es una traducción automática genérica?',
      ],
      sampleAnswerPlaceholder: '1. El título "Soluciones Globales" es muy abstracto; lo cambiaría por "Taller de Impresión 3D Escolar".\n2. El botón dice "Hacé clic aquí" sin destino; le pondría "Ver catálogo de piezas" y enlace a #catalogo.\n3. El texto de fondo amarillo con letras blancas no se lee; cambiaría el color del texto a negro con CSS.',
    },
    quiz: [
      {
        id: 'q2-1',
        question: '¿Qué lenguaje se encarga de definir los textos, encabezados, párrafos y botones en una web?',
        options: [
          'CSS (Cascading Style Sheets).',
          'HTML (HyperText Markup Language).',
          'SQL (Structured Query Language).',
          'Photoshop.',
        ],
        correctAnswer: 1,
        explanation: '¡Correcto! HTML es el lenguaje de estructura que define los bloques y contenidos de la página.',
      },
      {
        id: 'q2-2',
        question: '¿Para qué sirve la etiqueta <head> en un archivo HTML?',
        options: [
          'Para escribir el párrafo más largo del sitio web.',
          'Para contener información interna del documento que no se muestra directamente en la página, como el título de la pestaña o metadatos.',
          'Para poner el pie de página.',
          'Para insertar videos de YouTube.',
        ],
        correctAnswer: 1,
        explanation: '¡Excelente! <head> contiene metadatos, enlaces a fuentes y estilos, mientras que el contenido visual va en <body>.',
      },
      {
        id: 'q2-3',
        question: '¿Por qué NO debemos considerar terminado un sitio web inmediatamente después de generarlo con una herramienta de IA?',
        options: [
          'Porque la IA siempre borra los archivos a los 5 minutos.',
          'Porque suele generar textos genéricos, imágenes de relleno y botones sin enlaces reales que deben personalizarse.',
          'Porque los sitios con IA son ilegales en Argentina.',
          'Porque el código CSS generado por IA no es compatible con pantallas.',
        ],
        correctAnswer: 1,
        explanation: '¡Exacto! La IA propone una base rápida, pero el estudiante debe revisar, personalizar y ajustar el contenido real.',
      },
    ],
    trueFalse: [
      {
        id: 'tf2-1',
        statement: 'Solo debe existir una etiqueta <h1> principal por cada página web para mantener una jerarquía clara.',
        isTrue: true,
        explanation: 'Verdadero. El <h1> representa el tema principal de la página y es crucial para la accesibilidad y los buscadores.',
      },
      {
        id: 'tf2-2',
        statement: 'Con la propiedad CSS "background-color" podemos cambiar el color de fondo de un contenedor o botón.',
        isTrue: true,
        explanation: 'Verdadero. background-color define el color de fondo de cualquier elemento HTML.',
      },
      {
        id: 'tf2-3',
        statement: 'HTML se encarga de animar los colores y definir el tamaño de letra de los párrafos.',
        isTrue: false,
        explanation: 'Falso. Eso es tarea de CSS. HTML solo crea el párrafo (<p>); CSS le da tamaño y color.',
      },
    ],
    takeaways: [
      'HTML define la estructura y el contenido (qué hay en la página).',
      'CSS define el diseño visual y la apariencia (cómo se ve).',
      'Las herramientas de IA como Mixo o Pineapple Builder permiten generar un primer borrador en minutos.',
      'Un sitio web nunca está listo solo con el clic de la IA: requiere auditoría de textos, colores, imágenes y enlaces.',
      'La jerarquía de títulos (h1 a h6) y las etiquetas semánticas hacen que una web sea accesible y profesional.',
    ],
  },

  3: {
    id: 3,
    number: 3,
    title: 'Identidad Visual, Creación de Recursos Multimedia y Navegación de la Página Web',
    tagline: 'Construí una estética sólida, optimizá imágenes para máxima velocidad e implementá enlaces internos y externos sin errores.',
    duration: '50-60 min',
    introText: 'Una página web puede tener un gran texto, pero si sus colores desentonan, sus imágenes tardan 10 segundos en cargar o sus botones no llevan a ningún lado, la experiencia del usuario se arruina. En esta clase vas a crear la identidad visual de tu proyecto, aprenderás a optimizar recursos multimedia y dominarás los hipervínculos.',
    learningGoals: [
      'Construir una identidad visual armónica: logotipo, paleta de colores coherente y tipografías legibles.',
      'Generar imágenes pertinentes mediante prompts de IA en plataformas con opciones gratuitas (como Canva).',
      'Comprender los formatos de imagen (JPG, PNG, WebP) y la importancia de la compresión para la velocidad de carga.',
      'Incorporar videos correctamente mediante incrustación (embeds) o reproductores nativos.',
      'Configurar enlaces internos mediante identificadores (#seccion), enlaces externos seguros y enlaces de contacto directo (mailto y WhatsApp).',
    ],
    concepts: [
      {
        title: '1. ¿Qué es la identidad visual y por qué importa?',
        badge: 'Diseño & Branding',
        description: 'La identidad visual es el conjunto de elementos gráficos que transmiten la personalidad y seriedad de tu sitio web:',
        details: [
          '🎨 Paleta de colores: Se recomienda la regla 60-30-10 (60% color dominante neutro, 30% color secundario de soporte, 10% color de acento llamativo para botones y CTA).',
          '🔤 Tipografía: Máximo dos familias tipográficas (una para títulos con personalidad y otra muy legible para textos largos).',
          '🏷️ Logotipo o isotipo: Sencillo, reconocible y con buen contraste sobre fondo claro y oscuro.',
          '🖼️ Estilo fotográfico: Mantener un tono coherente (todas fotos reales de taller, o todas ilustraciones con estilo similar).',
        ],
        example: {
          label: 'Ejemplo de paleta para escuela técnica',
          explanation: 'Fondo oscuro pizarra (#0f172a, 60%), gris claro para textos legibles (#e2e8f0, 30%) y cian eléctrico (#06b6d4, 10%) para botones de acción y títulos.',
        },
      },
      {
        title: '2. Creación y selección de imágenes con IA',
        badge: 'Multimedia con IA',
        description: 'Podemos usar generadores de imágenes con opciones gratuitas (como Canva Magic Media) para enriquecer el sitio:',
        details: [
          '🎯 La imagen debe reforzar el mensaje: Si tu web es de un club de ciencias, una foto de chicos con batas en un laboratorio comunica mucho más que un dibujo abstracto.',
          '🗣️ Prompts descriptivos: Especificá el sujeto, la iluminación, el estilo (fotografía realista, render 3D) y el encuadre (primer plano, panorámica).',
          '🚫 Evitá clichés: No abuses de imágenes con robots sosteniendo manos humanas o cerebros con luces de neón a menos que sea el tema exacto.',
        ],
        promptExample: {
          tool: 'Canva / Generador de imágenes',
          prompt: 'Fotografía realista de un grupo de estudiantes de secundaria técnica de 17 años trabajando en una mesa con cables, placas Arduino y soldadores, iluminación natural de taller, plano medio.',
          tip: 'Añadir "fotografía realista con luz natural" ayuda a evitar resultados artificiales o caricaturescos.',
        },
      },
      {
        title: '3. Optimización de imágenes: La clave de la velocidad',
        badge: 'Rendimiento Web',
        description: 'Subir fotos directas del celular (de 8 a 15 Megabytes) hace que la web tarde una eternidad en cargar en un teléfono móvil con datos lentos:',
        details: [
          '📷 JPG / JPEG: Bueno para fotografías con muchos colores, pero no soporta transparencias.',
          '🖼️ PNG: Ideal para logotipos e íconos con fondos transparentes. Suele ser más pesado.',
          '🚀 WebP: El formato moderno estándar para la web. Pesa entre 30% y 50% menos que un JPG manteniendo excelente nitidez.',
          '⚖️ Regla práctica: Para la web, intentá que ninguna imagen supere los 200 KB a 300 KB.',
        ],
      },
      {
        title: '4. Incorporación de videos en una web',
        badge: 'Video Web',
        description: 'El video puede explicar en 30 segundos lo que llevaría varias páginas de texto:',
        details: [
          '📺 Opción recomendada (Embed): Alojar el video en YouTube o Vimeo e incrustarlo con la etiqueta <iframe>. No consume ancho de banda de tu servidor y se adapta a la velocidad del usuario.',
          '🎞️ Opción nativa (<video>): Para clips muy cortos o bucles de fondo sin sonido. Debe ser un archivo .mp4 ligero.',
        ],
      },
      {
        title: '5. Navegación y enlaces: Conectando la web',
        badge: 'Hipervínculos HTML',
        description: 'Un hipervínculo se crea con la etiqueta <a> y el atributo href. Existen cuatro tipos indispensables:',
        details: [
          '📍 Enlace interno a sección (#id): Salta a una parte de la misma página. Requiere que la sección destino tenga ese id. Ejemplo: <a href="#proyectos">Ver Proyectos</a> llevará a <section id="proyectos">.',
          '🌐 Enlace externo a otro sitio: Lleva a otra web en Internet. Ejemplo: <a href="https://github.com" target="_blank" rel="noopener noreferrer">Visitar GitHub</a>.',
          '✉️ Enlace de correo directo: Abre el gestor de correo del usuario. Ejemplo: <a href="mailto:taller@escuela.edu.ar">Escribinos</a>.',
          '💬 Enlace a WhatsApp: Abre la app de mensajería con un mensaje preconfigurado. Ejemplo: <a href="https://wa.me/5491112345678?text=Hola%20taller">Chatear por WhatsApp</a>.',
        ],
        example: {
          label: 'Código de enlaces en acción',
          code: `<!-- Enlace a sección interna -->
<a href="#contacto">Ir al formulario</a>

<!-- Enlace externo seguro en nueva pestaña -->
<a href="https://www.w3schools.com" target="_blank" rel="noopener noreferrer">
  Documentación W3Schools
</a>

<!-- Enlace de contacto -->
<a href="mailto:info@miweb.com">Enviar Correo</a>`,
        },
      },
    ],
    activitiesIntro: 'Experimentá con paletas de color sobre una página modelo, detectá imágenes pertinentes, clasificá tipos de enlaces y encontrá por qué fallan los enlaces rotos.',
    challenge: {
      title: 'Desafío Multimedia y Navegación Integrada',
      instructions: [
        'Pensá en tu proyecto de página web y definí su identidad visual completa.',
        'Elegí una paleta de 3 colores (dominante, secundario y acento).',
        'Planificá un enlace interno hacia tu sección de contacto, un enlace externo seguro a una fuente de información y un enlace de mensajería rápida (WhatsApp o mailto).',
        'Verificá que los identificadores de tus secciones coincidan exactamente con los valores del href.',
      ],
      guidingQuestions: [
        '¿Tus tres colores tienen suficiente contraste para que el texto sea fácil de leer?',
        '¿El formato de tus fotos es WebP o JPG comprimido?',
        '¿Por qué es importante incluir target="_blank" y rel="noopener noreferrer" al abrir sitios externos?',
      ],
      sampleAnswerPlaceholder: 'Mi proyecto "EcoRobot":\n- Color de fondo: #0f172a (Azul profundo)\n- Color de acento: #10b981 (Verde esmeralda reciclaje)\n- Enlace interno: <a href="#equipo">Conocé a los alumnos</a> apuntando a <section id="equipo">\n- Enlace externo: <a href="https://arduino.cc" target="_blank" rel="noopener noreferrer">Plataforma Arduino</a>\n- Contacto: <a href="https://wa.me/5491100000000">WhatsApp del Club</a>',
    },
    quiz: [
      {
        id: 'q3-1',
        question: '¿Qué formato de imagen es el más recomendado hoy para la web por su excelente compresión sin pérdida de calidad?',
        options: [
          'BMP (Bitmap pesado sin comprimir).',
          'WebP.',
          'TIFF.',
          'GIF animado de 50 MB.',
        ],
        correctAnswer: 1,
        explanation: '¡Excelente! WebP fue creado específicamente para la web y reduce drásticamente el peso de las imágenes manteniendo gran calidad.',
      },
      {
        id: 'q3-2',
        question: 'Para que un enlace <a href="#galeria"> funcione correctamente, ¿qué requisito debe cumplirse en la página?',
        options: [
          'Debe existir un archivo llamado galeria.html en otra carpeta.',
          'Debe existir un elemento en la página con el atributo id="galeria" (por ejemplo: <section id="galeria">).',
          'Se debe pagar una suscripción a Google.',
          'El usuario debe apretar la tecla F5.',
        ],
        correctAnswer: 1,
        explanation: '¡Muy bien! El símbolo # indica un ancla hacia un elemento que comparta exactamente ese mismo valor en su id.',
      },
      {
        id: 'q3-3',
        question: '¿Cómo se escribe un enlace que abra la aplicación de correo electrónico para escribir a contacto@taller.edu.ar?',
        options: [
          '<a href="correo:contacto@taller.edu.ar">',
          '<a href="mailto:contacto@taller.edu.ar">',
          '<a href="http://gmail/contacto@taller.edu.ar">',
          '<a href="#email-enviar">',
        ],
        correctAnswer: 1,
        explanation: '¡Correcto! El protocolo "mailto:" le indica al navegador que debe abrir el cliente de correo predeterminado del dispositivo.',
      },
    ],
    trueFalse: [
      {
        id: 'tf3-1',
        statement: 'Subir imágenes de 10 MB a un sitio web es una buena práctica porque se ven en ultra alta definición sin afectar la velocidad.',
        isTrue: false,
        explanation: 'Falso. Las imágenes pesadas hacen que la página tarde mucho en cargar, consumen el plan de datos móviles de los visitantes y perjudican la experiencia de usuario.',
      },
      {
        id: 'tf3-2',
        statement: 'En la regla de diseño 60-30-10, el 10% corresponde al color de acento llamativo para guiar la atención hacia botones y llamadas a la acción.',
        isTrue: true,
        explanation: 'Verdadero. Ese 10% de contraste resalta los elementos clave como los botones de compra o registro.',
      },
      {
        id: 'tf3-3',
        statement: 'Al colocar enlaces externos con target="_blank", se recomienda agregar rel="noopener noreferrer" por seguridad y rendimiento.',
        isTrue: true,
        explanation: 'Verdadero. Evita que la página externa tenga acceso al objeto window.opener de tu sitio y previene vulnerabilidades.',
      },
    ],
    takeaways: [
      'Una identidad visual coherente (paleta 60-30-10, tipografía legible) genera confianza y profesionalismo.',
      'Las imágenes deben aportar valor al contenido y tener peso optimizado (formato WebP o JPG comprimido, menos de 300 KB).',
      'Para videos, incrustar un reproductor de YouTube o Vimeo es más eficiente que subir archivos pesados al propio servidor.',
      'Los enlaces internos requieren identificadores que coincidan (<a href="#seccion"> -> <section id="seccion">).',
      'Los hipervínculos externos, de correo (mailto) y WhatsApp permiten interactuar directamente con la comunidad.',
    ],
  },

  4: {
    id: 4,
    number: 4,
    title: 'Diseño Adaptable (Responsive), Revisión de Elementos y Ajustes de Código con IA',
    tagline: 'Garantizá que tu página se adapte fluidamente a celulares, tablets y monitores usando Media Queries, Flexbox y prompts inteligentes.',
    duration: '55-70 min',
    introText: 'Más del 70% del tráfico web actual proviene de teléfonos celulares. Si tu página se desborda horizontalmente, sus botones son demasiado pequeños para el dedo o sus textos son microscópicos, los usuarios la abandonarán en segundos. En esta clase vas a dominar el diseño adaptable y aprenderás a pedirle a la IA soluciones precisas de código CSS.',
    learningGoals: [
      'Comprender qué es el diseño web responsive y cómo se comporta una página en computadoras, tablets y celulares.',
      'Identificar los errores móviles más habituales: desborde horizontal (overflow), botones diminutos y tipografía ilegible.',
      'Aprender a utilizar las DevTools (F12) del navegador para simular distintas resoluciones de pantalla.',
      'Escribir y comprender reglas CSS con Media Queries (@media (max-width: ...)) y Flexbox.',
      'Formular prompts estructurados a la IA para diagnosticar y solucionar problemas específicos de maquetación.',
    ],
    concepts: [
      {
        title: '1. ¿Qué es el diseño responsive y qué cambia entre pantallas?',
        badge: 'Diseño Adaptable',
        description: 'El diseño responsive hace que los elementos de una web se reorganicen, encojan o apilen según el ancho de la pantalla:',
        details: [
          '💻 Computadora (Desktop > 1024px): Mucho espacio horizontal. Los menús son horizontales, el contenido se divide en 3 o 4 columnas y las fotos son amplias.',
          '📱 Tablet (768px a 1024px): Espacio moderado. Suelen usarse 2 columnas y los márgenes laterales se reducen.',
          '📲 Celular (< 600px): Pantalla vertical estrecha. Las columnas se apilan una debajo de otra (1 columna), los menús se convierten en botones tipo hamburguesa y los botones aumentan su área de toque para el dedo.',
        ],
      },
      {
        title: '2. Problemas habituales en dispositivos móviles',
        badge: 'Auditoría Móvil',
        description: 'Los 5 errores que arruinan la experiencia en un smartphone:',
        details: [
          '🚫 Desborde horizontal (Scroll lateral indeseado): Una imagen o tabla con ancho fijo (ej. width: 800px) empuja la pantalla y rompe el layout.',
          '🔎 Textos diminutos: Párrafos de menos de 14px que obligan a hacer zoom para poder leer.',
          '👆 Botones microscópicos: La pauta de accesibilidad exige un área mínima de 44x44 píxeles para que el dedo no toque el botón equivocado.',
          '🍔 Menús que se salen de la pantalla: Menús de 6 enlaces que se montan uno sobre otro en vez de apilarse o esconderse.',
          '📦 Márgenes gigantes: Dejar márgenes de 100px a los costados en una pantalla de 360px de ancho deja solo 160px para el texto real.',
        ],
      },
      {
        title: '3. Herramientas para probar tu web: Las DevTools del Navegador',
        badge: 'Herramientas de Desarrollador',
        description: 'No necesitás tener 10 celulares reales para probar tu página:',
        details: [
          '⌨️ Atajo: Presioná F12 o clic derecho -> "Inspeccionar" en Chrome, Edge o Firefox.',
          '📱 Modo Dispositivo (Ctrl + Shift + M): Activa la barra de emulación donde podés elegir modelos como iPhone 14, Samsung Galaxy o ingresar un ancho personalizado (ej. 375px).',
          '🔍 Inspector de elementos: Permite ver qué regla CSS está causando que un elemento desborde.',
        ],
      },
      {
        title: '4. Introducción a Media Queries y Flexbox',
        badge: 'CSS Responsive',
        description: 'Una Media Query es una condición en CSS: "Si la pantalla mide menos de X píxeles, aplicá estos estilos":',
        details: [
          '@media (max-width: 600px): Reglas que solo se activan en teléfonos o ventanas angostas.',
          'display: flex: Convierte a un contenedor en flexible.',
          'flex-direction: column: Apila los elementos verticalmente (ideal para móviles).',
          'max-width: 100%: Hace que las imágenes nunca sean más anchas que su contenedor padre (evita el desborde).',
        ],
        example: {
          label: 'Ejemplo de Media Query en CSS',
          code: `/* Por defecto en computadora: 3 columnas horizontales */
.tarjetas-contenedor {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

/* En celulares con pantalla menor a 600px: apilar en una sola columna */
@media (max-width: 600px) {
  .tarjetas-contenedor {
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
  }
}`,
        },
      },
      {
        title: '5. Utilizar la IA para corregir problemas de diseño',
        badge: 'Debugging con IA',
        description: 'Cuando una regla no funciona, la IA puede ayudarte si le das el contexto adecuado:',
        details: [
          'Contexto: Qué estás construyendo y en qué dispositivo falla.',
          'Código: Pegá el fragmento HTML y CSS relevante (no todo el proyecto desordenado).',
          'Síntoma: Explicá con precisión qué pasa ("La imagen se corta a la derecha y genera una barra de desplazamiento horizontal").',
          'Pedido: Pedile que explique la causa y qué propiedad CSS soluciona el problema.',
        ],
        promptExample: {
          tool: 'ChatGPT / Claude / Perplexity',
          prompt: `Tengo este código CSS en mi página web:
.galeria img {
  width: 900px;
}
En computadoras se ve bien, pero en teléfonos celulares la imagen genera una barra de desplazamiento horizontal indeseada.
¿Podrías modificar el CSS usando una Media Query o max-width para que la imagen se adapte al ancho del celular sin deformarse? Explicame por qué funciona tu solución.`,
          tip: 'Pedirle a la IA que explique la solución te permite entender el concepto y no depender de ella la próxima vez.',
        },
      },
    ],
    activitiesIntro: 'Poné a prueba tu ojo de desarrollador: compará vistas en desktop y móvil, elegí la solución CSS adecuada y experimentá con un simulador de Media Query.',
    challenge: {
      title: 'Desafío de Diagnóstico y Corrección Responsive',
      instructions: [
        'Analizá un caso real de una página web escolar con problemas en pantallas de celular.',
        'Identificá dos errores graves de adaptación (por ejemplo: un menú que ocupa la mitad de la pantalla o una imagen que rompe el ancho).',
        'Escribí la regla CSS con @media (max-width: ...) que aplicarías para solucionarlo.',
        'Redactá un prompt claro que le harías a una IA para solicitarle asistencia con este error.',
      ],
      guidingQuestions: [
        '¿Qué propiedad CSS evita que las imágenes superen el ancho de la pantalla móvil?',
        '¿Cómo pasamos un menú horizontal a uno vertical usando Flexbox?',
      ],
      sampleAnswerPlaceholder: 'Problema 1: Las fotos de los talleres tienen width: 800px fijo y desbordan en celulares.\nSolución: img { max-width: 100%; height: auto; }\n\nProblema 2: El menú de navegación queda en una sola línea horizontal apretada.\nSolución: @media (max-width: 768px) { nav { flex-direction: column; } }\n\nPrompt para IA: "Tengo un menú <nav> con display: flex en fila. ¿Cómo hago para que en pantallas menores a 768px se apile en columna y tenga botones más grandes para tocar con el dedo?"',
    },
    quiz: [
      {
        id: 'q4-1',
        question: '¿Qué propiedad CSS es indispensable para que una imagen nunca supere el ancho de la pantalla del celular y evite el scroll horizontal?',
        options: [
          'font-size: 20px;',
          'max-width: 100%; height: auto;',
          'display: none;',
          'color: red;',
        ],
        correctAnswer: 1,
        explanation: '¡Exacto! max-width: 100% asegura que la imagen se reduzca proporcionalmente si el contenedor es más pequeño que la foto.',
      },
      {
        id: 'q4-2',
        question: '¿Qué hace la regla CSS @media (max-width: 600px)?',
        options: [
          'Aplica los estilos encerrados en ella únicamente cuando el ancho de la pantalla es de 600 píxeles o menor.',
          'Elimina todo el código de la página cuando la pantalla es chica.',
          'Hace que la computadora aumente su volumen.',
          'Aplica estilos solo en pantallas gigantes de cine.',
        ],
        correctAnswer: 0,
        explanation: '¡Muy bien! "max-width: 600px" actúa como un condicional para pantallas móviles de hasta 600px de ancho.',
      },
      {
        id: 'q4-3',
        question: 'Si en una computadora un contenedor tiene display: flex y muestra tarjetas en fila, ¿qué propiedad cambia su dirección para que se apilen verticalmente en el celular?',
        options: [
          'flex-direction: column;',
          'background-color: blue;',
          'border: 1px solid black;',
          'cursor: pointer;',
        ],
        correctAnswer: 0,
        explanation: '¡Excelente! "flex-direction: column" apila los elementos uno debajo de otro, optimizando el espacio vertical de los smartphones.',
      },
    ],
    trueFalse: [
      {
        id: 'tf4-1',
        statement: 'El emulador de dispositivos de las DevTools del navegador (F12) permite probar cómo se verá tu web en diferentes celulares sin tener los aparatos físicos.',
        isTrue: true,
        explanation: 'Verdadero. Permite alternar entre iPhone, Galaxy, iPad o ingresar medidas personalizadas al instante.',
      },
      {
        id: 'tf4-2',
        statement: 'Tener una barra de desplazamiento horizontal en el celular es una señal de buen diseño moderno.',
        isTrue: false,
        explanation: 'Falso. El scroll horizontal no deseado es uno de los peores errores de usabilidad móvil; la navegación debe ser vertical y fluida.',
      },
      {
        id: 'tf4-3',
        statement: 'Los botones en versiones móviles deben tener un tamaño adecuado (al menos 44x44 px) para facilitar el toque con el dedo.',
        isTrue: true,
        explanation: 'Verdadero. Es un estándar de accesibilidad móvil para evitar toques involuntarios.',
      },
    ],
    takeaways: [
      'El diseño responsive adapta la página a computadoras, tablets y celulares.',
      'Las DevTools (F12) son tu laboratorio para probar diferentes resoluciones y detectar fallas.',
      'max-width: 100% y height: auto son los mejores aliados contra el desborde horizontal de imágenes.',
      'Las Media Queries (@media (max-width: ...)) permiten modificar el CSS según el ancho de la pantalla.',
      'Para resolver bugs con IA, dale contexto, pegá el código CSS exacto y pedile una explicación de la solución.',
    ],
  },

  5: {
    id: 5,
    number: 5,
    title: 'Publicación de la Página Web, Muestra de Proyectos y Análisis de Costos',
    tagline: 'Llevá tu proyecto al mundo en plataformas gratuitas, entendé los costos reales de Internet y prepará tu presentación final.',
    duration: '45-60 min',
    introText: '¡Llegamos a la clase final! Tu página web ya tiene estructura, contenido, identidad visual, enlaces funcionales y se adapta a celulares. Ahora aprenderás qué significa publicarla para que cualquier persona en el planeta pueda visitarla, analizaremos los costos reales de los proyectos digitales y prepararás la demostración final de tu trabajo.',
    learningGoals: [
      'Diferenciar entre un sitio en entorno local (localhost) y un sitio publicado en Internet (producción).',
      'Comprender qué es un Nombre de Dominio, el servicio de Hosting, el certificado de seguridad HTTPS/SSL y el mantenimiento.',
      'Conocer alternativas gratuitas para publicar proyectos estáticos (GitHub Pages, Netlify, Vercel) y sus características.',
      'Analizar los costos reales de una web profesional (dominio propio, servidores dedicados, bases de datos).',
      'Aprender a preparar una presentación clara (pitch / demo) para mostrar el proyecto a docentes, compañeros o clientes.',
    ],
    concepts: [
      {
        title: '1. ¿Qué significa publicar una página web? Local vs Producción',
        badge: 'Despliegue Web',
        description: 'La diferencia entre ver tus archivos en tu computadora y compartirlos con el mundo:',
        details: [
          '💻 Entorno Local (localhost o file:///): Los archivos viven únicamente en el disco de tu computadora. Si le pasás la dirección a un amigo, él no la puede ver porque no está en la red pública.',
          '🌍 Entorno de Producción: Los archivos están subidos a un servidor conectado a Internet las 24 horas del día con una dirección URL accesible desde cualquier navegador del mundo.',
        ],
      },
      {
        title: '2. Los 4 pilares: Dominio, Hosting, HTTPS y Mantenimiento',
        badge: 'Infraestructura Web',
        description: 'Para entender cómo funciona Internet, usemos la metáfora de una casa:',
        details: [
          '🏷️ Dominio (La dirección postal): El nombre que la gente escribe en la barra del navegador (ej. www.miweb.com o www.tecnica5.edu.ar). Traduce números difíciles (direcciones IP) en palabras fáciles de recordar.',
          '🏠 Hosting (El terreno y la casa): La computadora servidora donde se guardan tus archivos HTML, CSS, imágenes y scripts para que estén disponibles día y noche.',
          '🔒 HTTPS y Certificado SSL (La cerradura de seguridad): Cifra la comunicación entre el visitante y el servidor para que nadie pueda interceptar contraseñas o datos personales. Muestra el candadito en el navegador.',
          '🔧 Mantenimiento (La limpieza y arreglos): Actualizar enlaces caídos, renovar certificados, hacer copias de seguridad (backups) y renovar contenidos periódicamente.',
        ],
      },
      {
        title: '3. Alternativas gratuitas de publicación para estudiantes',
        badge: 'Hosting Gratuito',
        description: 'Hoy no necesitás gastar dinero para publicar tu primer proyecto:',
        details: [
          '🐙 GitHub Pages: Ideal para páginas estáticas (HTML, CSS y JS). Se aloja directamente desde tu repositorio de código en GitHub bajo una URL gratuita tipo tu-usuario.github.io/proyecto.',
          '🌐 Netlify: Permite desplegar arrastrando una carpeta o conectando un repositorio. Incluye SSL gratuito y dominios tipo tu-sitio.netlify.app.',
          '⚡ Vercel: Excelente rendimiento para proyectos modernos (React, Vite). Despliegues automáticos con cada cambio.',
          '⚠️ Limitaciones a tener en cuenta: Los planes gratuitos son excelentes para portfolios y proyectos escolares, pero suelen tener límites de ancho de banda mensual y no incluyen dominios personalizados (.com o .ar) sin costo.',
        ],
      },
      {
        title: '4. ¿Qué costos puede tener una página web profesional?',
        badge: 'Economía Digital',
        description: 'Cuando un proyecto escolar pasa a ser un negocio o institución real, existen costos anuales y mensuales a presupuestar:',
        details: [
          '💵 Dominio propio: Se paga por año. Un dominio internacional (.com, .net) ronda los 12 a 20 USD al año. En Argentina, un dominio .com.ar se gestiona en NIC.ar con tarifas accesibles en pesos.',
          '🏢 Hosting profesional: Desde servidores compartidos básicos (3 a 10 USD/mes) hasta servidores en la nube de alta concurrencia.',
          '🗄️ Base de datos y backend: Si la web maneja usuarios, pagos o inventarios dinámicos, el servidor requiere más potencia y almacenamiento.',
          '🛡️ Mantenimiento técnico: El trabajo del desarrollador para resolver caídas, copias de seguridad y seguridad.',
        ],
        example: {
          label: 'Comparativa de costos por tipo de proyecto',
          explanation: 'Una página institucional escolar o portfolio puede funcionar al 100% con costo $0 en GitHub Pages/Netlify. Una tienda con carrito de compras y pasarela de pago requiere hosting dedicado, base de datos y costos de mantenimiento.',
        },
      },
      {
        title: '5. Cómo presentar tu proyecto con impacto (Demo Day)',
        badge: 'Habilidades Blandas',
        description: 'Estructura recomendada para hacer una presentación de 5 minutos ante tu curso o un cliente:',
        details: [
          '1. Problema y Objetivo (1 min): "¿Qué necesidad de la escuela o comunidad resuelve esta web?"',
          '2. Audiencia y Secciones (1 min): "¿Para quién está pensada y cómo se organiza el sitemap?"',
          '3. Demostración en vivo (2 min): Recorrer la Hero Section, los enlaces funcionales, probar el botón de contacto y mostrar la versión móvil con F12.',
          '4. El rol de la Inteligencia Artificial (1 min): Comentar qué prompts usaron, qué sugirió la IA y qué decisiones tomaron ustedes para mejorar el resultado.',
        ],
      },
    ],
    activitiesIntro: 'Relacioná los conceptos de hosting y dominio, calculá las necesidades de distintos proyectos y utilizá el checklist interactivo de pre-publicación.',
    challenge: {
      title: 'Desafío Final Integrador: Nuestra Primera Página Web',
      instructions: [
        '¡Es hora de consolidar todo lo aprendido a lo largo de las 5 clases!',
        'Revisá la Ficha de Proyecto en la sección de Proyecto Integrador.',
        'Comprobá que tu proyecto cuente con: Objetivo claro, Sitemap de 4 secciones, Identidad visual definida, Recursos multimedia optimizados, Enlaces probados y Adaptación para celulares.',
        'Completá las reflexiones finales sobre las herramientas de IA que utilizaste.',
      ],
      guidingQuestions: [
        '¿Dónde vas a publicar tu página (GitHub Pages, Netlify, Vercel)?',
        '¿Qué fue lo más fácil y lo más desafiante de integrar la IA en tu proceso de desarrollo?',
      ],
      sampleAnswerPlaceholder: 'Mi proyecto "Portal de Prácticas Técnicas":\n- Publicación elegida: GitHub Pages (gratuito y directo desde nuestro repositorio).\n- Dominio: Usaremos el subdominio gratuito .github.io para la muestra escolar.\n- Presentación: Mostraremos la web en un proyector y demostraremos su diseño móvil usando las DevTools de Chrome.',
    },
    quiz: [
      {
        id: 'q5-1',
        question: '¿Qué es un nombre de dominio en la web?',
        options: [
          'La memoria RAM de la computadora donde se programa.',
          'La dirección alfanumérica fácil de recordar (como www.miinstituto.edu.ar) que las personas escriben para acceder a un sitio.',
          'Un tipo de virus informático.',
          'El cable que conecta el módem con el servidor.',
        ],
        correctAnswer: 1,
        explanation: '¡Correcto! El dominio traduce las direcciones IP numéricas en nombres legibles por los seres humanos.',
      },
      {
        id: 'q5-2',
        question: '¿Cuál de las siguientes es una opción gratuita y muy utilizada por desarrolladores para alojar páginas estáticas directamente desde un repositorio?',
        options: [
          'GitHub Pages.',
          'Una suscripción mensual obligatoria de 100 USD.',
          'Un pendrive desconectado.',
          'Microsoft Paint.',
        ],
        correctAnswer: 0,
        explanation: '¡Exacto! GitHub Pages permite publicar sitios estáticos directamente desde tus repositorios de código sin costo alguno.',
      },
      {
        id: 'q5-3',
        question: '¿Por qué el protocolo HTTPS con certificado SSL es esencial en cualquier sitio web moderno?',
        options: [
          'Porque hace que las imágenes pesen el doble.',
          'Porque cifra la información que viaja entre el navegador y el servidor, garantizando seguridad y confianza a los visitantes.',
          'Porque solo funciona si la computadora está apagada.',
          'Porque cambia automáticamente el idioma al inglés.',
        ],
        correctAnswer: 1,
        explanation: '¡Muy bien! HTTPS protege la privacidad de los datos, previene manipulaciones de intermediarios y muestra el candado seguro.',
      },
    ],
    trueFalse: [
      {
        id: 'tf5-1',
        statement: 'Si abrís tu archivo HTML haciendo doble clic en tu computadora (file:///C:/misitio/index.html), cualquier persona en Internet ya puede visitarlo.',
        isTrue: false,
        explanation: 'Falso. Ese archivo solo está en tu disco local. Para que otros lo vean, necesitás subirlo a un servicio de hosting conectado a Internet.',
      },
      {
        id: 'tf5-2',
        statement: 'Un portfolio personal o una página informativa para una escuela técnica puede publicarse al 100% de manera gratuita en GitHub Pages o Netlify.',
        isTrue: true,
        explanation: 'Verdadero. Para páginas estáticas sin bases de datos complejas, las plataformas modernas ofrecen niveles gratuitos muy generosos.',
      },
      {
        id: 'tf5-3',
        statement: 'Al presentar un proyecto ante un curso o cliente, es importante mostrar cómo se ve la web tanto en computadora como en teléfono celular.',
        isTrue: true,
        explanation: 'Verdadero. Demuestra que el diseño es adaptable, profesional y accesible para la mayoría de los usuarios móviles.',
      },
    ],
    takeaways: [
      'Publicar una web significa subir sus archivos a un servidor de hosting conectado a Internet en producción.',
      'El dominio es la dirección (nombre), el hosting es el alojamiento (archivos) y el SSL/HTTPS garantiza la seguridad.',
      'Plataformas como GitHub Pages, Netlify y Vercel permiten publicar proyectos de estudio de forma completamente gratuita.',
      'Para proyectos comerciales avanzados hay que presupuestar dominios propios, bases de datos y tareas de mantenimiento.',
      'Una buena presentación final (demo) destaca el problema resuelto, muestra la web en vivo y explica el uso inteligente de la IA.',
    ],
  },
};
