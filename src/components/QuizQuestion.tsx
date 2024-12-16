import React from 'react';
import { Question } from '../types';
import clsx from 'clsx';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  isReview?: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isReview = false,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => !isReview && onAnswerSelect(option)}
            className={clsx(
              'w-full p-4 text-left rounded-lg border transition-colors',
              {
                'border-gray-200 hover:bg-gray-50': !selectedAnswer && !isReview,
                'border-blue-500 bg-blue-50': selectedAnswer === option && !isReview,
                'border-green-500 bg-green-50': isReview && option === question.correctAnswer,
                'border-red-500 bg-red-50':
                  isReview && selectedAnswer === option && option !== question.correctAnswer,
              }
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};