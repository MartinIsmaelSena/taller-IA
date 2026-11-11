import React, { useState } from 'react';
import { Layers, MousePointerClick, Info, Sparkles } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

interface WebPart {
  id: 'header' | 'navbar' | 'hero' | 'section' | 'footer';
  name: string;
  tag: string;
  purpose: string;
  keyElements: string;
  bestPractice: string;
  color: string;
}

const WEB_PARTS: Record<string, WebPart> = {
  header: {
    id: 'header',
    name: 'Header (Encabezado Superior)',
    tag: '<header>',
    purpose: 'Es la cabecera de la página. Presenta la marca o identidad del sitio y suele albergar el menú de navegación.',
    keyElements: 'Logotipo, nombre del proyecto, lema breve y enlaces sociales o de acceso rápido.',
    bestPractice: 'Mantenelo limpio y consistente en todas las páginas de tu sitio para que el usuario siempre sepa dónde está.',
    color: 'border-cyan-500 bg-cyan-950/30 text-cyan-300',
  },
  navbar: {
    id: 'navbar',
    name: 'Navbar (Barra de Navegación)',
    tag: '<nav>',
    purpose: 'Permite al visitante moverse entre las distintas secciones del sitio o páginas externas sin perderse.',
    keyElements: 'Enlaces con texto claro (Inicio, Proyectos, Contacto), botón de cambio de idioma o modo oscuro.',
    bestPractice: 'Limitalo a entre 4 y 6 enlaces para no abrumar al visitante. En celulares debe adaptarse con menú vertical.',
    color: 'border-blue-500 bg-blue-950/30 text-blue-300',
  },
  hero: {
    id: 'hero',
    name: 'Hero Section (Sección Principal de Impacto)',
    tag: '<section class="hero">',
    purpose: 'Es la primera pantalla visible sin hacer scroll. Tiene solo 5 segundos para captar el interés del visitante y explicar de qué se trata.',
    keyElements: 'Título potente (h1), subtítulo explicativo, imagen o gráfico representativo y el botón de Llamada a la Acción (CTA).',
    bestPractice: 'Evitá textos largos. Enfocate en el beneficio principal: "¿Qué gano yo si me quedo en esta web?".',
    color: 'border-violet-500 bg-violet-950/30 text-violet-300',
  },
  section: {
    id: 'section',
    name: 'Section (Secciones de Contenido)',
    tag: '<section>',
    purpose: 'Son los bloques temáticos que desarrollan la información detallada (quiénes somos, servicios, proyectos, testimonios).',
    keyElements: 'Subtítulo (h2), párrafos, tarjetas, listas, imágenes optimizadas y botones secundarios.',
    bestPractice: 'Cada sección debe tener un propósito único. Usá buen espaciado entre secciones para dar "aire" visual a la lectura.',
    color: 'border-emerald-500 bg-emerald-950/30 text-emerald-300',
  },
  footer: {
    id: 'footer',
    name: 'Footer (Pie de Página)',
    tag: '<footer>',
    purpose: 'El cierre de la página web. Aporta información de respaldo, legitimidad y opciones secundarias de navegación.',
    keyElements: 'Derechos de autor (Copyright), redes sociales, enlace a WhatsApp, correo de contacto y mapa del sitio.',
    bestPractice: 'Los usuarios van al footer cuando buscan datos de contacto directo o información legal. Hacelo fácil de encontrar.',
    color: 'border-amber-500 bg-amber-950/30 text-amber-300',
  },
};

