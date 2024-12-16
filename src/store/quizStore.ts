import { create } from 'zustand';
import { Question, Quiz, QuizAttempt } from '../types';

interface QuizStore {
  currentQuiz: Quiz | null;
  quizAttempt: QuizAttempt | null;
  setCurrentQuiz: (quiz: Quiz) => void;
  startQuizAttempt: (quizId: string) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  completeQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  currentQuiz: null,
  quizAttempt: null,
  
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  
  startQuizAttempt: (quizId) => set({
    quizAttempt: {
      quizId,
      answers: {},
      score: 0,
      timeSpent: 0,
      completed: false,
    },
  }),
  
  submitAnswer: (questionId, answer) => 
    set((state) => ({
      quizAttempt: state.quizAttempt ? {
        ...state.quizAttempt,
        answers: {
          ...state.quizAttempt.answers,
          [questionId]: answer,
        },
      } : null,
    })),
    
  completeQuiz: () => set((state) => {
    if (!state.currentQuiz || !state.quizAttempt) return state;
    
    const correctAnswers = state.currentQuiz.questions.filter(
      (q) => state.quizAttempt?.answers[q.id] === q.correctAnswer
    ).length;
    
    const score = (correctAnswers / state.currentQuiz.questions.length) * 100;
    
    return {
      quizAttempt: {
        ...state.quizAttempt,
        score,
        completed: true,
      },
    };
  }),
}));