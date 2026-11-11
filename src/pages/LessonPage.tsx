import React, { useState } from 'react';
import {
  Compass,
  Code2,
  Palette,
  Smartphone,
  Rocket,
  CheckCircle2,
  Target,
  Sparkles,
  BookOpen,
  HelpCircle,
  Award,
  Layers,
  Save,
  Clock
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { LESSONS_DATA, type ConceptBlock } from '../data/lessonsData';
import { RESOURCES_BY_LESSON } from '../data/resourcesData';
import { MultipleChoiceQuiz } from '../components/interactive/MultipleChoiceQuiz';
import { TrueFalseQuiz } from '../components/interactive/TrueFalseQuiz';
import { ResourceCard } from '../components/lessons/ResourceCard';
import { LessonNavigation } from '../components/lessons/LessonNavigation';
import { CodeSnippet } from '../components/common/CodeSnippet';
import { Callout } from '../components/common/Callout';
import { triggerConfetti } from '../components/common/Confetti';

// Class-specific interactive activities imports
import { SiteTypeClassifier } from '../components/interactive/SiteTypeClassifier';
import { WebsitePartsExplorer } from '../components/interactive/WebsitePartsExplorer';
import { InteractiveSitemapBuilder } from '../components/interactive/InteractiveSitemapBuilder';

import { HtmlCssClassifier } from '../components/interactive/HtmlCssClassifier';
import { TagRecognitionActivity } from '../components/interactive/TagRecognitionActivity';
import { LiveEditorPreview } from '../components/interactive/LiveEditorPreview';

import { VisualIdentityTester } from '../components/interactive/VisualIdentityTester';
import { ImageAdequacyChecker } from '../components/interactive/ImageAdequacyChecker';
import { LinkTypeClassifier } from '../components/interactive/LinkTypeClassifier';
import { BrokenNavigationFixer } from '../components/interactive/BrokenNavigationFixer';

import { ResponsiveViewportViewer } from '../components/interactive/ResponsiveViewportViewer';
import { ResponsiveBugFinder } from '../components/interactive/ResponsiveBugFinder';
import { MediaQueryPlayground } from '../components/interactive/MediaQueryPlayground';

import { MatchActivity } from '../components/interactive/MatchActivity';
import { CLASE5_MATCHING_PAIRS } from '../data/activitiesData';
import { ProjectCostCalculator } from '../components/interactive/ProjectCostCalculator';
import { PresentationChecklist } from '../components/interactive/PresentationChecklist';

export const LessonPage: React.FC = () => {
  const { activeLessonId, progress, updateStudentProject, markActivityCompleted, isLessonCompleted } = useProgress();

  const lesson = LESSONS_DATA[activeLessonId] || LESSONS_DATA[1];
  const resources = RESOURCES_BY_LESSON[activeLessonId] || [];
  const isDone = isLessonCompleted(activeLessonId);

  // Student practical challenge answer state
  const [challengeAnswer, setChallengeAnswer] = useState<string>(() => {
    return progress.studentProject.reflections || '';
  });
  const [challengeSaved, setChallengeSaved] = useState(false);

  const handleSaveChallenge = () => {
    updateStudentProject({ reflections: challengeAnswer });
    markActivityCompleted(`challenge-${activeLessonId}`);
    setChallengeSaved(true);
    triggerConfetti();
    setTimeout(() => setChallengeSaved(false), 3000);
  };

  const getLessonIcon = (num: number) => {
    switch (num) {
      case 1:
        return <Compass size={24} className="text-cyan-400" />;
      case 2:
        return <Code2 size={24} className="text-violet-400" />;
      case 3:
        return <Palette size={24} className="text-pink-400" />;
      case 4:
        return <Smartphone size={24} className="text-emerald-400" />;
      case 5:
        return <Rocket size={24} className="text-amber-400" />;
      default:
        return <Compass size={24} className="text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* 1. PRESENTACIÓN DE LA CLASE */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                {getLessonIcon(lesson.number)}
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                CLASE {lesson.number} DE 5
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                <Clock size={12} />
                <span>{lesson.duration}</span>
              </span>
              {isDone && (
                <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/40 font-bold">
                  <CheckCircle2 size={13} />
                  <span>Completada</span>
                </span>
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {lesson.title}
          </h1>

          <p className="text-sm sm:text-base text-cyan-200/90 font-medium">
            {lesson.tagline}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {lesson.introText}
          </p>
        </div>
      </section>

      {/* 2. ¿QUÉ VAMOS A APRENDER? */}
      <section className="rounded-2xl bg-slate-950/90 border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Target size={16} />
          <span>Objetivos de Aprendizaje</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-4">¿Qué vamos a aprender en esta clase?</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {lesson.learningGoals.map((goal, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
            >
              <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">{goal}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXPLICACIÓN DE LOS CONCEPTOS PRINCIPALES */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers size={16} />
            <span>Desarrollo Teórico &bull; Práctico</span>
          </div>
          <h3 className="text-xl font-bold text-white">Conceptos Fundamentales</h3>
        </div>

        <div className="space-y-6">
          {lesson.concepts.map((concept: ConceptBlock, cIdx) => (
            <div
              key={cIdx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <h4 className="text-base sm:text-lg font-bold text-white">{concept.title}</h4>
                {concept.badge && (
                  <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700 self-start sm:self-auto">
                    {concept.badge}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {concept.description}
              </p>

              {concept.details && (
                <ul className="space-y-2 mt-2">
                  {concept.details.map((detail, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs text-slate-300 leading-relaxed p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              {concept.example && (
                <div className="mt-3">
                  {concept.example.code ? (
                    <CodeSnippet
                      code={concept.example.code}
                      title={concept.example.label}
                      language={concept.example.code.includes('<') ? 'html' : 'css'}
                    />
                  ) : (
                    <Callout type="tip" title={concept.example.label}>
                      {concept.example.explanation}
                    </Callout>
                  )}
                </div>
              )}

              {concept.promptExample && (
                <Callout type="ai" title={`Prompt Sugerido para ${concept.promptExample.tool}`}>
                  <div className="font-mono text-xs text-violet-200 bg-violet-950/50 p-2.5 rounded-lg border border-violet-500/30 my-1">
                    "{concept.promptExample.prompt}"
                  </div>
                  <div className="text-[11px] text-violet-300/80 mt-1">
                    💡 <strong>Consejo:</strong> {concept.promptExample.tip}
                  </div>
                </Callout>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4 & 5. EJEMPLOS VISUALES Y ACTIVIDADES INTERACTIVAS */}
      <section className="space-y-6 pt-6 border-t border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles size={16} />
            <span>Manos a la Obra</span>
          </div>
          <h3 className="text-xl font-bold text-white">Actividades Interactivas y Demostraciones</h3>
          <p className="text-xs text-slate-400 mt-1">{lesson.activitiesIntro}</p>
        </div>

        {/* Dynamic Class Activities */}
        {activeLessonId === 1 && (
          <div className="space-y-6">
            <SiteTypeClassifier activityId="clase-1-site-types" />
            <WebsitePartsExplorer activityId="clase-1-parts-explorer" />
            <InteractiveSitemapBuilder activityId="clase-1-sitemap" />
          </div>
        )}

        {activeLessonId === 2 && (
          <div className="space-y-6">
            <HtmlCssClassifier activityId="clase-2-html-css" />
            <TagRecognitionActivity activityId="clase-2-tag-recognition" />
            <LiveEditorPreview activityId="clase-2-live-editor" />
          </div>
        )}

        {activeLessonId === 3 && (
          <div className="space-y-6">
            <VisualIdentityTester activityId="clase-3-identity-tester" />
            <ImageAdequacyChecker activityId="clase-3-image-adequacy" />
            <LinkTypeClassifier activityId="clase-3-link-types" />
            <BrokenNavigationFixer activityId="clase-3-broken-nav" />
          </div>
        )}

        {activeLessonId === 4 && (
          <div className="space-y-6">
            <ResponsiveViewportViewer activityId="clase-4-viewport-viewer" />
            <ResponsiveBugFinder activityId="clase-4-bug-finder" />
            <MediaQueryPlayground activityId="clase-4-media-query" />
          </div>
        )}

        {activeLessonId === 5 && (
          <div className="space-y-6">
            <MatchActivity
              activityId="clase-5-concepts-match"
              pairs={CLASE5_MATCHING_PAIRS}
              title="Actividad 1: Relacionar Conceptos de Publicación"
              description="Emparejá Dominio, Hosting, HTTPS y Mantenimiento con su definición correspondiente."
            />
            <ProjectCostCalculator activityId="clase-5-cost-calculator" />
            <PresentationChecklist activityId="clase-5-presentation-checklist" />
          </div>
        )}
      </section>

      {/* 6. DESAFÍO PRÁCTICO */}
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 p-6 md:p-7 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Award size={18} />
          <span>Desafío de Cierre</span>
        </div>

        <h3 className="text-lg font-bold text-white">{lesson.challenge.title}</h3>

        <div className="space-y-2">
          {lesson.challenge.instructions.map((inst, iIdx) => (
            <p key={iIdx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
              <span className="text-cyan-400 font-bold">&bull;</span>
              <span>{inst}</span>
            </p>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
          <span className="font-bold text-slate-200 block mb-1">Preguntas orientadoras:</span>
          {lesson.challenge.guidingQuestions.map((gq, gIdx) => (
            <div key={gIdx} className="text-slate-400">&bull; {gq}</div>
          ))}
        </div>

        {/* Student notebook input */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-semibold text-slate-300 block">
            Tu respuesta y notas para este desafío:
          </label>
          <textarea
            rows={4}
            value={challengeAnswer}
            onChange={(e) => setChallengeAnswer(e.target.value)}
            placeholder={lesson.challenge.sampleAnswerPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 leading-relaxed resize-none"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Se guarda automáticamente en tu navegador (localStorage).
            </span>
            <button
              onClick={handleSaveChallenge}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-md cursor-pointer"
            >
              <Save size={13} />
              {challengeSaved ? '¡Guardado con Éxito!' : 'Guardar en mi Cuaderno'}
            </button>
          </div>
        </div>
      </section>

      {/* 7. RECURSOS EXTERNOS PARA PROFUNDIZAR («SEGUÍ APRENDIENDO») */}
      <section className="space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen size={16} />
            <span>Seguí Aprendiendo</span>
          </div>
          <h3 className="text-xl font-bold text-white">Fuentes Oficiales y Enlaces Recomendados</h3>
          <p className="text-xs text-slate-400 mt-1">
            Documentación gratuita y confiable para ampliar tus conocimientos técnicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </section>

      {/* 8. BREVE AUTOEVALUACIÓN */}
      <section className="space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <HelpCircle size={16} />
            <span>Comprobación de Aprendizajes</span>
          </div>
          <h3 className="text-xl font-bold text-white">Autoevaluación de la Clase {lesson.number}</h3>
        </div>

        {/* Multiple Choice Quiz */}
        <MultipleChoiceQuiz
          quizId={`clase-${activeLessonId}-quiz`}
          questions={lesson.quiz}
          title={`Cuestionario de Opción Múltiple (Clase ${lesson.number})`}
        />

        {/* True or False Quiz */}
        <TrueFalseQuiz
          activityId={`clase-${activeLessonId}-truefalse`}
          questions={lesson.trueFalse}
          title={`Afirmaciones de la Clase ${lesson.number}: ¿Verdadero o Falso?`}
        />
      </section>

      {/* 9. RESUMEN DE LO APRENDIDO */}
      <section className="rounded-2xl bg-slate-950 border border-slate-800 p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Award size={18} />
          <span>Ideas Clave</span>
        </div>
        <h3 className="text-lg font-bold text-white">Resumen de lo que Aprendiste</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {lesson.takeaways.map((takeaway, tIdx) => (
            <div
              key={tIdx}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300"
            >
              <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Lesson Navigation Bottom */}
      <LessonNavigation currentLessonId={activeLessonId} />
    </div>
  );
};
