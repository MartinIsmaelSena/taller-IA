import React, { useState } from 'react';
import { Search, Globe } from 'lucide-react';
import { RESOURCES_BY_LESSON } from '../data/resourcesData';
import { ResourceCard } from '../components/lessons/ResourceCard';
import type { ExternalResource } from '../types/lesson';

export const ResourcesPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Flatten all resources with lesson reference
  const allResources: (ExternalResource & { lessonNumber: number })[] = [];
  Object.entries(RESOURCES_BY_LESSON).forEach(([lessonNum, list]) => {
    list.forEach((res) => {
      allResources.push({ ...res, lessonNumber: Number(lessonNum) });
    });
  });

  const uniqueTags = ['all', ...Array.from(new Set(allResources.map((r) => r.source)))];

  const filteredResources = allResources.filter((r) => {
    const matchesTag = selectedTag === 'all' || r.source === selectedTag;
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tag.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <section className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold">
          <Globe size={14} />
          <span>Biblioteca Digital de Recursos</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Seguí Aprendiendo: Recursos Externos Recomendados
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          Documentación oficial, tutoriales interactivos y plataformas gratuitas cuidadosamente seleccionadas para que puedas profundizar en cada temática del desarrollo web moderno.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por tema (HTML, CSS, flexbox, hosting, canva)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                  selectedTag === tag
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {tag === 'all' ? 'Todos' : tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grouped by Lesson */}
      <div className="space-y-8">
        {[1, 2, 3, 4, 5].map((lessonNum) => {
          const lessonResources = filteredResources.filter((r) => r.lessonNumber === lessonNum);
          if (lessonResources.length === 0) return null;

          return (
            <div key={lessonNum} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                  {lessonNum}
                </span>
                <h3 className="text-base font-bold text-white">
                  Recursos de la Clase {lessonNum}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lessonResources.map((res) => (
                  <ResourceCard key={res.id} resource={res} />
                ))}
              </div>
            </div>
          );
        })}

        {filteredResources.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm">
            No se encontraron recursos que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};
