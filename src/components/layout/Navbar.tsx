import React, { useState } from 'react';
import {
  BookOpen,
  FolderGit2,
  RotateCcw,
  Menu,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { LESSONS_SUMMARY } from '../../data/lessonsSummary';
import logoImg from '../../assets/logo.jpg';

export const Navbar: React.FC = () => {
  const { activeView, activeLessonId, setActiveView, completionPercentage, resetProgress } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (view: 'home' | 'lesson' | 'project' | 'resources', lessonId?: number) => {
    setActiveView(view, lessonId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Course Title */}
          <div
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
          >
            {/* Institutional Logo */}
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white p-1 border border-slate-700/80 shadow-md shadow-cyan-500/10 shrink-0 flex items-center justify-center overflow-hidden group-hover:border-cyan-400/80 transition-colors">
              <img
                src={logoImg}
                alt="Logo Institucional del Establecimiento Educativo"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-white text-sm sm:text-base tracking-tight group-hover:text-cyan-400 transition-colors">
                  Desarrollo Web desde Cero
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  <Sparkles size={10} /> con IA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Taller Interactivo para Secundaria Técnica
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={() => handleNavigate('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeView === 'home'
                  ? 'bg-slate-800 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              Inicio
            </button>

            {/* Classes shortcuts */}
            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/80">
              {LESSONS_SUMMARY.map((les) => {
                const isActive = activeView === 'lesson' && activeLessonId === les.number;
                return (
                  <button
                    key={les.id}
                    onClick={() => handleNavigate('lesson', les.number)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                    title={les.title}
                  >
                    Clase {les.number}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handleNavigate('project')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeView === 'project'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-slate-900'
              }`}
            >
              <FolderGit2 size={14} />
              Proyecto Final
            </button>

            <button
              onClick={() => handleNavigate('resources')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeView === 'resources'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen size={14} />
              Recursos
            </button>
          </nav>

          {/* Progress Widget & Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <div
              onClick={() => handleNavigate('project')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 transition"
              title="Tu progreso general"
            >
              <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {completionPercentage}%
              </span>
            </div>

            <button
              onClick={resetProgress}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition cursor-pointer"
              title="Reiniciar progreso guardado"
            >
              <RotateCcw size={15} />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <div className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
              {completionPercentage}%
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            <button
              onClick={() => handleNavigate('home')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition ${
                activeView === 'home' ? 'bg-slate-800 text-white' : 'text-slate-400'
              }`}
            >
              Inicio
            </button>

            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold px-3 pt-2 block">
              Las 5 Clases
            </span>

            {LESSONS_SUMMARY.map((les) => (
              <button
                key={les.id}
                onClick={() => handleNavigate('lesson', les.number)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition ${
                  activeView === 'lesson' && activeLessonId === les.number
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>
                  Clase {les.number}: {les.title}
                </span>
                <ChevronRight size={14} className="opacity-50" />
              </button>
            ))}

            <button
              onClick={() => handleNavigate('project')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
                activeView === 'project' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
              }`}
            >
              <FolderGit2 size={16} />
              Proyecto Integrador
            </button>

            <button
              onClick={() => handleNavigate('resources')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
                activeView === 'resources' ? 'bg-slate-800 text-white' : 'text-slate-400'
              }`}
            >
              <BookOpen size={16} />
              Recursos Complementarios
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Progreso total: {completionPercentage}%</span>
            <button
              onClick={resetProgress}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <RotateCcw size={12} /> Reiniciar datos
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
