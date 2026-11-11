// Types for the educational platform

export type DifficultyLevel = 'Básico' | 'Intermedio' | 'Avanzado';

export type ClassStatus = 'not_started' | 'in_progress' | 'completed';

export interface ExternalResource {
  id: string;
  title: string;
  description: string;
  url: string;
  source: 'MDN Web Docs' | 'W3Schools' | 'web.dev' | 'Canva' | 'Otro';
  tag: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface MatchingPair {
  id: string;
  concept: string;
  definition: string;
}

export interface LessonSummary {
  id: number;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  duration: string;
  iconName: string;
  accentColor: string;
  gradient: string;
}

export interface StudentProjectData {
  projectName: string;
  category: string;
  objective: string;
  targetAudience: string;
  mainProblem: string;
  callToAction: string;
  sitemapSections: { id: string; name: string; purpose: string }[];
  primaryColor: string;
  fontFamily: string;
  githubUrl?: string;
  demoUrl?: string;
  aiToolsUsed: string[];
  reflections: string;
}

export interface ProgressState {
  completedLessons: number[]; // e.g. [1, 2]
  completedActivities: string[]; // activity IDs
  quizScores: Record<string, number>; // quizId -> score percentage
  studentProject: StudentProjectData;
  activeLessonId: number;
  lastUpdated: string;
}
