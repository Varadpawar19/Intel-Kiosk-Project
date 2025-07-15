import React, { useState, useEffect } from 'react';
import { Heart, Search, Stethoscope, Users, Volume2 } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import ActionButton from './components/ActionButton';
import TrustedLogos from './components/TrustedLogos';
import AccessibilityButton from './components/AccessibilityButton';
import IdentificationScreen from './components/IdentificationScreen';
import VitalsMeasurementScreen from './components/VitalsMeasurementScreen';
import HealthSchemeEligibilityScreen from './components/HealthSchemeEligibilityScreen';

interface Language {
  code: string;
  name: string;
  localName: string;
  flag: string;
}

const translations = {
  hi: {
    welcome: 'Health Sewa Kendra में आपका स्वागत है',
    subtitle: 'स्वास्थ्य सेवा केंद्र में आपका स्वागत है',
    identifyMe: 'मैं कौन हूं',
    identifySubtitle: 'आधार, ABHA, या Face ID',
    startCheckup: 'बिना ID के चेकअप',
    startCheckupSubtitle: 'गुमनाम स्वास्थ्य जांच',
    assistedMode: 'सहायता मोड',
    assistedSubtitle: 'ASHA/स्वयंसेवक की मदद'
  },
  en: {
    welcome: 'Welcome to Health Sewa Kendra',
    subtitle: 'स्वास्थ्य सेवा केंद्र में आपका स्वागत है',
    identifyMe: 'Identify Myself',
    identifySubtitle: 'Aadhaar, ABHA, or Face ID',
    startCheckup: 'Start Checkup Without ID',
    startCheckupSubtitle: 'Anonymous health check',
    assistedMode: 'Assisted Mode',
    assistedSubtitle: 'ASHA/volunteer help'
  },
  mr: {
    welcome: 'Health Sewa Kendra मध्ये आपले स्वागत आहे',
    subtitle: 'आरोग्य सेवा केंद्रात आपले स्वागत आहे',
    identifyMe: 'मी कोण आहे',
    identifySubtitle: 'आधार, ABHA, किंवा Face ID',
    startCheckup: 'ID शिवाय चेकअप',
    startCheckupSubtitle: 'निनावी आरोग्य तपासणी',
    assistedMode: 'सहाय्यता मोड',
    assistedSubtitle: 'ASHA/स्वयंसेवक मदत'
  }
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'identification' | 'vitals' | 'schemes'>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'hi',
    name: 'Hindi',
    localName: 'हिंदी',
    flag: '🇮🇳'
  });

  const currentTranslation = translations[selectedLanguage.code as keyof typeof translations] || translations.en;

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleVoiceGuide = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Welcome to Health Sewa Kendra. Please choose your preferred option: Identify yourself, start checkup without ID, or use assisted mode.`
      );
      speechSynthesis.speak(utterance);
    }
  };

  const handleActionClick = (action: string) => {
    console.log(`Action clicked: ${action}`);
    if (action === 'identify') {
      setCurrentScreen('identification');
    }else if (action === 'checkup') {
      setCurrentScreen('vitals');
    }
    // Handle other actions as needed
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleIdentificationSelect = (option: string) => {
    console.log(`Identification option selected: ${option}`);
    // Navigate to vitals measurement screen
    setCurrentScreen('vitals');
  };

  const handleVitalsContinue = () => {
    console.log('Vitals measurement complete, continuing to next screen');
    // Navigate to health scheme eligibility screen
    setCurrentScreen('schemes');
  };

  const handleSchemesContinue = () => {
    console.log('Health schemes checked, continuing to next screen');
    // Here you would navigate to the next screen (AI triage, etc.)
  };

  // Auto-play welcome message on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentTranslation.welcome);
        speechSynthesis.speak(utterance);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedLanguage]);

  if (currentScreen === 'identification') {
    return (
      <IdentificationScreen
        selectedLanguage={selectedLanguage}
        onBack={handleBackToWelcome}
        onOptionSelect={handleIdentificationSelect}
        onVoiceGuide={handleVoiceGuide}
      />
    );
  }

  if (currentScreen === 'vitals') {
    return (
      <VitalsMeasurementScreen
        selectedLanguage={selectedLanguage}
        onBack={handleBackToWelcome}
        onContinue={handleVitalsContinue}
        onVoiceGuide={handleVoiceGuide}
      />
    );
  }

  if (currentScreen === 'schemes') {
    return (
      <HealthSchemeEligibilityScreen
        selectedLanguage={selectedLanguage}
        onBack={handleBackToWelcome}
        onContinue={handleSchemesContinue}
        onVoiceGuide={handleVoiceGuide}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header with Language Selector */}
      <header className="flex justify-between items-center p-8">
        <div className="flex items-center gap-3">
          <Heart className="w-12 h-12 text-red-500" />
          <span className="text-2xl font-bold text-blue-800">Health Sewa Kendra</span>
        </div>
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-8 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <Heart className="w-32 h-32 text-red-500 mx-auto mb-6" />
          </div>
          <h1 className="text-5xl font-bold text-blue-800 mb-4">
            {currentTranslation.welcome}
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            {currentTranslation.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Volume2 className="w-6 h-6" />
            <span className="text-lg">Voice guidance available</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 max-w-6xl">
          <ActionButton
            icon={Search}
            title={currentTranslation.identifyMe}
            subtitle={currentTranslation.identifySubtitle}
            onClick={() => handleActionClick('identify')}
            color="blue"
          />
          <ActionButton
            icon={Stethoscope}
            title={currentTranslation.startCheckup}
            subtitle={currentTranslation.startCheckupSubtitle}
            onClick={() => handleActionClick('checkup')}
            color="green"
          />
          <ActionButton
            icon={Users}
            title={currentTranslation.assistedMode}
            subtitle={currentTranslation.assistedSubtitle}
            onClick={() => handleActionClick('assisted')}
            color="emerald"
          />
        </div>

        {/* Trusted Logos */}
        <TrustedLogos />
      </main>

      {/* Accessibility Button */}
      <AccessibilityButton onVoiceGuide={handleVoiceGuide} />
    </div>
  );
}

export default App;