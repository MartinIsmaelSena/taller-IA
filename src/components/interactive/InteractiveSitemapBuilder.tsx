import React, { useState } from 'react';
import { GitFork, Plus, Trash2, Check, Sparkles, FolderTree } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

export const InteractiveSitemapBuilder: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { progress, updateStudentProject, markActivityCompleted } = useProgress();
  const [projectName, setProjectName] = useState(progress.studentProject.projectName || 'Mi Proyecto Web');
  const [sections, setSections] = useState(
    progress.studentProject.sitemapSections.length > 0
      ? progress.studentProject.sitemapSections
      : [
          { id: '1', name: 'Inicio', purpose: 'Presentación, propuesta de valor y CTA' },
          { id: '2', name: 'Servicios', purpose: 'Detalle de qué ofrecemos o qué hacemos' },
          { id: '3', name: 'Nosotros', purpose: 'Quiénes forman el equipo o la institución' },
          { id: '4', name: 'Contacto', purpose: 'Formulario, WhatsApp y redes sociales' },
        ]
  );
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionPurpose, setNewSectionPurpose] = useState('');
  const [saved, setSaved] = useState(false);

  const handleAddSection = () => {
    if (!newSectionName.trim() || sections.length >= 4) return;
    const newSec = {
      id: Date.now().toString(),
      name: newSectionName.trim(),
      purpose: newSectionPurpose.trim() || 'Sección informativa',
    };
    const updated = [...sections, newSec];
    setSections(updated);
    setNewSectionName('');
    setNewSectionPurpose('');
  };

  const handleRemoveSection = (id: string) => {
    if (sections.length <= 1) return;
    setSections(sections.filter((s) => s.id !== id));
  };

  const handleSaveSitemap = () => {
    updateStudentProject({
      projectName,
      sitemapSections: sections,
    });
    setSaved(true);
    markActivityCompleted(activityId);
    triggerConfetti();
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <FolderTree size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 3: Creador de Mapa de Sitio (Sitemap)</h4>
            <p className="text-xs text-slate-400">Definí el nombre de tu proyecto y organizá hasta 4 secciones clave.</p>
          </div>
        </div>

        <button
          onClick={handleSaveSitemap}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-md cursor-pointer self-start sm:self-auto"
        >
          {saved ? <Check size={14} /> : <Sparkles size={14} />}
          {saved ? '¡Guardado en tu Proyecto!' : 'Guardar Sitemap'}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Nombre de tu Proyecto Web:
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              placeholder="Ej: Taller de Impresión 3D, Panadería del Barrio..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">
                Secciones del Sitio ({sections.length} de 4):
              </span>
              <span className="text-[11px] text-slate-400">Máx. 4 secciones</span>
            </div>

            <div className="space-y-2">
              {sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="w-5 h-5 rounded-md bg-slate-800 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <span className="font-bold text-slate-200 block truncate">{sec.name}</span>
                      <span className="text-[11px] text-slate-400 truncate block">{sec.purpose}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveSection(sec.id)}
                    disabled={sections.length <= 1}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Eliminar sección"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {sections.length < 4 && (
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-cyan-300 block">Agregar otra sección:</span>
              <input
                type="text"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="Nombre (ej. Galería, Inscripción)"
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <input
                type="text"
                value={newSectionPurpose}
                onChange={(e) => setNewSectionPurpose(e.target.value)}
                placeholder="Propósito breve..."
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleAddSection}
                disabled={!newSectionName.trim()}
                className="w-full py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition"
              >
                <Plus size={14} />
                Agregar Sección
              </button>
            </div>
          )}
        </div>

        {/* Visual Sitemap Diagram (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
          <span className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-1.5">
            <GitFork size={14} className="text-cyan-400" />
            Diagrama Jerárquico del Sitio
          </span>

          {/* Root Node (Home / Project Name) */}
          <div className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-sm shadow-lg text-center border border-cyan-400/50 max-w-xs">
            <span className="text-[10px] uppercase tracking-wider block opacity-80">Página Principal</span>
            {projectName || 'Mi Proyecto Web'}
          </div>

          {/* Connection Line */}
          <div className="w-0.5 h-6 bg-slate-700 my-1"></div>

          {/* Horizontal Branch */}
          <div className="w-3/4 h-0.5 bg-slate-700 relative hidden sm:block">
            <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-slate-600"></div>
            <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-slate-600"></div>
          </div>

          {/* Child Nodes (Sections) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full mt-2">
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-center shadow-md relative group hover:border-cyan-500 transition"
              >
                <div className="w-0.5 h-2 bg-slate-700 mx-auto -mt-3 mb-1 hidden sm:block"></div>
                <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold mx-auto flex items-center justify-center mb-1">
                  {idx + 1}
                </span>
                <h6 className="text-xs font-bold text-slate-100">{sec.name}</h6>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug line-clamp-2">
                  {sec.purpose}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 text-[11px] text-slate-400 text-center">
            💡 Este sitemap define la estructura que programarás y maqueterás en las siguientes clases.
          </div>
        </div>
      </div>
    </div>
  );
};
