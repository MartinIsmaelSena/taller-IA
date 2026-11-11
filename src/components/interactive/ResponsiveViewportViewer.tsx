import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Sparkles } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const ResponsiveViewportViewer: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewedDevices, setViewedDevices] = useState<Set<string>>(new Set(['desktop']));

  const handleDeviceChange = (d: 'desktop' | 'tablet' | 'mobile') => {
    setDevice(d);
    setViewedDevices((prev) => {
      const next = new Set(prev).add(d);
      if (next.size >= 3) {
        markActivityCompleted(activityId);
      }
      return next;
    });
  };

  const deviceConfig = {
    desktop: {
      widthClass: 'max-w-4xl',
      title: 'Pantalla de Computadora (Escritorio)',
      resolution: '1200px o más',
      columns: 'grid-cols-3',
      menuLayout: 'flex-row items-center',
      padding: 'p-6',
      heroSize: 'text-2xl',
      notes: 'Espacio horizontal amplio. Menú desplegado en fila, tarjetas en 3 columnas.',
    },
    tablet: {
      widthClass: 'max-w-xl',
      title: 'Pantalla de Tablet (Mediana)',
      resolution: '768px a 1024px',
      columns: 'grid-cols-2',
      menuLayout: 'flex-row items-center gap-2',
      padding: 'p-4',
      heroSize: 'text-xl',
      notes: 'Espacio intermedio. El contenido se redistribuye a 2 columnas para no apretarse.',
    },
    mobile: {
      widthClass: 'max-w-[340px]',
      title: 'Pantalla de Celular (Móvil)',
      resolution: '375px',
      columns: 'grid-cols-1',
      menuLayout: 'flex-col items-stretch gap-1.5',
      padding: 'p-3',
      heroSize: 'text-lg',
      notes: 'Pantalla vertical estrecha. Todo se apila en 1 columna, botones táctiles amplios.',
    },
  }[device];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Smartphone className="text-emerald-400" size={18} />
            Simulador de Dispositivos: ¿Cómo se adapta la web?
          </h4>
          <p className="text-xs text-slate-400">Cambiá entre Computadora, Tablet y Celular para ver la reorganización en vivo.</p>
        </div>

        {/* Device Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => handleDeviceChange('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              device === 'desktop'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor size={14} />
            Desktop
          </button>

          <button
            onClick={() => handleDeviceChange('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              device === 'tablet'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet size={14} />
            Tablet
          </button>

          <button
            onClick={() => handleDeviceChange('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              device === 'mobile'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone size={14} />
            Celular
          </button>
        </div>
      </div>

      {/* Info bar about current resolution */}
      <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-300">{deviceConfig.title}</span>
          <span className="font-mono text-slate-400">({deviceConfig.resolution})</span>
        </div>
        <div className="text-slate-400 hidden sm:block">
          {deviceConfig.notes}
        </div>
      </div>

      {/* Simulated Viewport Stage */}
      <div className="mt-5 p-4 sm:p-8 bg-slate-950 rounded-2xl border border-slate-800 flex justify-center items-center overflow-x-auto min-h-[440px]">
        <div
          className={`w-full ${deviceConfig.widthClass} transition-all duration-300 bg-slate-900 rounded-2xl border-2 border-slate-700 shadow-2xl overflow-hidden flex flex-col`}
        >
          {/* Mock Browser Frame */}
          <div className="px-3 py-2 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between text-slate-400 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
              {device === 'mobile' ? 'm.taller-web.ar' : 'https://taller-web.ar'}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">{deviceConfig.resolution}</span>
          </div>

          {/* Webpage Content */}
          <div className={`space-y-4 ${deviceConfig.padding} bg-slate-900`}>
            {/* Header / Navbar */}
            <header className={`flex ${deviceConfig.menuLayout} justify-between pb-3 border-b border-slate-800 text-xs`}>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <span className="w-5 h-5 rounded bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                  T
                </span>
                <span>Técnica Web</span>
              </div>
              <div className={`flex ${deviceConfig.menuLayout} text-slate-300 text-[11px] gap-2`}>
                <span className="px-2 py-1 rounded bg-slate-800 text-emerald-300">Inicio</span>
                <span className="px-2 py-1 rounded hover:bg-slate-800">Cursos</span>
                <span className="px-2 py-1 rounded hover:bg-slate-800">Contacto</span>
              </div>
            </header>

            {/* Hero */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 text-center space-y-2">
              <h3 className={`font-bold text-white ${deviceConfig.heroSize} leading-tight`}>
                Aprendé Desarrollo Web Adaptable
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Un solo código que se ajusta a todos los tamaños de pantalla automáticamente.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  ¡Empezar ahora!
                </button>
              </div>
            </div>

            {/* Responsive Grid Cards */}
            <div className={`grid ${deviceConfig.columns} gap-3`}>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold text-xs">📱 1. Viewport</div>
                <p className="text-[11px] text-slate-400">Controla el zoom inicial en móviles con meta viewport.</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold text-xs">📐 2. Flexbox</div>
                <p className="text-[11px] text-slate-400">Reordena filas a columnas con flex-direction.</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold text-xs">🎯 3. Media Queries</div>
                <p className="text-[11px] text-slate-400">Aplica estilos con @media (max-width: 600px).</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewedDevices.size >= 3 && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <Sparkles size={16} />
          <span>¡Excelente! Exploraste cómo se reorganiza el layout en los 3 tamaños de pantalla.</span>
        </div>
      )}
    </div>
  );
};
