import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ErrorBanner = ({ message, onClose }) => {
  if (!message) return null;
  const messages = Array.isArray(message) ? message : [message];

  return (
    <div role="alert" className="bg-red-50 border-2 border-red-300 text-red-800 rounded-lg p-3 flex items-start justify-between gap-3">
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-5 w-5 flex-shrink-0" />
        <div className="space-y-1">
          {messages.map((msg, idx) => (
            <p key={idx} className="text-sm leading-snug">
              {msg}
            </p>
          ))}
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss error"
          className="text-red-700 hover:text-red-900"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;