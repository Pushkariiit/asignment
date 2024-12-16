import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizTimer } from '../components/QuizTimer';
import { useQuizStore } from '../store/quizStore';

export const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { currentQuiz, quizAttempt, startQuizAttempt, submitAnswer, completeQuiz } = useQuizStore();

  useEffect(() => {
    if (!currentQuiz) {
      navigate('/');
      return;
    }

    if (!quizAttempt) {
      startQuizAttempt(currentQuiz.id);
    }
  }, [currentQuiz, quizAttempt, navigate, startQuizAttempt]);

  if (!currentQuiz || !quizAttempt) return null;

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    submitAnswer(currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      completeQuiz();
      navigate('/results');
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleTimeUp = () => {
    completeQuiz();
    navigate('/results');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h2>
        <QuizTimer timeLimit={currentQuiz.timeLimit} onTimeUp={handleTimeUp} />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
          </span>
        </div>

        <QuizQuestion
          question={currentQuestion}
          selectedAnswer={quizAttempt.answers[currentQuestion.id]}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};