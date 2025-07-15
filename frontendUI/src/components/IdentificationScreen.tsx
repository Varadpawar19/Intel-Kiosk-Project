import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, User, Hash, Smartphone, UserX, ChevronRight } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  localName: string;
  flag: string;
}

interface IdentificationScreenProps {
  selectedLanguage: Language;
  onBack: () => void;
  onOptionSelect: (option: string) => void;
  onVoiceGuide: () => void;
}

const translations = {
  hi: {
    title: 'आप कैसे आगे बढ़ना चाहते हैं?',
    subtitle: 'अपनी पहचान का तरीका चुनें',
    faceId: 'चेहरा स्कैन करें',
    faceIdSubtitle: 'Face ID से पहचान',
    abhaAadhaar: 'ABHA / आधार नंबर',
    abhaAadhaarSubtitle: 'OTP के साथ',
    mobileNumber: 'मोबाइल नंबर',
    mobileNumberSubtitle: 'OTP भेजें',
    anonymous: 'बिना पहचान के आगे बढ़ें',
    anonymousSubtitle: 'गुमनाम जांच',
    stepIndicator: 'चरण 2 का 6',
    backButton: 'वापस जाएं'
  },
  en: {
    title: 'How would you like to continue?',
    subtitle: 'Choose your identification method',
    faceId: 'Scan Face',
    faceIdSubtitle: 'Face ID recognition',
    abhaAadhaar: 'ABHA / Aadhaar Number',
    abhaAadhaarSubtitle: 'With OTP verification',
    mobileNumber: 'Mobile Number',
    mobileNumberSubtitle: 'Send OTP',
    anonymous: 'Continue Anonymously',
    anonymousSubtitle: 'Skip identification',
    stepIndicator: 'Step 2 of 6',
    backButton: 'Go Back'
  },
  mr: {
    title: 'तुम्ही कसे पुढे जाऊ इच्छिता?',
    subtitle: 'तुमची ओळख पद्धत निवडा',
    faceId: 'चेहरा स्कॅन करा',
    faceIdSubtitle: 'Face ID ओळख',
    abhaAadhaar: 'ABHA / आधार नंबर',
    abhaAadhaarSubtitle: 'OTP सह',
    mobileNumber: 'मोबाइल नंबर',
    mobileNumberSubtitle: 'OTP पाठवा',
    anonymous: 'निनावीपणे पुढे जा',
    anonymousSubtitle: 'ओळख वगळा',
    stepIndicator: 'पायरी 2 चा 6',
    backButton: 'मागे जा'
  }
};

