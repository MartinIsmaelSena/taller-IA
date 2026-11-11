import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Image } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

interface ImageScenario {
  id: string;
  title: string;
  format: string;
  weight: string;
  description: string;
  isAdequate: boolean;
  explanation: string;
}

const IMAGE_SCENARIOS: ImageScenario[] = [
  {
    id: 'img-1',
    title: 'Foto real de alumnos en el taller de informática',
    format: 'WebP',
    weight: '140 KB',
    description: 'Fotografía auténtica de los estudiantes trabajando con placas y cables, optimizada en WebP con buena compresión.',
    isAdequate: true,
    explanation: '¡Excelente! Comunica realidad, cercanía institucional y su peso ligero (140 KB) asegura que la página cargue en menos de un segundo.',
  },
  {
    id: 'img-2',
    title: 'Foto directa de cámara réflex sin comprimir',
    format: 'RAW / JPG',
    weight: '16.5 MB',
    description: 'Foto en ultra alta definición sacada con cámara profesional, subida directamente al servidor sin redimensionar ni comprimir.',
    isAdequate: false,
    explanation: '¡Ojo! Pesa 16.5 MB. Hará que la página tarde más de 10 segundos en abrir en un celular con datos móviles lentos y consumirá el plan del usuario.',
  },
  {
    id: 'img-3',
    title: 'Logotipo escolar con fondo transparente',
    format: 'PNG o SVG',
    weight: '45 KB',
    description: 'Escudo de la institución con fondo transparente para que se integre limpiamente sobre cualquier color del header.',
    isAdequate: true,
    explanation: '¡Muy bien! El formato PNG o SVG con fondo transparente y peso bajo es el estándar ideal para isotipos y logotipos.',
  },
  {
    id: 'img-4',
    title: 'Ilustración genérica de robots de ciencia ficción con fuegos artificiales',
    format: 'JPG',
    weight: '2.8 MB',
    description: 'Imagen generada con IA demasiado fantasiosa que no guarda relación con lo que los alumnos hacen en el taller de secundaria.',
    isAdequate: false,
    explanation: '¡Exacto! Las imágenes deben tener coherencia con el mensaje del sitio. Una imagen cliché y pesada confunde al visitante y resta credibilidad.',
  },
];

export const ImageAdequacyChecker: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (id: string, isAdequate: boolean) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: isAdequate }));
  };

  const handleCheck = () => {
    setSubmitted(true);
    const allCorrect = IMAGE_SCENARIOS.every((item) => answers[item.id] === item.isAdequate);
    if (allCorrect) {
      triggerConfetti();
    }
    markActivityCompleted(activityId);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = IMAGE_SCENARIOS.every((item) => answers[item.id] !== undefined);
  const correctCount = submitted
    ? IMAGE_SCENARIOS.filter((item) => answers[item.id] === item.isAdequate).length
    : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Image size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 2: Detectar Imágenes Adecuadas</h4>
            <p className="text-xs text-slate-400">Evaluá el peso, formato y coherencia temática de cada recurso.</p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {correctCount} de {IMAGE_SCENARIOS.length} acertadas
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={12} /> Reintentar
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {IMAGE_SCENARIOS.map((item, idx) => {
          const userChoice = answers[item.id];
          const isCorrect = userChoice === item.isAdequate;

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-200">
                    #{idx + 1} {item.title}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      {item.format}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        item.weight.includes('MB')
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {item.weight}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">{item.description}</p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSelect(item.id, true)}
                    disabled={submitted}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition border ${
                      userChoice === true
                        ? submitted
                          ? item.isAdequate
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                            : 'bg-rose-950/70 border-rose-500 text-rose-300 line-through'
                          : 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    Adecuada
                  </button>

                  <button
                    onClick={() => handleSelect(item.id, false)}
                    disabled={submitted}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition border ${
                      userChoice === false
                        ? submitted
                          ? !item.isAdequate
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                            : 'bg-rose-950/70 border-rose-500 text-rose-300 line-through'
                          : 'bg-rose-500/20 border-rose-500 text-rose-300 ring-1 ring-rose-500'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    No recomendada
                  </button>
                </div>

                {submitted && (
                  <div
                    className={`mt-2.5 p-2 rounded-lg text-[11px] leading-relaxed flex items-start gap-1.5 ${
                      isCorrect
                        ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-950/30 border border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 size={13} className="shrink-0 mt-0.5 text-emerald-400" />
                    ) : (
                      <XCircle size={13} className="shrink-0 mt-0.5 text-rose-400" />
                    )}
                    <span>{item.explanation}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCheck}
            disabled={!allAnswered}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              allAnswered
                ? 'bg-pink-500 hover:bg-pink-400 text-slate-950 cursor-pointer shadow-md'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Verificar Imágenes
          </button>
        </div>
      )}
    </div>
  );
};
