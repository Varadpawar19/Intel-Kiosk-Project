import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick: () => void;
  color?: 'blue' | 'green' | 'emerald';
}

export default function ActionButton({ 
  icon: Icon, 
  title, 
  subtitle, 
  onClick, 
  color = 'blue' 
}: ActionButtonProps) {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 border-blue-300 hover:border-blue-400',
    green: 'bg-green-500 hover:bg-green-600 border-green-300 hover:border-green-400',
    emerald: 'bg-emerald-500 hover:bg-emerald-600 border-emerald-300 hover:border-emerald-400'
  };

  const handleClick = () => {
    onClick();
    
    // Simulate voice announcement
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(title);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-6 
        ${colorClasses[color]}
        border-4 rounded-3xl p-8 shadow-xl hover:shadow-2xl
        transition-all duration-300 transform hover:scale-105
        focus:outline-none focus:ring-6 focus:ring-blue-200
        min-h-[280px] w-full max-w-[320px]
        active:scale-95
      `}
      aria-label={title}
    >
      <Icon className="w-20 h-20 text-white" strokeWidth={1.5} />
      <div className="text-center text-white">
        <div className="text-2xl font-bold mb-2">{title}</div>
        <div className="text-lg opacity-90 leading-relaxed">{subtitle}</div>
      </div>
    </button>
  );
}