import React from 'react';
import { Volume2 } from 'lucide-react';

interface AccessibilityButtonProps {
  onVoiceGuide: () => void;
}

export default function AccessibilityButton({ onVoiceGuide }: AccessibilityButtonProps) {
  return (
    <button
      onClick={onVoiceGuide}
      className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-200 z-50"
      aria-label="Replay voice guidance"
    >
      <Volume2 className="w-8 h-8" />
    </button>
  );
}