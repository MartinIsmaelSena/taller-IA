import React from 'react';
import { Sparkles, Info, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'ai' | 'success';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
}) => {
  const styles = {
    info: {
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-950/20',
      text: 'text-cyan-200',
      icon: <Info className="text-cyan-400 shrink-0 mt-0.5" size={18} />,
      titleColor: 'text-cyan-300',
    },
    tip: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-950/20',
      text: 'text-emerald-200',
      icon: <Lightbulb className="text-emerald-400 shrink-0 mt-0.5" size={18} />,
      titleColor: 'text-emerald-300',
    },
    warning: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-950/20',
      text: 'text-amber-200',
      icon: <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={18} />,
      titleColor: 'text-amber-300',
    },
    ai: {
      border: 'border-violet-500/40',
      bg: 'bg-violet-950/30',
      text: 'text-violet-200',
      icon: <Sparkles className="text-violet-400 shrink-0 mt-0.5" size={18} />,
      titleColor: 'text-violet-300',
    },
    success: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-950/20',
      text: 'text-emerald-200',
      icon: <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />,
      titleColor: 'text-emerald-300',
    },
  }[type];

  return (
    <div className={`my-4 p-4 rounded-xl border ${styles.border} ${styles.bg} flex gap-3 text-sm leading-relaxed backdrop-blur-sm`}>
      {styles.icon}
      <div className="flex-1">
        {title && <h5 className={`font-semibold mb-1 ${styles.titleColor}`}>{title}</h5>}
        <div className={styles.text}>{children}</div>
      </div>
    </div>
  );
};
