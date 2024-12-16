import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { PDFUploader } from '../components/PDFUploader';
import { useQuizStore } from '../store/quizStore';

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setCurrentQuiz = useQuizStore((state) => state.setCurrentQuiz);

  const handlePDFUpload = async (file: File) => {
    setIsLoading(true);
    try {
      // Here you would:
      // 1. Parse the PDF
      // 2. Extract questions
      // 3. Use OpenAI to generate similar questions
      // 4. Create a quiz object
      
      // For now, we'll use mock data
      const mockQuiz = {
        id: 'mock-quiz',
        title: 'Sample Quiz',
        questions: [
          {
            id: '1',
            text: 'What is React?',
            options: [
              'A JavaScript library for building user interfaces',
              'A programming language',
              'A database system',
              'An operating system'
            ],
            correctAnswer: 'A JavaScript library for building user interfaces'
          },
          // Add more questions...
        ],
        timeLimit: 10 // 10 minutes
      };

      setCurrentQuiz(mockQuiz);
      navigate('/quiz');
    } catch (error) {
      console.error('Error processing PDF:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <Brain className="mx-auto h-16 w-16 text-blue-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">AI Quiz Generator</h1>
        <p className="mt-2 text-gray-600">
          Upload a PDF question paper and let AI generate similar questions for practice
        </p>
      </div>

      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your PDF...</p>
        </div>
      ) : (
        <PDFUploader onUpload={handlePDFUpload} />
      )}
    </div>
  );
};