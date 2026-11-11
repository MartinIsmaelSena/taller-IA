import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Printer,
  Copy,
  Check,
  Save,
  Award
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { triggerConfetti } from '../components/common/Confetti';

export const FinalProjectPage: React.FC = () => {
  const { progress, updateStudentProject } = useProgress();
  const [projectData, setProjectData] = useState(progress.studentProject);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    setProjectData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAll = () => {
    updateStudentProject(projectData);
    setSaved(true);
    triggerConfetti();
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopySummary = () => {
    const textSummary = `================================================
FICHA TÉCNICA DE PROYECTO WEB - TALLER CON IA
================================================
Proyecto: ${projectData.projectName}
Categoría: ${projectData.category}
Objetivo Central: ${projectData.objective}
Audiencia Destino: ${projectData.targetAudience}
Problema o Necesidad que Resuelve: ${projectData.mainProblem}
Llamada a la Acción (CTA): ${projectData.callToAction}

SECCIONES DEL SITIO (SITEMAP):
${projectData.sitemapSections.map((s, idx) => `  ${idx + 1}. ${s.name} -> ${s.purpose}`).join('\n')}

IDENTIDAD VISUAL:
- Color Primario/Acento: ${projectData.primaryColor}
- Tipografía: ${projectData.fontFamily}

HERRAMIENTAS DE IA UTILIZADAS:
${projectData.aiToolsUsed.map((t) => `  - ${t}`).join('\n')}

REFLEXIONES Y DECISIONES TÉCNICAS:
${projectData.reflections}

ENLACE REPOSITORIO GITHUB: ${projectData.githubUrl || 'Pendiente de despliegue'}
ENLACE DEMO EN VIVO: ${projectData.demoUrl || 'Pendiente de publicación'}
================================================`;

    navigator.clipboard.writeText(textSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/40 p-6 sm:p-10 shadow-2xl">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Sparkles size={14} />
            <span>Desafío Final Integrador</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Proyecto Final: «Nuestra Primera Página Web»
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Consolidá todo lo construido en las cinco clases: tu objetivo, sitemap, identidad de colores, multimedia optimizada, enlaces funcionales, adaptación a celulares y tu pitch de presentación.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSaveAll}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save size={14} />
              <span>{saved ? '¡Proyecto Guardado!' : 'Guardar Cambios'}</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? '¡Copiado para entregar!' : 'Copiar Ficha Resumen'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer size={14} />
              <span>Imprimir Ficha</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Form & Worksheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Project Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              1. Ficha de Identificación del Proyecto
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Nombre de la Página Web:
              </label>
              <input
                type="text"
                value={projectData.projectName}
                onChange={(e) => handleFieldChange('projectName', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Categoría / Rubro:
                </label>
                <input
                  type="text"
                  value={projectData.category}
                  onChange={(e) => handleFieldChange('category', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Llamada a la Acción (CTA):
                </label>
                <input
                  type="text"
                  value={projectData.callToAction}
                  onChange={(e) => handleFieldChange('callToAction', e.target.value)}
                  placeholder="Ej: ¡Inscribite hoy!, Contactanos"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Objetivo Central:
              </label>
              <textarea
                rows={2}
                value={projectData.objective}
                onChange={(e) => handleFieldChange('objective', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Público Objetivo (¿A quién está dirigida?):
              </label>
              <input
                type="text"
                value={projectData.targetAudience}
                onChange={(e) => handleFieldChange('targetAudience', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Problema o Necesidad que Busca Resolver:
              </label>
              <textarea
                rows={2}
                value={projectData.mainProblem}
                onChange={(e) => handleFieldChange('mainProblem', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              2. El Rol de la Inteligencia Artificial y Reflexiones
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Herramientas de IA utilizadas durante el desarrollo:
              </label>
              <p className="text-[11px] text-slate-400 mb-2">
                (Por ejemplo: ChatGPT para textos, Perplexity para investigación, Canva Magic para gráficos).
              </p>
              <input
                type="text"
                value={projectData.aiToolsUsed.join(', ')}
                onChange={(e) =>
                  handleFieldChange(
                    'aiToolsUsed',
                    e.target.value.split(',').map((t) => t.trim())
                  )
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Reflexión técnica y adaptaciones realizadas:
              </label>
              <textarea
                rows={3}
                value={projectData.reflections}
                onChange={(e) => handleFieldChange('reflections', e.target.value)}
                placeholder="¿Qué sugerencias de la IA aceptaste y cuáles decidiste corregir o descartar?"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Enlace de GitHub (opcional):
                </label>
                <input
                  type="url"
                  value={projectData.githubUrl}
                  onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/mi-usuario/mi-web"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Enlace Demo Web (GitHub Pages/Netlify):
                </label>
                <input
                  type="url"
                  value={projectData.demoUrl}
                  onChange={(e) => handleFieldChange('demoUrl', e.target.value)}
                  placeholder="https://mi-usuario.github.io/mi-web"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Project Preview Card (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase">
                Previsualización de la Ficha
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Proyecto</span>
                <h4 className="text-lg font-bold text-white">{projectData.projectName || 'Sin título'}</h4>
                <span className="text-[11px] text-cyan-300 font-medium">{projectData.category}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Objetivo:</span>
                <p className="text-slate-200 text-xs leading-relaxed">{projectData.objective}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Secciones del Sitemap:</span>
                <div className="space-y-1 pt-1">
                  {projectData.sitemapSections.map((sec, idx) => (
                    <div key={sec.id} className="flex items-center gap-1.5 text-slate-300 text-xs">
                      <span className="w-4 h-4 rounded bg-slate-800 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-bold">{sec.name}:</span>
                      <span className="text-slate-400 truncate">{sec.purpose}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Color Primario</span>
                  <div className="flex items-center justify-center gap-1.5 mt-1 font-mono font-bold text-white">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-600"
                      style={{ backgroundColor: projectData.primaryColor }}
                    ></span>
                    <span>{projectData.primaryColor}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Tipografía</span>
                  <span className="font-bold text-white block mt-1 truncate">
                    {projectData.fontFamily}
                  </span>
                </div>
              </div>

              {projectData.callToAction && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-center font-bold text-xs">
                  CTA: "{projectData.callToAction}"
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={handleCopySummary}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy size={13} />
                <span>Copiar Ficha para el Profesor</span>
              </button>
            </div>
          </div>

          {/* Teacher Rubric Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Award size={16} />
              <span>Rúbrica de Evaluación del Proyecto</span>
            </div>

            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Estructura semántica válida (HTML5) sin errores de cierre de etiquetas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Identidad visual armónica con contraste adecuado para lectura.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Imágenes optimizadas en peso (&lt;300 KB) y enlaces sin errores 404.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Diseño responsive funcional en teléfonos celulares comprobado con DevTools.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Presentación clara explicando el objetivo y el uso crítico de la IA.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
