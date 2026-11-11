import React from 'react';
import {
  Code2,
  Sparkles,
  Compass,
  Palette,
  Smartphone,
  Rocket,
  ArrowRight,
  Clock,
  BookOpen,
  FolderGit2,
  GraduationCap
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { LESSONS_SUMMARY } from '../data/lessonsSummary';
import { ProgressBar } from '../components/layout/ProgressBar';
import logoImg from '../assets/logo.jpg';

export const Home: React.FC = () => {
  const { setActiveView, isLessonCompleted, progress } = useProgress();

  const getLessonIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass size={22} className="text-cyan-400" />;
      case 'Code2':
        return <Code2 size={22} className="text-violet-400" />;
      case 'Palette':
        return <Palette size={22} className="text-pink-400" />;
      case 'Smartphone':
        return <Smartphone size={22} className="text-emerald-400" />;
      case 'Rocket':
        return <Rocket size={22} className="text-amber-400" />;
      default:
        return <BookOpen size={22} className="text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold">
              <Sparkles size={14} />
              <span>Secuencia Didáctica para 6° Año Informática</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700/80 text-xs font-medium">
              <div className="w-4 h-4 rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={logoImg}
                  alt="Logo Institucional"
                  className="w-full h-full object-contain"
                />
              </div>
              <span>Establecimiento Educativo Técnico</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Desarrollo Web <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">desde Cero</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            Aprendé a crear tu propia página web con HTML, CSS e Inteligencia Artificial.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
            Un recorrido interactivo de cinco clases diseñado para experimentar, resolver desafíos de código, auditar resultados de la IA y construir progresivamente tu propio sitio web real, listo para ser publicado en Internet.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveView('lesson', 1)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer transform hover:scale-105"
            >
              <span>Comenzar Recorrido (Clase 1)</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setActiveView('project')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <FolderGit2 size={16} className="text-amber-400" />
              <span>Ver Proyecto Integrador</span>
            </button>
          </div>
        </div>
      </section>

      {/* Progress Bar Widget */}
      <ProgressBar />

      {/* Learning Path Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Compass size={16} />
          <span>Ruta Pedagógica</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Recorrido de Aprendizaje en 5 Clases
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Avanzá a tu propio ritmo. Cada clase incluye conceptos visuales, actividades interactivas con corrección automática, desafíos prácticos y recursos oficiales.
        </p>
      </div>

      {/* 5 Classes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LESSONS_SUMMARY.map((les) => {
          const isDone = isLessonCompleted(les.number);
          const hasActivities = progress.completedActivities.some((actId) =>
            actId.startsWith(`q${les.number}`) ||
            actId.startsWith(`tf${les.number}`) ||
            actId.includes(`clase-${les.number}`)
          );

          let statusLabel = 'No iniciada';
          let statusBadgeClass = 'bg-slate-800/80 text-slate-400 border-slate-700';

          if (isDone) {
            statusLabel = 'Completada';
            statusBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold';
          } else if (hasActivities) {
            statusLabel = 'En progreso';
            statusBadgeClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold';
          }

          return (
            <div
              key={les.id}
              className="group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 p-6 flex flex-col justify-between shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              {/* Card top banner */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                      {getLessonIcon(les.iconName)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-cyan-400 block">
                        CLASE {les.number}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Clock size={11} />
                        <span>{les.duration}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border ${statusBadgeClass}`}>
                    {statusLabel}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {les.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {les.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Action */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors font-medium">
                  {isDone ? 'Repasar contenidos' : 'Ver clase'}
                </span>

                <button
                  onClick={() => setActiveView('lesson', les.number)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span>{isDone ? 'Revisar' : 'Comenzar'}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Final Project Card */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 border border-amber-500/30 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden md:col-span-2 lg:col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <FolderGit2 size={22} />
              </div>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border border-amber-500/40 text-amber-300 bg-amber-500/10 font-bold">
                Cierre Integrador
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 block">
                PROYECTO FINAL
              </span>
              <h3 className="text-base font-bold text-white leading-snug mt-1">
                «Nuestra Primera Página Web»
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Consolidá tu objetivo, sitemap, identidad, imágenes, enlaces funcionales y versión responsive en una ficha técnica exportable para presentar a tu profesor.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between">
            <span className="text-[11px] text-amber-400 font-medium">
              Demo Day &amp; Entrega
            </span>
            <button
              onClick={() => setActiveView('project')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md cursor-pointer"
            >
              <span>Abrir Ficha</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Educational Framework Banner */}
      <section className="rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
            <GraduationCap size={16} />
            <span>Criterio Pedagógico &bull; Educación Técnica</span>
          </div>
          <h4 className="text-lg font-bold text-white">
            La Inteligencia Artificial como Asistente, Vos como Desarrollador
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            En este taller la IA genera borradores y acelera ideas, pero nunca reemplaza tu criterio. Cada línea de código, paleta de colores y decisión de diseño es revisada, validada y comprendida por vos.
          </p>
        </div>

        <button
          onClick={() => setActiveView('resources')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition shrink-0 cursor-pointer flex items-center gap-2"
        >
          <BookOpen size={14} />
          <span>Ver Recursos Externos</span>
        </button>
      </section>
    </div>
  );
};