export const WebsitePartsExplorer: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [selectedPartId, setSelectedPartId] = useState<'header' | 'navbar' | 'hero' | 'section' | 'footer'>('hero');
  const [inspectedParts, setInspectedParts] = useState<Set<string>>(new Set(['hero']));

  const handleSelect = (partId: 'header' | 'navbar' | 'hero' | 'section' | 'footer') => {
    setSelectedPartId(partId);
    setInspectedParts((prev) => {
      const next = new Set(prev).add(partId);
      if (next.size >= 4) {
        markActivityCompleted(activityId);
      }
      return next;
    });
  };

  const selectedPart = WEB_PARTS[selectedPartId];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Layers size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 2: Identificar las Partes de una Web</h4>
            <p className="text-xs text-slate-400">Hacé clic en cualquier componente de la maqueta para consultar su función y código.</p>
          </div>
        </div>

        <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          Explorados: {inspectedParts.size} de 5
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Interactive Web Mockup (Left 7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl p-3 border border-slate-800 shadow-inner">
          <div className="flex items-center gap-1.5 pb-2.5 mb-2.5 border-b border-slate-800 text-slate-400 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block"></span>
            <span className="ml-2 font-mono text-[11px] text-slate-500">https://mi-proyecto-web.escuela.edu.ar</span>
          </div>

          <div className="space-y-2">
            {/* 1. Header & Navbar block */}
            <div
              onClick={() => handleSelect('header')}
              className={`p-3 rounded-lg border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-2 ${
                selectedPartId === 'header'
                  ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-500/30'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-cyan-400"></span>
                <span className="text-xs font-bold text-slate-200">🤖 EcoRobot Técnica 5</span>
              </div>

              {/* Navbar nested */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('navbar');
                }}
                className={`px-3 py-1.5 rounded-md border text-xs font-medium transition cursor-pointer flex items-center gap-3 ${
                  selectedPartId === 'navbar'
                    ? 'border-blue-400 bg-blue-950/60 text-blue-200 ring-2 ring-blue-500/30'
                    : 'border-slate-700 bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Inicio</span>
                <span>Proyectos</span>
                <span>Contacto</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1 rounded">&lt;nav&gt;</span>
              </div>
            </div>

            {/* 2. Hero Section */}
            <div
              onClick={() => handleSelect('hero')}
              className={`p-6 rounded-lg border-2 transition-all cursor-pointer text-center relative overflow-hidden ${
                selectedPartId === 'hero'
                  ? 'border-violet-400 bg-violet-950/40 ring-2 ring-violet-500/30'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                &lt;section class="hero"&gt;
              </span>
              <div className="max-w-md mx-auto space-y-2">
                <h5 className="text-base font-bold text-white">Construimos tecnología con impacto social</h5>
                <p className="text-xs text-slate-400">
                  Aprendé a programar y diseñar páginas web desde cero en el taller técnico de 6° año.
                </p>
                <div className="pt-2">
                  <span className="inline-block px-4 py-1.5 rounded-md bg-cyan-500 text-slate-950 font-bold text-xs shadow-md">
                    ¡Sumate al taller! (CTA)
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Content Section */}
            <div
              onClick={() => handleSelect('section')}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedPartId === 'section'
                  ? 'border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/30'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">Nuestros Proyectos Destacados</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  &lt;section&gt;
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded bg-slate-800/60 border border-slate-700/60 text-slate-300">
                  🌱 Riego Automatizado
                </div>
                <div className="p-2.5 rounded bg-slate-800/60 border border-slate-700/60 text-slate-300">
                  🦾 Brazo Robótico 3D
                </div>
              </div>
            </div>

            {/* 4. Footer */}
            <div
              onClick={() => handleSelect('footer')}
              className={`p-3 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-between text-xs ${
                selectedPartId === 'footer'
                  ? 'border-amber-400 bg-amber-950/40 ring-2 ring-amber-500/30'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <span className="text-slate-400">&copy; 2026 Taller de Informática Técnica 5</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">contacto@escuela.edu.ar</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  &lt;footer&gt;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card (Right 5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <MousePointerClick className="text-cyan-400" size={16} />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Inspector de Componente
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <h5 className="text-base font-bold text-white">{selectedPart.name}</h5>
              <code className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono mt-1 inline-block">
                {selectedPart.tag}
              </code>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-100 block mb-0.5">Propósito:</span>
              {selectedPart.purpose}
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <span className="font-semibold text-slate-200 block mb-1">Elementos que contiene:</span>
              <p className="text-slate-400">{selectedPart.keyElements}</p>
            </div>

            <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
              <div className="flex items-center gap-1.5 font-bold mb-1 text-cyan-300">
                <Sparkles size={13} />
                Consejo Pro:
              </div>
              {selectedPart.bestPractice}
            </div>
          </div>

          {inspectedParts.size >= 4 && (
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Info size={14} />
              <span>¡Genial! Has explorado todas las partes de la anatomía web.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
