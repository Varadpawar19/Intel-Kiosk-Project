import React, { useState } from 'react';
import { ChevronDown, Volume2 } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  localName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'hi', name: 'Hindi', localName: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', localName: 'मराठी', flag: '🇮🇳' },
  { code: 'en', name: 'English', localName: 'English', flag: '🇬🇧' },
  { code: 'te', name: 'Telugu', localName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', localName: 'தமிழ்', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  onLanguageChange: (language: Language) => void;
}

export default function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    onLanguageChange(language);
    
    // Simulate voice announcement
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Language changed to ${language.name}`
      );
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white border-2 border-blue-200 rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100"
        aria-label="Select Language"
      >
        <span className="text-2xl">{selectedLanguage.flag}</span>
        <div className="text-left">
          <div className="font-semibold text-blue-800 text-lg">{selectedLanguage.localName}</div>
          <div className="text-sm text-blue-600">{selectedLanguage.name}</div>
        </div>
        <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white border-2 border-blue-200 rounded-xl shadow-xl z-50 min-w-[200px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
              className="w-full flex items-center gap-3 px-6 py-4 hover:bg-blue-50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl focus:outline-none focus:bg-blue-50"
            >
              <span className="text-2xl">{language.flag}</span>
              <div className="text-left">
                <div className="font-semibold text-blue-800">{language.localName}</div>
                <div className="text-sm text-blue-600">{language.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}