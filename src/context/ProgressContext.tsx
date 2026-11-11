import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ProgressState, StudentProjectData } from '../types/lesson';

const STORAGE_KEY = 'web_taller_progress_v1';

const defaultProjectData: StudentProjectData = {
  projectName: 'Mi Web Escolar',
  category: 'Institucional / Comunitario',
  objective: 'Dar a conocer las actividades del taller de informática y facilitar la inscripción a proyectos.',
  targetAudience: 'Estudiantes de secundaria, docentes y familias de la comunidad educativa.',
  mainProblem: 'Falta de un canal centralizado y accesible donde ver horarios, proyectos y novedades.',
  callToAction: '¡Sumate al taller!',
  sitemapSections: [
    { id: 'sec-1', name: 'Inicio', purpose: 'Presentación del taller y proyectos destacados' },
    { id: 'sec-2', name: 'Proyectos', purpose: 'Galería de trabajos realizados por estudiantes' },
    { id: 'sec-3', name: 'Equipo', purpose: 'Quiénes somos y docentes a cargo' },
    { id: 'sec-4', name: 'Contacto', purpose: 'Formulario y enlace a WhatsApp para consultas' },
  ],
  primaryColor: '#06b6d4',
  fontFamily: 'Inter',
  githubUrl: '',
  demoUrl: '',
  aiToolsUsed: ['ChatGPT para idear nombres', 'Perplexity para investigar referencias'],
  reflections: 'La IA nos ayudó a ordenar el sitemap inicial, pero tuvimos que adaptar los textos a la realidad de nuestra escuela.',
};

const initialProgress: ProgressState = {
  completedLessons: [],
  completedActivities: [],
  quizScores: {},
  studentProject: defaultProjectData,
  activeLessonId: 1,
  lastUpdated: new Date().toISOString(),
};

interface ProgressContextType {
  progress: ProgressState;
  activeView: 'home' | 'lesson' | 'project' | 'resources';
  activeLessonId: number;
  setActiveView: (view: 'home' | 'lesson' | 'project' | 'resources', lessonId?: number) => void;
  markActivityCompleted: (activityId: string) => void;
  isActivityCompleted: (activityId: string) => boolean;
  saveQuizScore: (quizId: string, score: number) => void;
  markLessonCompleted: (lessonId: number) => void;
  isLessonCompleted: (lessonId: number) => boolean;
  updateStudentProject: (data: Partial<StudentProjectData>) => void;
  resetProgress: () => void;
  completionPercentage: number;
  totalActivitiesCompleted: number;

  // Loading animation state
  isLoading: boolean;
  loadingMessage: string;
  loadingSubMessage?: string;
  handleLoadingComplete: () => void;
}

const TOTAL_EXPECTED_ACTIVITIES = 20; // 4 core activities per lesson * 5 classes

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading progress from localStorage', e);
    }
    return initialProgress;
  });

  const [activeView, setActiveViewInternal] = useState<'home' | 'lesson' | 'project' | 'resources'>('home');
  const [activeLessonId, setActiveLessonId] = useState<number>(1);

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>('Preparando el entorno de aprendizaje...');
  const [loadingSubMessage, setLoadingSubMessage] = useState<string | undefined>('Desarrollo Web desde Cero');
  const isTransitioningRef = useRef<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving progress to localStorage', e);
    }
  }, [progress]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    isTransitioningRef.current = false;
  };

  const setActiveView = (view: 'home' | 'lesson' | 'project' | 'resources', lessonId?: number) => {
    // Avoid double triggers if transition is running
    if (isTransitioningRef.current) return;

    // Check if user is clicking on current view & class
    const isSameViewAndClass =
      view === activeView &&
      (view !== 'lesson' || lessonId === undefined || lessonId === activeLessonId);

    if (isSameViewAndClass) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Set appropriate loading messages
    let msg = 'Preparando el entorno de aprendizaje...';
    let subMsg: string | undefined = undefined;

    if (view === 'lesson') {
      const targetId = lessonId !== undefined ? lessonId : activeLessonId;
      msg = `Cargando Clase ${targetId}...`;
      subMsg = 'Preparando el entorno de aprendizaje...';
    } else if (view === 'home') {
      msg = 'Regresando a la Portada...';
      subMsg = 'Cargando recorrido pedagógico...';
    } else if (view === 'project') {
      msg = 'Cargando Proyecto Integrador...';
      subMsg = 'Preparando ficha técnica y rúbrica...';
    } else if (view === 'resources') {
      msg = 'Cargando Biblioteca de Recursos...';
      subMsg = 'Conectando con fuentes oficiales...';
    }

    setLoadingMessage(msg);
    setLoadingSubMessage(subMsg);
    setIsLoading(true);
    isTransitioningRef.current = true;

    // Switch view underneath overlay and scroll to top
    if (lessonId !== undefined) {
      setActiveLessonId(lessonId);
      setProgress((prev) => ({ ...prev, activeLessonId: lessonId }));
    }
    setActiveViewInternal(view);
    window.scrollTo({ top: 0 });
  };

  const markActivityCompleted = (activityId: string) => {
    setProgress((prev) => {
      if (prev.completedActivities.includes(activityId)) return prev;
      return {
        ...prev,
        completedActivities: [...prev.completedActivities, activityId],
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const isActivityCompleted = (activityId: string): boolean => {
    return progress.completedActivities.includes(activityId);
  };

  const saveQuizScore = (quizId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizId]: score,
      },
      completedActivities: prev.completedActivities.includes(quizId)
        ? prev.completedActivities
        : [...prev.completedActivities, quizId],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const markLessonCompleted = (lessonId: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const isLessonCompleted = (lessonId: number): boolean => {
    return progress.completedLessons.includes(lessonId);
  };

  const updateStudentProject = (data: Partial<StudentProjectData>) => {
    setProgress((prev) => ({
      ...prev,
      studentProject: {
        ...prev.studentProject,
        ...data,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const resetProgress = () => {
    if (window.confirm('¿Estás seguro de que querés reiniciar todo tu progreso? Se borrarán las actividades marcadas y respuestas.')) {
      setProgress(initialProgress);
      localStorage.removeItem(STORAGE_KEY);
      setActiveView('home');
    }
  };

  // Percentage based on lessons completed (50%) + activities (50%)
  const lessonProgressPart = (progress.completedLessons.length / 5) * 50;
  const activityProgressPart = Math.min(50, (progress.completedActivities.length / TOTAL_EXPECTED_ACTIVITIES) * 50);
  const completionPercentage = Math.round(lessonProgressPart + activityProgressPart);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        activeView,
        activeLessonId,
        setActiveView,
        markActivityCompleted,
        isActivityCompleted,
        saveQuizScore,
        markLessonCompleted,
        isLessonCompleted,
        updateStudentProject,
        resetProgress,
        completionPercentage,
        totalActivitiesCompleted: progress.completedActivities.length,
        isLoading,
        loadingMessage,
        loadingSubMessage,
        handleLoadingComplete,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
