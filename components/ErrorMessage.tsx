
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-900/50 border border-red-700 text-red-200 px-6 py-4 rounded-lg shadow-md my-6" role="alert">
      <strong className="font-bold mr-2">Error:</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
