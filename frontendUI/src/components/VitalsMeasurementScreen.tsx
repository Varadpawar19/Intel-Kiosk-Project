import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Heart, Activity, Wind, Brain, User, Droplets, Scale, RotateCcw, ChevronRight, Play } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  localName: string;
  flag: string;
}

interface VitalsMeasurementScreenProps {
  selectedLanguage: Language;
  onBack: () => void;
  onContinue: () => void;
  onVoiceGuide: () => void;
}

interface VitalReading {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'attention' | 'critical' | 'measuring' | 'pending';
  emoji: string;
}

const translations = {
  hi: {
    title: 'आइए अपनी सेहत की जांच करें',
    subtitle: 'कृपया निर्देशों का पालन करें',
    stepIndicator: 'चरण 3 का 6',
    backButton: 'वापस जाएं',
    retakeButton: 'दोबारा मापें',
    continueButton: 'आगे बढ़ें',
    instruction: 'अपना हाथ सेंसर पर रखें',
    instructionSubtitle: 'स्थिर रहें और धीरे-धीरे सांस लें',
    analyzing: 'विश्लेषण हो रहा है...',
    complete: 'माप पूरा हुआ',
    playVoice: 'आवाज़ सुनें',
    vitals: {
      heartRate: 'हृदय गति',
      bloodPressure: 'रक्तचाप',
      respiration: 'श्वसन दर',
      stressLevel: 'तनाव स्तर',
      bmi: 'बीएमआई',
      oxygen: 'ऑक्सीजन',
      weight: 'वजन'
    },
    status: {
      normal: 'सामान्य',
      attention: 'ध्यान दें',
      critical: 'गंभीर',
      measuring: 'माप रहे हैं',
      pending: 'प्रतीक्षा में'
    }
  },
  en: {
    title: "Let's Check Your Health",
    subtitle: 'Please follow the instructions',
    stepIndicator: 'Step 3 of 6',
    backButton: 'Go Back',
    retakeButton: 'Retake Measurement',
    continueButton: 'Continue',
    instruction: 'Place your hand on the sensor',
    instructionSubtitle: 'Stay still and breathe slowly',
    analyzing: 'Analyzing...',
    complete: 'Measurement Complete',
    playVoice: 'Play Voice',
    vitals: {
      heartRate: 'Heart Rate',
      bloodPressure: 'Blood Pressure',
      respiration: 'Respiration',
      stressLevel: 'Stress Level',
      bmi: 'BMI',
      oxygen: 'Oxygen',
      weight: 'Weight'
    },
    status: {
      normal: 'Normal',
      attention: 'Attention',
      critical: 'Critical',
      measuring: 'Measuring',
      pending: 'Pending'
    }
  },
  mr: {
    title: 'चला तुमच्या आरोग्याची तपासणी करूया',
    subtitle: 'कृपया सूचनांचे पालन करा',
    stepIndicator: 'पायरी 3 चा 6',
    backButton: 'मागे जा',
    retakeButton: 'पुन्हा मोजा',
    continueButton: 'पुढे चला',
    instruction: 'तुमचा हात सेन्सरवर ठेवा',
    instructionSubtitle: 'स्थिर राहा आणि हळू श्वास घ्या',
    analyzing: 'विश्लेषण करत आहे...',
    complete: 'मापन पूर्ण',
    playVoice: 'आवाज ऐका',
    vitals: {
      heartRate: 'हृदय गती',
      bloodPressure: 'रक्तदाब',
      respiration: 'श्वसन दर',
      stressLevel: 'तणाव पातळी',
      bmi: 'बीएमआय',
      oxygen: 'ऑक्सिजन',
      weight: 'वजन'
    },
    status: {
      normal: 'सामान्य',
      attention: 'लक्ष द्या',
      critical: 'गंभीर',
      measuring: 'मोजत आहे',
      pending: 'प्रतीक्षेत'
    }
  }
};

