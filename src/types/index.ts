export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  timeLimit: number; // in minutes
}

export interface QuizAttempt {
  quizId: string;
  answers: Record<string, string>;
  score: number;
  timeSpent: number;
  completed: boolean;
}