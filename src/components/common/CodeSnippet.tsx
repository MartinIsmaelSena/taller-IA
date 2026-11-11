import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = 'html',
  title,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/80 text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          {title ? (
            <span className="font-medium text-slate-200">{title}</span>
          ) : (
            <span className="flex items-center gap-1 text-slate-400">
              <Terminal size={13} />
              <span>{language.toUpperCase()}</span>
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors text-xs font-medium cursor-pointer"
          title="Copiar código"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto font-mono text-xs md:text-sm text-cyan-300 leading-relaxed bg-slate-950">
        <pre className="m-0 font-mono whitespace-pre">{code}</pre>
      </div>
    </div>
  );
};