export default function VitalsMeasurementScreen({ 
  selectedLanguage, 
  onBack, 
  onContinue, 
  onVoiceGuide 
}: VitalsMeasurementScreenProps) {
  const [measurementPhase, setMeasurementPhase] = useState<'instruction' | 'measuring' | 'complete'>('instruction');
  const [vitalsData, setVitalsData] = useState<VitalReading[]>([]);
  
  const currentTranslation = translations[selectedLanguage.code as keyof typeof translations] || translations.en;

  // Initialize vitals data
  useEffect(() => {
    const initialVitals: VitalReading[] = [
      {
        id: 'heartRate',
        icon: Heart,
        label: currentTranslation.vitals.heartRate,
        value: '--',
        unit: 'bpm',
        status: 'pending',
        emoji: '💓'
      },
      {
        id: 'bloodPressure',
        icon: Activity,
        label: currentTranslation.vitals.bloodPressure,
        value: '--/--',
        unit: 'mmHg',
        status: 'pending',
        emoji: '🩸'
      },
      {
        id: 'respiration',
        icon: Wind,
        label: currentTranslation.vitals.respiration,
        value: '--',
        unit: 'bpm',
        status: 'pending',
        emoji: '🌬️'
      },
      {
        id: 'stressLevel',
        icon: Brain,
        label: currentTranslation.vitals.stressLevel,
        value: '--',
        unit: '',
        status: 'pending',
        emoji: '🧠'
      },
      {
        id: 'bmi',
        icon: User,
        label: currentTranslation.vitals.bmi,
        value: '--',
        unit: '',
        status: 'pending',
        emoji: '🧍‍♂️'
      },
      {
        id: 'oxygen',
        icon: Droplets,
        label: currentTranslation.vitals.oxygen,
        value: '--',
        unit: '%',
        status: 'pending',
        emoji: '💦'
      },
      {
        id: 'weight',
        icon: Scale,
        label: currentTranslation.vitals.weight,
        value: '--',
        unit: 'kg',
        status: 'pending',
        emoji: '⚖️'
      }
    ];
    setVitalsData(initialVitals);
  }, [currentTranslation]);

  // Simulate measurement process
  const startMeasurement = () => {
    setMeasurementPhase('measuring');
    
    // Voice announcement
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentTranslation.analyzing);
      speechSynthesis.speak(utterance);
    }

    // Simulate progressive measurement updates
    const measurementSequence = [
      { id: 'heartRate', value: '72', status: 'normal' as const, delay: 2000 },
      { id: 'bloodPressure', value: '120/80', status: 'normal' as const, delay: 3500 },
      { id: 'respiration', value: '18', status: 'normal' as const, delay: 5000 },
      { id: 'oxygen', value: '98', status: 'normal' as const, delay: 6500 },
      { id: 'weight', value: '65.2', status: 'normal' as const, delay: 8000 },
      { id: 'bmi', value: '23.1', status: 'normal' as const, delay: 9000 },
      { id: 'stressLevel', value: currentTranslation.status.normal, status: 'normal' as const, delay: 10000 }
    ];

    measurementSequence.forEach(({ id, value, status, delay }) => {
      setTimeout(() => {
        setVitalsData(prev => prev.map(vital => 
          vital.id === id 
            ? { ...vital, value, status, unit: vital.id === 'stressLevel' ? '' : vital.unit }
            : vital
        ));
      }, delay);
    });

    // Complete measurement
    setTimeout(() => {
      setMeasurementPhase('complete');
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentTranslation.complete);
        speechSynthesis.speak(utterance);
      }
    }, 11000);
  };

  const retakeMeasurement = () => {
    setMeasurementPhase('instruction');
    setVitalsData(prev => prev.map(vital => ({ ...vital, value: '--', status: 'pending' as const })));
  };

  const playVoiceInstruction = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${currentTranslation.instruction}. ${currentTranslation.instructionSubtitle}`
      );
      speechSynthesis.speak(utterance);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'attention': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'measuring': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
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
      <main className="flex flex-col lg:flex-row gap-8 px-8 py-4">
        {/* Left Side - Instruction Card */}
        <div className="flex-1">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              {currentTranslation.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {currentTranslation.subtitle}
            </p>
            
            {/* Progress Bar */}
            <div className="w-64 bg-gray-200 rounded-full h-3 mx-auto">
              <div className="bg-blue-500 h-3 rounded-full w-1/2 transition-all duration-500"></div>
            </div>
          </div>

          {/* Main Instruction Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-4 border-blue-100">
            {measurementPhase === 'instruction' && (
              <>
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                    <div className="text-6xl">🖐️</div>
                  </div>
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-blue-800 mb-4">
                  {currentTranslation.instruction}
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  {currentTranslation.instructionSubtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={playVoiceInstruction}
                    className="flex items-center gap-3 bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    <Play className="w-5 h-5" />
                    <span className="font-semibold">{currentTranslation.playVoice}</span>
                  </button>
                  
                  <button
                    onClick={startMeasurement}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    Start Measurement
                  </button>
                </div>
              </>
            )}

            {measurementPhase === 'measuring' && (
              <>
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="w-16 h-16 text-blue-600 animate-pulse" />
                  </div>
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-8 bg-blue-400 rounded animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-blue-800 mb-4">
                  {currentTranslation.analyzing}
                </h2>
                <p className="text-xl text-gray-600">
                  Please remain still and breathe normally
                </p>
              </>
            )}

            {measurementPhase === 'complete' && (
              <>
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="text-6xl">✅</div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-green-800 mb-4">
                  {currentTranslation.complete}
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  All vitals have been successfully measured
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={retakeMeasurement}
                    className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span className="font-semibold">{currentTranslation.retakeButton}</span>
                  </button>
                  
                  <button
                    onClick={onContinue}
                    className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200"
                  >
                    <span>{currentTranslation.continueButton}</span>
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side - Vitals Display */}
        <div className="lg:w-96">
          <div className="bg-white rounded-3xl shadow-2xl p-6 border-4 border-blue-100">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Live Vitals</h3>
            
            <div className="space-y-4">
              {vitalsData.map((vital) => (
                <div
                  key={vital.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${getStatusColor(vital.status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{vital.emoji}</span>
                      <div>
                        <div className="font-semibold text-sm">{vital.label}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">
                            {vital.status === 'measuring' ? (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            ) : (
                              vital.value
                            )}
                          </span>
                          {vital.unit && vital.status !== 'measuring' && (
                            <span className="text-sm opacity-75">{vital.unit}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {vital.status !== 'pending' && vital.status !== 'measuring' && (
                      <div className="text-xs font-medium px-2 py-1 rounded-full bg-current bg-opacity-20">
                        {currentTranslation.status[vital.status]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}