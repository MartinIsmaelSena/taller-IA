import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import type { ExternalResource } from '../../types/lesson';

export const ResourceCard: React.FC<{ resource: ExternalResource }> = ({ resource }) => {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all shadow-md relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700/80">
          {resource.source}
        </span>
        <ExternalLink
          size={14}
          className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </div>

      <h5 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 leading-snug">
        {resource.title}
      </h5>

      <p className="text-xs text-slate-400 leading-relaxed mb-3">
        {resource.description}
      </p>

      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
        <Globe size={12} className="text-slate-400" />
        <span>Recurso gratuito &bull; {resource.tag}</span>
      </div>
    </a>
  );
};