export default function IdentificationScreen({ 
  selectedLanguage, 
  onBack, 
  onOptionSelect, 
  onVoiceGuide 
}: IdentificationScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const currentTranslation = translations[selectedLanguage.code as keyof typeof translations] || translations.en;

  const identificationOptions = [
    {
      id: 'faceId',
      icon: User,
      title: currentTranslation.faceId,
      subtitle: currentTranslation.faceIdSubtitle,
      color: 'blue',
      emoji: '🧑‍💼'
    },
    {
      id: 'abhaAadhaar',
      icon: Hash,
      title: currentTranslation.abhaAadhaar,
      subtitle: currentTranslation.abhaAadhaarSubtitle,
      color: 'green',
      emoji: '🔢'
    },
    {
      id: 'mobile',
      icon: Smartphone,
      title: currentTranslation.mobileNumber,
      subtitle: currentTranslation.mobileNumberSubtitle,
      color: 'emerald',
      emoji: '📱'
    },
    {
      id: 'anonymous',
      icon: UserX,
      title: currentTranslation.anonymous,
      subtitle: currentTranslation.anonymousSubtitle,
      color: 'gray',
      emoji: '🧭'
    }
  ];

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
    
    // Voice announcement
    if ('speechSynthesis' in window) {
      const option = identificationOptions.find(opt => opt.id === optionId);
      if (option) {
        const utterance = new SpeechSynthesisUtterance(option.title);
        speechSynthesis.speak(utterance);
      }
    }
    
    // Simulate selection delay then proceed
    setTimeout(() => {
      onOptionSelect(optionId);
    }, 800);
  };

  // Auto-play welcome message on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentTranslation.title);
        speechSynthesis.speak(utterance);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedLanguage]);

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = {
      blue: isSelected 
        ? 'bg-blue-600 border-blue-500 shadow-2xl scale-105' 
        : 'bg-blue-500 hover:bg-blue-600 border-blue-300 hover:border-blue-400',
      green: isSelected 
        ? 'bg-green-600 border-green-500 shadow-2xl scale-105' 
        : 'bg-green-500 hover:bg-green-600 border-green-300 hover:border-green-400',
      emerald: isSelected 
        ? 'bg-emerald-600 border-emerald-500 shadow-2xl scale-105' 
        : 'bg-emerald-500 hover:bg-emerald-600 border-emerald-300 hover:border-emerald-400',
      gray: isSelected 
        ? 'bg-gray-600 border-gray-500 shadow-2xl scale-105' 
        : 'bg-gray-500 hover:bg-gray-600 border-gray-300 hover:border-gray-400'
    };
    return baseClasses[color as keyof typeof baseClasses] || baseClasses.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="flex justify-between items-center p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100"
          aria-label={currentTranslation.backButton}
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
          <span className="font-semibold text-gray-700">{currentTranslation.backButton}</span>
        </button>

        <div className="flex items-center gap-4">
          {/* Progress Indicator */}
          <div className="bg-white border-2 border-blue-200 rounded-xl px-4 py-2 shadow-md">
            <span className="text-blue-800 font-semibold">{currentTranslation.stepIndicator}</span>
          </div>

          {/* Language Display */}
          <div className="flex items-center gap-2 bg-white border-2 border-blue-200 rounded-xl px-4 py-2 shadow-md">
            <span className="text-2xl">{selectedLanguage.flag}</span>
            <span className="font-semibold text-blue-800">{selectedLanguage.localName}</span>
          </div>

          {/* Voice Guide Button */}
          <button
            onClick={onVoiceGuide}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
            aria-label="Voice guidance"
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-8 py-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            {currentTranslation.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {currentTranslation.subtitle}
          </p>
          
          {/* Progress Bar */}
          <div className="w-64 bg-gray-200 rounded-full h-3 mx-auto">
            <div className="bg-blue-500 h-3 rounded-full w-1/3 transition-all duration-500"></div>
          </div>
        </div>

        {/* Identification Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {identificationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={selectedOption !== null}
              className={`
                flex flex-col items-center justify-center gap-6 
                ${getColorClasses(option.color, selectedOption === option.id)}
                border-4 rounded-3xl p-8 shadow-xl hover:shadow-2xl
                transition-all duration-300 transform hover:scale-105
                focus:outline-none focus:ring-6 focus:ring-blue-200
                min-h-[280px] w-full
                active:scale-95
                disabled:cursor-not-allowed
                ${selectedOption && selectedOption !== option.id ? 'opacity-50' : ''}
              `}
              aria-label={option.title}
            >
              {/* Large Emoji Icon */}
              <div className="text-6xl mb-2">
                {option.emoji}
              </div>
              
              {/* Lucide Icon */}
              <option.icon className="w-16 h-16 text-white" strokeWidth={1.5} />
              
              <div className="text-center text-white">
                <div className="text-2xl font-bold mb-2">{option.title}</div>
                <div className="text-lg opacity-90 leading-relaxed">{option.subtitle}</div>
              </div>

              {/* Selection Indicator */}
              {selectedOption === option.id && (
                <div className="flex items-center gap-2 text-white">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Processing...</span>
                </div>
              )}

              {/* Arrow Indicator */}
              {selectedOption !== option.id && (
                <ChevronRight className="w-8 h-8 text-white opacity-70" />
              )}
            </button>
          ))}
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg max-w-2xl">
            Choose the method that works best for you. All options are secure and your privacy is protected.
          </p>
        </div>
      </main>
    </div>
  );
}