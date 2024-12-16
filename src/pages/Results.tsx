import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, RefreshCw } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { QuizQuestion } from '../components/QuizQuestion';

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const { currentQuiz, quizAttempt } = useQuizStore();

  if (!currentQuiz || !quizAttempt) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <Trophy className="mx-auto h-16 w-16 text-yellow-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Quiz Results</h1>
        <p className="mt-2 text-xl text-gray-600">
          Your Score: {quizAttempt.score.toFixed(1)}%
        </p>
      </div>

      <div className="space-y-8">
        {currentQuiz.questions.map((question) => (
          <div key={question.id} className="bg-white rounded-lg shadow-lg p-6">
            <QuizQuestion
              question={question}
              selectedAnswer={quizAttempt.answers[question.id]}
              onAnswerSelect={() => {}}
              isReview={true}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Try Another Quiz
        </button>
      </div>
    </div>
  );
};