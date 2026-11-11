import React from 'react';
import { ExternalLink, Sparkles, GraduationCap } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { LESSONS_SUMMARY } from '../../data/lessonsSummary';
import logoImg from '../../assets/logo.jpg';

export const Footer: React.FC = () => {
  const { setActiveView } = useProgress();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info with Discreet Institutional Logo */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-sm">
              <div className="h-9 w-9 rounded-lg bg-white p-1 border border-slate-700/80 shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src={logoImg}
                  alt="Logo Institucional del Establecimiento Educativo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span>Desarrollo Web desde Cero</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Plataforma didáctica e interactiva diseñada para estudiantes de educación secundaria técnica (17 años), orientación Informática.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-cyan-400">
              <Sparkles size={12} />
              <span>Aprendé con Inteligencia Artificial</span>
            </div>
          </div>

          {/* Quick Classes Links */}
          <div className="space-y-2.5">
            <h6 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Recorrido de Clases
            </h6>
            <ul className="space-y-1.5">
              {LESSONS_SUMMARY.map((les) => (
                <li key={les.id}>
                  <button
                    onClick={() => setActiveView('lesson', les.number)}
                    className="hover:text-cyan-400 transition text-left cursor-pointer"
                  >
                    Clase {les.number}: {les.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Project & Community */}
          <div className="space-y-2.5">
            <h6 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Proyecto e Integración
            </h6>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActiveView('project')}
                  className="hover:text-amber-400 transition text-left cursor-pointer"
                >
                  Ficha del Proyecto Integrador
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('resources')}
                  className="hover:text-cyan-400 transition text-left cursor-pointer"
                >
                  Seguí Aprendiendo (Fuentes Oficiales)
                </button>
              </li>
              <li>
                <a
                  href="https://pages.github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <span>GitHub Pages Docs</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://developer.mozilla.org/es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <span>MDN Web Docs (Español)</span>
                  <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>

          {/* Pedagogical Note */}
          <div className="space-y-2.5 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-200 font-bold text-xs">
              <GraduationCap size={15} className="text-cyan-400" />
              <span>Secuencia Didáctica</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              El aprendizaje autónomo promueve el pensamiento crítico, la resolución de problemas y la alfabetización digital mediante el uso responsable y ético de la inteligencia artificial.
            </p>
            <div className="text-[10px] text-slate-500 font-mono">
              Totalmente gratuito &bull; Sin servicios pagos
            </div>
          </div>
        </div>

        {/* Bottom Bar: Personalized signature without technology mentions */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3 text-center sm:text-left">
          <div>
            &copy; 2026 Plataforma Educativa de Desarrollo Web. Creado para la comunidad técnica escolar. Elaborado por Martín Ismael Sena.
          </div>
        </div>
      </div>
    </footer>
  );
};
